import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useMusicPlayer } from '../MusicPlayerContext';
export function Register({ navigation }) {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const [Password2, setPassword2] = useState('');
    const [stan, setStan] = useState(true);
    const [Err, setErr] = useState('');
    var enter = true;
    const { index, setIndex, setTrackName, trackName, currentTrack, isPlaying, setIsPlaying, setTrack,
        togglePlay, playSound, stopSound, setSound, sound, getTrackDuration, userId, setUserId, photo_uri, setPhotos } = useMusicPlayer();
    const addUser = async (newUser) => {
        try {
            
            const responseGet = await axios.get('https://d3aa-5-173-138-192.ngrok-free.app/user');
            const usersData = responseGet.data;
    
            const existingUser = usersData.find(user => user.login === newUser.login || user.email === newUser.email);
    
            if (existingUser) {
                setErr("uzytkownik istnieje");
            } else {
                
                const highestId = Math.max(...usersData.map(user => user.id));
                newUser.id = highestId + 1;
                setUserId(newUser.id);
                const dataUser = {
                    id: highestId + 1,
                    name: newUser.name,
                    filepath: "example/file/path",
                    photo_path: "../../../rsc/Foto_def_1.png",
                    style: 0,
                    volume: 50,
                    Time_to_sleep_without_activity_in_minutes: 5
                };
                try {
                    const responsePost = await axios.post('https://d3aa-5-173-138-192.ngrok-free.app/settings', dataUser);
    
                    
                    if (responsePost.data) {
                        console.log("Pomyślnie dodano użytkownika:", responsePost.data);
                    } else {
                        console.error("Błąd podczas przetwarzania odpowiedzi POST: Brak danych użytkownika");
                    }
                } catch (postError) {
                    console.error("Błąd podczas przetwarzania żądania POST:", postError);
                    
                }
                const data1User = {
                    id: highestId + 1,
                    name: dataUser.name,
                    Tracs_Listened_To: 6000,
                    Minutes_Spend_Listening: 500,
                    Steps_Made: 60,
                    Steps_Per_Min: 10,
                    Duration: 21
                };
                try {
                    const responsePost = await axios.post('https://d3aa-5-173-138-192.ngrok-free.app/statistics', data1User);
    
                    
                    if (responsePost.data) {
                        console.log("Pomyślnie dodano użytkownika:", responsePost.data);
                    } else {
                        console.error("Błąd podczas przetwarzania odpowiedzi POST: Brak danych użytkownika");
                    }
                } catch (postError) {
                    console.error("Błąd podczas przetwarzania żądania POST:", postError);
                    
                }
                try {
                    const responsePost1 = await axios.post('https://d3aa-5-173-138-192.ngrok-free.app/user', newUser);
    
                    
                    if (responsePost1.data) {
                        console.log("Pomyślnie dodano użytkownika:", responsePost1.data);
                        navigation.navigate('Root');
                        setErr('');
                    } else {
                        console.error("Błąd podczas przetwarzania odpowiedzi POST: Brak danych użytkownika");
                    }
                } catch (postError) {
                    console.error("Błąd podczas przetwarzania żądania POST:", postError);
                    
                }
                
            }
        } catch (error) {
            console.error("Błąd podczas dodawania/aktualizacji użytkownika:", error);
        }
    };
    
    
    
    
    return (
        <View style={styles.top_bar}>
            <LinearGradient start={[0.1, 0.1]} style={styles.gradient} colors={["#330066", "#222222"]} >
                <View style={styles.top_bar}>

                </View>
                <View style={styles.content}>
                    <View style={styles.inputFlex} >
                        <View style={styles.space1}></View>
                        <Text style={styles.titleText}>Enter your Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={Name}
                            onChangeText={(text) => setName(text)}

                        />
                        <View style={styles.space1}></View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputFlex} >
                        <View style={styles.space1}></View>
                        <Text style={styles.titleText}>Enter your E-mail:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            value={Email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <View style={styles.space1}></View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputFlex} >
                        <View style={styles.space1}></View>
                        <Text style={styles.titleText}>Enter your Login:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Login"
                            value={Login}
                            onChangeText={(text) => setLogin(text)}
                        />
                        <View style={styles.space1}></View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputFlex} >
                        <View style={styles.space1}></View>
                        <Text style={styles.titleText}>Enter your Password::</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={Password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                        <View style={styles.space1}></View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputFlex} >
                        <View style={styles.space1}></View>
                        <Text style={styles.titleText}>Repeat your Password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={Password2}
                            onChangeText={(text) => setPassword2(text)}
                            secureTextEntry={true}
                        />
                        <View style={styles.space1}></View>
                    </View>
                </View>
                <View style={styles.space1}></View>
                <View style={styles.horizontal}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        enter = true;
                        if (Password !== Password2) { setErr('Hasla nie sa identyczne.'); enter = false }
                        if (Password2 === '') { setErr('Powtorz haslo'); enter = false }
                        if (Password === '') { setErr('Wprowadz haslo'); enter = false }
                        if (Login === '') { setErr('Wprowadz login'); enter = false }
                        if (!Email.includes(".")) { setErr('Wprowadz poprawna domene maila'); enter = false }
                        if (!Email.includes("@")) { setErr('Wprowadz poprawny E-mail'); enter = false }
                        if (Email.length < 5) { setErr('E-mail jest za krotki'); enter = false }
                        if (Email === '') { setErr('Wprowadz E-mail'); enter = false }
                        if (Name === '') { setErr('Wprowadz nazwe uzytkownika'); enter = false }
                        if (enter) { 
                            const newUser = {
                                id: 2, 
                                name: Name, 
                                login: Login, 
                                password: Password, 
                                email: Email, 
                            };
                            addUser(newUser);
                             
                        }
                    }}>
                        <Text style={styles.contentText}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontal2}>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Login') }}>
                        <Text style={styles.contentText}>Go To Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.space1}>
                    <Text style={styles.err}>{Err}</Text>
                </View>
                <View style={styles.space1}>

                </View>
                <View style={styles.top_bar}>

                </View>
            </LinearGradient>
        </View>
    );
};
const styles = StyleSheet.create({
    top_bar: {
        flex: 1,
        width: '100%',
    },
    gradient: {
        width: '100%',
        height: '100%',
        opacity: 0.95,
        justifyContent: 'center',
        alignItems: 'center',

    },
    content: {
        flex: 5,
        alignItems: 'center',
        width: '100%',
    },
    contentText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
    },
    titleText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 16,
        width: '80%',
        color:'#828282'
    },
    input: {
        width: '80%',
        flexDirection: 'row',
        //flex: 0.20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
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
    button: {
        width: '80%',
        flexDirection: 'row',
        //flex: 0.20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bf3fbf',
        borderRadius: 20,
        color:'#3300ff',
    },
    contentText: {
        color: '#330066'
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
    horizontal2: {
        height: 40,
        marginTop: '5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    err: {
        color: '#f00',
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
    space1: {
        flex: 1,
        height: '100%',
    },
});


export default Register;