using BusinessRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ViewModel;

namespace Elder_Care_Project.Controllers
{
    public class LoginFormController : Controller
    {
        // GET: LoginForm
       public ActionResult ManageLogin()
        {
            return View();
        }
        Repository respository = new Repository();
        public ActionResult LoginUser(VMPersonalDetails vmpersonal)
        {
            bool CheckLogin = false;
            try
            {
                CheckLogin = respository.LoginUser(vmpersonal);              
                Session["mobile"] = vmpersonal.Mobile.ToString();
               
            }
            catch (Exception ex)
            {
                CheckLogin = false;
            }
            return Json(CheckLogin, JsonRequestBehavior.AllowGet);
        }
    }
}