using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5120_OnboardingProject.Models
{
    public class WasteCollection
    {
        public int ID { get; set; }
        public string bin_type { get; set; }
        public string postcode { get; set; }
        public string collection_time { get; set; }
    }
}