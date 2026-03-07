using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation;

public class CategoryRepository: ICategoryRepository
{
    private readonly ApplicationDbContext _dbContext;

    public CategoryRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public async Task<Category> Create(Category category)
    {
        _dbContext.Categories.Add(category);
        await _dbContext.SaveChangesAsync();

        return category;
    }

    public async Task<IEnumerable<Category>> GetAll()
    {
        return await _dbContext.Categories.ToListAsync();
    }

    public async Task<Category?> GetById(Guid id)
    {
        return await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Category?> Update(Category category)
    {
        var existing = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == category.Id);

        if (existing is null)
            return null;

        existing.Name = category.Name;
        existing.UrlHandle = category.UrlHandle;
        await _dbContext.SaveChangesAsync();

        return existing;
    }

    public async Task<Category?> Delete(Guid id)
    {
        var existing = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);

        if (existing is null)
            return null;

        _dbContext.Categories.Remove(existing);
        await _dbContext.SaveChangesAsync();

        return existing;
    }
}