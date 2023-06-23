using System.ComponentModel.DataAnnotations;

namespace CMS_Project.CMS_Models
{
    public class Permission
    {
        [Key]
        public int PermissionID { get; set; }

        [Required(ErrorMessage = "UserID is required")]
        public int UserID { get; set; }

        [Required(ErrorMessage = "ContentID is required")]
        public int ContentID { get; set; }

        public bool CanEdit { get; set; }

        public bool CanUpdate { get; set; }
    }
}
