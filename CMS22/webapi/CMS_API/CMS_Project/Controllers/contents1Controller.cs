using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS_Project.CMS_Models;

namespace CMS_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class contents1Controller : ControllerBase
    {
        private readonly CMS_CommonContext _context;

        public contents1Controller(CMS_CommonContext context)
        {
            _context = context;
        }

        // GET: api/contents1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<content>>> Getcontent()
        {
            var cont = await (
                   from co in _context.content
                   join ca in _context.Categories on co.CategoryID equals ca.CategoryID
                   select new content
                   {
                       ContentID = co.ContentID,
                       Title = co.Title,
                       Description = co.Description,
                       FileURL = co.FileURL,
                       RetentionPeriod = co.RetentionPeriod,
                       CategoryID = co.CategoryID,
                       CategoryName = co.CategoryName
                   }).ToListAsync();

            return cont; // Return the list directly
        }

        // GET: api/contents1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<content>> Getcontent(int id)
        {
          if (_context.content == null)
          {
              return NotFound();
          }
            var content = await _context.content.FindAsync(id);

            if (content == null)
            {
                return NotFound();
            }

            return content;
        }

        // PUT: api/contents1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcontent(int id, content content)
        {
            if (id != content.ContentID)
            {
                return BadRequest();
            }

            _context.Entry(content).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!contentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/contents1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<content>> Postcontent(content content)
        {
          if (_context.content == null)
          {
              return Problem("Entity set 'CMS_CommonContext.content'  is null.");
          }
            _context.content.Add(content);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getcontent", new { id = content.ContentID }, content);
        }

        // DELETE: api/contents1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletecontent(int id)
        {
            if (_context.content == null)
            {
                return NotFound();
            }
            var content = await _context.content.FindAsync(id);
            if (content == null)
            {
                return NotFound();
            }

            _context.content.Remove(content);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool contentExists(int id)
        {
            return (_context.content?.Any(e => e.ContentID == id)).GetValueOrDefault();
        }
    }
}
