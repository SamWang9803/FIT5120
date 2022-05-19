using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace FIT5120Project.Models
{
    public class Project
    {
        public int projectId { get; set; }
        public bool complete { get; set; }
        public System.DateTime dueDate { get; set; }
        public int vote { get; set; }
        public string projectImagePath { get; set; }

        public virtual ICollection<ProjectMembership> projectMemberships { get; set; }
    }
}