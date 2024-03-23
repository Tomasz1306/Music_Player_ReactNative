import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register, Playlists, Playlist, Player, Menu, Settings, Statistics, User_Profile, Login, AddTrack, Pedometer, Cam } from "../views";
import MyDrawer from "./drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const optionScreen = {
    headerShown: false
}
function Root({ route }) {
    return <MyDrawer route={route}/>;
}
function Opd() {
    MyDrawer.openDrawer();
}

export default function StackNav() {
    return (
         <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={optionScreen} />
             <Stack.Screen name="Register" component={Register} options={optionScreen}/>
            <Stack.Screen name="Menu" component={Menu} options={optionScreen}/>
            <Stack.Screen name="Player" component={Player} options={optionScreen}/>
             <Stack.Screen name="Playlists" component={Playlists} options={optionScreen} />
             <Stack.Screen name="Playlist" component={Playlist} options={optionScreen}/>
             <Stack.Screen name="Settings" component={Settings} options={optionScreen}/>
             <Stack.Screen name="Statistics" component={Statistics} options={optionScreen} />
            <Stack.Screen name="AddTrack" component={AddTrack} options={optionScreen} />
            <Stack.Screen name="Pedometer" component={Pedometer} options={optionScreen} />
            <Stack.Screen name="User_Profile" component={User_Profile} options={optionScreen} />
            <Stack.Screen name="Cam" component={Cam} options={optionScreen} />
            <Stack.Screen name="Root" component={Root} options={optionScreen} />

         </Stack.Navigator>

    );
}