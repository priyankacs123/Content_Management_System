using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_Project.CMS_Models
{
    public class Job
    {
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int JobId { get; set; }

        public string JobRole { get; set; }
    }
}
