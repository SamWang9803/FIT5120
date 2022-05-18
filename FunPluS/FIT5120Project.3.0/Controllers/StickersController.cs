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
    public class StickersController : Controller
    {
        private FIT5120MyModel db = new FIT5120MyModel();
        /// Application DB context
        protected ApplicationDbContext ApplicationDbContext { get; set; }
        /// User manager - attached to application DB context
        protected UserManager<ApplicationUser> UserManager { get; set; }

        // GET: Stickers
        [Authorize]
        public ActionResult Index()
        {
            //get current user's token amount
            this.ApplicationDbContext = new ApplicationDbContext();
            this.UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.ApplicationDbContext));
            ApplicationUser user = UserManager.FindById(User.Identity.GetUserId());
            int tokenAmount = user.tokenAmount;
            ViewBag.userTokenNum = tokenAmount;
            return View();
        }

        [Authorize]
        public ActionResult canvasPage_0()
        {
            //get current user's sticker
            String userId = User.Identity.GetUserId();
            List<Sticker> stickers = db.Stickers.Where(s => s.stickerName == userId).ToList();
            
            return View(stickers);
        }

        [Authorize]
        public ActionResult canvasPage_1()
        {
            //get current user's sticker
            String userId = User.Identity.GetUserId();
            List<Sticker> stickers = db.Stickers.Where(s => s.stickerName == userId).ToList();

            return View(stickers);
        }

        [Authorize]
        public ActionResult canvasPage_confirmation()
        {

            return View();
        }

        public ActionResult tokenPage_approved()
        {
            return View();
        }

        public ActionResult gallery()
        {
            return View();
        }

        public ActionResult galleryItemPage()
        {
            return View();
        }

        // GET: Stickers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sticker sticker = db.Stickers.Find(id);
            if (sticker == null)
            {
                return HttpNotFound();
            }
            return View(sticker);
        }

        // GET: Stickers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Stickers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "stickerId,stickerName,stickerPath,price,category")] Sticker sticker)
        {
            if (ModelState.IsValid)
            {
                db.Stickers.Add(sticker);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(sticker);
        }

        // GET: Stickers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sticker sticker = db.Stickers.Find(id);
            if (sticker == null)
            {
                return HttpNotFound();
            }
            return View(sticker);
        }

        // POST: Stickers/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "stickerId,stickerName,stickerPath,price,category")] Sticker sticker)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sticker).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(sticker);
        }

        // GET: Stickers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sticker sticker = db.Stickers.Find(id);
            if (sticker == null)
            {
                return HttpNotFound();
            }
            return View(sticker);
        }

        // POST: Stickers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Sticker sticker = db.Stickers.Find(id);
            db.Stickers.Remove(sticker);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        //deal with 
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Purchase()
        {
            try
            {
                int selectIconAmount = int.Parse(Request["iconNum"]);
                int userTokenAmount = int.Parse(Request["tokenAmount"]);
                string iconPath = Request["iconPath"];

                if (selectIconAmount > 0 && userTokenAmount > 0)
                {
                    //change token
                    this.ApplicationDbContext = new ApplicationDbContext();
                    this.UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(this.ApplicationDbContext));
                    ApplicationUser user = UserManager.FindById(User.Identity.GetUserId());
                    user.tokenAmount = userTokenAmount;
                    UserManager.Update(user);

                    //save purchased icon path
                    string[] words = iconPath.Split(',');

                    foreach (string word in words)
                    {
                        Sticker sticker = new Sticker();
                        sticker.stickerName = User.Identity.GetUserId();
                        sticker.stickerPath = word;
                        db.Stickers.Add(sticker);
                        db.SaveChanges();
                    }

                    return RedirectToAction("tokenPage_approved", "Stickers");
                }

                return RedirectToAction("Index", "Stickers");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
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
