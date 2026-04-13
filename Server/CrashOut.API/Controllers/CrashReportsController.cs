using CrashOut.API.Data;
using CrashOut.API.Models;
using CrashOut.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CrashOut.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CrashReportsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CrashReportsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: only MY crashes
        [HttpGet]
        public async Task<ActionResult<List<CrashReportDto>>> GetCrashReports()
        {
            var userId = GetUserId();

            var reports = await _context.CrashReports
                .Where(r => r.UserId == userId)
                .Select(r => new CrashReportDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Description = r.Description,
                    Location = r.Location,
                    ImageUrl = r.ImageUrl,
                    // UserId = r.UserId
                })
                .ToListAsync();

            return Ok(reports);
        }

        // GET by id (must belong to user)
        [HttpGet("{id}")]
        public async Task<ActionResult<CrashReportDto>> GetCrashReport(int id)
        {
            var userId = GetUserId();

            var report = await _context.CrashReports
                .FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);

            if (report == null)
                return NotFound();

            return Ok(new CrashReportDto
            {
                Id = report.Id,
                Title = report.Title,
                Description = report.Description,
                Location = report.Location,
                ImageUrl = report.ImageUrl,
                // UserId = report.UserId
            });
        }

        // CREATE (secure ownership)
        [HttpPost]
        public async Task<ActionResult<CrashReportDto>> CreateCrashReport(CrashReportDto dto)
        {
            var userId = GetUserId();

            var report = new CrashReport
            {
                Title = dto.Title,
                Description = dto.Description,
                Location = dto.Location,
                ImageUrl = dto.ImageUrl,
                UserId = userId
            };

            _context.CrashReports.Add(report);
            await _context.SaveChangesAsync();

            return Ok(new CrashReportDto
            {
                Id = report.Id,
                Title = report.Title,
                Description = report.Description,
                Location = report.Location,
                ImageUrl = report.ImageUrl,
                // UserId = report.UserId
            });
        }

        // UPDATE (must belong to user)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCrashReport(int id, CrashReportDto dto)
        {
            var userId = GetUserId();

            var report = await _context.CrashReports
                .FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);

            if (report == null)
                return NotFound();

            report.Title = dto.Title;
            report.Description = dto.Description;
            report.Location = dto.Location;
            report.ImageUrl = dto.ImageUrl;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE (must belong to user)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCrashReport(int id)
        {
            var userId = GetUserId();

            var report = await _context.CrashReports
                .FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);

            if (report == null)
                return NotFound();

            _context.CrashReports.Remove(report);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private int GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(claim))
                throw new Exception("Unauthorized"); // or return 401 via middleware

            return int.Parse(claim);
        }
    }
}