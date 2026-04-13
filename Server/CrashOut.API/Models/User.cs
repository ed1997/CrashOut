using System.Text.Json.Serialization;

namespace CrashOut.API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public string Role { get; set; } = "User";

        [JsonIgnore]
        public List<CrashReport> CrashReports { get; set; } = new();
    }
}