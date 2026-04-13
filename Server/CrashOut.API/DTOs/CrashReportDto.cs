namespace CrashOut.API.DTOs
{
    public class CrashReportDto
    {
        public int Id { get; set; }
        public required string Title { get; set; } = string.Empty;
        public required string Description { get; set; } = string.Empty;
        public required string Location { get; set; } = string.Empty;
        public string ImageUrl { get; set; }
    }
}