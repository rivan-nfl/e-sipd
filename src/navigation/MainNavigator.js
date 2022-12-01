import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';

import { getAllNotifications } from '../service/notificationService';
import { COLORS } from '../utils/colors';

import NotificationStack from './NotificationStack.js';
import Akun from '../screens/Akun';
import HomeStack from './HomeStack';


const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    // Loads
    useEffect(() => {
        getAllNotifications(token)
        .then(res => {
          dispatch({type: 'SAVE_NOTIFIKASI', data: res.data.data})
        //   for(let i = 0; i < res.data.data.length; i++) {
        //     if(res.data.data[i].status == 'close') {
        //         setNewNotif(true)
        //         break
        //     }
        //   }
        })
        .catch(err => {
            console.log('err =', err.response.data)
            alert(err.response.data.message)
        })
      }, [])

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: COLORS.GREEN,
            tabBarInactiveTintColor: COLORS.GRAY,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if(route.name == 'Home') {
                    iconName = focused ? 'home' : 'home-outline'
                } else if(route.name == 'Notifikasi') {
                    iconName = focused ? 'notifications' :  'notifications-outline'
                } else {
                    iconName = focused ? 'person' : 'person-outline'
                }

                return <Icon name={iconName} color={focused ? COLORS.GREEN : COLORS.GRAY} size={25} />
            }
        })}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Notifikasi" component={NotificationStack} />
            <Tab.Screen name="Akun" component={Akun} />
        </Tab.Navigator>
    )
}

export default MainNavigator;