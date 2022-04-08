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
    public class MessagesController : Controller
    {
        private FIT5120MyModel db = new FIT5120MyModel();

        // GET: Messages
        [Authorize]
        public ActionResult Index()
        {
            return View(db.Messages.ToList());
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
