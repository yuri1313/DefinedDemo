using System;
using Microsoft.AspNetCore.Mvc;

namespace ImageUploader.Controllers
{
    [Route("api/[controller]")]
    public class UploadAPIController : Controller
    {
        [HttpPost("[action]")]
        public ImageUploadResult Uploader()
        {
            // TODO: finishme
            return new ImageUploadResult();
        }

        public class ImageUploadResult
        {
            public string UploadTimestamp { get; set; }
            public Guid ImageId { get; set; }
        }
    }
}
