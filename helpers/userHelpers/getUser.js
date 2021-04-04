const User = require("../../models/users");

//Get User For Backend
const getUser = async () => {
  const users = await User.find().select("+password");
  return users;
};

//Get User For Show Page
const getUserForShowPage = async () => {
  const users = await User.find().lean();
  return users;
};

module.exports = {
  getUser,
  getUserForShowPage
};
