using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
   public class VMTemperture
    {
        public int TempId { get; set; }
        public System.DateTime TempDate { get; set; }
        public System.TimeSpan Temptime { get; set; }
        public int TempMeasure { get; set; }
    }
}
