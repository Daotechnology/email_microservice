require("dotenv").config({ path: "config/dev.env" });
const validator = require("validator");
// const User = require("../../models/Admin/User");
const sgMail = require('@sendgrid/mail');
const Email = require("../models/Email");

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


//Declare signup function
const sendEmail = async(req,res)=>{
  try {
    const collectibles = ["email"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      const arrError = [
          'email must be a string',
          'email must not be empty',
      ]

      return res.json({
          status:400,
          errorMsg:arrError
      })
    }
    
    const isKey = keys.filter((key) => {
      return !collectibles.includes(key)
    });

    if (isKey.length > 0) {
      return res.json({
          status:400,
          error:isKey,
          errorMsg:'The keys are not part of the collectibles'
      }) 
    }
  
    const send_otp = await Email.sendEmailVerification(body.email);
    return res
      .json({
        error: false,
        data: send_otp,
        statusText: "otp sent successfully, will expire in 5 minute",
      })
      .status(201);
  } catch(e) {
    return res.send({error:true,errorMsg:e.message});
  }
}

//verify OTP
const verifyOTP = async(req,res) => {
  try {
    const otp = req.params.otp;
    const verify = await Email.verifyOTP(otp);
    return res
      .json({
        error: false,
        data: verify,
        statusText: "otp verified",
      })
      .status(200);
  } catch(e) {
    return res.send({error:true,errorMsg:e.message});
  }
}

//passsword reset
const passwordReset = async(req,res)=>{
  try {
    const collectibles = ["email"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      const arrError = [
          'email must be a string',
          'email must not be empty',
      ]

      return res.json({
          status:400,
          errorMsg:arrError
      })
    }
    
    const isKey = keys.filter((key) => {
      return !collectibles.includes(key)
    });

    if (isKey.length > 0) {
      return res.json({
          status:400,
          error:isKey,
          errorMsg:'The keys are not part of the collectibles'
      }) 
    }
  
    const send_otp = await Email.passwordReset(body.email);
    return res
      .json({
        error: false,
        data: send_otp,
        statusText: "password reset sent successfully, will expire in 5 minute",
      })
      .status(201);
  } catch(e) {
    return res.send({error:true,errorMsg:e.message});
  }
}

module.exports = { sendEmail, verifyOTP ,passwordReset}