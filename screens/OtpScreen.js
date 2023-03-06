import { useEffect, useState } from 'react';
import { View, Text, TextInput, PermissionsAndroid, ToastAndroid, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import SmsListener from 'react-native-sms-listener';
import COLORS from '../Constants/Colors';
import { PrimaryButton } from '../Components/Button';


const OtpScreen = ({ navigation }) => {
    const [otp, setOtp] = useState('');

    useEffect(() => {
        const requestPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_SMS,
                    {
                        title: 'SMS Permission',
                        message: 'This app needs access to your SMS messages to automatically detect the OTP.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    listenForSMS();
                } else {
                    ToastAndroid.show('SMS permission denied', ToastAndroid.SHORT);
                }
            } catch (error) {
                console.warn(error);
            }
        };
        requestPermission();
    }, []);

    const listenForSMS = () => {
        SmsListener.addListener(message => {
            const regex = /(\d{6})/g;
            const match = regex.exec(message.body);
            if (match) {
                const otp = match[1];
                setOtp(otp);
                // Do something with the OTP, e.g. fill in an OTP input field
            }
        });
    }
    const onOTPVerification = () => {
        navigation.navigate("Home");
    }
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.secondary, flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 18, color: '#4E342E', marginBottom: 5, fontWeight: 'bold' }}>OTP send to (+91) 9535770068. </Text>
                </View>
                <TextInput
                    value={otp}
                    style={styles.input}
                    onChangeText={setOtp}
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                    maxLength={4}
                />

                <TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#5D4037', marginTop: 10 }}>Didn't  recieve OTP?  Request again</Text>
                </TouchableOpacity>

            </View>
            <View style={{ margin: 10 }}>
                <PrimaryButton title={"Verify OTP"} onPress={() => onOTPVerification()}></PrimaryButton>
            </View>

        </SafeAreaView >

    );
}

export default OtpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: '80%',
        borderColor: COLORS.greywhite,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 20,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 10,
        fontSize: 18,
        textAlign: 'center'
    },
});