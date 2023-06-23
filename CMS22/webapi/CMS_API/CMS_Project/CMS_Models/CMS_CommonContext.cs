using Microsoft.EntityFrameworkCore;
using CMS_Project.CMS_Models;

namespace CMS_Project.CMS_Models
{
    public class CMS_CommonContext : DbContext
    {
        public CMS_CommonContext(DbContextOptions<CMS_CommonContext> options) : base(options)
        {
        }

        public DbSet<Categories> Categories { get; set; }
        public DbSet<Contents> Contents { get; set; }
        public DbSet<Job> Job { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<Users> Users { get; set; }

        public DbSet<content> content { get; set; }

        public DbSet<CMS_Project.CMS_Models.FormResponses>? FormResponses { get; set; }
    }

}
