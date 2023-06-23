using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS_Project.CMS_Models;

namespace CMS_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly CMS_CommonContext _dbContext;

        public CategoriesController(CMS_CommonContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categories>>> GetCategories()
        {
            var CategoriesItems = await _dbContext.Categories.ToListAsync();

            if (CategoriesItems == null || CategoriesItems.Count == 0)
                return NotFound();

            return CategoriesItems;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Categories>> GetCategories(int id)
        {
            var CategoriesItem = await _dbContext.Categories.FindAsync(id);

            if (CategoriesItem == null)
                return NotFound();

            return CategoriesItem;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategories(int id, Categories categories)
        {
            if (id != categories.CategoryID)
                return BadRequest();

            _dbContext.Entry(categories).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriesExists(id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Categories>> PostCategories(Categories categories)
        {
            _dbContext.Categories.Add(categories);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetCategories", new { id = categories.CategoryID }, categories);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategories(int id)
        {
            var CategoriesItem = await _dbContext.Categories.FindAsync(id);

            if (CategoriesItem == null)
                return NotFound();

            _dbContext.Categories.Remove(CategoriesItem);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoriesExists(int id)
        {
            return _dbContext.Categories.Any(e => e.CategoryID == id);
        }
    }
}
