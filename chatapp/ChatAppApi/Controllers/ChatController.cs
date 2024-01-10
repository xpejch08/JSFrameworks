using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

public class ChatMessage
{
    public string Text { get; set; } = string.Empty;
}


namespace ChatAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        // This could be a database or any other type of storage in a real app
        private static readonly List<string> Messages = new List<string>();


        // GET: api/chat
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetMessages()
        {
            return Messages;
        }

        // POST: api/chat
        [HttpPost]
        public IActionResult PostMessage([FromBody] ChatMessage message)
        {
            Messages.Add(message.Text);
            // In a real app, you'd want to persist this message to a database
            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteMessages()
        {
            Messages.Clear();
            return Ok();
        }
    }
}
