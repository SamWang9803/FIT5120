using FIT5120_OnboardingProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FIT5120_OnboardingProject.Controllers
{
    public class AcceptableItemController : Controller
    {
        private FIT5120MyModel db = new FIT5120MyModel();

        public ActionResult CheckWaste()
        {
            ViewBag.acceptable_items = new SelectList(db.acceptablesSet, "BinID", "AcceptableItemID");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CheckWaste(AcceptableItem acceptables, FormCollection form)
        {
            string strDDLValue = form["acceptable_items"].ToString();
            System.Diagnostics.Debug.WriteLine(strDDLValue);

            ViewBag.acceptable_items = new SelectList(db.acceptablesSet, "BinID", "AcceptableItemID");
            ViewBag.resultString = "You should put this item into " + strDDLValue + " bin.";
            return View();
        }
    }
}