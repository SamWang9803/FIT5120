﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FIT5120_Onboarding_Project.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class FIT5120ModelContainer : DbContext
    {
        public FIT5120ModelContainer()
            : base("name=FIT5120ModelContainer")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<binInfo> binInfoSet { get; set; }
        public virtual DbSet<unacceptables> unacceptablesSet { get; set; }
        public virtual DbSet<acceptables> acceptablesSet { get; set; }
        public virtual DbSet<wasteCollection> wasteCollectionSet { get; set; }
    }
}
