using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5120_OnboardingProject.Models
{
    public class Bin
    {
        public string BinID { get; set; }
        public string bin_color { get; set; }
        public double avg_monthly_collected { get; set; }

        public virtual ICollection<UnacceptableItem> unacceptableItems { get; set; }
        public virtual ICollection<AcceptableItem> acceptableItems { get; set; }
    }
}