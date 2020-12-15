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
    this.username = account.username;
    this.password = account.password;
  }
}

Account.create = async (newAcc, result) => {
  try{
      console.log(newAcc)
      newAcc.password = await hashPassword(newAcc.password)
      db.query("INSERT INTO login SET ?",newAcc,(err,res)=>{
        if (err){
          return result('Insert data fail !', null);
        }else{
          console.log("Successful create : ",newAcc)
          return result(null,newAcc);
        }
      })
    }catch(error) {
      return result('Insert data fail !', null);
    }
};

Account.authLogin = (Acc, result) => {
  try {
  } catch (error) {
  }
};
module.exports = Account;
