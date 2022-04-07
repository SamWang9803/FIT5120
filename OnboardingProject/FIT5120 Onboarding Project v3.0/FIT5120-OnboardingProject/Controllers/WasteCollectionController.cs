using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FIT5120_OnboardingProject.Models;

namespace FIT5120_OnboardingProject.Controllers
{
    public class WasteCollectionController : Controller
    {
        private FIT5120MyModel db = new FIT5120MyModel();

        public ActionResult CollectionTime()
        {
            //send data in waste collection table to the view
            var wasteCollection = db.wasteCollectionSet;
            return View(wasteCollection.ToList());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CollectionTime(FormCollection form)
        { 

            var wasteCollection = db.wasteCollectionSet;
            return View(wasteCollection.ToList());
        }
    }
}