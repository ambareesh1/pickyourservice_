import RazorpayCheckout   from 'react-native-razorpay';
import React, { useState } from 'react';
import { View, Button } from 'react-native';


const PaymentGateway = () => {
  const [showWebView, setShowWebView] = useState(false);
 const RAZORPAY_API_KEY = 'rzp_test_yZITSUOor2tX2a';

  const paymentWithRazor = () => {
    setShowWebView(true);
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png', // Add image URL here
      currency: 'INR',
      key: RAZORPAY_API_KEY,
      amount: '5000',
      order_id: 1233,
      name: 'Test',
      prefill: {
        email: 'test@gmail.com',
        contact: '9191919191',
        name: 'Razorpay'
      },
      theme: {color: '#F37254'}
    };
    
const successCallback = (payment_id) => {
  console.log('Payment successful:', payment_id);
};

const cancelCallback = (error) => {
  console.log('Payment cancelled:', error);
};

const errorCallback = (error) => {
  console.log('Payment error:', error.description);
};

RazorpayCheckout.open(options)
  .then(successCallback)
  .catch(cancelCallback) 
  .catch(errorCallback);
  };

  return (
    <View>
     
        <Button title="Pay with Razorpay" onPress={()=>paymentWithRazor()} />
     
    </View>
  );
};



export default PaymentGateway;
