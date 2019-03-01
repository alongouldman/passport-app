using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace WebApplication4.Controllers
{

  public class UploadPhotoController : Controller
  {
    private readonly IHostingEnvironment he;
    public UploadPhotoController(IHostingEnvironment e)
    {
      he = e;
    }

    // get all the files from the folder
    public string[] getFiles()
    {
      string[] contents = Directory.GetFiles("wwwroot/costumerPhotos");
      return contents;
    }

    // uploads an image to the server
    public IActionResult Upload(string costumerName, string file)
    {
        if (file != null)
        {

            var rootPath = he.WebRootPath;
            rootPath += "/costumerPhotos";
            var date_today = DateTime.Now.ToString("dd-MM-yyyy");
            string fileName = date_today + " " + costumerName + ".jpg";

            string[] otherfiles = getFiles();
            var fileExists = true;
            while (fileExists)
            {
                for (int i = 0; i < otherfiles.Length; i++)
                {
                    if (fileName == Path.GetFileName(otherfiles[i]))
                    {
                        fileName = Path.GetFileNameWithoutExtension(fileName) + "-(1).jpg";
                        i = 0; //search from the begginning
                    }
                }
                // no such file found
                fileExists = false;
            }

            var fullFileName = Path.Combine(rootPath, fileName);


            var bytes = Convert.FromBase64String(file);
            using (var imageFile = new FileStream(fullFileName, FileMode.Create))
            {
               imageFile.Write(bytes, 0, bytes.Length);
               imageFile.Flush();
            }

        }
        return Ok();
    }


    public IActionResult Index()
    {
      return View();
    }

  }
}
