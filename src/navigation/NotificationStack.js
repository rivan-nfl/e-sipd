import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Notifikasi from '../screens/Notifikasi/Notifikasi';
import NotifikasiDetail from '../screens/Notifikasi/NotifikasiDetail';

const Stack = createStackNavigator();

const NotificationStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notifikasi List" component={Notifikasi} />
            <Stack.Screen name="Notifikasi Detail" component={NotifikasiDetail} />
        </Stack.Navigator>
    )
}

export default NotificationStack;