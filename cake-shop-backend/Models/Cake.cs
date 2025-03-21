using System.ComponentModel.DataAnnotations;

namespace cake_shop_backend.Models;

public class Cake {
    [Key]
    public int Id { get; set; }
    
    public string? Name { get; set; }
    
    public string? Description { get; set; }

    public decimal Price { get; set; } = 0;
}