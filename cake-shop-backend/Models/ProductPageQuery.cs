namespace cake_shop_backend.Models;

public class ProductPageQuery {
    public List<Cake> Cakes { get; set; } = [];
    public int NumPages { get; set; } = 0;
    public bool LastPage { get; set; } = false;
}