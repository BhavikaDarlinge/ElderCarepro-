using DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ViewModel;

namespace BusinessRepository
{
   public class Repository
    {
        ElderCareProEntities db = new ElderCareProEntities();
        #region Personal Details
        public bool InsertPersonalDetails(VMPersonalDetails vmpersonal)
        {
            bool Response = false;
            PersonalDetail personal = new PersonalDetail();
            try
            {

                personal.FirstName = vmpersonal.FirstName;
                personal.LastName = vmpersonal.LastName;
                personal.Passwd = vmpersonal.Passwd;
                personal.DateOfBirth = vmpersonal.DateOfBirth;
                personal.GenderId = vmpersonal.GenderId;
                personal.Mobile = vmpersonal.Mobile;
                personal.Email = vmpersonal.Email;

                db.PersonalDetails.Add(personal);
                db.SaveChanges();
                Response = true;
            }
            catch (Exception ex)
            {
                Response = false;
            }
            return Response;
        }
        public List<VMGender> GetGender()
        {
            List<VMGender> vmgender = new List<VMGender>();
            vmgender = (from g in db.Genders
                        select new VMGender
                        {
                            GenderId = g.GenderId,
                            GenderName = g.GenderName
                        }).ToList();
            return vmgender;
        }
        public bool CheckEmailId(string Email)
        {
            bool Response = false;
            try
            {
                PersonalDetail personal = new PersonalDetail();
                personal = db.PersonalDetails.Where(x => x.Email == Email).FirstOrDefault();
                Response = true;
            }
            catch (Exception ex)
            {
                Response = false;
            }
            return Response;

        }

        #endregion
        #region LoginForm
        public bool LoginUser(VMPersonalDetails vmpersonal)
        {
            bool CheckLogin = false;
            try
            {
                PersonalDetail personal = new PersonalDetail();
               var checkuser = db.PersonalDetails.Where(x => x.Mobile == vmpersonal.Mobile && x.Passwd == vmpersonal.Passwd).SingleOrDefault();
                if(checkuser !=null)
                {
                    
                    CheckLogin = true;
                }
            } 
            catch (Exception ex)
            {
                CheckLogin = false;
            }
            return CheckLogin;
        }
        #endregion
        #region Appointment
        
        public List<VMState> GetStates()
        {
            List<VMState> vmstate = (from s in db.StateMasters
                                           select new VMState
                                           {
                                               StateId = s.StateId,
                                               StateName = s.StateName,
                                           }).ToList();

            return vmstate;
        }
       
        public List<VMCity> GetCity(int StateId)
        {
            List<VMCity> vmcity = (from s in db.CityMasters
                                   select new VMCity
                                   {
                                       CityId = s.CityId,
                                       CityName = s.CityName,
                                       StateId=s.StateId
                                   }).Where(x => x.StateId == StateId).ToList();

            return vmcity;
        }
        public List<VMHospital> GetHospital(int CityId, int StateId)
        {
            List<VMHospital> vmhosp = (from s in db.Hospitals
                                       select new VMHospital
                                       {
                                           HosId = s.HosId,
                                           HospName = s.HospName,
                                           CityId=s.CityId,
                                           StateId=s.StateId,
                                       }).Where(x => x.CityId == CityId && x.StateId == StateId).ToList();

            return vmhosp;
        }
             public List<VMDoctorTable> GetDoctor(int hosId,int CityId)
        {
            List<VMDoctorTable> vmdoctor = (from s in db.DoctorTables
                                     select new VMDoctorTable
                                     {
                                         DoctorId = s.DoctorId,
                                         DoctorName = s.DoctorName,
                                         DoctorTime=s.DoctorTime,
                                         HosId=s.HosId,
                                         CityId=s.CityId
                                     }).Where(x=>x.HosId==hosId && x.CityId==CityId).ToList();

            return vmdoctor;
        }

        public bool InsertAppointment(VMAppointment vmappointment)
        {
            bool response = false;
            try
            {
                Appointment app = new Appointment();
                app.AppointmentId = vmappointment.AppointmentId;
                app.DoctorId = vmappointment.DoctorId;
                app.AppDate = vmappointment.AppDate;
                db.Appointments.Add(app);            
                db.SaveChanges();              
                response = true;
            }
            catch (Exception)
            {

                response = false;
            }
            return response;

        }
        public List<VMAppointment> ShowAppointment()
        {
            List<VMAppointment> vmapp = new List<VMAppointment>();

            vmapp = (from T in db.Appointments
                     join g in db.DoctorTables
                     on T.DoctorId equals g.DoctorId
                     join c in db.CityMasters
                    on g.CityId equals c.CityId
                     join h in db.Hospitals
                    on g.HosId equals h.HosId
                     join S in db.StateMasters
                   on h.StateId equals S.StateId
                     select new VMAppointment
                     {
                         AppointmentId = T.AppointmentId,
                         AppDate=T.AppDate,
                         StateId=h.StateId,
                         StateName=S.StateName,
                         CityId=g.CityId,
                         CityName=c.CityName,
                         HospitalId=h.HosId,
                         HospitalName=h.HospName,
                         DoctorId=g.DoctorId,
                         DocName=g.DoctorName,
                              
                               }).ToList();

            vmapp.ForEach(x => x.AppDateString = x.AppDate.ToString("dd/MM/yyyy"));


            return vmapp;
        }
        #endregion
        #region Vitals
        public VMCommonDropdown RenderAlldropdown()
        {

            List<VMChooseSide> vmside = (from C in db.ChooseSides
                                             select new VMChooseSide
                                             {
                                                 ChooseSideId = C.ChooseSideId,
                                                 ChooseSideName = C.ChooseSideName

                                             }).ToList();

            List<VMPosition> positon = (from G in db.Positions
                                                 select new VMPosition
                                                 {
                                                     PositionId = G.PositionId,
                                                     PositionName = G.PositionName

                                                 }).ToList();
            List<VMMeasured> measure = (from m in db.Measureds
                                        select new VMMeasured
                                        {
                                            MeasuredId = m.MeasuredId,
                                            MeasuredName = m.MeasuredName

                                        }).ToList();
            VMCommonDropdown vm = new VMCommonDropdown();
            vm.vmchoseside = vmside;
            vm.vmpositon = positon;
            vm.vmmeasured = measure;
            return vm;
        }

       public bool InsertBloodpressure(VMBloodPressure vmbp)
        {
            bool response = false;
            try
            {
                BloodPressure bp = new BloodPressure();
                bp.BpId = vmbp.BpId;
                bp.BpDate = vmbp.BpDate;
                bp.Systolic_Pressure = vmbp.Systolic_Pressure;
                bp.Diastolic_Pressure = vmbp.Diastolic_Pressure;
                bp.ChooseSideId = vmbp.ChooseSideId;
                bp.PositionId = vmbp.PositionId;
                db.BloodPressures.Add(bp);
                db.SaveChanges();
                response = true;
            }
            catch (Exception ex)
            {

                response = false;
            }
            return response;

        }
        public bool InsertPulseRate(VMPulseRate vmpulse)
        {
            bool response = false;
            try
            {
                PluseRate pulse = new PluseRate();
                pulse.PluseRateId = vmpulse.PluseRateId;
                pulse.PluseRateDate = vmpulse.PluseRateDate;
                pulse.PluseRateMeasure = vmpulse.PluseRateMeasure;
                db.PluseRates.Add(pulse);
                db.SaveChanges();
                response = true;
            }
            catch (Exception)
            {

                response = false;
            }
            return response;

        }
        public bool InsertBloodSugar(VMBloodsugar vmsugar)
        {
            bool response = false;
            try
            {
                BloodSugar sugar = new BloodSugar();
                sugar.SugarId = vmsugar.SugarId;
                sugar.SugarDate = vmsugar.SugarDate;
                sugar.SugarConcen = vmsugar.SugarConcen;
                sugar.MeasuredId = vmsugar.MeasuredId;
                db.BloodSugars.Add(sugar);
                db.SaveChanges();
                response = true;
            }
            catch (Exception)
            {

                response = false;
            }
            return response;

        }
        public bool InsertBodyTemperture(VMTemperture vmtemp)
        {
            bool response = false;
            try
            {
                Temperature temp = new Temperature();
                temp.TempId = vmtemp.TempId;
                temp.TempMeasure = vmtemp.TempMeasure;
                temp.TempDate = vmtemp.TempDate;
                db.Temperatures.Add(temp);
                db.SaveChanges();
                response = true;
            }
            catch (Exception)
            {

                response = false;
            }
            return response;

        }
        #endregion

    }
}
