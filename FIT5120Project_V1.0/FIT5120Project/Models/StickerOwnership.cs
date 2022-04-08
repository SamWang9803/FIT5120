using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5120Project.Models
{
    public class StickerOwnership
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int amount { get; set; }

        public int stickerId { get; set; }
        public virtual Sticker Sticker { get; set; }
}
}