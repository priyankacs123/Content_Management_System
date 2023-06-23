using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Numerics;

namespace CMS_Project.CMS_Models
{ 
   public class Users
    {
        [Key]
        public int UserID { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        public string Phonenumber { get; set; }

        [Required(ErrorMessage = "Job ID is required")]
        [ForeignKey("Job")]
        public int JobID { get; set; }
        [NotMapped]
        public string JobRole { get; set; }

    }
}





