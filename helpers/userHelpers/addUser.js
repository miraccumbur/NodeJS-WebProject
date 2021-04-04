const User = require("../../models/users");

const addUser = async (name, email, password) => {
  let control = true;
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  }).catch(() => {
    control = false;
  });
  return control;
};

module.exports = {
  addUser,
};
