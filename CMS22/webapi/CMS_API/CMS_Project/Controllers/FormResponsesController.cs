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
    public class FormResponsesController : ControllerBase
    {
        private readonly CMS_CommonContext _context;

        public FormResponsesController(CMS_CommonContext context)
        {
            _context = context;
        }

        // GET: api/FormResponses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormResponses>>> GetFormResponses()
        {
          if (_context.FormResponses == null)
          {
              return NotFound();
          }
            return await _context.FormResponses.ToListAsync();
        }

        // GET: api/FormResponses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FormResponses>> GetFormResponses(int id)
        {
          if (_context.FormResponses == null)
          {
              return NotFound();
          }
            var formResponses = await _context.FormResponses.FindAsync(id);

            if (formResponses == null)
            {
                return NotFound();
            }

            return formResponses;
        }

        // PUT: api/FormResponses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormResponses(int id, FormResponses formResponses)
        {
            if (id != formResponses.Id)
            {
                return BadRequest();
            }

            _context.Entry(formResponses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormResponsesExists(id))
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

        // POST: api/FormResponses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FormResponses>> PostFormResponses(FormResponses formResponses)
        {
          if (_context.FormResponses == null)
          {
              return Problem("Entity set 'CMS_CommonContext.FormResponses'  is null.");
          }
            _context.FormResponses.Add(formResponses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFormResponses", new { id = formResponses.Id }, formResponses);
        }

        // DELETE: api/FormResponses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormResponses(int id)
        {
            if (_context.FormResponses == null)
            {
                return NotFound();
            }
            var formResponses = await _context.FormResponses.FindAsync(id);
            if (formResponses == null)
            {
                return NotFound();
            }

            _context.FormResponses.Remove(formResponses);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FormResponsesExists(int id)
        {
            return (_context.FormResponses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
