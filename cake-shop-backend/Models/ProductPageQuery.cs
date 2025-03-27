namespace cake_shop_backend.Models;

public class ProductPageQuery {
    public List<Cake> Cakes { get; set; } = [];
    public bool LastPage { get; set; } = false;
}