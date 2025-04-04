using cake_shop_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace cake_shop_backend.Data;

public class CakeDbContext(DbContextOptions<CakeDbContext> options) : DbContext(options) {
    public DbSet<Cake> Cakes { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CakeOrder>()
            .HasOne(co => co.Order)
            .WithMany(o => o.Products)
            .HasForeignKey(co => co.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}