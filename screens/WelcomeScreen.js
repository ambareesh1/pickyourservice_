import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Avatar } from 'react-native-paper';
import { PrimaryButton } from '../Components/Button';
import COLOR from '../Constants/Colors';
import { fetchCategories, insertData } from '../services/dataservice';
import { useDispatch, useSelector } from 'react-redux';
import { addMyServices } from '../Components/MyServiceSlice';

const WelcomeScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const completeData = useSelector(state => state.service);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            if (completeData.length == 0) {
                data.map(item => {
                    dispatch(addMyServices(item))
                })
            }
        }
        loadCategories();
        //   insertData();
    }, []);

    return (
        <SafeAreaView style={styles.surface}>
            <View style={styles.logo}>
                <Avatar.Image size={350} source={require('../assets/logo.jpg')} />
            </View>
            <Text style={styles.logoSubTitle}>
                Pick our services to your door step.
            </Text>

            <View style={styles.login}>
                <Avatar.Icon style={styles.box} backgroundColor={COLOR.secondary} color={COLOR.secondary} size={50} icon="lamp" />
                <Avatar.Icon style={styles.box} backgroundColor={COLOR.secondary} color={COLOR.secondary} size={50} icon="pipe" />
                <Avatar.Icon style={styles.box} backgroundColor={COLOR.secondary} color={COLOR.secondary} size={50} icon="cctv" />
                <Avatar.Icon style={styles.box} backgroundColor={COLOR.secondary} color={COLOR.secondary} size={50} icon="fire" />
                <Avatar.Icon style={styles.box} backgroundColor={COLOR.secondary} color={COLOR.secondary} size={50} icon="city" />
            </View>
            <View style={styles.indicatorContainer}>
                <PrimaryButton
                    onPress={() => navigation.navigate('Login')}
                    title="Get Started"
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    surface: {
        flex: 1,
        backgroundColor: COLOR.white,
    },
    logo: {
        height: 350,
        resizeMode: 'contain',
        alignItems: 'center',
        marginTop: 50
    },
    logoSubTitle: {
        marginTop: 5,
        color: 'grey',
        textAlign: 'center'
    },
    indicatorContainer: {
        paddingHorizontal: 80,
        marginTop: 70,
        backgroundColor: '#fff'
    },
    login: {
        color: '#fff',
        justifyContent: 'space-evenly',
        padding: 5,
        flexDirection: "row",
        position: 'relative',
        marginTop: 40
    },
    box: {
        backgroundColor: COLOR.white,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    }

})


export default WelcomeScreen