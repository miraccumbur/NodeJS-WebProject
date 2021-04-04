const express = require("express");
const passport = require("passport");
require("../authentication/passport/local");

const {getItems} = require("../helpers/itemHelpers/getItems");

const {
    getLoginPage,
    getRegisterPage,
    postRegisterPage,
    getUserPage,
    getProductsPage,
    getCartPage,
    getThanksPage,
    getLogoutPage,
    getAItemPage,
    postAItemPage,
    postThanksPage
} = require("../controllers/controllers");

const router = express.Router();

//For Each Item Create Page
const createItemsPages = async () => {
    const item = await getItems();
    for (let i = 0; i < item.length; i++) {
      router.get("/" + item[i].model,getAItemPage);
      router.post("/" + item[i].model,postAItemPage);
    }
  };
  
  createItemsPages();

// Login Page Post And Authorization Control with Passport-local
router.post("/login",passport.authenticate("local",{
    successRedirect:"/user",
    failureRedirect:"/login",
    failureFlash:true,
    successFlash:true
}));

//Another Pages Router
router.get("/login",getLoginPage);
router.get("/register",getRegisterPage);
router.post("/register",postRegisterPage);
router.get("/user",getUserPage);
router.get("/products",getProductsPage);
router.get("/cart",getCartPage);
router.get("/thanks",getThanksPage);
router.post("/thanks",postThanksPage);
router.get("/logout",getLogoutPage);



module.exports = router;