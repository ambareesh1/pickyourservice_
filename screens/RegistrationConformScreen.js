import { useEffect, useState } from 'react';
import { View, Text, TextInput, PermissionsAndroid, ToastAndroid, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import SmsListener from 'react-native-sms-listener';
import COLORS from '../Constants/Colors';
import { PrimaryButton } from '../Components/Button';


const RegistrationConformScreen = ({ route, navigation }) => {
   
  
    const [otp, setOtp] = useState('');
    const [data, SetData]= useState({});
     const [ isCorrect, setIsCorrect] = useState(false);
     const [invalidRequest, setInvalidRequest] = useState("");
    useEffect(() => {
        SetData(route.params.details)
        console.log(data["name"]);
    }, []);


    const onOTPVerification = () => {
        if(otp.length <4){
            setInvalidRequest("OTP length: 4")
            setIsCorrect(true);
        }
        else if(data.otp == data.otp){
            navigation.navigate("Home");
        }else{
            setInvalidRequest("Invalid OTP. Resend or try again")
            setIsCorrect(true);
        }
        
    }
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.secondary, flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 18, color: '#4E342E', marginBottom: 5, fontWeight: 'bold' }}>OTP send to (+91) {data.PhoneNo} and  {data.email} . </Text>
                </View>
               {isCorrect && <Text style={{color:COLORS.tomato, padding:5}}>{invalidRequest} </Text>} 
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

export default RegistrationConformScreen;

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