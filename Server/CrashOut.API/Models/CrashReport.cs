using System.Text.Json.Serialization;

namespace CrashOut.API.Models
{
    public class CrashReport
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;

        public DateTime DateTime { get; set; } = DateTime.UtcNow;

        public int Severity { get; set; }

        public string? ImageUrl { get; set; }

        // Foreign Key
        public int UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}