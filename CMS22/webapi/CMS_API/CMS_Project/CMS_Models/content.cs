using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_Project.CMS_Models
{
    public class content
    {
        [Key]
        public int ContentID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileURL { get; set; }
        public DateTime RetentionPeriod { get; set; }

        public int CategoryID { get; set; }
        public string CategoryName { get; set; }

    }
}
