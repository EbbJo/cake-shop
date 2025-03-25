#define USESWAGGER

using cake_shop_backend;
using cake_shop_backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowCakeApp",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

#if USESWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1",
        new OpenApiInfo() { Title = "Cake API", Description = "Keep Track of your tasks", Version = "v1" });
});
#endif

builder.Services.AddDbContext<CakeDbContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

#if USESWAGGER
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cake API V1");
    });
}
#endif

app.UseCors("AllowCakeApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.MapOpenApi();
}

app.MapEndpoints();
app.EnsurePopulated();

app.Run();