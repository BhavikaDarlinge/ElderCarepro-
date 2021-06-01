using BusinessRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ViewModel;

namespace Elder_Care_Project.Controllers
{
    public class PersonalDetailsController : Controller
    {
        // GET: PersonalDetails
        Repository respository = new Repository();
        public ActionResult ManagePersonalDetails()
        {
            return View();
        }
      [HttpPost]
       public JsonResult InsertPersonalDetails(VMPersonalDetails vmpersonal)
        {
            bool Response = false;
            try
            {
                Response = respository.InsertPersonalDetails(vmpersonal);
            }
            catch (Exception ex)
            {

                Response = false;
            }
            return Json(Response);
        }
        public JsonResult ChechkEmailId(string Email)
        {
            bool Response = false;
            try
            {
                Response = respository.CheckEmailId(Email);
            }
            catch (Exception ex)
            {

                Response = false;
            }
            return Json(Response);
        }
        public JsonResult GetGender()
         {
            List<VMGender> vmgender = new List<VMGender>();
            try
            {
                vmgender = respository.GetGender();
            }
            catch (Exception  ex)
            {
                vmgender = new List<VMGender>();
                
            }
            return Json(vmgender);
        }

    }
}