using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5120Project.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string writeUserId { get; set; }
        public string readUserId { get; set; }
        public string messageText { get; set; }
        public string writerEmotion { get; set; }
        public string readerEmotion { get; set; }
    }
}