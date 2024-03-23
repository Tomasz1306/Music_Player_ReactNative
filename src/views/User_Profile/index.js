import { Pressable, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import IconI from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useMusicPlayer } from '../MusicPlayerContext';

export function User_Profile({ navigation, route }) {
    
    const { index, setIndex, setTrackName, trackName, currentTrack, isPlaying, setIsPlaying, setTrack,
        togglePlay, playSound, stopSound, setSound, sound, getTrackDuration, userId, photo_uri, setUserId, setPhoto } = useMusicPlayer();
    
    const [Style, SetStyle] = useState('true');
    const [login, SetLogin] = useState('Login_u');
    const [email, SetEmail] = useState('Email_u');
    const [password, SetPassword] = useState('testp');
    const [nameu, Setnameu] = useState('testp');
    const [temp_login, SetTemp_login] = useState('');
    const [temp_email, SetTemp_email] = useState('');
    const [temp_password, SetTemp_password] = useState('');
    const [Bg_color, SetBg_color] = useState('#330066');
    const [Top_color, SetTop_color] = useState('#BF3FBF');
    const [Text_color, SetText_color] = useState('#280946');

    console.log("user id", userId);
    const axios_path_u = `https://d3aa-5-173-138-192.ngrok-free.app/user/${userId}`
    const axios_path_set = `https://d3aa-5-173-138-192.ngrok-free.app/settings/${userId}`

    const fetchData = async (userId) => {
        try {
            const response = await axios.get(
                axios_path_u
            );
            SetLogin(response.data.login)
            SetPassword(response.data.password)
            SetEmail(response.data.email)
            Setnameu(response.data.name)

        } catch (error) {
            console.error("B��d podczas pobierania danych:", error);
        }
        try {
            const response = await axios.get(
                axios_path_set
            );

        } catch (error) {
            console.error("B��d podczas pobierania danych:", error);
        }
    };

    const Update_User_Data = async (userId) => {
        try {
            await axios.put(
                axios_path_u,
                { id: userId, name: nameu, login: temp_login, password: temp_password, email: temp_email }
            );

            fetchData(userId);
            SetTemp_login('')
            SetTemp_email('')
            SetTemp_password('')

        } catch (error) {
            console.error("B��d podczas edytowania danych:", error);
        }
        fetchData(userId);
    };

    useEffect((userId) => {
        fetchData(userId);

    }, []);

    const imageSource = photo_uri ? { uri: photo_uri } : require('../../../rsc/Foto_def_1.png');
    return (
        <View style={styles.container(Bg_color, Top_color, Text_color)}>
            <LinearGradient
                style={styles.gradient(Bg_color, Top_color, Text_color)} colors={[Bg_color, "#222222"]} >
                <View style={styles.header(Bg_color, Top_color, Text_color)}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Menu') }}>
                        <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText(Bg_color, Top_color, Text_color)}>User Profile</Text>
                    <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
                        <IconI name="ellipsis-vertical" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container(Bg_color, Top_color, Text_color)}>
                    <Pressable onPress={() => { navigation.navigate('Cam',  { userId: userId, photo_uri: photo_uri  }) }}>
                        <Image source={imageSource} style={{ width: 200, height: 200, borderRadius: 100, }}  />
                        </Pressable>
                    <Text style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)}>{login}</Text>
                    <Text style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)}>{email}</Text>
                    <TextInput
                        style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)}
                        placeholder="Podaj nowy login"
                        value={temp_login}
                        onChangeText={text => SetTemp_login(text)}
                    />
                    <TextInput
                        style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)}
                        placeholder="Podaj nowy email"
                        value={temp_email}
                        onChangeText={text => SetTemp_email(text)}
                    />
                    <TextInput
                        style={styles.styles_text_button_out_pass(Bg_color, Top_color, Text_color)}
                        placeholder="Podaj nowe haslo"
                        value={temp_password}
                        onChangeText={text => SetTemp_password(text)}
                    />
                    <Pressable onPress={() => Update_User_Data(userId)}>
                        <Text style={styles.styles_button(Bg_color, Top_color, Text_color)}>Save Changes</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    cont_main: (Bg_color, Top_color, Text_color) => {
        return {
            flex: 1,
        }
    },
    container: (Bg_color, Top_color, Text_color) => {
        return {
            flex: 6,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-around'
        }
    },
    container_small: (Bg_color, Top_color, Text_color) => {
        return {
            flex: 1,
            backgroundColor: Bg_color,
            flexDirection: 'row',
        }
    },
    header: (Bg_color, Top_color, Text_color) => {
        return {
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '10%'
        }
    },
    gradient: (Bg_color, Top_color, Text_color) => {
        return {
            width: '100%',
            height: '100%',
            opacity: 0.95,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    styles_text_button_out: (Bg_color, Top_color, Text_color) => {
        return {
            backgroundColor: Top_color,
            color: Text_color,
            width: 200,
            height: 25,
            maxHeight: 50,
            borderRadius: 10,
            fontSize: 16,
            textAlign: 'center'
        }
    },
    styles_text_button_out_pass: (Bg_color, Top_color, Text_color) => {
        return {
            backgroundColor: Top_color,
            color: Text_color,
            width: 200,
            height: 25,
            maxHeight: 50,
            borderRadius: 10,
            fontSize: 16,
            textAlign: 'center',
        }
    },
    styles_button: (Bg_color, Top_color, Text_color) => {
        return {
            backgroundColor: Top_color,
            color: Text_color,
            width: 200,
            borderRadius: 10,
            fontSize: 16,
            textAlign: 'center'
        }
    },
    HeaderText: (Bg_color, Top_color, Text_color) => {
        return {
            color: Top_color,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 30,
            fontWeight: 'bold'
        }
    },
    icon: (Bg_color, Top_color, Text_color) => {
        return {
            marginTop: '-75%',
            marginRight: '-75%'
        }
    },
});
