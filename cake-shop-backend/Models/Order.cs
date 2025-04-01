using System.ComponentModel.DataAnnotations;

namespace cake_shop_backend.Models;

public class Order {
    [Key]
    public int Id { get; set; }

    public virtual ICollection<CakeOrder> Products { get; set; } = new List<CakeOrder>();
    
    public string Name { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;

    public void Copy(Order o) {
        var arr = new CakeOrder[o.Products.Count];
        o.Products.CopyTo(arr, 0);
        Products = arr.ToList();
        
        Name = o.Name;
        Address = o.Address;
    }
}