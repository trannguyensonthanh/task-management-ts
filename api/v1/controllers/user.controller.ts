import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model"
import { generateRandomString } from "../../../helpers/generate";
export const register = async (req: Request, res: Response) => {

  req.body.password = md5(req.body.password);
 
const existEmail = await User.findOne({
  email: req.body.email,
  deleted: false
});

if(existEmail){
  res.json({
    code: 400,
    message: "Email đã tồn tại"
  });
}
else {
  req.body.password = md5(req.body.password);
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    token: generateRandomString(20)
  })
await user.save();
const token = user.token;
res.cookie("token", token);

res.json({
  code: 200,
  message: "Tạo tài khoản thành công!",
  token: token
}); 
}
}

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const user = await User.findOne({
    email: email,
    deleted: false
  });
  
  if(!user){
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    }); 
    return;
  }
   
  
  if(md5(password) !== user.password){
  res.json({
    code: 400,
    message: "Sai mật khẩu!"
  });
  return;
  }
  
  
  const token = user.token;
  res.cookie("token", token);
  
  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token
  });
   
  
  }

  export const detail = async (req: Request, res: Response) => {

    try {
      const user = req["user"];
    if(user){
    
      res.json({
        code: 200,
        user: user
      })
    }
    else {
      res.json({
        code: 400,
      })
    }
    } catch(error){
      console.log("error");
    }
      }