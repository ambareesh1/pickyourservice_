import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    ImageBackground,
    Avatar, Divider, Badge, Appbar, Card, Title, Paragraph
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, SafeAreaView, View, Dimensions, Image, TextInput, ScrollView, FlatList, Button } from 'react-native';
import COLORS from '../Constants/Colors';
import HomeScreen from './HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from "../services/UserContext";
import {fetchOrders} from '../services/dataservice';

const MyOrders = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);


    useEffect(() => {
        getOrderHistory(user.phoneNo);
    }, []);

    const getOrderHistory = async (phoneNo) => {
        try {
                let data = await fetchOrders(phoneNo).catch((error)=>console.log(error));
                setData(data);
                console.log("-------service items -------");
               console.log(data);
            } 
          catch (error) {
            console.error(error);
        }
    };

    const onSearchChangeText = (text) => {
        if (text) {
            const newData = data.filter(item => {
                const itemData = item.serviceType ? item.serviceType.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilteredData(newData);
        } else {
            setFilteredData(data);
        }
    }

    const navigateTohomePage = () => {
        navigation.navigate("Home", Home);
    }
    const navigateToInvoiceDetails = () => {
        navigation.navigate("InvoiceDetails");
    }
    const navigateToTracking = () => {
        navigation.navigate("Maps");
    }
    const getPrefferedColor = (status) => {
        switch (status) {
            case 'Order Raised':
                return "#E65100";
            case 'In Progress':
                return "#F9A825";
            case 'Completed':
                return '#4CAF50';
            case 'Cancelled':
                return '#F44336';
            default:
                return COLORS.darkgrey;
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <ScrollView>
                {
                    data.map((item, index) => {
                        return (
                            <View key={index}><View style={style.itemContainer}>
                                <Card style={{ borderColor: COLORS.darkgrey, margin: 2 }}>

                                    <View style={{ padding: 5, borderColor: COLORS.white, marginBottom: 20, margin: 5}}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor:COLORS.white,  borderRadius: 20  }}>
                                            <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>Order #: {item.serviceRequestId}</Text>
                                            <Text style={{ color: COLORS.darkgrey }}><FontAwesome name="circle" color={getPrefferedColor(item.status)} size={15}></FontAwesome>  {item.status}</Text>
                                        </View>
                                    </View>

                                    <Card.Content>
                                        <Text style={{ color: COLORS.dark, textAlign: 'right' }}><FontAwesome name="calendar" size={15}></FontAwesome>  {item.requestRaisedOn}</Text>
                                        {data[index].serviceItems.map((serviceItem, index)=>{
                                         return (  <Paragraph style={{ fontSize: 16, paddingBottom:5 }}>{serviceItem.service} x {serviceItem.count}</Paragraph>
                                         )
                                        })}
                                    </Card.Content>
                                    <Card.Actions style={{ borderTopColor: COLORS.darkgrey, borderTopWidth: 0.1, marginTop: 0, flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <View style={{ flexDirection: 'row', paddingRight: 30, justifyContent: 'flex-start' }}>
                                            {item.status == "In Progress" &&
                                                <><MaterialCommunityIcons name="map-marker-outline" color={COLORS.tomato} size={30}></MaterialCommunityIcons>
                                                    <Button 
                                                     mode="outlined"
                                                     style={{ borderRadius: 10 }}
                                                        onPress={navigateToTracking}
                                                        title="Track Our Partner"
                                                        color={COLORS.secondary}
                                                    /></>}
                                        </View>
                                        <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'flex-end' }}>

                                            <Button
                                                onPress={navigateToInvoiceDetails}
                                                title="Order Details"
                                                color={COLORS.primary}
                                            />
                                        </View>
                                    </Card.Actions>
                                </Card>
                            </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
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

        marginLeft: 5,
        marginTop: 5
    },
    textFriends: {
        frontsize: 20,
        textAlign: 'left',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10
    },
    itemContainer: {

        marginLeft: 10,
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
    }
})

export default MyOrders;