import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, Alert, TouchableOpacity, StyleSheet, Image } from 'react-native';
import COLORS from '../Constants/Colors';
import { PrimaryButton } from '../Components/Button';
import Input from '../Components/Input';
import Loader from '../Components/Loader';
import { createUser, uploadImage, deleteRow } from '../services/dataservice'
import sanityClient from '../sanity';
import * as Location from 'expo-location';
import * as Expo from 'expo';
import * as Google from 'expo-google-app-auth'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import { urlFor } from '../sanity';
import {SendOtpAfterRegistration} from '../services/EmailOtpService';

const RegistrationScreen = ({ navigation }) => {
    
    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        address: '',
        password: ''

    });
    const [errors, setErrors] = React.useState({});
    const [value, setValue] = React.useState('first');
    const [loading, setLoading] = React.useState(false);
    const [area, setArea] = useState("");
    const [pincode, setPincode] = useState(0);
    const [currentAddress, setCurrentAddress] = useState("");
    const [data, setData] = useState([]);
    const [locationPermission, setLocationPermission] = useState(null);
    const [location, setLocation] = useState(null);
    const [profilePic, setProfilePic] = useState("");
    const [image, setImages] = useState("https://live.staticflickr.com/65535/52726962560_59bd2948fe_m.jpg");



    useEffect(() => {
        (async () => {
            if (locationPermission) {
                let { coords } = await Location.getCurrentPositionAsync({});
                setLocation(coords);
            }
        })();
    }, [locationPermission]);


    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!inputs.fullname) {
            handleError('Please input fullname', 'fullname');
            isValid = false;
        }

        if (!inputs.phone) {
            handleError('Please input phone number', 'phone');
            isValid = false;
        }
        if (!inputs.address) {
            handleError('Please input address', 'address');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
            isValid = false;
        }

        if (isValid) {
             register();
        }
    };



    const getImageUrl = (imageUrl) => {
        console.log("----------dddd--");
       
        const ref = imageUrl;
        const splitedUrl = ref.split('-');
        const id = splitedUrl[1] + '-' + splitedUrl[2]+ "-"+splitedUrl[3];
        const url = "image-"+id;
        console.log(url);
        return url;
    }

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                setLoading(false);
                
                const bodyObj = {
                  
                                "name": inputs.fullname,
                                "email": inputs.email,
                                "phoneNo": inputs.phone,
                                "address": inputs.address,
                                "password": inputs.password,
                                "area": area,
                                "pincode": pincode,
                                "isSupplier": false,
                                "profileimage" : {
                                    _type: 'image',
                                    asset: {
                                      _type: 'reference',
                                      _ref: profilePic
                                    } 
                                }
                            }
                            
                
                 createUser(bodyObj).then(
                    (data)=> {
                      
                        const userCreated = JSON.stringify(data)
                        if(userCreated){
                           const isEmailSend =  SendOtpAfterRegistration(data).catch((error)=>console.log(error));
                           console.log("email sent "+isEmailSend);
                           if(isEmailSend){
                           navigation.navigate("Verify User", {'details': userCreated});
                        }
                         }
                    })
                    .catch((error)=>console.log(error));
          
            } catch (error) {
                console.log(error.message);
                Alert.alert('Error', error.message);
            }
        }, 3000);
    };


    const handleOnchange = (text, input) => {
        if (input == "address") {
            inputs["address"] = currentAddress;
        }
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status === 'granted');
        if (locationPermission) {
        try {
            const location = await Location.getCurrentPositionAsync();
            let address = await Location.reverseGeocodeAsync(location.coords);

            let currentLocation = '';

            if (address[0].streetNumber !== null) {
                currentLocation = currentLocation + address[0].streetNumber + ", ";
            }
            if (address[0].street !== null) {
                currentLocation = currentLocation + address[0].street + ", ";
            }
            if (address[0].region !== null) {
                currentLocation = currentLocation + address[0].region + ", ";
                setArea(address[0].region);
            }
            if (address[0].district !== null) {
                currentLocation = currentLocation + address[0].district + ", ";
            }
            if (address[0].city !== null) {
                currentLocation = currentLocation + address[0].city + ", ";
            }
            if (address[0].country !== null) {
                currentLocation = currentLocation + address[0].country + ", ";
            }
            if (address[0].postalCode !== null) {
                currentLocation = currentLocation + address[0].postalCode;
                setPincode(address[0].postalCode);
            }
           
            handleOnchange(currentLocation, 'address')
           

        } catch (error) {
            console.error(error);
        }
    }

    }

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            multiple: true,
        });

        if (!result.canceled) {
            setImages(result.uri); 
            console.log(result.uri);
            const imageUrlSplit = result.uri.split("/");
            const imageUrl = imageUrlSplit[imageUrlSplit.length-1];
            const imagePath = imageUrl
            setProfilePic( await uploadImage(result.uri).catch((error)=>console.log(error)));
        }
    }

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.cancelled) {
            setImages(result.uri);
            const imageUrl = await uploadImage(result.uri).catch((error)=>console.log(error));
           setProfilePic(imageUrl);
        }
    }


    async function getProfilePic(gmail) {
        const { type, accessToken } = await Expo.logInAsync({
            androidClientId: '459026739188-tjipqpe98uilr9r0vors5e8geh3js921.apps.googleusercontent.com',
            iosClientId: '459026739188-qq9ij6o3vmscl7l9ggkis030kgucasi5.apps.googleusercontent.com',
            scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
        }).catch((error) => console.log(error));
        console.log('----at------' + accessToken);
        if (type === 'success') {
            const url = `https://people.googleapis.com/v1/people/${gmail}?personFields=photos&key=AIzaSyCQJWKg0lbuZwTfD8HwwsUHrp-8nPoL_dY`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            const profilePicUrl = data?.photos?.[0]?.url;
            // console.log(profilePicUrl);
            return profilePicUrl;
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView
                contentContainerStyle={{ paddingTop: 0, paddingHorizontal: 20 }}>

                <View style={{ marginVertical: 10 }}>

                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />

                    <Input
                        onChangeText={text => handleOnchange(text, 'fullname')}
                        onFocus={() => handleError(null, 'fullname')}
                        iconName="account-outline"
                        label="Full Name"
                        placeholder="Enter your full name"
                        error={errors.fullname}
                    />

                    <Input
                        keyboardType="number-pad"
                        onChangeText={text => handleOnchange(text, 'phone')}
                        onFocus={() => handleError(null, 'phone')}
                        iconName="phone-outline"
                        label="Phone Number"
                        placeholder="Enter your phone no"
                        error={errors.phone}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    />
                    <Input
                        keyboardType="default"
                        value={inputs.address}
                        onChangeText={text => handleOnchange(text, 'address')}
                        onFocus={() => handleError(null, 'address')}
                        iconName="contacts-outline"
                        label="Address"
                        placeholder="Enter Address"
                        multiline={true}
                        numberOfLines={8}
                        error={errors.address}
                    />
                    <TouchableOpacity onPress={() => getCurrentLocation()}>

                        <Text style={{ textAlign: 'right', paddingBottom: 5, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', color: COLORS.primary, fontWeight: 'bold' }}>
                            <MaterialCommunityIcons name="map-marker" color={COLORS.danger} size={25}></MaterialCommunityIcons>  Take Current Location</Text>
                    </TouchableOpacity>
                    <Text style={{ padding: 5, color: COLORS.darkgrey }}>
                        Uploading a picture is necessary to help our service partners identify you.
                    </Text>
                    <View style={styles.container}>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button1} onPress={() => openCamera()}>
                                <Text style={styles.text}>Capture Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button2} onPress={() => showImagePicker()} >
                                <Text style={styles.text}>Upload Image</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={{ uri: image }}
                                style={styles.profileImage}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={{ marginTop: 10 }}>
                        <PrimaryButton title="Register" onPress={ validate} ></PrimaryButton>
                    </TouchableOpacity>
                    <Text
                        onPress={() => navigation.navigate('Login')}
                        style={{
                            color: COLORS.darkgrey,
                            textAlign: 'center',
                            fontSize: 16,
                            marginTop: 5
                        }}>
                        Already have account ? <Text style={{ fontWeight: 'bold', color: COLORS.danger }}>Login</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: COLORS.greywhite,
        padding: 10
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button1: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 180
    },
    button2: {
        backgroundColor: COLORS.secondary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 180
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 0,

    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: COLORS.primary
    },
});