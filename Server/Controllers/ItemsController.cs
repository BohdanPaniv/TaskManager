using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetItems()
        {
            var items = new[]
            {
                new { Id = 1, Name = "Item 1" },
                new { Id = 2, Name = "Item 2" },
                new { Id = 3, Name = "Item 3" },
            };
            return Ok(items);
        }
    }
}