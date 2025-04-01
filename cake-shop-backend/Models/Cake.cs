using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cake_shop_backend.Models;

public class Cake {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; } = 0;

    /// <summary>
    /// Copies another cake's values (except <see cref="Id"/>).
    /// </summary>
    /// <param name="o">Other cake to copy from.</param>
    public void Copy(Cake o) {
        Name = o.Name;
        Description = o.Description;
        Price = o.Price;
    }
}