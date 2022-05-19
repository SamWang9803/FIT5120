using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FIT5120Project.Models
{
    public class FIT5120MyModel : DbContext
    {
        public FIT5120MyModel()
            : base("name=FIT5120MyModel")
        {
        }

        public virtual DbSet<FilteringWord> FilteringWords { get; set; }
        public virtual DbSet<Joke> Jokes { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectMembership> ProjectMemberships { get; set; }
        public virtual DbSet<Sticker> Stickers { get; set; }
        public virtual DbSet<StickerOwnership> StickerOwnerships { get; set; }
        public virtual DbSet<Vocabulary> Vocabularies { get; set; }

    }
}