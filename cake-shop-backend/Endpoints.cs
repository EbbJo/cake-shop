using cake_shop_backend.Data;
using cake_shop_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cake_shop_backend;

public static class Endpoints {
    public static void MapEndpoints(this IEndpointRouteBuilder app) {
        var endpoints = app.MapGroup("/api/cakes");
        
        endpoints.MapGet("/", GetCakes).WithSummary("Gets all cakes.");
        
        endpoints.MapGet("/Page-{pagenr}_AmtPerPage-{pageamt}", GetCakesSearch)
            .WithSummary("Get all cakes within a range, starting from 'Page', and 'AmtPerPage' being the amount of elements per page.");

        endpoints.MapGet("/{id}", GetCakeById).WithSummary("Gets a cake by id.");
        
        endpoints.MapPost("/", AddCake)
            .WithSummary("Adds a cake.");
        
        endpoints.MapPut("/{id}", UpdateCake)
            .WithSummary("Updates a cake.");
        
        endpoints.MapDelete("/{id}", DeleteCake)
            .WithSummary("Deletes a cake.");
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
}