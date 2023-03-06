import React, { useState, useEffect } from 'react';
import { Avatar, Appbar } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../Constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import { connect } from 'react-redux';
//import { addServiceToMyCart } from './MyCartSlice';

import { useSelector } from 'react-redux';

const CartCountIcon = ({ title, count, navigation }) => {

    let updatedCount = useSelector(state => state.cart);
    const navigateToCart = () => {
        navigation.navigate("Cart");
    }

    const navigateTohomePage = () => {
        navigation.navigate("Home");
    }
    return (

        <Appbar.Header style={{ backgroundColor: COLORS.primary, color: COLORS.white }}>
            <Appbar.BackAction onPress={navigateTohomePage} />
            <Appbar.Content title={title} color={COLORS.white} />
            <Appbar.Action icon="cart" size={35} style={{ marginRight: -15 }} onPress={navigateToCart} />
            <Avatar.Text size={30} label={updatedCount.length} backgroundColor={COLORS.secondary} color={COLORS.black}
                style={{ marginTop: -30, marginRight: 20, backgroundColor: COLORS.secondary }} />
        </Appbar.Header>
    );

}

const mapStateToPtops = (state) => {
    return {
        cartItems: state
    }
}

export default connect()(CartCountIcon);
//export default CartCountIcon;
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
        marginTop: 10
    },
    textFriends: {
        frontsize: 20,
        textAlign: 'left',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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

