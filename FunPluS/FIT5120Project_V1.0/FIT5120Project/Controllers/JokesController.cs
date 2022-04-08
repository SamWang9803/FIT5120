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
            //add the word into database
            Vocabulary vocabulary = new Vocabulary { UserId = userId, jokeVocab = selectedWord };
            db.Vocabularies.Add(vocabulary);
            db.SaveChanges();
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
