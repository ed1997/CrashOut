using CrashOut.API.Data;
using CrashOut.API.Models;
using CrashOut.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace CrashOut.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // GET ALL USERS (ADMIN ONLY)
        // =========================
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email
                })
                .ToListAsync();

            return Ok(users);
        }

        // =========================
        // GET USER BY ID
        // =========================
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // =========================
        // GET CURRENT LOGGED-IN USER
        // =========================
        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> GetMe()
        {
            var userId = int.Parse(User.FindFirst("id").Value);

            var user = await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    Email = u.Email
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound();

            return Ok(user);
        }
    }
}