import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useMusicPlayer } from '../MusicPlayerContext';

export function Login({ navigation }) {

    const {index, setIndex,setTrackName, trackName, currentTrack, isPlaying, setIsPlaying, 
        setTrack, togglePlay, playSound, stopSound,setSound,  sound, getTrackDuration, setCurrentTrack, idP, setId, userId, photo_uri, setUserId, setPhoto} = useMusicPlayer();

    const [ID, SetId] = useState(-1);
    const [NAME, SetName] = useState('');
    const [LOGIN, SetLogin] = useState('');
    const [PASSWORD, SetPassword] = useState('');
    const [EMAIL, SetEmail] = useState('');
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const [Err, setErr] = useState('');
    const fetchData = async () => {
        try {
            const response = await axios.get('https://d3aa-5-173-138-192.ngrok-free.app/user');
            const usersData = response.data;
                
                            
                            const matchingUser = usersData.find(user => user.login === Login && user.password === Password);
                            console.log()
                            if (matchingUser) {
                                
                                console.log("Zalogowano pomyślnie:", matchingUser);
                                setUserId(matchingUser.id);
                                setErr("");
                                console.log(matchingUser.id);
                                navigation.navigate('Root');
                                
                            } else {
                                
                                console.log("Błąd logowania: Nieprawidłowe dane logowania");
                                setErr("Zle haslo lub login");
                            }
                        } catch (error) {
                            console.error("Błąd podczas pobierania danych:", error);
                        }
    };
    const checkLoginCredentials = async (login, password) => {
        try {
            const response = await axios.get('https://d3aa-5-173-138-192.ngrok-free.app/user');
            const usersData = response.data;
    
           
            const matchingUser = usersData.find(user => user.login === login && user.password === password);
    
            if (matchingUser) {
                
                console.log("Zalogowano pomyślnie:", matchingUser);
                
            } else {
                
                console.log("Błąd logowania: Nieprawidłowe dane logowania");
            }
        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
        }
    };

    return (
        <View style={styles.top_bar}>
            <LinearGradient start={[0.1, 0.1]} style={styles.gradient} colors={["#330066", "#222222"]}>
                <View style={styles.top_bar} />
                <View style={styles.content}>
                    <View style={styles.inputFlex} >
                        <View style={styles.space1}></View>
                        <Text style={styles.titleText}>Enter your Login:{LOGIN}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Login"
                            onChangeText={(text) => setLogin(text)}
                        />
                        <View style={styles.space1}></View>
                    </View>
                    <View style={styles.inputFlex} >
                        <View style={styles.space1}></View>
                        <Text style={styles.titleText}>Enter your Password:{PASSWORD}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <View style={styles.space1}></View>
                    </View>
                    <View style={styles.space}></View>
                    <View style={styles.horizontal}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.contentText}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={async() => {
                        fetchData();
                    }}>
                            <Text style={styles.contentText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.space1}>
                    <Text style={styles.err}>{Err}</Text>
                </View>
                    <View style={styles.space}></View>
                </View>
                <View style={styles.top_bar} />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    top_bar: {
        flex: 2,
        width: '100%',
        
    },
    gradient: {
        width: '100%',
        height: '100%',
        opacity: 0.95,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    contentText: {
        color: '#330066'
    },
    content: {
        flex: 5,
        alignItems: 'center',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        flex: 0.40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bf3fbf',
        borderRadius: 20,
        
    },
    space: {
        flex: 0.2,
    },
    horizontal: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    titleText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 16,
        color:'#828282',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        backgroundColor: '#d9d9d9',
    },
    badInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bf3fbf',
        borderRadius: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
    },
    inputFlex: {
        width: '80%',
        flex: 1,
    },
    err: {
        color: '#f00',
    },
    space1: {
        flex: 1,
        height: '100%',
    },
});

export default Login;