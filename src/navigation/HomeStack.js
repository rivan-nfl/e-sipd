import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import DaftarAnggota from '../screens/Anggota/DaftarAnggota';
import DaftarDipa from '../screens/DIPA/DaftarDipa';
import DaftarPerjalanan from '../screens/Perjalanan';
import AnggaranPerjalanan from '../screens/Perjalanan/AnggaranPerjalanan';
import LaporanPerjalanan from '../screens/Perjalanan/LaporanPerjalanan';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home Page" component={Home} />
            <Stack.Screen name="Daftar Anggota" component={DaftarAnggota} />
            <Stack.Screen name="Daftar Dipa" component={DaftarDipa} />
            <Stack.Screen name="Daftar Perjalanan" component={DaftarPerjalanan} />
            <Stack.Screen name="Anggaran Perjalanan" component={AnggaranPerjalanan} />
            <Stack.Screen name="Laporan Perjalanan" component={LaporanPerjalanan} />
        </Stack.Navigator>
    )
}

export default HomeStack;