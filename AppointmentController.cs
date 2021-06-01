using BusinessRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ViewModel;

namespace Elder_Care_Project.Controllers
{
    public class AppointmentController : Controller
    {
        // GET: Appointment

        Repository repository = new Repository();
        public ActionResult ManageAppointment()
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

            public JsonResult InsertAppointment(VMAppointment vmappointment)
            {
                bool response;
                try
                {
                    response = repository.InsertAppointment(vmappointment);

                }
                catch (Exception ex)
                {

                    response = false;
                }
                return Json(response);
            }
        [HttpPost]
        public JsonResult ShowAppointment()
        {
            List<VMAppointment> vmapp = new List<VMAppointment>();
            try
            {
                vmapp = repository.ShowAppointment();

            }
            catch (Exception ex)
            {
                vmapp = new List<VMAppointment>();
            }

            return Json(vmapp);
        }

        public JsonResult GetState()
            {

                List<VMState> vmstate = new List<VMState>();
                try
                {
                    vmstate = repository.GetStates();
                }
                catch (Exception)
                {

                    vmstate = new List<VMState>();
                }

                return Json(vmstate);
            }

            public JsonResult GetCity(int StateId)
            {

                List<VMCity> vmcity = new List<VMCity>();
                try
                {
                    vmcity = repository.GetCity(StateId);
                }
                catch (Exception ex)
                {

                    vmcity = new List<VMCity>();
                }

                return Json(vmcity);
            }
            public JsonResult GetHospital(int CityId,int stateId)
            {

                List<VMHospital> vmhosp = new List<VMHospital>();
                try
                {
                    vmhosp = repository.GetHospital(CityId,stateId);
                }
                catch (Exception)
                {

                    vmhosp = new List<VMHospital>();
                }

                return Json(vmhosp);
            }
            public JsonResult GetDoctor(int HospId,int CityId)
            {

                List<VMDoctorTable> vmdoc = new List<VMDoctorTable>();
                try
                {
                    vmdoc = repository.GetDoctor(HospId,CityId);
                }
                catch (Exception)
                {

                    vmdoc = new List<VMDoctorTable>();
                }

                return Json(vmdoc);
            }

        }
    }

