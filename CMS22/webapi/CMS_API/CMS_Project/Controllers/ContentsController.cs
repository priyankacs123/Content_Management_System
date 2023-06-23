using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS_Project.CMS_Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace CMS_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentsController : ControllerBase
    {
        private readonly CMS_CommonContext _dbContext;

        public ContentsController(CMS_CommonContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contents>>> GetContents()
        {
            var contentItems = await _dbContext.Contents.ToListAsync();

            if (contentItems == null || contentItems.Count == 0)
                return NotFound();

            return contentItems;
        }
       
        [HttpGet("{id}")]
        public async Task<ActionResult<Contents>> GetContents(int id)
        {
            var contentItem = await _dbContext.Contents.FindAsync(id);

            if (contentItem == null)
                return NotFound();

            return contentItem;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutContents(int id, Contents contents)
        {
            if (id != contents.ContentID)
                return BadRequest();

            _dbContext.Entry(contents).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentsExists(id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Contents>> PostContents(Contents contents)
        {
            if (contents.Category == null)
            {
                contents.Category = ""; // Assign an empty string if Category is null
            }

            _dbContext.Contents.Add(contents);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("GetContents", new { id = contents.ContentID }, contents);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContents(int id)
        {
            var contentItem = await _dbContext.Contents.FindAsync(id);

            if (contentItem == null)
                return NotFound();

            _dbContext.Contents.Remove(contentItem);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }


     

        [HttpGet("user/{userID}")]
        public IActionResult GetContentByUser1(int userID)
        {
            var contents = _dbContext.Contents
                .Where(c => c.UserID == userID)
                .ToList();

            if (contents == null || contents.Count == 0)
                return NotFound();

            // Retrieve the category names for each content
            var categoryIDs = contents.Select(c => c.CategoryID).ToList();
            var categories = _dbContext.Categories
                .Where(cat => categoryIDs.Contains(cat.CategoryID))
                .ToList();

            // Map category names to content objects
            foreach (var content in contents)
            {
                var category = categories.FirstOrDefault(cat => cat.CategoryID == content.CategoryID);
                content.Category = category?.CategoryName;
            }

            return Ok(contents);
        }




        [HttpGet("category/{categoryID}")]
        public IActionResult GetContentByCategory(int categoryID)
        {
            var contents = _dbContext.Contents
                .Where(c => c.CategoryID == categoryID)
                .ToList();

            if (contents == null || contents.Count == 0)
                return NotFound();

            return Ok(contents);
        }

         [HttpGet("api/contents/aggregateByCategory")]
        
        public IActionResult AggregateContentsByCategory()
        {
            var result = _dbContext.Contents
                .Join(_dbContext.Categories, c => c.CategoryID, cat => cat.CategoryID, (c, cat) => new { c, cat })
                .GroupBy(x => x.cat.CategoryName)
                .Select(g => new
                {
                    CategoryName = g.Key,
                    ContentCount = g.Count()
                })
                .ToList();

            return Ok(result);
        }

        [HttpGet("api/contents/aggregateByUser")]
        public IActionResult AggregateContentsByUser()
        {
            var result = _dbContext.Contents
                .Join(_dbContext.Users, c => c.UserID, u => u.UserID, (c, u) => new { c, u })
                .GroupBy(x => x.u.Username)
                .Select(g => new
                {
                    UserName = g.Key,
                    ContentCount = g.Count()
                })
                .ToList();

            return Ok(result);
        }


        [HttpGet("api/contents/aggregateByFileType")]
        public IActionResult AggregateContentsByFileType()
        {
            var result = _dbContext.Contents
                .GroupBy(c => c.FileType)
                .Select(g => new
                {
                    FileType = g.Key,
                    ContentCount = g.Count()
                })
                .ToList();

            return Ok(result);
        }
        private bool ContentsExists(int id)
        {
            return _dbContext.Contents.Any(e => e.ContentID == id);
        }
    }
  



}
