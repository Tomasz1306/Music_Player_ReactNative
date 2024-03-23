import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import IconI from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
export function Menu  ({route , navigation })  {
    return (
        <View style={styles.container}>
          <LinearGradient 
          start={[0.1, 0.1]}
          style={styles.gradient} colors={["#330066", "#222222"]} >

          <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
                        <IconI name="ellipsis-vertical" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          </View>  
        
        <View style={styles.body}>
        <TouchableOpacity style={styles.menuItem2}>
            <Text style={styles.MenuText}>MENU</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Player')}>
            <Text style={styles.NavigationText}>Actual Track</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Playlists')}>
            <Text style={styles.NavigationText}>Playlists</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.NavigationText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Statistics')}>
            <Text style={styles.NavigationText}>Statistic</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>

        </View>
        </LinearGradient>
      </View>
      );
};

export default Menu;