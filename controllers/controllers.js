const { addUser } = require("../helpers/userHelpers/addUser");
const {
  getUser,
  getUserForShowPage,
} = require("../helpers/userHelpers/getUser");
const {
  getItemsForShowPages,
  getItems,
} = require("../helpers/itemHelpers/getItems");
const User = require("../models/users");
const Item = require("../models/items");
const passport = require("passport");
require("../authentication/passport/local");

// Get Login Page
const getLoginPage = async (req, res, next) => {
  res.render("pages/login");
};

//Get Register Page
const getRegisterPage = async (req, res, next) => {
  res.render("pages/register");
};

// Post Register Page
const postRegisterPage = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const control = await addUser(name, email, password);
  if (control) {
    res.render("pages/login");
  } else {
    return res.render("pages/register", {
      error: [
        {
          message:
            "These email already use. Please change email and try again..",
        },
      ],
    });
  }
};

//Get User Page
const getUserPage = async (req, res, next) => {
  res.render("pages/user");
};

//Get Products Page
const getProductsPage = async (req, res, next) => {
  const items = await getItemsForShowPages();
  res.render("pages/products", {
    item: items,
  });
};

//Get Cart Page
const getCartPage = async (req, res, next) => {
  if (req.user) {
    const users = await getUserForShowPage();
    for (let i = 0; i < users.length; i++) {
      if(users[i].cart===null){
        return res.render("pages/cart",{
          error: [
            {
              message: "Your cart is empty",
            },
          ],
        })
      }
      if (req.user.email === users[i].email) {
        return res.render("pages/cart", {
          item: users[i].cart,
        });
      }
    }
  }
  return res.render("pages/cart", {
    error: [
      {
        message: "You are not autharized",
      },
    ],
  });
};

//Get Thanks Page
const getThanksPage = async (req, res, next) => {
  res.render("pages/thanks");
};

//Post Thanks Page
const postThanksPage = async(req,res,next)=>{
if(req.user){
  User.findOneAndUpdate({ email: req.user.email },{
    cart:[]
  },(err, data) => {});
}
  res.redirect("/thanks");

}

//Get Logout Page
const getLogoutPage = async (req, res, next) => {
  req.logout();
  res.redirect("/login");
};

//Get A Item Page
const getAItemPage = async (req, res, next) => {
  const path = req.route.path;
  const control = path.split("/");
  const items = await getItemsForShowPages();
  for (let i = 0; i < items.length; i++) {
    if (items[i].model === control[1]) {
      return res.render("pages/aItem", {
        brand: items[i].brand,
        name: items[i].name,
        price: items[i].price,
        image: items[i].image,
        stock: items[i].stock,
        model: control[1],
      });
    }
  }
  return res.render("pages/aItem");
};

//Post A Item Page
const postAItemPage = async (req, res, next) => {
  const path = req.route.path;
  const control = path.split("/");
  let rezerveItems = null;
  const items = await getItemsForShowPages();
  for (let i = 0; i < items.length; i++) {
    if (items[i].model === control[1]) {
      rezerveItems = items[i];
    }
  }
  const newStockInt = parseInt(rezerveItems.stock)-1;
  const newStockString = newStockInt.toString();

  Item.findOneAndUpdate({model:control[1]},{stock:newStockString},(err, data) => {
    if(err) console.log(err);
  })

  if (req.user) {
    const userInfo = await getUser();
    const cart = [];
    for (let k = 0; k < userInfo.length; k++) {
      if (userInfo[k].email === req.user.email) {
        if (userInfo[k].cart.length > 0) {
          for (let i = 0; i < userInfo[k].cart.length; i++) {
            cart.push(userInfo[k].cart[i]);
          }
        }
        console.log(rezerveItems);
        cart.push(rezerveItems);
        User.findOneAndUpdate(
          { email: req.user.email },
          { cart: cart },
          (err, data) => {}
        );
        req.flash("flashAdAItemToCart","Add a item to cart operations successfull");
        return res.redirect("/cart");
      }
    }
  }
  return res.render("pages/index",{
    error: [
        {
          message: "Something is wrong please try again..",
        },
        
      ],
    brand: rezerveItems.brand,
    name: rezerveItems.name,
    model: rezerveItems.model,
    price: rezerveItems.price,
    image: rezerveItems.image,
  });
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  postRegisterPage,
  getUserPage,
  getProductsPage,
  getCartPage,
  getThanksPage,
  postThanksPage,
  getLogoutPage,
  getAItemPage,
  postAItemPage,
};
