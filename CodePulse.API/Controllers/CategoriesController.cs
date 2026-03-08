using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }


    // POST: /api/categories
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
    {
        // Map DTO to Domain Model
        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            UrlHandle = request.UrlHandle
        };

        await _categoryRepository.Create(category);

        // Map Domain Model to DTO
        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };

        // return Ok(response);
        return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, response);
    }

    // GET: /api/categories
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryRepository.GetAll();

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
    public async Task<IActionResult> GetCategoryById([FromRoute] Guid id) //FromRoute is in the URI
    {
        var category = await _categoryRepository.GetById(id);

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
    public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, [FromBody] UpdateCategoryRequestDto request)
    {
        var category = new Category
        {
            Id = id,
            Name = request.Name,
            UrlHandle = request.UrlHandle
        };

        category = await _categoryRepository.Update(category);

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

    // DELETE: /api/categories/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
    {
        var category = await _categoryRepository.Delete(id);

        if (category is null)
            return NotFound();

        return NoContent();
    }
}
