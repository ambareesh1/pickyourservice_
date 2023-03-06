import React, { useState, useEffect } from 'react';
import { Text, Avatar, Divider } from 'react-native-paper';
import { StyleSheet, SafeAreaView, View, Dimensions, Image, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatCurrency } from "react-native-format-currency";
import COLORS from '../Constants/Colors';
import dataservice, { fetchCategories } from '../services/dataservice';
import CartCountIcon from '../Components/CartCountIcon';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, selectAllProducts } from '../Components/MyServiceSlice';
import { addServiceToMyCart, updateServiceInMyCart } from '../Components/MyCartSlice';
import { updateMyServices } from '../Components/MyServiceSlice';
import { addMyServices } from '../Components/MyServiceSlice';


const SearchBarScreen = ({ navigation }) => {


    const dispatch = useDispatch();
    const allCategoriesData = useSelector(state => state.service);
    const [filterdata, setFilteredData] = useState([]);
    const [servicesFiltered, setServiceFilter] = useState([]);
    const cartData = useSelector(state => state.cart);
    const cartCount = cartData.count;

    useEffect(() => {
        const cat = allCategoriesData.map(category => category.subCategories).flat();
        setServiceFilter(cat.filter(x => x.details != null));
        const services = servicesFiltered.map(subCategory => subCategory.details).flat();
        setFilteredData(services);
        console.log(services);
    }, [allCategoriesData, cartData])


    const handleAddToCart = (service) => {
        const item = { ...filterdata[service] };
        const updatedItem = { ...item, isActive: !item.isActive };
        let payload = payLoadData(service);

        let isDataAdded = cartData.length > 0 ? cartData.filter(x => x._key == item._key)[0] : null;
        if (isDataAdded != null && isDataAdded !== undefined) {
            dispatch(updateServiceInMyCart(payload));
        } else {
            if (updatedItem.isActive) {
                dispatch(addServiceToMyCart(payload));
            }
        }
        dispatch(updateMyServices(payload));
    };

    const onSearchChangeText = (text) => {

        if (text) {
            const newData = filterdata.filter(item => {
                const itemData = item.service ? item.service.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredData(newData);

        } else {
            setFilteredData(data);
        }
    }

    const getImageUrl = (imageUrl) => {
        const ref = imageUrl;
        const splitedUrl = ref.split('-');
        const id = splitedUrl[1] + '-' + splitedUrl[2] + '.' + splitedUrl[3];
        const url = `https://cdn.sanity.io/images/jhnl5pei/production/${id}`;
        return url;
    }

    const payLoadData = (service) => {
        let categoryIndex = -1;
        let serviceIndex = -1;
        let serviceKey = "";
        let payload = [];
        const item = { ...filterdata[service] };
        const newData = [...filterdata];
        const updatedItem = { ...item, isActive: !item.isActive };
        newData[service] = updatedItem;
        setFilteredData(newData);

        for (let i = 0; i < servicesFiltered.length; i++) {
            for (const element of servicesFiltered[i].details) {
                if (element._key === updatedItem._key) {
                    serviceIndex = i;
                    serviceKey = servicesFiltered[i]._key;
                    break;
                }
            }
        }

        for (let i = 0; i < allCategoriesData.length; i++) {
            for (const element of allCategoriesData[i].subCategories) {
                if (element._key === serviceKey) {
                    categoryIndex = i;
                    break;
                }
            }
        }
        //console.log(categoryIndex + "-" + serviceIndex);
        payload = { ...updatedItem, "categoryIndex": categoryIndex, "serviceIndex": serviceIndex };
        return payload;
    }
    const showError = (errorMsg) => {
        Alert.alert(
            'Error',
            errorMsg,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <CartCountIcon title={"Search" + " Services"} count={cartCount} navigation={navigation} />

            <View style={style.inputContainer}>
                <FontAwesome name="search" size={28} />

                <TextInput onChangeText={text => onSearchChangeText(text)}
                    style={{ flex: 1, fontSize: 18, paddingLeft: 5 }}
                    placeholder="Search for service" />
            </View>
            <ScrollView>
                {
                    filterdata !== undefined && filterdata !== null && filterdata.length > 0 ? filterdata.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => { handleAddToCart(index) }}>
                                <View key={index} style={style.itemContainer}>
                                    <Image
                                        source={{ uri: getImageUrl(item.image.asset._ref) }}
                                        style={{
                                            resizeMode: 'cover', width: 85,
                                            height: 85,
                                            borderRadius: 5,
                                            marginBottom: 5
                                        }} />
                                    <View>
                                        <Text style={item.isActive ? style.textName : style.textNameBold}>{item.service} </Text>
                                        <Text style={style.amountText}>{formatCurrency({ amount: item.price, code: "INR" })[0]}</Text>
                                        <Text style={item.isActive ? style.textEmailPrimary : style.textEmail}>{item.isActive ? "Available" : "Unavaiable"}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginTop: -20, marginRight: '8%', flexWrap: 'wrap' }}>
                                        <FontAwesome name="check-circle" size={40} style={item.isActive ? style.selectedItem : style.unselectedItem}></FontAwesome>
                                    </View>

                                </View>
                                <Divider style={{ borderBottomColor: COLORS.primary, padding: 1 }} /></TouchableOpacity>
                        )
                    }) : []
                }
            </ScrollView>
        </SafeAreaView>
    )


};

export default SearchBarScreen;
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
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: COLORS.greywhite,
    },
    textFriends: {
        frontsize: 20,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 10
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10
    },
    imageStyle: {
        width: 85,
        height: 85,
        borderRadius: 5,
        resizeMode: 'contain',
        marginBottom: 5
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        color: COLORS.darkgrey,
        fontWeight: 'bold'
    },
    amountText: {
        fontSize: 18,
        marginLeft: 10,
        color: COLORS.primary,
        borderColor: COLORS.dark,
        padding: 5,
        fontWeight: '700'
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: COLORS.darkgrey
    },
    textNameBold: {
        fontSize: 17,
        marginLeft: 10,
        color: COLORS.darkgrey,
    },
    textEmailPrimary: {
        fontSize: 14,
        marginLeft: 10,
        color: COLORS.success
    },
    selectedItem: {
        textAlign: 'left',
        color: COLORS.secondary,
        justifyContent: 'flex-end'
    },
    unselectedItem: {
        textAlign: 'left',
        color: COLORS.grey,
        justifyContent: 'flex-end'
    }
})