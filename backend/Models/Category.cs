namespace Models;

public class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;
    public ICollection<FoodProduct> FoodProducts { get; set; } = new List<FoodProduct>();
}