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
            ViewBag.acceptable_items = new SelectList(db.acceptablesSet, "AcceptableItemID", "AcceptableItemID");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CheckWaste(AcceptableItem acceptables, FormCollection form)
        {
            string itemName = form["acceptable_items"].ToString();
            string binType = "NULL";
            foreach (AcceptableItem item in db.acceptablesSet)
            {
                if (itemName.Equals(item.AcceptableItemID))
                {
                    binType = item.BinID;
                }
            }

            ViewBag.acceptable_items = new SelectList(db.acceptablesSet, "AcceptableItemID", "AcceptableItemID");
            ViewBag.resultString = "You should put ["+ itemName + "] into [" + binType + "] bin.";
            return View();
        }
    }
}