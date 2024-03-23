import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Switch, TextInput, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import IconI from 'react-native-vector-icons/Ionicons';
import styles from './style';
import axios from 'axios';

export function Settings ({navigation}) {
    const [sliderValue, setSliderValue] = useState(0); 
    const [sliderEnabled, setSliderEnabled] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const [filepath, setFilepath] = useState('');
    const [style, SetStyle] = useState();
    const [style2, SetStyle2] = useState(0);
    const [volume, SetVolume] = useState('');
    const [time, SetTime] = useState('');
    const [userId, setUserId] = useState(1);
    const [appSettings, setAppSettings] = useState({
        darkMode: false,
      });

    const [Bg_color, SetBg_color] = useState('#330066');
    const [Top_color, SetTop_color] = useState('#BF3FBF');
    const [Text_color, SetText_color] = useState('#280946');
  
    

      useEffect(() => {
        axios.get(`https://d3aa-5-173-138-192.ngrok-free.app/settings/${userId}`)
          .then(response => {
            console.log(response.data);
            setFilepath(response.data.filepath);
            const styleValue = response.data.style === 1 ? 1 : 0;
            SetStyle2(styleValue);
            SetVolume(response.data.volume);
            SetTime(response.data.Time_to_sleep_without_activity_in_minutes.toString());

          })
          .catch(error => {
            console.error('[SETTINGS] Blad GET:', error);
          });
      
      }, [userId]);




    const handleLogoutPress = () => {
      console.log("Logout")
      navigation.navigate('Login')
      };

    

    const handleRemovePress = () => {
      console.log("Remove")
      axios.delete(`https://d3aa-5-173-138-192.ngrok-free.app/user/${userId}`)
        .then(response => {
          console.log('Dane zostały usunięte:', response.data);})
        .catch(error => {
          console.error('[SETTINGS] Błąd delete:', error);
        });
      axios.delete(`https://d3aa-5-173-138-192.ngrok-free.app/settings/${userId}/filepath`)
        .then(response => {
          console.log('Dane zostały usunięte:', response.data);})
        .catch(error => {
          console.error('[SETTINGS] Błąd delete:', error);
        });
      axios.delete(`https://d3aa-5-173-138-192.ngrok-free.app/statistics/${userId}`)
        .then(response => {
          console.log('Dane zostały usunięte:', response.data);})
        .catch(error => {
          console.error('[SETTINGS] Błąd delete:', error);
        });
      navigation.navigate('Login')
      };
    

      const toggleSwitch = (settingName) => {
        const updatedSettings = { ...appSettings };
        updatedSettings[settingName] = !updatedSettings[settingName];
        setAppSettings(updatedSettings);
      
        const valueToSend = updatedSettings[settingName] ? 1 : 0;
        SetStyle2(valueToSend);

      };

      const handleSavePress = () => {
        console.log(style2)
        axios.put(`https://d3aa-5-173-138-192.ngrok-free.app/settings/${userId}`, 
        {filepath: filepath, style: style2, volume: volume, Time_to_sleep_without_activity_in_minutes: time})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('[SETTINGS] Blad PUT:', error)
          })
          
      };

  return (
    <View style={styles.container}>
       <LinearGradient 
          style={styles.gradient} colors={[Bg_color, "#222222"]} >


        <View style={styles2.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Root")}>
                    <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles2.styles_text_TOP(Bg_color, Top_color, Text_color)}>Settings</Text>
                <TouchableOpacity onPress={() => console.log("cos")}>
                    <IconI name="ellipsis-vertical" size={30} color="#FFFFFF" style={{opacity:0}} />
                </TouchableOpacity>
        </View >
    <View style={styles.body}>
    <View style={styles2.settingRow_2(Bg_color, Top_color, Text_color)}>
    <Text style={styles2.font(Bg_color, Top_color, Text_color)}> Dark Mode</Text>
    <Switch
      style={styles2.sw(Bg_color, Top_color, Text_color)}
      trackColor={{ false: '#280A46', true: '#280A46' }}
      thumbColor={appSettings.darkMode ? Top_color : Top_color}
      ios_backgroundColor="#3e3e3e"
      onValueChange={() => toggleSwitch('darkMode')}
      value={appSettings.darkMode && style2 === 1}
    />
        </View>
        <View style={styles2.settingRow_2(Bg_color, Top_color, Text_color)}>
        <Text style={styles2.font(Bg_color, Top_color, Text_color)}> Volume</Text>        
        </View>
        <Slider style={styles2.slider}
          step={1}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#BF3FBF"
          maximumTrackTintColor="#000000"
          thumbTintColor={Top_color}
          onValueChange={(text) => SetVolume(text)}
          />
        <View style={styles2.settingRow_2(Bg_color, Top_color, Text_color)}>
          <Text style={styles2.font(Bg_color, Top_color, Text_color)}> Time to sleep in minutes:</Text>
          <TextInput style={styles2.font(Bg_color, Top_color, Text_color)}
          keyboardType="numeric"
          value={time}
          onChangeText={(text) => SetTime(text)}
          />
        </View>
        <View style={styles2.settingRow_2(Bg_color, Top_color, Text_color)}>
          <Text style={styles2.font(Bg_color, Top_color, Text_color)}> File Path: </Text>
          <TextInput style={styles2.font(Bg_color, Top_color, Text_color)}
          value={filepath}
          onChangeText={(text) => SetPath(text)}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles2.font_2(Bg_color, Top_color, Text_color)}>About</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles2.font_3(Bg_color, Top_color, Text_color)}>Version</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles2.font_3(Bg_color, Top_color, Text_color)}>1.0.0</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles2.font_3(Bg_color, Top_color, Text_color)}>
            Authors:
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles2.font_4(Bg_color, Top_color, Text_color)}>
            Andrzejewski Oskar
          </Text></View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles2.font_4(Bg_color, Top_color, Text_color)}>
            Banak Michał
          </Text></View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles2.font_4(Bg_color, Top_color, Text_color)}>
            Bogdan Tomasz
          </Text></View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles2.font_4(Bg_color, Top_color, Text_color)}>
            Popielec Mateusz
          </Text></View>
        <Pressable onPress={handleLogoutPress}>
         <View style={styles2.settingRow_2(Bg_color, Top_color, Text_color)}>
          <Text style={styles2.font_5(Bg_color, Top_color, Text_color)}> Logout</Text>  
         </View>
        </Pressable>
        <Pressable onPress={handleSavePress}>
         <View style={styles2.settingRow_2(Bg_color, Top_color, Text_color)}>
          <Text style={styles2.font_5(Bg_color, Top_color, Text_color)}> Save changes</Text>      
         </View>
        </Pressable>   
        <Pressable onPress={handleRemovePress}>
        <View style={styles2.settingRow_2(Bg_color, Top_color, Text_color)}>
         <Text style={styles2.font_5(Bg_color, Top_color, Text_color)}> Remove Account</Text>        
         </View>
        </Pressable> 
    </View>

    </LinearGradient>
    </View>
      
      
      
  );
};
const styles2 = StyleSheet.create({
  container: (Bg_color, Top_color, Text_color) => {
    return {
    flex: 6,
    backgroundColor: '#3e3e3e',
    alignItems: "center",
  }},
  settingRow: (Bg_color, Top_color, Text_color) => {
    return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    height: 60,
    flexShrink: 0,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: Bg_color,
    }
  },
  settingRow_2:  (Bg_color, Top_color, Text_color) => {
    return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    height: 30,
    flexShrink: 0,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: Top_color,
  }},
  slider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    height: 9,
    flexShrink: 0,
    marginVertical: 10,
    borderRadius: 20,
  },
  font:  (Bg_color, Top_color, Text_color) => {
    return {
      color: Text_color,
      fontSize: 16,
  }},
  font_2: (Bg_color, Top_color, Text_color) => {
    return {
    color: Top_color,
    fontSize: 30,
    flex: 0.7,
    lineHeight: 50,
}},
  font_3: (Bg_color, Top_color, Text_color) => {
    return {
   color: Top_color,
   fontSize: 16,
   flex: 0.7,
   lineHeight: 25,
}},
 font_4: (Bg_color, Top_color, Text_color) => {
  return {
   color: Top_color,
   fontSize: 16,
   flex: 0.7,
   lineHeight: 18,
}},
  font_5: (Bg_color, Top_color, Text_color) => {
    return {
    color: Text_color,
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
}},
  sw: (Bg_color, Top_color, Text_color) => {
    return {
      width: 53,
      height: 30,
      flexShrink: 1,
      borderWidth: 10,
      borderRadius: 20,
      borderColor: Top_color,
  }},
    gradient: {
      width: '100%',
      height: '100%',
      opacity: 0.95,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: '10%',
    },
    body: {
      alignItems: "center",
      flex: 5, // Zajmuje 5/6 ekranu
      width: '100%',
      marginVertical: '10%',
      borderRadius: 20,
      paddingVertical: '6%',
      paddingHorizontal: '4%',
    },  

    top_bar: (Bg_color, Top_color, Text_color) => {
      return {

          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row'
      }
  },
    styles_text_TOP: (Bg_color, Top_color, Text_color) => {
      return {
          color: Top_color,
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 30,
          fontWeight: 'bold'
      }
  },
});

export default Settings;