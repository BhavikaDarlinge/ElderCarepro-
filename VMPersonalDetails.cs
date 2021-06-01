using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
   public class VMPersonalDetails
    {
        public int personalId { get; set; }
        public string Passwd { get; set; }
        public string Mobile { get; set; }
        public System.DateTime DateOfBirth { get; set; }
        public int GenderId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
