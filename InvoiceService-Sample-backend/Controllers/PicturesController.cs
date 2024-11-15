using Microsoft.AspNetCore.Mvc;

namespace InvoiceService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PicturesController : ControllerBase
    {
        private static List<Picture> _pictures = new();
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PicturesController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        [DisableRequestSizeLimit, RequestFormLimits(MultipartBodyLengthLimit = int.MaxValue, ValueLengthLimit = int.MaxValue)]
        public async Task<IActionResult> UploadFile(
            IFormFile formFile,
            [FromQuery] string? ContentType,
            [FromQuery] string? fileExtension)
        {
            var file = formFile;

            if (file.Length <= 0)
            {
                return BadRequest("File is empty.");
            }

            string finalFileExtension = string.IsNullOrWhiteSpace(fileExtension)
                ? Path.GetExtension(file.FileName)
                : fileExtension;

            var fileName = $"{Guid.NewGuid()}{finalFileExtension}";

            var folderPath = Path.Combine(_webHostEnvironment.ContentRootPath, "ProductPictures");

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var filePath = Path.Combine(folderPath, fileName);

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var picture = new Picture
            {
                Id = _pictures.Select(x => x.Id).DefaultIfEmpty(0).Max() + 1,
                Path = filePath
            };

            _pictures.Add(picture);

            return Ok(picture.Id);
        }

        [HttpPost("Base64")]
        public async Task<IActionResult> UploadBase64File(
            [FromBody] string base64File,
            [FromQuery] string? ContentType,
            [FromQuery] string? fileExtension)
        {
            if (string.IsNullOrWhiteSpace(base64File))
            {
                return BadRequest("Base64 string is empty.");
            }

            // Decode the base64 string to a byte array
            byte[] fileBytes;
            try
            {
                fileBytes = Convert.FromBase64String(base64File);
            }
            catch (FormatException)
            {
                return BadRequest("Invalid Base64 string.");
            }

            // Determine the file extension if not provided
            string finalFileExtension = string.IsNullOrWhiteSpace(fileExtension) ? ".jpg" : fileExtension;

            // Generate a unique file name
            var fileName = $"{Guid.NewGuid()}{finalFileExtension}";

            // Define the directory path for saving the file
            var folderPath = Path.Combine(_webHostEnvironment.ContentRootPath, "ProductPictures");

            // Ensure the directory exists
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Combine the directory path with the filename
            var filePath = Path.Combine(folderPath, fileName);

            // Save the byte array to a file
            await System.IO.File.WriteAllBytesAsync(filePath, fileBytes);

            // Add the new picture to the list with a unique Id
            var picture = new Picture
            {
                Id = _pictures.Select(x => x.Id).DefaultIfEmpty(0).Max() + 1,
                Path = filePath
            };

            _pictures.Add(picture);

            // Return the Id of the newly added picture
            return Ok(picture.Id);
        }

        [HttpGet("{id}")]
        public IActionResult GetPictureById(int id)
        {
            var picture = _pictures.FirstOrDefault(p => p.Id == id);

            if (picture == null)
            {
                return NotFound($"Picture with Id {id} not found.");
            }

            return Ok(picture);
        }
    }
}

public class Picture
{
    public int Id { get; set; }
    public string Path { get; set; } = null!;
}