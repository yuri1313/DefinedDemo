using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace ImageUploader.Helpers
{
    public static class ImageHelper
    {
        private const int DefaultQuality = 50;
        private const int ThumbnailWidth = 150;

        public static Dictionary<string, string> AcceptedMimeTypes => new Dictionary<string, string>
        {
            { "image/jpeg", "jpg" },
            { "image/gif", "gif" },
            { "image/png", "png" }
        };

        public static void GetCompressedImages(
            Stream originalImageStream, 
            string originalImageMimeType, 
            string imageFilePath, 
            string thumbnailFilePath)
        {
            using (var image = new Bitmap(Image.FromStream(originalImageStream)))
            {
                // Image
                var width = (int)Math.Round(image.Width / 2.0);
                var height = (int)Math.Round(image.Height / 2.0);
                ResizeImage(image, originalImageMimeType, imageFilePath, width, height);

                // Thumbnail
                width = Math.Min(ThumbnailWidth, image.Width);
                var ratio = width / (double)image.Width;
                height = (int)Math.Round(image.Height * ratio);
                ResizeImage(image, originalImageMimeType, thumbnailFilePath, width, height);
            }
        }

        private static void ResizeImage(
            Image image, 
            string originalImageMimeType, 
            string outImageFilePath, 
            int width, 
            int height)
        {
            var resized = new Bitmap(width, height);
            using (var graphics = Graphics.FromImage(resized))
            {
                graphics.CompositingQuality = CompositingQuality.HighSpeed;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.DrawImage(image, 0, 0, width, height);
                using (var output = File.Open(outImageFilePath, FileMode.Create))
                {
                    var qualityParamId = Encoder.Quality;
                    var encoderParameters = new EncoderParameters(1)
                    {
                        Param = { [0] = new EncoderParameter(qualityParamId, DefaultQuality) }
                    };

                    ImageFormat format;

                    switch (originalImageMimeType)
                    {
                        case "jpg":
                            format = ImageFormat.Jpeg;
                            break;
                        case "png":
                            format = ImageFormat.Gif;
                            break;
                        case "gif":
                            format = ImageFormat.Png;
                            break;
                        default:
                            throw new ArgumentException($"Unsupported mime type: \"{originalImageMimeType}\"");
                    }

                    var codec = ImageCodecInfo.GetImageDecoders()
                        .FirstOrDefault(c => c.FormatID == format.Guid);
                    resized.Save(output, codec, encoderParameters);
                }
            }
        }

        public static ImageFileResult GetFile(string directoryPath, string fileBasePath)
        {
            var files = Directory.EnumerateFiles(directoryPath, $"{fileBasePath}.*").ToList();

            if (files.Count == 0)
            {
                throw new ArgumentException($"File {fileBasePath} not found!");
            }

            var file = files.First();

            var fileData = File.ReadAllBytes(file);
            var fileInfo = new FileInfo(file);
            var ext = fileInfo.Extension.Substring(1);
            var mime = AcceptedMimeTypes.FirstOrDefault(t => t.Value == ext);

            if (string.IsNullOrEmpty(mime.Key))
            {
                throw new ArgumentException("File is of unsupported mime type!");
            }

            return new ImageFileResult
            {
                ImageData = fileData,
                ImageMimeType = mime.Key
            };
        }
    }
}
