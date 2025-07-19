using System.Text.Json.Serialization;
using Models;

public class FoodProduct
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = null!;
    public int CategoryId { get; set; }

    [JsonIgnore]  // Burada önemli
    public Category? Category { get; set; }
}
