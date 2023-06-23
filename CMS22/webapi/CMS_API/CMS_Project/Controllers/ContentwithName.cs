namespace CMS_Project.Controllers
{
    internal class ContentwithName
    {
        public int ContentID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileType { get; set; }
        public string FileURL { get; set; }
        public DateTime RetentionPeriod { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
    }
}