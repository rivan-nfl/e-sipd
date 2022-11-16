import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MainNavigator from './MainNavigator';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import DetailAnggota from '../screens/Anggota/DetailAnggota';
import EditAnggota from '../screens/Anggota/EditAnggota';
import DetailDipa from '../screens/DIPA/DetailDipa';
import EditDipa from '../screens/DIPA/EditDipa';
import ESIPD from '../screens/ESIPD';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Main" component={MainNavigator} />
            {/* Anggota */}
            <Stack.Screen name="Detail Anggota" component={DetailAnggota} />
            <Stack.Screen name="Edit Anggota" component={EditAnggota} />
            {/* DIPA */}
            <Stack.Screen name="Detail Dipa" component={DetailDipa} />
            <Stack.Screen name="Edit Dipa" component={EditDipa} />
            {/* E-SIPD */}
            <Stack.Screen name="ESIPD" component={ESIPD} />
        </Stack.Navigator>
    )
}

export default AppStack;