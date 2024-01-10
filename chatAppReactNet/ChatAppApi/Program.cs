var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(); // This line is necessary to use controllers
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyAllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // The origin of the React app
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});



var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("MyAllowSpecificOrigins"); // Use the CORS policy before UseRouting

app.MapControllers(); // Map attribute-routed controllers

app.Use(async (context, next) =>
{
    // Log the request path
    Console.WriteLine("Incoming request: " + context.Request.Path);

    // Continue processing the request
    await next.Invoke();
});

app.Run();

