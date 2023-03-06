import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../Constants/Colors';
import { View } from 'react-native';
import HomeScreen from '../screens/HomeScreen'
import SearBarScreen from '../screens/SearchBarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import CartScreen from '../screens/CartScreen';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    // const [count, setCount] = useState(0);
    let count = 0;
    let g = useSelector(state => state.cart);
    count = g.length;
    return (
        <Tab.Navigator
            screenOptions={{
                style: {
                    height: 55,
                    borderTopWidth: 0,
                    elevation: 0,
                    color: COLORS.primary
                },
                headerTintColor: COLORS.white,
                headerStyle: { backgroundColor: COLORS.primary },
                tabBarInactiveTintColor: COLORS.darkgrey,
                tabBarActiveTintColor: COLORS.primary,
                showLabel: false,
                color: COLORS.primary,
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home-filled" color={color} size={28} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="person" color={color} size={28} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearBarScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                height: 60,
                                width: 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.white,
                                borderColor: COLORS.primary,
                                borderWidth: 2,
                                borderRadius: 30,
                                top: -25,
                                elevation: 5,
                            }}>
                            <Icon name="search" color={COLORS.primary} size={28} />
                        </View>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="My Orders"
                component={MyOrdersScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="local-mall" color={color} size={28} />
                    ),
                    headerShown: false,

                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarBadge: count,
                    tabBarIcon: ({ color }) => (
                        <Icon name="shopping-cart" color={color} size={28} />
                    ),
                    headerShown: false,

                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigator;