import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { User_Profile, Menu,  } from "../views";
import {Pedometer} from "../views";
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Drawer = createDrawerNavigator();

const FilterScreen = ({navigation}) => {

    return (
        <View style={styles.container_drawer}>
            <Pressable onPress={() => { navigation.navigate('Menu') }}>
                <Text style={styles.drawer_pressable}>Menu</Text>
            </Pressable>
            <Pressable onPress={() => { navigation.navigate('User_Profile') }}>
                <Text style={styles.drawer_pressable}>User Profile</Text>
            </Pressable>
            <Pressable onPress={() => { navigation.navigate('Pedometer')}}>
                <Text style={styles.drawer_pressable}>Gyroscope</Text>
            </Pressable>
        </View>
    );
}

export default function MyDrawer() {
    return (
        <Drawer.Navigator screenOptions={{ drawerPosition: 'right' }} drawerContent={(props) => <FilterScreen {...props} />} >
            <Drawer.Screen name="Menu" options={{ headerShown: false }} component={Menu} />
            <Drawer.Screen name="User_Profile" options={{ headerShown: false }} component={User_Profile} />
            <Drawer.Screen name="Pedometer" options={{ headerShown: false }} component={Pedometer} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container_drawer: {
        flex: 1,
        backgroundColor: '#280A46',
    },
    drawer_pressable: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 30,
        marginTop: 20,
        alignItems: 'center'
    },
});
