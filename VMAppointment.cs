using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
   public class VMAppointment
    {
        public int AppointmentId { get; set; }
        public System.DateTime AppDate { get; set; }
 
        public int DoctorId { get; set; }
        public string AppDateString { get; set; }
        public string CityName { get; set; }
       public string StateName { get; set; }
        public string HospitalName { get; set; }
        public string DocName { get; set; }
        public int CityId { get; set; }
        public int StateId { get; set; }
        public int HospitalId { get; set; }

    }
}
