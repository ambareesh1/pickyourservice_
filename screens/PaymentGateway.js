import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import RazorpayCheckout   from 'react-native-razorpay';
const PaymentGateway = () => {
  const [showWebView, setShowWebView] = useState(false);

  const paymentWithRazor = () => {
    setShowWebView(true);
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png', // Add image URL here
      currency: 'INR',
      key: 'rzp_test_yZITSUOor2tX2a',
      amount: '5000',
      order_id: 1233,
      name: 'foo',
      prefill: {
        email: 'ambru@razorpay.com',
        contact: '9535770068',
        name: 'Ambru'
      },
      theme: {color: '#F37254'}
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        console.log(error);
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const hideWebView = () => {
    setShowWebView(false);
  };

  return (
    <View>
      {!showWebView && (
        <Button title="Pay with Razorpay" onPress={paymentWithRazor} />
      )}
      {showWebView && (
        <WebView
          source={{
            uri: 'https://checkout.razorpay.com/v1/payment-button.js',
          }}
          onMessage={(event) => {
            if (event.nativeEvent.data === 'success') {
              alert('Payment successful');
              hideWebView();
            }
          }}
        />
      )}
    </View>
  );
};

export default PaymentGateway;
