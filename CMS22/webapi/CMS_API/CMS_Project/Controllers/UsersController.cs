using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS_Project.CMS_Models;

namespace CMS_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CMS_CommonContext _context;

        public UsersController(CMS_CommonContext context)
        {
            _context = context;
        }

        //GET: api/Users
       [HttpGet]
        // public async Task<ActionResult<IEnumerable<Users>>> Getusers()
        //{
        //  return await _context.Users.ToListAsync();
        //}
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            var users = await (from u in _context.Users
                               join j in _context.Job on u.JobID equals j.JobId
                               select new Users
                               {
                                   UserID = u.UserID,
                                   Username = u.Username,
                                   Password = u.Password,
                                   Email = u.Email,
                                   Phonenumber = u.Phonenumber,
                                   JobID = u.JobID,
                                   JobRole = j.JobRole
                               }).ToListAsync();

            return users;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginCredentials loginCredentials)
        {
            if (loginCredentials == null)
                return BadRequest();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == loginCredentials.Username && x.Password == loginCredentials.Password);

            if (user == null)
                return NotFound(new { Message = "Invalid username or password!" });

            return Ok(new
            {
                Message = "Login Successful!"
            });
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.UserID)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.UserID }, users);
        }

        // DELETE: api/Users/5
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);



            if (user == null)
            {
                return NotFound();
            }



            _context.Users.Remove(user);
            _context.SaveChanges();



            return NoContent();
        }
        //// GET: api/Users/username/{username}
        //[HttpGet("username/{username}")]
        //public async Task<ActionResult<Users>> GetUserByUsername(string username)
        //{
        //    var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);



        //    if (user == null)
        //    {
        //        return NotFound();
        //    }



        //    return user;
        //}

        [HttpGet("{Username}")]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers(string username)
        {
            var users = await (from u in _context.Users
                               join j in _context.Job on u.JobID equals j.JobId
                               where u.Username == username
                               select new Users
                               {
                                   UserID = u.UserID,
                                   Username = u.Username,
                                   Password = u.Password,
                                   Email = u.Email,
                                   Phonenumber = u.Phonenumber,
                                   JobID = u.JobID,
                                   JobRole = j.JobRole
                               }).ToListAsync();

            return users;
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            Users user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        private bool UsersExists(int JobId)
        {
            return _context.Users.Any(e => e.UserID == JobId);
        }
    }
    
}
