using Microsoft.AspNetCore.Mvc;
using Data;
using Models;
using Microsoft.EntityFrameworkCore;

namespace MenuProjectAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoryController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var categories = await _context.Categories
            .Include(c => c.FoodProducts) // İstersen ürünleri de dahil edebilirsin
            .ToListAsync();

        return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Category category)
    {
        if (category == null || string.IsNullOrWhiteSpace(category.CategoryName))
            return BadRequest("Geçersiz kategori verisi.");

        // Aynı isimde kategori var mı kontrol et (opsiyonel)
        bool exists = await _context.Categories.AnyAsync(c => c.CategoryName == category.CategoryName);
        if (exists)
            return BadRequest("Bu isimde zaten bir kategori mevcut.");

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return Ok(category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound();

        bool hasProducts = await _context.FoodProducts.AnyAsync(p => p.CategoryId == id);
        if (hasProducts)
            return BadRequest("Bu kategoriye bağlı ürünler olduğu için silinemez.");

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Category category)
    {
        if (category == null || id != category.CategoryId || string.IsNullOrWhiteSpace(category.CategoryName))
            return BadRequest("Geçersiz kategori verisi.");

        var existingCategory = await _context.Categories.FindAsync(id);
        if (existingCategory == null) return NotFound();

        existingCategory.CategoryName = category.CategoryName;

        _context.Categories.Update(existingCategory);
        await _context.SaveChangesAsync();

        return Ok(existingCategory);
    }
}
