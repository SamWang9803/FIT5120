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
            //send data in acceptable table to the dropdown list
            ViewBag.acceptable_items = new SelectList(db.acceptablesSet, "AcceptableItemID", "AcceptableItemID");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CheckWaste(AcceptableItem acceptables, FormCollection form)
        {
            //get selected item name
            string itemName = form["acceptable_items"].ToString();
            string binType = "NULL";
            //get related bin type according the selected item name
            foreach (AcceptableItem item in db.acceptablesSet)
            {
                if (itemName.Equals(item.AcceptableItemID))
                {
                    binType = item.BinID;
                }
            }

            //send data in acceptable table to the dropdown list
            ViewBag.acceptable_items = new SelectList(db.acceptablesSet, "AcceptableItemID", "AcceptableItemID");
            //show result text to user
            ViewBag.resultString = "You should put ["+ itemName + "] into [" + binType + "] bin.";
            return View();
        }
    }
}