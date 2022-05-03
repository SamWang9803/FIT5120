using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using FIT5120Project.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace FIT5120Project.Controllers
{
    public class JokesController : Controller
    {
        private FIT5120MyModel db = new FIT5120MyModel();

        // GET: Jokes
        [Authorize]
        public ActionResult Index()
        {
            return View(db.Jokes.ToList());
        }

        // GET: Jokes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Joke joke = db.Jokes.Find(id);
            if (joke == null)
            {
                return HttpNotFound();
            }
            return View(joke);
        }

        [HttpPost]
        public ActionResult Details([Bind(Include = "Id,jokeText")] Joke joke)
        {
            Random random = new Random();
            //Get current user's id
            var userId = User.Identity.GetUserId();
            //Remove all punctuations in the sentence
            string OriginalString = joke.jokeText;
            string data = new string(OriginalString.Where(c => !char.IsPunctuation(c)).ToArray());
            // Split data into words.
            string[] words = data.Split(' ');
            // Find a random place to start, at least 1 words back.
            int start = random.Next(0, words.Length - 1);
            // Select the words.
            IEnumerable<string> selectedWords = words.Skip(start).Take(1);
            string selectedWord = selectedWords.First();

            //check how many words does the user have
            List<Vocabulary> userVocabulary = db.Vocabularies.Where(s => s.UserId == userId).ToList();
            if (userVocabulary.Count() >= 15)
            {
                ViewBag.resultString = "You have too many vocabularies in your list, please delete some vocabularies first.";
                return Details(joke.Id);
            }
            else
            {
                //add the word into database
                Vocabulary vocabulary = new Vocabulary { UserId = userId, jokeVocab = selectedWord };
                db.Vocabularies.Add(vocabulary);
                db.SaveChanges();
            }

            //return view
            ViewBag.resultString = "The word [" + selectedWord + "] has been added.";
            return Details(joke.Id);
        }

            // GET: Jokes/Create
            public ActionResult Create()
        {
            return View();
        }

        // POST: Jokes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,jokeText")] Joke joke)
        {
            if (ModelState.IsValid)
            {
                db.Jokes.Add(joke);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(joke);
        }

        // GET: Jokes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Joke joke = db.Jokes.Find(id);
            if (joke == null)
            {
                return HttpNotFound();
            }
            return View(joke);
        }

        // POST: Jokes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,jokeText")] Joke joke)
        {
            if (ModelState.IsValid)
            {
                db.Entry(joke).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(joke);
        }

        // GET: Jokes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Joke joke = db.Jokes.Find(id);
            if (joke == null)
            {
                return HttpNotFound();
            }
            return View(joke);
        }

        // POST: Jokes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Joke joke = db.Jokes.Find(id);
            db.Jokes.Remove(joke);
            db.SaveChanges();
            return RedirectToAction("Index");
        }


        //Edit By XueweiWang 2022.4.24
        //get Random Joke List
        [AllowAnonymous]
        public List<Joke> create_joke_list()
        {
            var userId = User.Identity.GetUserId();
            var joke_list = db.Jokes.ToList();
            Random rd_numebr = new Random();
            var number_1 = rd_numebr.Next(0, (joke_list.Count() - 1));
            var number_2 = 0;
            var per_joke_list = new List<Joke>();
            
            for(int i = 0; i < 5; i++)
            {
                if(number_1 != number_2)
                {
                    number_2 = number_1;
                    Joke jk = db.Jokes.Find(number_2);
                    per_joke_list.Add(jk);
                    number_1 = rd_numebr.Next(0, joke_list.Count());
                }
            }
            return per_joke_list;
        }

        //Get Joke List Content;
        [AllowAnonymous]
        public List<String> get_joke_content()
        {
            var joke_list = create_joke_list();
            do
            {
                if (joke_list.Count() != 5)
                {
                    joke_list = create_joke_list();
                }
                else
                {
                    break;
                }
            }
            while (true);
            var joke_contents = new List<string>();
            foreach(Joke jk in joke_list)
            {
                var joke_con = jk.jokeText.ToString();
                joke_contents.Add(joke_con);
            }
            return joke_contents;
        }


        //Set Message after User finish the joke game
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Set_message()
        {
            try
            {
                Message message = new Message();
                message.writeUserId = User.Identity.GetUserId();

                var r = new Random();
                var UsersContext = new ApplicationDbContext();
                var randomUser = UsersContext.Users.ToList().OrderBy(u => r.Next()).Take(1);

                message.readUserId = User.Identity.GetUserId();
                message.messageText = Request["messageText"];
                message.writerEmotion = Request["post_context"];

                db.Messages.Add(message);
                db.SaveChanges();
                return RedirectToAction("Message_send", "Jokes");

            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        //Joke game
        [Authorize]
        public ActionResult Joke_game()
        {
            var list = get_joke_content();
            ViewBag.joke_1 = list[0];
            ViewBag.joke_2 = list[1];
            ViewBag.joke_3 = list[2];
            ViewBag.joke_4 = list[3];
            ViewBag.joke_5 = list[4];
            return View();
        }

        //Joke game beta
        public ActionResult Joke_game_beta()
        {
            var list = get_joke_content();
            ViewBag.joke_1 = list[0];
            ViewBag.joke_2 = list[1];
            ViewBag.joke_3 = list[2];
            ViewBag.joke_4 = list[3];
            ViewBag.joke_5 = list[4];

            ViewBag.count = list.Count().ToString();
            return View();
        }

        //Finish Game Page
        public ActionResult Message_send()
        {
            return View();
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
