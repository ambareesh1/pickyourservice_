import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import COLORS from '../Constants/Colors';
import { Paragraph, TextInput } from 'react-native-paper';
import { SecondaryButton } from '../Components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function CircleWithText(props) {
    const { text } = props;
    return (
        <View style={styles.circleContainer}>

            <View style={styles.circle}>

            </View>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

function ProgressScreen() {
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={{ backgroundColor: COLORS.primary, color: COLORS.white, flex: 1, height: 60 }}>

                    <Text style={{ paddingTop: 20, color: COLORS.white, fontSize: 16, paddingLeft: 5 }}> Thank you for raising the order.</Text>

                        <Text style={{ paddingTop: 20, color: COLORS.white, fontSize: 16, paddingLeft: 5 }}> Service Order Request # 100007287</Text>

                    </View>
                    <View style={styles.container}>
                        <CircleWithText text="Created service order and will progress with services" />
                        <View style={styles.line} />
                        <CircleWithText text="Service Order is assigned to our partners. Our partners Ranjnath Sign & Vikranth Dev are happy to serve you." />
                        <View style={styles.line} />
                        <CircleWithText text="Our patners are on the way to provide their service." />
                        <View style={styles.line} />
                        <CircleWithText text="Thank you for the order. See you again" />
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 5, marginRight: 3 }}>
                        <Paragraph style={{ color: COLORS.darkgrey }}> Assinged workers:</Paragraph>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
                            <Paragraph>Rajnath Singh</Paragraph>
                            <FontAwesome size={20} color={COLORS.secondary} name='star'></FontAwesome>
                            <FontAwesome size={20} color={COLORS.secondary} name='star'></FontAwesome>
                            <FontAwesome size={20} color={COLORS.secondary} name='star'></FontAwesome>
                            <FontAwesome size={20} color={COLORS.secondary} name='star-o'></FontAwesome>
                            <FontAwesome size={20} color={COLORS.secondary} name='star-o'></FontAwesome>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
                            <Paragraph>Vikranth Dev</Paragraph>
                            <FontAwesome size={20} color={COLORS.secondary} name='star'></FontAwesome>
                            <FontAwesome size={20} color={COLORS.secondary} name='star'></FontAwesome>
                            <FontAwesome size={20} color={COLORS.secondary} name='star'></FontAwesome>
                            <FontAwesome size={20} color={COLORS.secondary} name='star'></FontAwesome>
                            <FontAwesome size={20} color={COLORS.secondary} name='star-o'></FontAwesome>
                        </View>
                        <TextInput
                            multiline
                            mode="outlined"
                            numberOfLines={5}
                            value={""}
                            placeholder="Provide your valueable review."
                        />
                    </View>
                    <View style={{ marginTop: '1%', marginBottom: '2%', margin: 5 }}>
                        <SecondaryButton title={'Submit Review'} />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        marginTop: 10
    },
    circleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.primary
    },
    text: {
        color: COLORS.darkgrey,
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 10
    },
    line: {
        width: 2,
        height: 70,
        backgroundColor: COLORS.darkgrey,
        marginLeft: 15
    },
});



export default ProgressScreen;
