using cake_shop_backend.Data;
using cake_shop_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cake_shop_backend;

public static class Endpoints {
    public static void MapEndpoints(this IEndpointRouteBuilder app) {
        var endpoints = app.MapGroup("/api/cakes");
        
        endpoints.MapGet("/", GetCakes).WithSummary("Gets all cakes.");
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

    static async Task<IResult> GetCakeById(CakeDbContext db, [FromRoute] int id) {
        var cake = await db.Cakes.FindAsync(id);
        
        if (cake is null) {
            return TypedResults.NotFound();
        }
        
        return TypedResults.Ok(cake);
    }

    static async Task<IResult> AddCake(CakeDbContext db, [FromBody] Cake cake) {
         await db.Cakes.AddAsync(cake);
         await db.SaveChangesAsync();

         return TypedResults.Created($"/{cake.Id}", cake);
    }

    static async Task<IResult> UpdateCake(CakeDbContext db, [FromBody] Cake cake) {
        var cakeToUpdate = await db.Cakes.FindAsync(cake.Id);

        if (cakeToUpdate is null) {
            return TypedResults.NotFound();
        }
        
        cakeToUpdate.Copy(cake);
        
        await db.SaveChangesAsync();

        return TypedResults.Ok(cakeToUpdate);
    }

    static async Task<IResult> DeleteCake(CakeDbContext db, [FromRoute] int id) {
        var cake = await db.Cakes.FindAsync(id);
        if (cake is null) {
            return TypedResults.NotFound();
        }

        db.Cakes.Remove(cake);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}