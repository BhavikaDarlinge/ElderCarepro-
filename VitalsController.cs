using BusinessRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ViewModel;

namespace Elder_Care_Project.Controllers
{
    public class VitalsController : Controller
    {
        // GET: Vitals
        Repository repository = new Repository();
       public ActionResult ManageVitals()
        {
            if (Session["mobile"] != null)
            {

                return View();
            }
            else
            {
                return Redirect("/LoginForm/ManageLogin");
            }
          
        }
        [HttpPost]
        public JsonResult InsertBloodpressure(VMBloodPressure vmbp)
        {
            bool Response = false;
            try
            {
                Response = repository.InsertBloodpressure(vmbp);
            }
            catch (Exception ex)
            {

                Response = false;
            }
            return Json(Response);
        }
        [HttpPost]
        public JsonResult InsertPulseRate(VMPulseRate vmpulse)
        {
            bool Response = false;
            try
            {
                Response = repository.InsertPulseRate(vmpulse);
            }
            catch (Exception ex)
            {

                Response = false;
            }
            return Json(Response);
        }
        [HttpPost]
        public JsonResult InsertBloodSugar(VMBloodsugar vmsugar)
        {
            bool Response = false;
            try
            {
                Response = repository.InsertBloodSugar(vmsugar);
            }
            catch (Exception ex)
            {

                Response = false;
            }
            return Json(Response);
        }
        [HttpPost]
        public JsonResult InsertBodyTemperture(VMTemperture vmtemp)
        {
            bool Response = false;
            try
            {
                Response = repository.InsertBodyTemperture(vmtemp);
            }
            catch (Exception ex)
            {

                Response = false;
            }
            return Json(Response);
        }
        public JsonResult RendeAlldropdown()
        {
            VMCommonDropdown vmall = new VMCommonDropdown();
            try
            {
                vmall = repository.RenderAlldropdown();
            }
            catch (Exception ex)
            {

                vmall = new VMCommonDropdown();
            }

            return Json(vmall);
        }
    }
}