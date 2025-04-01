using cake_shop_backend.Data;
using cake_shop_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cake_shop_backend;

public static class Endpoints {
    public static void MapEndpoints(this IEndpointRouteBuilder app) {
        var cakeEndPoints = app.MapGroup("/api/cakes");
        
        cakeEndPoints.MapGet("/", GetCakes).WithSummary("Gets all cakes.");
        
        cakeEndPoints.MapGet("/Page-{pagenr}_AmtPerPage-{pageamt}", GetCakesSearch)
            .WithSummary("Get all cakes within a range, starting from 'Page', and 'AmtPerPage' being the amount of elements per page.");

        cakeEndPoints.MapGet("/{id}", GetCakeById).WithSummary("Gets a cake by id.");
        
        cakeEndPoints.MapPost("/", AddCake)
            .WithSummary("Adds a cake.");
        
        cakeEndPoints.MapPut("/{id}", UpdateCake)
            .WithSummary("Updates a cake.");
        
        cakeEndPoints.MapDelete("/{id}", DeleteCake)
            .WithSummary("Deletes a cake.");
        
        var orderEndPoints = app.MapGroup("/api/orders");
        
        orderEndPoints.MapGet("/", GetOrders).WithSummary("Gets all orders.");
        
        orderEndPoints.MapGet("/{id}", GetOrderById).WithSummary("Gets an order by id.");
        orderEndPoints.MapGet("/{id}/Price", GetOrderPrice)
            .WithSummary("Get the total price of all cakes in an order.");
        
        orderEndPoints.MapPost("/", AddOrder)
            .WithSummary("Adds an order.");
        
        orderEndPoints.MapPut("/{id}", UpdateOrder)
            .WithSummary("Updates an order.");
        
        orderEndPoints.MapDelete("/{id}", DeleteOrder)
            .WithSummary("Deletes an order.");
    }

    private static async Task<IResult> GetCakes(CakeDbContext db) {
        var cakes = await db.Cakes.ToListAsync();
        return TypedResults.Ok(cakes);
    }

    private static async Task<IResult> GetCakesSearch(CakeDbContext db,
        [FromRoute] int pagenr,
        [FromRoute] int pageamt,
        string? query = null) {
        
        //Get all cakes
        var cakes = await db.Cakes.ToListAsync();

        //If query is provided, filter using it.
        if (!string.IsNullOrEmpty(query)) {
            cakes = cakes.Where(
                c => c.Name.Contains(query, StringComparison.InvariantCultureIgnoreCase)).ToList();
        }
        
        if (cakes.Count == 0) {
            return TypedResults.NoContent();
        }
        
        //Get index of starting element
        int startingElem = pagenr * pageamt;

        //Check if starting element is past end of list
        if (startingElem > cakes.Count) {
            return TypedResults.NoContent();
        }

        //Create query object
        var pageQuery = new ProductPageQuery {
            NumPages = (int)Math.Ceiling((double)cakes.Count / pageamt),
            LastPage = cakes.Count - startingElem <= pageamt
        };
        
        //Take portion of elements to show
        cakes = cakes.Skip(startingElem).Take(pageamt).ToList();

        if (cakes.Count == 0) {
            return TypedResults.NoContent();
        }
        
        pageQuery.Cakes = cakes;

        return TypedResults.Ok(pageQuery);
    }

    private static async Task<IResult> GetCakeById(CakeDbContext db, [FromRoute] int id) {
        var cake = await db.Cakes.FindAsync(id);
        
        if (cake is null) {
            return TypedResults.NotFound();
        }
        
        return TypedResults.Ok(cake);
    }

    private static async Task<IResult> AddCake(CakeDbContext db, [FromBody] Cake cake) {
         await db.Cakes.AddAsync(cake);
         await db.SaveChangesAsync();

         return TypedResults.Created($"/{cake.Id}", cake);
    }

    private static async Task<IResult> UpdateCake(CakeDbContext db, [FromBody] Cake cake) {
        var cakeToUpdate = await db.Cakes.FindAsync(cake.Id);

        if (cakeToUpdate is null) {
            return TypedResults.NotFound();
        }
        
        cakeToUpdate.Copy(cake);
        
        await db.SaveChangesAsync();

        return TypedResults.Ok(cakeToUpdate);
    }

    private static async Task<IResult> DeleteCake(CakeDbContext db, [FromRoute] int id) {
        var cake = await db.Cakes.FindAsync(id);
        if (cake is null) {
            return TypedResults.NotFound();
        }

        db.Cakes.Remove(cake);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> GetOrders(CakeDbContext db) {
        var orders = await db.Orders.Include(o => o.Products).ToListAsync();
        return TypedResults.Ok(orders);
    }
    
    private static async Task<IResult> GetOrderById(CakeDbContext db, [FromRoute] int id) {
        var order = await db.Orders
            .Include(o => o.Products)
            .FirstOrDefaultAsync(o => o.Id == id);
        
        if (order is null) {
            return TypedResults.NotFound();
        }
        
        return TypedResults.Ok(order);
    }

    private static async Task<IResult> GetOrderPrice(CakeDbContext db, [FromRoute] int id) {
        var order = await db.Orders
            .Include(o => o.Products)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order is null) {
            return TypedResults.NotFound();
        }

        decimal totalPrice = 0;

        foreach (var cakeOrder in order.Products) {
            var cake = await db.Cakes.FindAsync(cakeOrder.CakeId);
            if (cake is null) { continue; }
            
            totalPrice += cake.Price * cakeOrder.Quantity;
        }
        
        return TypedResults.Ok(totalPrice);
    }
    
    private static async Task<IResult> AddOrder(CakeDbContext db, [FromBody] Order order) {
        await db.Orders.AddAsync(order);
        await db.SaveChangesAsync();

        return TypedResults.Created($"/{order.Id}", order);
    }

    private static async Task<IResult> UpdateOrder(CakeDbContext db, [FromBody] Order order) {
        var orderToUpdate = await db.Orders
            .Include(o => o.Products)
            .FirstOrDefaultAsync(o => o.Id == order.Id);

        if (orderToUpdate is null) {
            return TypedResults.NotFound();
        }
        
        orderToUpdate.Copy(order);
        
        await db.SaveChangesAsync();

        return TypedResults.Ok(orderToUpdate);
    }
    
    private static async Task<IResult> DeleteOrder(CakeDbContext db, [FromRoute] int id) {
        var order = await db.Orders.FindAsync(id);
        
        if (order is null) {
            return TypedResults.NotFound();
        }

        db.Orders.Remove(order);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}