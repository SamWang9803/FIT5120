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
    public class VocabulariesController : Controller
    {
        private FIT5120MyModel db = new FIT5120MyModel();

        // GET: Vocabularies
        [Authorize]
        public ActionResult Index()
        {
            var userId = User.Identity.GetUserId();
            return View(db.Vocabularies.Where(s => s.UserId == userId).ToList());
        }

        // GET: Vocabularies/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vocabulary vocabulary = db.Vocabularies.Find(id);
            if (vocabulary == null)
            {
                return HttpNotFound();
            }
            return View(vocabulary);
        }

        // GET: Vocabularies/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Vocabularies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,UserId,jokeVocab")] Vocabulary vocabulary)
        {
            if (ModelState.IsValid)
            {
                db.Vocabularies.Add(vocabulary);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(vocabulary);
        }

        // GET: Vocabularies/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vocabulary vocabulary = db.Vocabularies.Find(id);
            if (vocabulary == null)
            {
                return HttpNotFound();
            }
            return View(vocabulary);
        }

        // POST: Vocabularies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,UserId,jokeVocab")] Vocabulary vocabulary)
        {
            if (ModelState.IsValid)
            {
                db.Entry(vocabulary).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(vocabulary);
        }

        // GET: Vocabularies/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Vocabulary vocabulary = db.Vocabularies.Find(id);
            if (vocabulary == null)
            {
                return HttpNotFound();
            }
            return View(vocabulary);
        }

        // POST: Vocabularies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Vocabulary vocabulary = db.Vocabularies.Find(id);
            db.Vocabularies.Remove(vocabulary);
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
