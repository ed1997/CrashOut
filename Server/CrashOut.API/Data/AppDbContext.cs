using Microsoft.EntityFrameworkCore;
using CrashOut.API.Models;

namespace CrashOut.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User>? Users { get; set; }
        public DbSet<CrashReport>? CrashReports { get; set; }
    }
}