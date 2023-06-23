using System.ComponentModel.DataAnnotations;

namespace CMS_Project.CMS_Models
{
    public class Categories
    {
        [Key]
       public int CategoryID { get; set; }

        public string CategoryName { get; set; }

       

        public Boolean IsApplicable { get; set; }
    }
}
