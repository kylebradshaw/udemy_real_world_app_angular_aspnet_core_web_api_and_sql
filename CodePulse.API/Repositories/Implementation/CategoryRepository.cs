using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;

namespace CodePulse.API.Repositories.Implementation;

public class CategoryRepository: ICategoryRepository
{
    private readonly ApplicationDbContext _dbContext;

    public CategoryRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public Task<Category> Create(Category category);
    {
        _dbContext.Categories.Add(category);
        _dbContext.SaveChanges();

        return category;
    }
}