using System.ComponentModel.DataAnnotations;

namespace cake_shop_backend.Models;

public class CakeOrder {
    [Key]
    public int Id { get; set; }
    
    [Required]
    public int CakeId { get; set; }
    
    public int Quantity { get; set; } = 0;
}