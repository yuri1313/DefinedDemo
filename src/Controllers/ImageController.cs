using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ImageUploader.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace ImageUploader.Controllers
{
    [Route("api/[controller]")]
    public class ImageController : Controller
    {
        [HttpPost("[action]")]
        public async Task<IActionResult> FileUpload()
        {
            try
            {
                var formData = await this.Request.ReadFormAsync();

                if (formData.Files.Count == 0)
                {
                    return BadRequest(new ImageUploadResult
                    {
                        UploadErrorMessage = "No files found in payload",
                        UploadSuccessful = false
                    });
                }

                var fileToUse = formData.Files.First();
                
                if (!ImageHelper.AcceptedMimeTypes.Keys.Contains(fileToUse.ContentType))
                {
                    var expectedTypes = string.Join(", ", ImageHelper.AcceptedMimeTypes.Values);

                    return BadRequest(new ImageUploadResult
                    {
                        UploadErrorMessage =
                            $"Unsupported mime type \"{fileToUse.ContentType}\". Expecting {expectedTypes}",
                        UploadSuccessful = false
                    });
                }

                var tempPath = Path.Combine(Path.GetTempPath(), "imageUploader");
                if (!Directory.Exists(tempPath))
                {
                    Directory.CreateDirectory(tempPath);
                }
                
                var ext = fileToUse.ContentType.Split(new[] {"/"}, StringSplitOptions.None).Last();
                var fileId = Guid.NewGuid();
                var imgFileName = $"{fileId}.{ext}";
                var imgTnFileName = $"{fileId}_tn.{ext}";

                ImageHelper.GetCompressedImages(
                    fileToUse.OpenReadStream(),
                    ImageHelper.AcceptedMimeTypes[fileToUse.ContentType],
                    Path.Combine(tempPath, imgFileName),
                    Path.Combine(tempPath, imgTnFileName));

                return Ok(new ImageUploadResult
                {
                    UploadSuccessful = true,
                    ImageId = fileId,
                    UploadTimestamp = DateTime.UtcNow.ToString("s")
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ImageUploadResult
                {
                    UploadErrorMessage = ex.Message,
                    UploadSuccessful = false
                });
            }
        }

        [HttpGet("{fileId}")]
        public async Task<FileContentResult> Download(Guid fileId)
        {
            var imgFileName = $"{fileId}";
            throw new NotImplementedException();
        }

        [HttpGet("{fileId}/Thumbnail")]
        public async Task<FileContentResult> DownloadThumbnail(Guid fileId)
        {
            var imgTnFileName = $"{fileId}_tn";
            throw new NotImplementedException();
        }

        public class ImageUploadResult
        {
            public string UploadTimestamp { get; set; }
            public Guid ImageId { get; set; }
            public bool UploadSuccessful { get; set; }
            public string UploadErrorMessage { get; set; }
        }
    }
}

