require("dotenv").config();
const db = require("./db");
const  bcrypt = require("bcrypt");
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
          console.log("Register Successful : ",newAcc)
          return result(null,newAcc);
        }
      })
    }catch(error) {
      return result('Register data fail !', null);
    }
};

Account.authLogin = (account, result) => {
  try {
    db.query('select * from login where username='+`'${account.username}'`,
    async (err,res)=>{
      if(err){
        return result(err,null);
      }else{
        try {
          // console.log(res[0]['password'])
          const checkP = await bcrypt.compare(account.password + "", res[0]['password'] + "");
          if(checkP){
            return result(null,res);
          }else{
            return result("Wrong password !",null);
          } 
        } catch (error) {
          // console.log(error)
          return result("Username don't exists !",null);
        }
      }
    })
  }catch(error) {
    return result(error,null);
  }
};
module.exports = Account;
