using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class VMBloodsugar
    {
        public int SugarId { get; set; }
        public System.DateTime SugarDate { get; set; }
        public System.TimeSpan Sugartime { get; set; }
        public int SugarConcen { get; set; }
        public int MeasuredId { get; set; }
    }
}
