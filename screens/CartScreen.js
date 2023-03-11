import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    Text, TextInput,
    ImageBackground,
    Button, Avatar, Divider, Badge, Appbar, Card, Title, Paragraph, DataTable,
    Dialog, Portal
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, SafeAreaView, View, Dimensions, Image, ScrollView, FlatList, Platform } from 'react-native';
import COLORS from '../Constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SecondaryButton } from '../Components/Button';
import { useSelector } from 'react-redux';
import { formatCurrency } from "react-native-format-currency";
import { useDispatch } from 'react-redux';
import { updateServiceInMyCart } from '../Components/MyCartSlice';
import { updateMyServices } from '../Components/MyServiceSlice';
import * as ImagePicker from 'expo-image-picker/src/ImagePicker';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from "../services/UserContext";
import * as Location from 'expo-location';
import { createUser, uploadImage, deleteRow } from '../services/dataservice'


const CartScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [visible, setVisible] = useState(false);
    const [deleteItem, setDeleteItem] = useState(0);
    const [text, setText] = useState('');
    const maxLength = 1000;
    const [images, setImages] = useState([]);
    const [imageStorage, setImageStorage] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [address, setAddress] = useState("#2-62, Guttur, Penukonda, Anantapur, 515164");
    const [locationPermission, setLocationPermission] = useState(null);
  

    useEffect(() => {
        setData(cartItems);
        setTotal(data.length > 0 ? data.map(x => x.price).reduce((a, b) => a + b, 0) : 0);
    }, [cartItems]);

    const calculateTotal = (value, id) => {

        if (value == 0) {
            setDeleteItem(id);
            showDialog();
        } else {
            let updateCountIdex = cartItems.findIndex(x => x._key === id);
            const item = { ...data[updateCountIdex] };
            const newData = [...data];
            const updatedItem = { ...item, count: value };
            newData[updateCountIdex] = updatedItem;
            setData(newData);

            const total = newData.reduce((acc, service) => {
                return acc + (service.price * service.count);
            }, 0);
            setTotal(total);
        }
    }

    const deleteItemFromCart = () => {
        const itemSelected = cartItems.filter(x => x._key == deleteItem)[0];
        dispatch(updateMyServices(itemSelected));
        dispatch(updateServiceInMyCart(itemSelected));
        setVisible(false);
    }

    const navigateTohomePage = () => {
        navigation.navigate("Home");
    }
    const showDialog = () => setVisible(true);

    const setSelectedServiceValueToDefault = (id) => {

        let updateCountIdex = cartItems.findIndex(x => x._key === id);
        const item = { ...data[updateCountIdex] };
        const newData = [...data];
        const updatedItem = { ...item, count: 1 };
        newData[updateCountIdex] = updatedItem;
        setData(newData);
        setVisible(false);
    }

    const hideDialog = () => {
        setSelectedServiceValueToDefault(deleteItem);
    }


    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = () => {
        setShowDatePicker(true);
    };

    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status === 'granted');
            if (locationPermission) {
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
                }
                if (address[0].district !== null) {
                    currentLocation = currentLocation + address[0].district + ", ";
                }
                if (address[0].city !== null) {
                    currentLocation = currentLocation + address[0].city + ", ";
                }
                if (address[0].country !== null) {
                    currentLocation = currentLocation + address[0].country;
                }
                setAddress(currentLocation);
            }

        } catch (error) {
            console.error(error);
        }

    }

    const navigateToProgress = () => {
        navigation.navigate("ProgressScreen");
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
            setImages([...images, result.uri]);
            images.map((x)=>{
                setImageStorage(...imageStorage,  uploadImage(x).catch((error)=>console.log(error)));
            })
           console.log(imageStorage);
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

            quality: 0.8,
        });

        if (!result.canceled) {
            setImages([...images, result.uri]);
            images.map((x)=>{
                setImageStorage(...imageStorage,  uploadImage(x).catch((error)=>console.log(error)));
            })
           console.log(images);
        }
    }

    const handleChangeText = (value) => {
        if (value.length <= maxLength) {
            setText(value);
        }
    };

    const displayImages = () => {
        return images.map((image, index) => {
            return (
                <View key={index} style={style.imageContainer}>
                    <Image source={{ uri: image }} style={style.image} />
                    <TouchableOpacity
                        style={style.deleteButton}
                        onPress={() => deleteImage(index)}
                    >
                        <MaterialCommunityIcons name="delete" color={COLORS.tomato} size={20}></MaterialCommunityIcons>

                    </TouchableOpacity>
                </View>
            );
        });
    };
    const deleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const insertServiceRequest = () =>{
        let data = {
            "_type": "serviceRequest",
            "serviceRequestId": "",
            "requestById": user.id,
            "requestBy": user.name,
            "phoneNo": user.phoneNo,
            "email": user.email,
            "address": user.address,
            "latitude": "37.7749",
            "longitude": "-122.4194",
            "pickDateToservice": currentDate,
            "problemDescription": text,
            "subTotal": total,
            "GST": "2.50",
            "otherServiceTax": "1.00",
            "discount": "0.00",
            "totalCost": total*2.50,
            "images": [
              {
                "_type": "image",
                "asset": {
                  "_ref": "image-123",
                  "_type": "reference"
                }
              }
            ],
            "serviceItems": [
              {
                "_type": "object",
                "categoryId": "1",
                "subCategoryId": "2",
                "serviceId": "3",
                "serviceName": "Faucet Repair"
              }
            ],
            "assignedTo": [
              {
                "_type": "object",
                "id": "1",
                "patnerName": "Jane Smith",
                "patnerphone": "555-5678",
                "patneremail": "jane.smith@example.com",
                "aadhar": "1234-5678-9012",
                "rating": "4.5",
                "serviceCharge": "50.00",
                "transactionId": "TX001"
              }
            ]
          }
          
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: COLORS.primary }}>
                <Appbar.BackAction onPress={navigateTohomePage} />
                <Appbar.Content title="Cart" />
            </Appbar.Header>
            <ScrollView>
                {cartItems.length > 0 ? <View style={style.itemContainer}>
                    <DataTable >
                        <DataTable.Header>
                            <DataTable.Title style={{ width: 50 }}>
                                Service
                            </DataTable.Title>
                            <DataTable.Title numeric>Qunatity</DataTable.Title>
                            <DataTable.Title numeric>Amount</DataTable.Title>
                        </DataTable.Header>
                        {data.map((item, index) => <DataTable.Row key={index}>
                            <DataTable.Cell >{item.service}</DataTable.Cell>

                            <DataTable.Cell numeric style={{ width: 120 }}>

                                {item.isSqFeetIncluded ? < TextInput style={{ backgroundColor: COLORS.white, width: 110, textAlign: 'center' }}

                                    keyboardType='number-pad'
                                    value={item.count}
                                    minValue={1}
                                    maxValue={50000}
                                    placeholder={"Enter sq.ft"}
                                    onChangeText={value => calculateTotal(value, item._key)}
                                /> : <NumericInput
                                    totalWidth={80}
                                    totalHeight={35}
                                    value={item.count}
                                    iconSize={35}
                                    step={1}
                                    minValue={0}
                                    maxValue={30}
                                    valueType='integer'
                                    borderColor={COLORS.grey}
                                    rounded
                                    textColor={COLORS.primary}
                                    iconStyle={COLORS.white}

                                    onChange={value => calculateTotal(value, item._key)}
                                />
                                }
                            </DataTable.Cell>


                            <DataTable.Cell numeric> {formatCurrency({ amount: item.price, code: "INR" })[0]}</DataTable.Cell>
                        </DataTable.Row>)}
                        <DataTable.Row style={{ backgroundColor: COLORS.secondary, marginTop: '2%' }}>
                            <DataTable.Cell>Total Amount</DataTable.Cell>
                            <DataTable.Cell></DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'flex-end', color: COLORS.tomato, fontWeight: 600 }}>
                                {formatCurrency({ amount: total, code: "INR" })[0]}
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>

                    <Divider style={{ borderBottomColor: COLORS.primary, padding: 1 }} />
                    <Card>
                        <Card.Content>
                            <Paragraph>Place the images of service appliances.</Paragraph>
                            <Button icon="camera" mode="contained" style={{ marginTop: 10, backgroundColor: COLORS.primary, color: COLORS.white, borderRadius: 15 }} onPress={() => openCamera()}>
                                Capture Image
                            </Button>
                            <Button icon="folder" mode="contained" style={{ marginTop: 15, backgroundColor: COLORS.primary, color: COLORS.white, borderRadius: 15 }} onPress={() => showImagePicker()}>
                                Upload Image
                            </Button>
                            <View style={style.imagesContainer}>{displayImages()}</View>
                        </Card.Content>
                    </Card>
                    <Divider style={{ borderBottomColor: COLORS.primary, padding: 1 }} />
                    <Card>
                        <Card.Content>

                            <Text style={style.heading}>When do you want the service ?</Text>
                            <TouchableOpacity style={style.dateContainer} onPress={() => showMode()}>
                                <Text style={style.showDatePickerButton}>
                                    <MaterialCommunityIcons name="calendar" color={COLORS.primary} size={25}></MaterialCommunityIcons>
                                </Text>
                                <Text style={style.date}>{date.toDateString("DD-MM-YYY")}</Text>

                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    minimumDate={new Date()}
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}


                        </Card.Content>
                    </Card>
                    <Divider style={{ borderBottomColor: COLORS.primary, padding: 1 }} />
                    <Card>
                        <Card.Content>


                            <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => getCurrentLocation()}>
                                <Text style={{ marginTop: 6, marginLeft: 6, color: COLORS.darkgrey }}> Pick Location</Text>
                                <TouchableOpacity style={style.locationButton}>
                                    <MaterialCommunityIcons name="map-marker" color={COLORS.danger} size={25}></MaterialCommunityIcons>
                                </TouchableOpacity>
                            </TouchableOpacity>
                            <View>
                                <TextInput

                                    multiline
                                    numberOfLines={5}
                                    placeholder="Enter your address"
                                    value={address}
                                    onChangeText={setAddress}
                                />
                            </View>
                        </Card.Content>
                    </Card>
                    <Divider style={{ borderBottomColor: COLORS.primary, padding: 1 }} />
                    <Card>
                        <Card.Content >
                            <Text style={{ color: COLORS.darkgrey }}>
                                Describe your problem ( <Text>{`${text.length}/${maxLength}`}</Text>)
                            </Text>
                            <TextInput
                                multiline
                                mode="outlined"
                                numberOfLines={5}
                                maxLength={maxLength}
                                onChangeText={handleChangeText}
                                value={text}
                                placeholder="Provide the clear description of appliances like Item names , quantity & specify the problem facing"
                            />
                        </Card.Content>
                    </Card>
                    <View style={{ marginTop: '5%', marginBottom: '6%', margin: 5 }}>
                        <SecondaryButton title={'Book Service'} onPress={() => navigateToProgress()} />
                    </View>

                </View> : <View style={style.noCartItems}>
                    <Text style={style.noCartItemsText}>Cart is empty, Please select the service</Text>
                </View>}

                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title style={{
                        color: COLORS.primary, fontSize: 14
                    }}>Do you want to delete the item from cart ?</Dialog.Title>

                    <Dialog.Actions >
                        <Button color={COLORS.primary} onPress={hideDialog}>Cancel</Button>
                        <Button color={COLORS.primary} onPress={deleteItemFromCart}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>

            </ScrollView >
        </SafeAreaView >
    );

}



const style = StyleSheet.create({

    inputContainer: {
        marginTop: "1%",
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    itemContainer: {

        margin: 0
    },
    textFriends: {
        frontsize: 20,
        textAlign: 'left',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10
    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 5,
        resizeMode: 'contain',
        marginBottom: 5
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600",
        color: COLORS.darkgrey
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: COLORS.darkgrey
    },
    textEmailPrimary: {
        fontSize: 14,
        marginLeft: 10,
        color: COLORS.primary
    },
    selectedItem: {
        textAlign: 'left',
        color: COLORS.primary,
        justifyContent: 'flex-end'
    },
    unselectedItem: {
        textAlign: 'left',
        color: COLORS.grey,
        justifyContent: 'flex-end'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        width: 200,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#ddd',
    },
    captureButton: {
        padding: 15,
        backgroundColor: '#000',
        borderRadius: 5,
    },
    captureButtonText: {
        color: '#fff',
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageContainer: {
        width: 100,
        height: 100,
        margin: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#eeee',
        padding: 1,
    },
    deleteText: {
        color: 'white',
    },
    noCartItems: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    heading: {
        fontSize: 18,
        marginBottom: 10,
        color: COLORS.darkgrey
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontSize: 18,
        marginLeft: 10,
    },
    showDatePickerButton: {
        color: 'blue',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    textInput: {
        height: 60,
        borderWidth: 1,
        borderColor: COLORS.greywhite,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    locationButton: {
        backgroundColor: COLORS.greywhite,
        width: 30,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column-reverse',
        color: COLORS.secondary,
        marginBottom: 5
    }
});


export default CartScreen;

