import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import COLORS from '../Constants/Colors';

const PrimaryButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={style.btnContainer}>
                <Text style={style.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};
const SecondaryButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...style.btnContainer, backgroundColor: COLORS.secondary }}>
                <Text style={{ ...style.title, color: COLORS.white }}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};
const GreyButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...style.btnContainer, backgroundColor: COLORS.grey }}>
                <Text style={{ ...style.title, color: COLORS.white }}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};
const DangerButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...style.btnContainer, backgroundColor: COLORS.tomato }}>
                <Text style={{ ...style.title, color: COLORS.white }}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    title: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 },
    btnContainer: {
        backgroundColor: COLORS.primary,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { PrimaryButton, SecondaryButton, GreyButton, DangerButton };