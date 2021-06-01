using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
   public class VMBloodPressure
    {
        public int BpId { get; set; }
        public System.DateTime BpDate { get; set; }
        public System.TimeSpan Bptime { get; set; }
        public int Systolic_Pressure { get; set; }
        public int Diastolic_Pressure { get; set; }
        public int ChooseSideId { get; set; }
        public int PositionId { get; set; }
    }
}
