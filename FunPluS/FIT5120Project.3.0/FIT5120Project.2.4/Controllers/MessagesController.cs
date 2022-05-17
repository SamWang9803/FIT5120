using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FIT5120Project.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FIT5120Project.Controllers
{
    public class MessagesController : Controller
    {
        private FIT5120MyModel db = new FIT5120MyModel();
        /// Application DB context
        protected ApplicationDbContext ApplicationDbContext { get; set; }
        /// User manager - attached to application DB context
        protected UserManager<ApplicationUser> UserManager { get; set; }

        // GET: Messages
        [Authorize]
        public ActionResult Index()
        {
            return View(db.Messages.ToList());
        }


        [Authorize]
        public ActionResult Test()
        {
            return View(db.Messages.ToList());
        }



        //5.11 Set one unreadMessage for Reader
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public void get_unread_message()
        {
            //create a new list for unread message
            var unread_list = new List<Message>();
            //get Message Database
            var data_message_list = db.Messages.ToList();

            //Search unread Message in Database and add into new Unread List (unread_message_list)
            for (int i = 0; i < data_message_list.Count; i++)
            {
                if(data_message_list[i].readUserId == data_message_list[i].writeUserId)
                {
                    if(data_message_list[i].writeUserId != User.Identity.GetUserId())
                    {
                        unread_list.Add(data_message_list[i]);
                    }
                }
            }

            //Generate a Random Number as Random Index of new unread Message List
            Random random = new Random();
            //find Reader unread Message Index
            var randomMessageIndex = random.Next(0, unread_list.Count);

            //Set the unread Message in dataBase
            if(unread_list.Count != 0)
            {
                db.Messages.Find(unread_list[randomMessageIndex].Id).readUserId = User.Identity.GetUserId();
                ViewBag.getMsg = "Get One Message"; 
                db.SaveChanges();
            }
        }


        //Get all reader Message
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public List<Message> get_read_message()
        {
            //create a new List for the reader's Message
            List<Message> reader_list = new List<Message>();

            //Get Message DataBase
            List<Message> data_message_list = db.Messages.ToList();

            //search all reader's Message in the DataBase
            for(int i  = 0; i < data_message_list.Count; i++)
            {

                if (data_message_list[i].readUserId != data_message_list[i].writeUserId)
                {
                    if (data_message_list[i].readUserId == User.Identity.GetUserId())
                    {
                        reader_list.Add(data_message_list[i]);
                    }
                }
            }

            //return Reader's Message
            return reader_list;

        }

        //Get all write Message
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public List<Message> get_write_message()
        {
            //create a new List for the writer's Message
            List<Message> writer_list = new List<Message>();

            //Get Message DataBase
            List<Message> data_message_list = db.Messages.ToList();

            //search all write's Message in the DataBase
            for (int i = 0; i < data_message_list.Count; i++)
            {
                if(data_message_list[i].writeUserId == User.Identity.GetUserId())
                {
                    writer_list.Add(data_message_list[i]);
                }
            }

            //return writer's Message
            return writer_list;

        }

        public ActionResult ReaderMessage()
        {
            //check if user is logged in
            bool val1 = (System.Web.HttpContext.Current.User != null) && System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            if (val1)
            {
                get_unread_message();
                return View(get_read_message());
            }


            return RedirectToAction("msgTutorial", "Home");
            
        }

        [Authorize]
        public ActionResult WriterMessage()
        {
            return View(get_write_message());
        }


        [Authorize]
        public ActionResult EmotionSent()
        {
            return View();
        }



        [Authorize]
        [HttpPost]
        public ActionResult set_emotion()
        {
            try
            {
                int message_id = int.Parse(Request["message_id"]);

                var message_emotion = Request["message_emotion"];
            
                Message message = db.Messages.Find(message_id);

                message.readerEmotion = message_emotion;

                //add token
                addToken(3);
                //add token to writer
                if (message_emotion.Equals("happy"))
                {
                    addTokenToWriter(5, message.writeUserId);

                }else if (message_emotion.Equals("neutral"))
                {
                    addTokenToWriter(3, message.writeUserId);
                }


                db.Entry(message).State = EntityState.Modified;
                db.SaveChanges();

                return RedirectToAction("EmotionSent", "Messages");

            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        public void addToken(int amount)
        {
            this.ApplicationDbContext = new ApplicationDbContext();
            this.UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.ApplicationDbContext));
            ApplicationUser user = UserManager.FindById(User.Identity.GetUserId());
            user.tokenAmount += amount;
            UserManager.Update(user);
        }

        public void addTokenToWriter(int amount, string writerId)
        {
            this.ApplicationDbContext = new ApplicationDbContext();
            this.UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.ApplicationDbContext));
            ApplicationUser user = UserManager.FindById(writerId);
            user.tokenAmount += amount;
            UserManager.Update(user);
        }


        // GET: Messages/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Message message = db.Messages.Find(id);
            if (message == null)
            {
                return HttpNotFound();
            }
            return View(message);
        }

        // GET: Messages/Create
        public ActionResult Create()
        {
            //display all vocabularies that user have
            var userId = User.Identity.GetUserId();
            var userVocabulary = db.Vocabularies.Where(s => s.UserId == userId).ToList();
            ViewBag.vocabulary = new SelectList(userVocabulary, "jokeVocab", "jokeVocab");
            return View();
        }

        // POST: Messages/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,writeUserId,readUserId,messageText,writerEmotion,readerEmotion")] Message message, FormCollection form)
        {
            if (ModelState.IsValid)
            {
                message.writeUserId = User.Identity.GetUserId();
                //get selected emotion
                string writerEmotion = form["writerEmotion"].ToString();
                message.writerEmotion = writerEmotion;
                //check if user have used any word exist in his vocabulary list
                var userId = User.Identity.GetUserId();
                List<Vocabulary> userVocabulary = db.Vocabularies.Where(s => s.UserId == userId).ToList();
                foreach (Vocabulary v in userVocabulary)
                {
                    if (message.messageText.Contains(v.jokeVocab))
                    {
                        //update database
                        db.Messages.Add(message);
                        db.SaveChanges();
                        return RedirectToAction("Index");
                    }
                }
                ViewBag.errorMessage = "You didn't use any vocabulary in your previous message, please try again.";
                return Create();
            }

            return View(message);
        }


        // GET: Messages/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Message message = db.Messages.Find(id);
            if (message == null)
            {
                return HttpNotFound();
            }
            return View(message);
        }

        // POST: Messages/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,writeUserId,readUserId,messageText,writerEmotion,readerEmotion")] Message message)
        {
            if (ModelState.IsValid)
            {
                db.Entry(message).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(message);
        }

        // GET: Messages/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Message message = db.Messages.Find(id);
            if (message == null)
            {
                return HttpNotFound();
            }
            return View(message);
        }

        // POST: Messages/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Message message = db.Messages.Find(id);
            db.Messages.Remove(message);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
