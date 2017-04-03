using System;

namespace ImageUploader.Models.api
{
    public class ImageUploadResult
    {
        public string UploadTimestamp { get; set; }
        public Guid ImageId { get; set; }
        public bool UploadSuccessful { get; set; }
        public string UploadErrorMessage { get; set; }
    }
}
