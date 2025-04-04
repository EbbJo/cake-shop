using System.ComponentModel.DataAnnotations;
using cake_shop_backend.Data;
using Microsoft.EntityFrameworkCore;

namespace cake_shop_backend.Models;

public class Order {
    [Key]
    public int Id { get; set; }

    public virtual ICollection<CakeOrder> Products { get; set; } = new List<CakeOrder>();
    
    public string Country { get; set; } = string.Empty;
    
    public string Province { get; set; } = string.Empty;
    
    public string City { get; set; } = string.Empty;
    
    public string PostalCode { get; set; } = string.Empty;
    
    public decimal ShippingCost { get; set; }

    public async Task<decimal> TotalCost(CakeDbContext db) {
        var cakes = await db.Cakes.ToListAsync();

        return Products.Select(
            p => cakes.Find(
                c => c.Id == p.CakeId))
                    .OfType<Cake>().Sum(cake => cake.Price) + ShippingCost;
    }

    public void Copy(Order o) {
        var arr = new CakeOrder[o.Products.Count];
        o.Products.CopyTo(arr, 0);
        Products = arr.ToList();
        
        Country = o.Country;
        Province = o.Province;
        City = o.City;
        PostalCode = o.PostalCode;
        ShippingCost = o.ShippingCost;
    }
}