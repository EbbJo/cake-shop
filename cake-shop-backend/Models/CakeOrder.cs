using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Components;

namespace cake_shop_backend.Models;

public class CakeOrder {
    [Key]
    public int Id { get; set; }
    
    [Required]
    public int CakeId { get; set; }
    
    public int Quantity { get; set; } = 0;
    
    [Required]
    public int OrderId { get; set; }

    public virtual Order Order { get; set; } = null!;
}