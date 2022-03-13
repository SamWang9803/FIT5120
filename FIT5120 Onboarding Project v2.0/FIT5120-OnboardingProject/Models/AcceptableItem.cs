using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5120_OnboardingProject.Models
{
    public class AcceptableItem
    {
        public string AcceptableItemID { get; set; }

        public string BinID { get; set; }
        public virtual Bin Bin { get; set; }
    }
}