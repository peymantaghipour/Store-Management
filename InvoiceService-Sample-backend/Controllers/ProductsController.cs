using DNTPersianUtils.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceService.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private static List<Product> _products =
    [
        new Product
        {
            Id = 1,
            ProductName = "خودکار",
            Price = 10000,
            Sku = "125090",
            StockQuantity = 20,
            PublishDate = new DateTime(2021, 11, 13),
            LocalPublishDate = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd"),
            CreateOn = DateTime.UtcNow,
            UpdateOn = DateTime.UtcNow,
            LocalCreateOn = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd"),
            LocalUpdateOn = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd"),
        },

        new Product
        {
            Id = 2, ProductName = "کتاب",
            Price = 62000,
            Sku = "995090",
            StockQuantity = 1,
            PublishDate = new DateTime(2021, 11, 13),
            LocalPublishDate = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd"),
            CreateOn = DateTime.UtcNow,
            UpdateOn = DateTime.UtcNow,
            LocalCreateOn = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd"),
            LocalUpdateOn = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd")
        }
    ];

    [HttpGet]
    [Authorize]
    public ActionResult<List<Product>> Get()
    {
        return _products;
    }

    [HttpGet("Search")]
    public ActionResult<List<Product>> Search(
        [FromQuery] string? ProductName,
        [FromQuery] int? FromPrice,
        [FromQuery] int? ToPrice,
        [FromQuery] string? Sku,
        [FromQuery] bool? IsAvailable,
        [FromQuery] string? FromPublishDate,
        [FromQuery] string? ToPublishDate,
        [FromQuery] int? CategoryId)
    {
        var query = _products.AsQueryable();

        if (!string.IsNullOrEmpty(ProductName))
        {
            query = query.Where(p => p.ProductName.Contains(ProductName));
        }

        if (FromPrice.HasValue)
        {
            query = query.Where(p => p.Price >= FromPrice.Value);
        }

        if (ToPrice.HasValue)
        {
            query = query.Where(p => p.Price <= ToPrice.Value);
        }

        if (!string.IsNullOrEmpty(Sku))
        {
            query = query.Where(p => p.Sku == Sku);
        }

        if (IsAvailable.HasValue)
        {
            query = query.Where(p => p.StockQuantity > 0 == IsAvailable.Value);
        }

        if (string.IsNullOrEmpty(FromPublishDate) == false)
        {
            var fromDate = FromPublishDate.ToGregorianDateTime();
            if (fromDate is not null)
            {
                query = query.Where(p => p.PublishDate >= fromDate);
            }
        }

        if (string.IsNullOrEmpty(ToPublishDate) == false)
        {
            var toDate = ToPublishDate.ToGregorianDateTime();

            if (toDate is not null)
            {
                query = query.Where(p => p.PublishDate <= toDate);
            }
        }

        if (CategoryId.HasValue)
        {
            query = query.Where(p => p.CategoryIds.Any(x => x == CategoryId.Value));
        }

        return query.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Product> Get(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return product;
    }

    [HttpPost]
    public ActionResult Post([FromBody] ProductInputDto product)
    {
        product.Id = _products.Max(p => p.Id) + 1;

        product.CreateOn = DateTime.UtcNow;
        product.UpdateOn = DateTime.UtcNow;
        product.LocalCreateOn = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd"); // Replace with actual logic to convert dates
        product.LocalUpdateOn = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd"); // Replace with actual logic to convert dates

        _products.Add(new Product()
        {
            Id = product.Id,
            ProductName = product.ProductName,
            Price = product.Price,
            Sku = product.Sku,
            StockQuantity = product.StockQuantity,
            PublishDate = product.PublishDate.ToGregorianDateTime() ?? DateTime.UtcNow,
            LocalPublishDate = product.PublishDate,
            CreateOn = product.CreateOn,
            UpdateOn = product.UpdateOn,
            LocalCreateOn = product.LocalCreateOn,
            LocalUpdateOn = product.LocalUpdateOn
        });
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }

    [HttpPut]
    public ActionResult Put([FromBody] ProductInputDto product)
    {
        var existingProduct = _products.FirstOrDefault(p => p.Id == product.Id);
        if (existingProduct == null)
        {
            return NotFound();
        }
        existingProduct.ProductName = product.ProductName;
        existingProduct.Price = product.Price;
        existingProduct.Sku = product.Sku;
        existingProduct.StockQuantity = product.StockQuantity;
        existingProduct.PublishDate = product.PublishDate.ToGregorianDateTime() ?? DateTime.UtcNow;
        existingProduct.LocalPublishDate = product.PublishDate;
        existingProduct.UpdateOn = DateTime.UtcNow;
        existingProduct.LocalUpdateOn = DateTime.UtcNow.ToPersianDateTimeString("yyyy/MM/dd"); // Replace with actual logic to convert dates
        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        _products.Remove(product);
        return NoContent();
    }

    [HttpPost("AddProductToPicture")]
    public ActionResult Post([FromBody] ProductPicture input)
    {
        var product = _products.FirstOrDefault(x => x.Id == input.ProductID);
        if (product == null)
        {
            return NotFound();
        }

        if (product.PictureIds.Any(x => x.PictureID == input.PictureID) == false)
        {
            product.PictureIds.Add(input);
        }

        return Ok();
    }

    [HttpGet("picture/{id}")]
    public ActionResult GetPic([FromRoute] int id)
    {
        return Ok(_products.FirstOrDefault(x => x.Id == id)?.PictureIds);
    }
}

public class Product
{
    public int Id { get; set; }
    public string? ProductName { get; set; }
    public decimal Price { get; set; }
    public string? Sku { get; set; }
    public int? StockQuantity { get; set; }
    public DateTime PublishDate { get; set; }
    public string? LocalPublishDate { get; set; }
    public DateTime CreateOn { get; set; }
    public DateTime UpdateOn { get; set; }
    public string? LocalCreateOn { get; set; }
    public string? LocalUpdateOn { get; set; }
    public List<int> CategoryIds { get; set; } = new();
    public List<string> CategoryNames { get; set; } = new();
    public List<ProductPicture> PictureIds { get; set; } = new();
}

public class ProductInputDto
{
    public int Id { get; set; }
    public string? ProductName { get; set; }
    public decimal Price { get; set; }
    public string? Sku { get; set; }
    public int? StockQuantity { get; set; }
    public string PublishDate { get; set; } = null!;
    public string? LocalPublishDate { get; set; }
    public DateTime CreateOn { get; set; }
    public DateTime UpdateOn { get; set; }
    public string? LocalCreateOn { get; set; }
    public string? LocalUpdateOn { get; set; }
    public List<int> CategoryIds { get; set; } = new();
    public List<string> CategoryNames { get; set; } = new();
}

public class ProductPicture
{
    public int ProductID { get; set; }
    public int PictureID { get; set; }
    public int DisplayOrder { get; set; }
}