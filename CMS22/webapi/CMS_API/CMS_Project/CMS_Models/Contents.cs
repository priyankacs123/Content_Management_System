using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CMS_Project.CMS_Models
{
    public class Contents
    {
        [Key]
        public int ContentID { get; set; }

        [NotNull]
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        [NotNull]
        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }

        [NotNull]
        [Required(ErrorMessage = "FileType is required")]
        public string FileType { get; set; }

        [NotNull]
        [Required(ErrorMessage = "FileURL is required")]
        public string FileURL { get; set; }

        public DateTime RetentionPeriod { get; set; }

        [Required(ErrorMessage = "CategoryID is required")]
        [ForeignKey("Category")]
        public int CategoryID { get; set; }

      
        [ForeignKey("User")]
        public int UserID { get; set; }

        [NotMapped]
        public object Category { get; set; }
    }
}




    

