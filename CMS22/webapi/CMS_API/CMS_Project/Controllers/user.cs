using CMS_Project.CMS_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CMS_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class user : ControllerBase
    {
        private readonly CMS_CommonContext  _context;

        public user(CMS_CommonContext context)
        {
            _context = context;
        }

      
        [HttpGet("{username}")]
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
        private bool UsersExists(int JobId)
        {
            return _context.Users.Any(e => e.UserID == JobId);
        }


    }
}
