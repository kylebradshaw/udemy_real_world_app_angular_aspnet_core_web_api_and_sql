using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public CategoriesController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // POST: /api/categories
    [HttpPost]
    public IActionResult CreateCategory([FromBody] CreateCategoryRequestDto request)
    {
        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            UrlHandle = request.UrlHandle
        };

        _dbContext.Categories.Add(category);
        _dbContext.SaveChanges();

        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };

        return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, response);
    }

    // GET: /api/categories
    [HttpGet]
    public IActionResult GetAllCategories()
    {
        var categories = _dbContext.Categories.ToList();

        var response = categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            UrlHandle = c.UrlHandle
        });

        return Ok(response);
    }

    // GET: /api/categories/{id}
    [HttpGet("{id:guid}")]
    public IActionResult GetCategoryById([FromRoute] Guid id)
    {
        var category = _dbContext.Categories.Find(id);

        if (category is null)
            return NotFound();

        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };

        return Ok(response);
    }

    // PUT: /api/categories/{id}
    [HttpPut("{id:guid}")]
    public IActionResult UpdateCategory([FromRoute] Guid id, [FromBody] UpdateCategoryRequestDto request)
    {
        var category = _dbContext.Categories.Find(id);

        if (category is null)
            return NotFound();

        category.Name = request.Name;
        category.UrlHandle = request.UrlHandle;

        _dbContext.SaveChanges();

        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };

        return Ok(response);
    }

    // DELETE: /api/categories/{id}
    [HttpDelete("{id:guid}")]
    public IActionResult DeleteCategory([FromRoute] Guid id)
    {
        var category = _dbContext.Categories.Find(id);

        if (category is null)
            return NotFound();

        _dbContext.Categories.Remove(category);
        _dbContext.SaveChanges();

        return NoContent();
    }
}
