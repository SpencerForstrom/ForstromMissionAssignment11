using Microsoft.EntityFrameworkCore;
using Mission11Assignment.API.Data;

var builder = WebApplication.CreateBuilder(args);

// --------------------------------------------
// Configure services used by the application
// --------------------------------------------


// Add services/support to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// This code registers the SQLite database context using the Bookstore.sqlite file
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite("Data Source=Bookstore.sqlite"));

// I ran into some issues Configuring CORS, but I finally got this to allow requests from the React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5175")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// The lines below applies/enables the following: CORS policy/HTTPS/Authorization for middleware, etc.
app.UseCors(x => x.WithOrigins("http://localhost:5175"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
