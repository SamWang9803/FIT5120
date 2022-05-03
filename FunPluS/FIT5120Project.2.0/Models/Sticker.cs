using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5120Project.Models
{
    public class Sticker
    {
        public int stickerId { get; set; }
        public string stickerName { get; set; }
        public string stickerPath { get; set; }
        public int price { get; set; }
        public string category { get; set; }

        public virtual ICollection<StickerOwnership> stickerOwnerships { get; set; }
    }
}