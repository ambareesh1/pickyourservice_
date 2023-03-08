import axios from 'axios';
import { updateUserData } from './dataservice';

export const SendOtpAfterRegistration = async(userDetails) =>{
    
const otp = randomNumber();
const userDetailsCopy = {...userDetails};
userDetailsCopy.otp = otp;
const isUserDetailsUpdated = updateUserData(userDetailsCopy).catch((error)=>console.log(error));

if(isUserDetailsUpdated){
    const data = {
        sender: { name: 'Pick Your Service', email: 'ambru333@gmail.com' },
        to: [{ email: userDetailsCopy.email }],
        subject: 'Pick My service - OTP for Verification',
        htmlContent: `<div style="display:table;margin:10px;padding:10px;background-color:'#0097A7';border:10px solid #f0f0f0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:bold;color:#777;margin:0 auto;font-size:16px">   <img src="https://live.staticflickr.com/65535/52696212128_5df7741e0f.jpg" alt="Pick My Service Logo" style="height:120px;width:120px"> 
        <div style="text-align:center;padding:0px"> <h2> OTP Verification </h2>
        <p style="text-align: left;padding-left: 20px;"> Dear <span><b>${userDetailsCopy.name},</b> </span> </p>
        </div> <div style="margin-top:10px;font-size:14px!important;line-height:24px;color:#46535e;padding:0 20px 30px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;background-color:#fff;font-weight:normal;padding-top:2px;border-radius:2px">
         <p>Thank you for registering with our service. As part of the verification process, please enter the following OTP code: </p>
        
        <p>OTP: <b>${userDetailsCopy.otp} </b></p>
        <p>Please enter this OTP code in the verification field to complete your registration.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        
        <p>Sincerely,<br>Pick My Service Team</p></div></div><div style="background-color: #FEBD59;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;padding:10px;font-weight:normal;font-size:12px;color: #555;"><p> If you are facing any problem while rising a request, please find the below contact details </p> <p> Email : <a href="mailto:contact@pickyourservice.com" target="_blank">contact@pickyourservice.com</a> </p><p> </p><p> mobile :9535770068</p><div class="yj6qo"></div><div class="adL"> <p> </p> <p></p><p></p></div></div><div class="adL"> </div>
`
      };
    
     return await sendEmail(data).catch((error)=>console.log(error));
}

}

export const SendOtpToPhoneNo = (userDetails)=>{

}

export const sendWelcomeNote = async(userDetails)=>{
    const data = {
        sender: { name: 'Pick Your Service', email: 'ambru333@gmail.com' },
        to: [{ email: userDetails.email }],
        subject: 'Welcome to Pick your service - Get started',
        htmlContent: `<div style="display:table;margin:10px;padding:10px;background-color:'#0097A7';border:10px solid #f0f0f0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:bold;color:#777;margin:0 auto;font-size:16px">   <img src="https://live.staticflickr.com/65535/52696212128_5df7741e0f.jpg" alt="Pick My Service Logo" style="height:120px;width:120px"> 
        <div style="text-align:center;padding:0px"> <h2> Welcome to Pick your Service </h2>
        <p style="text-align: left;padding-left: 20px;"> Dear <span><b>${userDetails.name},</b> </span> </p>
        </div> <div style="margin-top:10px;font-size:14px!important;line-height:24px;color:#46535e;padding:0 20px 30px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;background-color:#fff;font-weight:normal;padding-top:2px;border-radius:2px"> <p>We are thrilled to have you here and are excited to offer you a wide range of home services to meet all of your needs. From plumbing to painting and everything in between, we've got you covered.</p>
        
        <p>Our team of skilled professionals is dedicated to providing you with the highest quality service, and we are committed to making your experience with us as seamless and enjoyable as possible.</p>
        <p>Whether you need a simple repair, a complete renovation, or just some routine maintenance, we have the expertise and resources to get the job done right. And with our competitive pricing and flexible scheduling, you can trust that you are getting the best value for your money.</p>
        <p>Thank you for choosing Pick My Service, and we look forward to serving you soon!</p>
        <p>Sincerely,<br>Pick My Service Team</p></div></div><div style="background-color: #FEBD59;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;padding:10px;font-weight:normal;font-size:12px;color: #555;"><p> If you are facing any problem while rising a request, please find the below contact details </p> <p> Email : <a href="mailto:contact@pickyourservice.com" target="_blank">contact@pickyourservice.com</a> </p><p> </p><p> mobile :9535770068</p><div class="yj6qo"></div><div class="adL"> <p> </p> <p></p><p></p></div></div><div class="adL"> </div>
`
      };
    
      await sendEmail(data);
}

export const sendInvoiceDetails = (userDetails)=>{

}

export const sendPartnerDetails =(userDetails) =>{

}

const randomNumber = () => {
    let min = 1000;
    let max = 9999;
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString();
  }

  const sendEmail = async(data) =>{
    try {
        const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', data, {
          headers: {
            'Content-Type': 'application/json',
            'api-key': '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'
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  }

export default {SendOtpAfterRegistration, SendOtpToPhoneNo, sendWelcomeNote, sendInvoiceDetails, sendPartnerDetails}