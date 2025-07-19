using Microsoft.AspNetCore.Mvc;
using Data;
using Models;
using Microsoft.EntityFrameworkCore;

namespace MenuProjectAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FoodProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public FoodProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var products = await _context.FoodProducts
            .Include(p => p.Category)  // Kategori bilgisi ile birlikte getir
            .ToListAsync();

        return Ok(products);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] FoodProduct product)
    {
        if (product == null || string.IsNullOrWhiteSpace(product.Name))
            return BadRequest("Geçersiz ürün verisi.");

        // Kategori var mı kontrol et
        bool categoryExists = await _context.Categories.AnyAsync(c => c.CategoryId == product.CategoryId);
        if (!categoryExists)
            return BadRequest("Geçersiz kategori.");

        // Yeni ürün ekle
        _context.FoodProducts.Add(product);
        await _context.SaveChangesAsync();

        // Kategori bilgisini yükle (opsiyonel)
        await _context.Entry(product).Reference(p => p.Category).LoadAsync();

        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.FoodProducts.FindAsync(id);
        if (product == null) return NotFound();

        _context.FoodProducts.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] FoodProduct product)
    {
        if (product == null || id != product.Id || string.IsNullOrWhiteSpace(product.Name))
            return BadRequest("Geçersiz ürün verisi.");

        bool categoryExists = await _context.Categories.AnyAsync(c => c.CategoryId == product.CategoryId);
        if (!categoryExists)
            return BadRequest("Geçersiz kategori.");

        var existingProduct = await _context.FoodProducts.FindAsync(id);
        if (existingProduct == null) return NotFound();

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.ImageUrl = product.ImageUrl;
        existingProduct.CategoryId = product.CategoryId;

        _context.FoodProducts.Update(existingProduct);
        await _context.SaveChangesAsync();

        // Güncellenen ürünün kategori bilgisini yükle
        await _context.Entry(existingProduct).Reference(p => p.Category).LoadAsync();

        return Ok(existingProduct);
    }
}
