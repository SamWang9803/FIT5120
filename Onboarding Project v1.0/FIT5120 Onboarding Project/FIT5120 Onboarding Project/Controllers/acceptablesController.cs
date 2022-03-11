using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using FIT5120_Onboarding_Project.Models;

namespace FIT5120_Onboarding_Project.Controllers
{
    public class acceptablesController : Controller
    {
        private FIT5120ModelContainer db = new FIT5120ModelContainer();

        // GET: acceptables
        public ActionResult Index()
        {
            var acceptablesSet = db.acceptablesSet.Include(a => a.binInfo);
            return View(acceptablesSet.ToList());
        }

        // GET: acceptables/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            acceptables acceptables = db.acceptablesSet.Find(id);
            if (acceptables == null)
            {
                return HttpNotFound();
            }
            return View(acceptables);
        }

        // GET: acceptables/Create
        public ActionResult Create()
        {
            ViewBag.binInfo_bin_type = new SelectList(db.binInfoSet, "bin_type", "bin_color");
            return View();
        }

        // GET: acceptables/CheckWaste
        public ActionResult CheckWaste()
        {
            ViewBag.acceptable_items = new SelectList(db.acceptablesSet, "binInfo_bin_type", "acceptable_items");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CheckWaste(acceptables acceptables, FormCollection form)
        {
            string strDDLValue = form["acceptable_items"].ToString();
            System.Diagnostics.Debug.WriteLine(strDDLValue);

            ViewBag.acceptable_items = new SelectList(db.acceptablesSet, "binInfo_bin_type", "acceptable_items");
            ViewBag.resultString = "You should put this item into "+strDDLValue+" bin.";
            return View();
        }

        // POST: acceptables/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "binInfo_bin_type,acceptable_items")] acceptables acceptables)
        {
            if (ModelState.IsValid)
            {
                db.acceptablesSet.Add(acceptables);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.binInfo_bin_type = new SelectList(db.binInfoSet, "bin_type", "bin_color", acceptables.binInfo_bin_type);
            return View(acceptables);
        }

        // GET: acceptables/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            acceptables acceptables = db.acceptablesSet.Find(id);
            if (acceptables == null)
            {
                return HttpNotFound();
            }
            ViewBag.binInfo_bin_type = new SelectList(db.binInfoSet, "bin_type", "bin_color", acceptables.binInfo_bin_type);
            return View(acceptables);
        }

        // POST: acceptables/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "binInfo_bin_type,acceptable_items")] acceptables acceptables)
        {
            if (ModelState.IsValid)
            {
                db.Entry(acceptables).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.binInfo_bin_type = new SelectList(db.binInfoSet, "bin_type", "bin_color", acceptables.binInfo_bin_type);
            return View(acceptables);
        }

        // GET: acceptables/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            acceptables acceptables = db.acceptablesSet.Find(id);
            if (acceptables == null)
            {
                return HttpNotFound();
            }
            return View(acceptables);
        }

        // POST: acceptables/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            acceptables acceptables = db.acceptablesSet.Find(id);
            db.acceptablesSet.Remove(acceptables);
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
