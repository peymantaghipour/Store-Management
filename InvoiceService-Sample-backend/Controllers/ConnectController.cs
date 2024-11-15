using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InvoiceService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectController : ControllerBase
    {
        [HttpPost("token")]
        public ActionResult<TokenDto> Token([FromBody] TokenInputDto input)
        {
            if (input.username != "p" || input.password != "p")
            {
                return BadRequest("invalid username or password");
            }

            return GenerateTokens(Guid.NewGuid(), new List<string>() { "admin", "user" });
        }

        private TokenDto GenerateTokens(Guid id, List<string>? roles)
        {
            SymmetricSecurityKey authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JYa65i0tITZnnjnAJYa65i0tITZnnjnA"));

            List<Claim> subjectItems = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, id.ToString()),
            };
            if (roles is { Count: > 0 })
            {
                foreach (var role in roles)
                {
                    subjectItems.Add(new Claim(ClaimTypes.Role, role));
                }
            }

            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                Issuer = "https://localhost",
                Audience = "https://localhost",
                IssuedAt = DateTime.UtcNow,
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(2),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(subjectItems)
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = tokenHandler.CreateToken(descriptor);
            string encryptedJwt = tokenHandler.WriteToken(securityToken);
            string refreshToken = "nadare";
            return new TokenDto
            {
                access_token = encryptedJwt,
                expires_in = 2,
                refresh_token = refreshToken,
                scope = "app peyman",
            };
        }
    }

    public class TokenInputDto
    {
        public string? client_id { get; set; }
        public string? garent_type { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string? scopes { get; set; }
        public string? client_secret { get; set; }
    }

    public class TokenDto
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string token_type { get; set; } = "Bearer";
        public string refresh_token { get; set; }
        public string scope { get; set; }
    }
}