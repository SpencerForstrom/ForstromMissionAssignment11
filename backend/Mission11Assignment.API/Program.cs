using Mission11Assignment.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add your DbContext
builder.Services.AddDbContext<BookDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection"));
});

// Add named CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply the CORS policy BEFORE Authorization
app.UseHttpsRedirection();

app.UseCors("AllowReactApp"); // Use the named policy here

app.UseAuthorization();

app.MapControllers();

app.Run();
