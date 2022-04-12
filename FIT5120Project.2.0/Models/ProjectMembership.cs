using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5120Project.Models
{
    public class ProjectMembership
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public int projectId { get; set; }
        public virtual Project Project { get; set; }
    }
}