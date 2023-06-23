using System.ComponentModel.DataAnnotations;

namespace CMS_Project.CMS_Models
{
    public class FormResponses
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        
    }
}
