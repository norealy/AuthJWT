require("dotenv").config();
const db = require("./db");
const bcrypt = require("bcrypt");
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hash(password, salt);
  return hashPassword;
}
class Account {
  constructor(account) {
    this.id = account.id;
    this.username = account.username;
    this.password = account.password;
  }
}

Account.create = async (newAcc, result) => {
  try{
      console.log(newAcc)
    }catch(error) {

    }
};

Account.authLogin = (Acc, result) => {
  try {
  } catch (error) {
  }
};
module.exports = Account;
