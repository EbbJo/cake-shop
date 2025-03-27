using System.Linq;
using cake_shop_backend.Data;
using cake_shop_backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace cake_shop_backend;

public static class SeedData {
    public static void EnsurePopulated(this IApplicationBuilder app) {
        var context = app.ApplicationServices
            .CreateScope().ServiceProvider.GetRequiredService<CakeDbContext>();
        
        //If no migrations are found, add a new one.
        if (context.Database.GetPendingMigrations().Any()) {
            context.Database.Migrate();
        }

        if (!context.Cakes.Any()) { 
            AddSeedData(context);
        }
    }

    private static void AddSeedData(CakeDbContext context) {
        context.AddRange(
            new Cake {
                Name = "Chocolate Fudge",
                Price = 15.99m,
                Description = "Rich and creamy chocolate fudge cake."
            },
            new Cake {
                Name = "Vanilla Bean",
                Price = 12.99m,
                Description = "Classic vanilla cake with real vanilla beans."
            },
            new Cake {
                Name = "Red Velvet",
                Price = 14.99m,
                Description = "Moist red velvet cake with cream cheese frosting."
            },
            new Cake {
                Name = "Strawberry Shortcake",
                Price = 16.49m,
                Description = "Layers of sponge cake with fresh strawberries and cream."
            },
            new Cake {
                Name = "Lemon Drizzle",
                Price = 13.99m,
                Description = "Zesty lemon cake with a sweet glaze."
            },
            new Cake {
                Name = "Carrot Cake",
                Price = 14.49m,
                Description = "Spiced carrot cake with walnuts and cream cheese frosting."
            },
            new Cake {
                Name = "Black Forest",
                Price = 17.99m,
                Description = "Chocolate cake layered with cherries and whipped cream."
            },
            new Cake {
                Name = "Tiramisu",
                Price = 18.99m,
                Description = "Italian coffee-flavored cake with mascarpone cheese."
            },
            new Cake {
                Name = "Coconut Delight",
                Price = 15.49m,
                Description = "Coconut cake with creamy coconut frosting."
            },
            new Cake {
                Name = "Blueberry Bliss",
                Price = 16.99m,
                Description = "Moist cake with fresh blueberries and a hint of lemon."
            },
            new Cake {
                Name = "Peanut Butter Cup",
                Price = 17.49m,
                Description = "Chocolate cake with peanut butter frosting and chocolate drizzle."
            },
            new Cake {
                Name = "Marble Swirl",
                Price = 14.99m,
                Description = "Chocolate and vanilla swirled cake with chocolate ganache."
            },
            new Cake {
                Name = "Funfetti",
                Price = 13.49m,
                Description = "Vanilla cake filled with colorful sprinkles and topped with buttercream."
            },
            new Cake {
                Name = "Raspberry Almond",
                Price = 16.79m,
                Description = "Almond-flavored cake with raspberry filling and almond buttercream."
            },
            new Cake {
                Name = "Pistachio Dream",
                Price = 18.29m,
                Description = "Pistachio cake with light and creamy frosting."
            },
            new Cake {
                Name = "Espresso Mocha",
                Price = 19.49m,
                Description = "Rich chocolate cake with espresso-infused frosting."
            },
            new Cake {
                Name = "Apple Spice",
                Price = 14.99m,
                Description = "Cinnamon-spiced cake with apple chunks and caramel glaze."
            },
            new Cake {
                Name = "Cookies and Cream",
                Price = 17.99m,
                Description = "Chocolate cake with crushed cookies and vanilla frosting."
            },
            new Cake {
                Name = "Monkey",
                Price = 1000000.00m,
                Description = "Uhh ohhh, Stinkyyy"
            },
            new Cake {
                Name = "Honey Lavender",
                Price = 18.99m,
                Description = "Floral and sweet honey-lavender cake with delicate icing."
            }
        );

        context.SaveChanges();
    }
}