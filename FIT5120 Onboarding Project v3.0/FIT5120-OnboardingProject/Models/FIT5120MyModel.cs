using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FIT5120_OnboardingProject.Models
{
    public class FIT5120MyModel : DbContext
    {
        public FIT5120MyModel()
            : base("name=FIT5120MyModel")
        {
        }

        public virtual DbSet<Bin> binSet { get; set; }
        public virtual DbSet<UnacceptableItem> unacceptablesSet { get; set; }
        public virtual DbSet<AcceptableItem> acceptablesSet { get; set; }
        public virtual DbSet<WasteCollection> wasteCollectionSet { get; set; }
    }
}