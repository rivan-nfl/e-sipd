import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import DaftarAnggota from '../screens/Anggota/DaftarAnggota';
import DaftarDipa from '../screens/DIPA/DaftarDipa';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home Page" component={Home} />
            <Stack.Screen name="Daftar Anggota" component={DaftarAnggota} />
            <Stack.Screen name="Daftar Dipa" component={DaftarDipa} />
        </Stack.Navigator>
    )
}

export default HomeStack;