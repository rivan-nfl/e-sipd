import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import DaftarAnggota from '../screens/Anggota/DaftarAnggota';
import DaftarDipa from '../screens/DIPA/DaftarDipa';
import DaftarPerjalanan from '../screens/Perjalanan';
import AnggaranPerjalanan from '../screens/Perjalanan/AnggaranPerjalanan';
import LaporanPerjalanan from '../screens/Perjalanan/LaporanPerjalanan';
import AnggaranPerjalananDetail from '../screens/Perjalanan/AnggaranPerjalananDetail';
import EditAnggaran from '../screens/Anggaran/EditAnggaran';
import CreateAnggaran from '../screens/Anggaran/CreateAnggaran';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home Page" component={Home} />
            <Stack.Screen name="Daftar Anggota" component={DaftarAnggota} />
            <Stack.Screen name="Daftar Dipa" component={DaftarDipa} />
            <Stack.Screen name="Daftar Perjalanan" component={DaftarPerjalanan} />
            <Stack.Screen name="Anggaran Perjalanan" component={AnggaranPerjalanan} />
            <Stack.Screen name="Anggaran Perjalanan Detail" component={AnggaranPerjalananDetail} />
            <Stack.Screen name="Create Anggaran" component={CreateAnggaran} />
            <Stack.Screen name="Edit Anggaran" component={EditAnggaran} />
            <Stack.Screen name="Laporan Perjalanan" component={LaporanPerjalanan} />
        </Stack.Navigator>
    )
}

export default HomeStack;