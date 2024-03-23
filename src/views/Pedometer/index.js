import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import styles from './style';
import { useMusicPlayer } from '../MusicPlayerContext';
import { LinearGradient } from 'expo-linear-gradient';
import IconI from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


//import React, { useState, useEffect } from 'react';
//import { View, Text } from 'react-native';
//import { Gyroscope } from 'expo-sensors';

const Pedometer = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  let zmienna = true;
  const [lokalna, setLokalna] = useState(true);
  const { index, setIndex, setTrackName, trackName, currentTrack, isPlaying, setIsPlaying,
    setTrack, togglePlay, playSound, stopSound, setSound, sound, getTrackDuration, setCurrentTrack, idP, setId, userId, photo_uri, setUserId } = useMusicPlayer();

    const ButtonPlay = async () => {
      if (sound) {
        console.log("STOP TEST");
        if (zmienna) {

          console.log("STOP TEST 111");
          await sound.pauseAsync();
          zmienna = false;
        } else {
          await sound.playAsync();
          console.log("STOP TEST 222");
          zmienna = true;
        }
      
      }
    };
  
    // Async Subscribe to the gyroscope sensor
    const subscribe = async () => {
      setSubscription(
        Gyroscope.addListener(async (gyroscopeData) => {
          setData(gyroscopeData);
          if( gyroscopeData.x < -5 || gyroscopeData.x > 5 || gyroscopeData.y < -5 || gyroscopeData.y > 5 || gyroscopeData.z < -5 || gyroscopeData.z > 5){
            ButtonPlay();
            console.log("ZMIENIONO ZATRZYMANO ");
          }
          console.log(`Gyroscope Data: x: ${gyroscopeData.x}, y: ${gyroscopeData.y}, z: ${gyroscopeData.z}`);
        })
      );
  
      Gyroscope.setUpdateInterval(1000);
    };

  // Unsubscribe from the gyroscope sensor
  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    
    <View style={styles.container}>
    <LinearGradient
      start={[0.1, 0.1]}
      style={styles.gradient} colors={["#330066", "#222222"]} >


      <View style={styles.Header}>

        <TouchableOpacity onPress={() => { navigation.navigate('Menu') }}>
          <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>Gyroscope</Text>
        <TouchableOpacity onPress={() => { }}>

        </TouchableOpacity>
      </View>
      <View style={styles.Body}>
        <View style={styles.container}>
          <Text style={styles.styles_text_button_out}>x: {data.x.toFixed(2)}</Text>
          <Text style={styles.styles_text_button_out}>y: {data.y.toFixed(2)}</Text>
          <Text style={styles.styles_text_button_out}>z: {data.z.toFixed(2)}</Text>
        </View>
      </View>

    </LinearGradient>
  </View>
  );
};

export default Pedometer;
