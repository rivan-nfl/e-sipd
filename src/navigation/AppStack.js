import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import MainNavigator from './MainNavigator';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import DetailAnggota from '../screens/Anggota/DetailAnggota';
import EditAnggota from '../screens/Anggota/EditAnggota';
import DetailDipa from '../screens/DIPA/DetailDipa';
import EditDipa from '../screens/DIPA/EditDipa';
import ESIPD from '../screens/ESIPD';
import EditESIPD from '../screens/ESIPD/EditESIPD';
import DetailPerjalanan from '../screens/Perjalanan/DetailPerjalanan';
import EditProfilAdmin from '../screens/Admin/EditProfilAdmin';

const Stack = createStackNavigator();

const AppStack = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                !isLoggedIn
                    ? <>
                        <Stack.Screen name="Login" component={Login} />
                    </>
                    : <>
                        <Stack.Screen name="Main" component={MainNavigator} />
                        <Stack.Screen name="Register" component={Register} />
                        {/* Anggota */}
                        <Stack.Screen name="Detail Anggota" component={DetailAnggota} />
                        <Stack.Screen name="Edit Anggota" component={EditAnggota} />
                        {/* DIPA */}
                        <Stack.Screen name="Detail Dipa" component={DetailDipa} />
                        <Stack.Screen name="Edit Dipa" component={EditDipa} />
                        {/* E-SIPD */}
                        <Stack.Screen name="ESIPD" component={ESIPD} />
                        <Stack.Screen name="Edit ESIPD" component={EditESIPD} />
                        <Stack.Screen name="Detail Perjalanan" component={DetailPerjalanan} />
                        {/* Admin */}
                        <Stack.Screen name="Edit Admin" component={EditProfilAdmin} />
                    </>
            }
        </Stack.Navigator>
    )
}

export default AppStack;