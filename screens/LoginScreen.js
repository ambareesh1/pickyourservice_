import React, { useState, useContext } from 'react';
import HomeScreen from './HomeScreen';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput, Avatar, Text, Card, Paragraph } from 'react-native-paper';
import { GreyButton, SecondaryButton } from '../Components/Button';
import { PrimaryButton } from '../Components/Button';
import COLORS from '../Constants/Colors';
import RegistrationScreen from './RegistrationScreen';
import {getUserDetails} from '../services/dataservice';
import axios from 'axios';
import  {UserContext}  from "../services/UserContext";
import * as MailComposer from 'expo-mail-composer';


const LoginScreen = ({ navigation }) => {
    const [mobilenumber, setMobileNumber] = useState('');
    const [pin, setPin] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const [userError, setUserError] = useState(false);
    const [pinError, setPinError] = useState(false);
    const { setUser } = useContext(UserContext);

    const onChangeMobileNumber = (value) => {
        setMobileNumber(value);
    };
    const onSubmitMobileNumber = () => {
        //validate mobile number
        if (isNaN(mobilenumber) || mobilenumber == '') {
            setUserError(true);
        } else {
            if (!validatePhoneInDb()) {
                setUserError(true);
            } else {
                setUserError(false);
                setVisible(!visible);
                //sendSms(9535770068, "Hi Ambru, You got OTP #4334 from pick your srevice. Verify your mobile by providing the otp.")
                sendOtp(8074819233, 3366);
                navigation.navigate("Otp Screen");
            }
        }
    };

    const getImageUrl = (imageUrl) => {
        const ref = imageUrl;
        const splitedUrl = ref.split('-');
        const id = splitedUrl[1] + '-' + splitedUrl[2];
        const format = splitedUrl[3];
        const url = `https://cdn.sanity.io/images/jhnl5pei/production/${id}.${format}`;
        return url;
    }

    const validatePhoneInDb = async() => {
        
         const userdata =  await getUserDetails(mobilenumber);
         if(userdata){
            setUser({ name: userdata.name, email: userdata.email, phoneNo : userdata.phoneNo, image : getImageUrl(userdata.profileimage.asset._ref) });
            //sendEmailBlue(userdata);
              return true;
         }
       return false;
    }

    const onChangePin = (value) => {
        setPin(value);
    }
    const onNavigateToRegister = () => {
        navigation.navigate('Registration');
    }



    const apiKey = 'NTA0ZTMwNDY3NDM3Mzg3MDcxNzI0NDc4NGE2YTYzNjU=';
    const sender = 'PICKYOURSERVICE';

    const sendSms = async (phoneNumber, message) => {
        const url = `https://api.textlocal.in/send/`;
        const data = {
            apikey: apiKey,
            numbers: phoneNumber,
            message,
            sender,
        };

        try {
            const response = await axios.post(url, data);
            console.log('SMS sent successfully', response.data);
        } catch (error) {
            console.error('Error sending SMS', error);
        }
    };

    const sendOtp = async (phoneNumber, otp) => {
        const authKey = '391796T0Yn1FmDb64031856P1';
        const senderId = 'PickYourService';
        const message = `Your OTP is ${otp}. Please do not share it with anyone.`;
        const route = '4'; // For Transactional SMS

        try {
            const response = await axios.get(
                `https://control.msg91.com/api/sendotp.php?authkey=${authKey}&mobile=${phoneNumber}&message=${message}&sender=${senderId}&otp=${otp}&otp_expiry=10&otp_length=6&route=${route}`,
            );
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const sendEmail = async (userdata) => {
        const message = {
          to: 'ambru333@gmail.com',
          subject: 'Welcome to Pick My Service!',
          body: `
            <div style="text-align:center">
              <img src="https://live.staticflickr.com/65535/52696212128_5df7741e0f.jpg" alt="Pick My Service Logo" width="100" height="100">
              <h1>Welcome to Pick My Service, ${userdata.name}!</h1>
              <p>We are thrilled to have you here and are excited to offer you a wide range of home services to meet all of your needs. From plumbing to painting and everything in between, we've got you covered.</p>
              <p>Our team of skilled professionals is dedicated to providing you with the highest quality service, and we are committed to making your experience with us as seamless and enjoyable as possible.</p>
              <p>Whether you need a simple repair, a complete renovation, or just some routine maintenance, we have the expertise and resources to get the job done right. And with our competitive pricing and flexible scheduling, you can trust that you are getting the best value for your money.</p>
              <p>Thank you for choosing Pick My Service, and we look forward to serving you soon!</p>
              <p>Sincerely,<br>Pick My Service Team</p>
            </div>
          `,
        };
      
        const result = await MailComposer.composeAsync(message).catch((error)=>console.log(error));
        if (result.status === 'sent') {
          console.log('Email sent successfully!');
        }
      };
      const sendEmailBlue = async (userdata) => {
        const data = {
          sender: { name: 'Pick Your Service', email: 'ambru333@gmail.com' },
          to: [{ email: 'mokashakvk@gmail.com' }],
          subject: 'Welcome to Pick your service - Get started',
          htmlContent: `<div style="display:table;margin:10px;padding:10px;background-color:'#0097A7';border:10px solid #f0f0f0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:bold;color:#777;margin:0 auto;font-size:16px">   <img src="https://live.staticflickr.com/65535/52696212128_5df7741e0f.jpg" alt="Pick My Service Logo" style="height:120px;width:120px"> 
          <div style="text-align:center;padding:0px"> <h2> Welcome to Pick your Service </h2>
          <p style="text-align: left;padding-left: 20px;"> Dear <span><b>Mounika sai,</b> </span> </p>
          </div> <div style="margin-top:10px;font-size:14px!important;line-height:24px;color:#46535e;padding:0 20px 30px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;background-color:#fff;font-weight:normal;padding-top:2px;border-radius:2px"> <p>We are thrilled to have you here and are excited to offer you a wide range of home services to meet all of your needs. From plumbing to painting and everything in between, we've got you covered.</p>
          
          <p>Our team of skilled professionals is dedicated to providing you with the highest quality service, and we are committed to making your experience with us as seamless and enjoyable as possible.</p>
          <p>Whether you need a simple repair, a complete renovation, or just some routine maintenance, we have the expertise and resources to get the job done right. And with our competitive pricing and flexible scheduling, you can trust that you are getting the best value for your money.</p>
          <p>Thank you for choosing Pick My Service, and we look forward to serving you soon!</p>
          <p>Sincerely,<br>Pick My Service Team</p></div></div><div style="background-color: #FEBD59;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;padding:10px;font-weight:normal;font-size:12px;color: #555;"><p> If you are facing any problem while rising a request, please find the below contact details </p> <p> Email : <a href="mailto:contact@pickyourservice.com" target="_blank">contact@pickyourservice.com</a> </p><p> </p><p> mobile :9535770068</p><div class="yj6qo"></div><div class="adL"> <p> </p> <p></p><p></p></div></div><div class="adL"> </div>
`
        };
      
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
      };
    return (
        <SafeAreaView style={styles.surface}>
            <View >
                <View style={{ height: 300, resizeMode: 'contain', alignItems: 'center', marginTop: 50 }}>
                    <Avatar.Image size={350} source={{ uri: "https://live.staticflickr.com/65535/52696212128_5df7741e0f_n.jpg" }} />
                </View>

                <View style={styles.mobileNumberContainer}>
                    <TextInput style={styles.input}
                        value={mobilenumber}
                        onChangeText={(text) => onChangeMobileNumber(text)}
                        activeUnderlineColor="green"
                        placeholder="Mobile Number"
                        color={COLORS.darkgrey}
                        maxLength={10}
                        keyboardType="phone-pad"
                        error={userError}
                        left={<TextInput.Icon icon="phone" />}
                    />

                    <View style={styles.indicatorContainer}>
                        <PrimaryButton
                            mode="contained"
                            onPress={() => onSubmitMobileNumber()}
                            title="Login"
                        />

                    </View>

                    <Card style={{ marginTop: 6 }}>
                        <Card.Content >
                            <Paragraph style={{ marginTop: 1, color: 'grey', textAlign: 'left', padding: 10 }}>If you not yet registered</Paragraph>
                            <View style={styles.indicatorContainer}>
                                <SecondaryButton
                                    mode="contained"
                                    onPress={() => onNavigateToRegister()}
                                    title="Register"
                                />
                            </View>
                        </Card.Content>
                    </Card>
                </View>

            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    surface: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        alignContent: 'center',
        textAlign: 'center'
    }, iconBgColor: {
        backgroundColor: COLORS.primary
    },
    image: {
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        padding: 5,
        backgroundColor: COLORS.white,
        fontWeight: 'bold'
    },
    displayNone: {
        displayNone: 'none',
    },
    displayBlock: {
        displayBlock: 'block',
    },
    mobileNumberContainer: {

        marginTop: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff'
    },
    buttonBgColor: {
        backgroundColor: COLORS.primary,
    },
    indicatorContainer: {

        paddingHorizontal: 80,
        justifyContent: 'space-between',
        marginTop: 15,
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },

});
export default LoginScreen;
