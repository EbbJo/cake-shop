using System.Linq;
using System.Threading.Tasks;
using cake_shop_backend.Data;
using cake_shop_backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

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
        var cars = await db.Cakes.ToListAsync();
        return TypedResults.Ok(cars);
    }

    private static async Task<IResult> GetCakesSearch(CakeDbContext db,
        [FromRoute] int pagenr,
        [FromRoute] int pageamt,
        string? query = null) {
        
        var cars = await db.Cakes.ToListAsync();

        if (!string.IsNullOrEmpty(query)) {
            cars = cars.Where(c => c.Name.Contains(query, StringComparison.InvariantCultureIgnoreCase)).ToList();
        }

        if (cars.Count == 0) {
            return TypedResults.NoContent();
        }
        
        int startingElem = pagenr * pageamt;

        if (startingElem > cars.Count) {
            return TypedResults.NoContent();
        }
        
        cars = cars.Skip(startingElem).Take(pageamt).ToList();
        
        return TypedResults.Ok(cars);
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