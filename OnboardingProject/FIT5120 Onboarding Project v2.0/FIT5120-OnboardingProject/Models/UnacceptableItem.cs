using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5120_OnboardingProject.Models
{
    public class UnacceptableItem
    {
        public string UnacceptableItemID { get; set; }

        public string BinID { get; set; }
        public virtual Bin Bin { get; set; }
    }
}