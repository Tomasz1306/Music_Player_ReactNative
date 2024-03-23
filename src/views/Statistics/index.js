import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import IconI from 'react-native-vector-icons/Ionicons';
import { useMusicPlayer } from '../MusicPlayerContext';
export function Statistics({ navigation, route }) {
    
    const [Style, SetStyle] = useState('true');
    const [TLT, SetTLT] = useState(-1);
    const [steps, SetSTEPS] = useState(-1);
    const [MSL, SetMSL] = useState(-1);
    const [SPT, SetSPT] = useState(0);
    const [SPP, SetSPP] = useState(0);
    const [SPH, SetSPH] = useState(0);
    const [playlists, setplaylists] = useState(0);
    const [Bg_color, SetBg_color] = useState('#330066');
    const [Top_color, SetTop_color] = useState('#BF3FBF');
    const [Text_color, SetText_color] = useState('#280946');
    const [nameu, Setnameu] = useState('');
    const { index, setIndex, setTrackName, trackName, currentTrack, isPlaying, setIsPlaying, setTrack,
        togglePlay, playSound, stopSound, setSound, sound, getTrackDuration, userId, setUserId, photo_uri, setPhotos } = useMusicPlayer();

    const axios_path_stat = `https://d3aa-5-173-138-192.ngrok-free.app/statistics/${userId}`
    const axios_path_play = `https://d3aa-5-173-138-192.ngrok-free.app/playlist`
    async function fetchData(userId) {
        try {
            const response = await axios.get(
                axios_path_stat
            );
            SetTLT(response.data.Tracs_Listened_To),
            SetMSL(response.data.Minutes_Spend_Listening),
            SetSTEPS(response.data.Steps_Made)
            Setnameu(response.data.name)

        } catch (error) {
            console.error("Blad podczas pobierania danych:", error);
        }
        try {
            const response = await axios.get(axios_path_play);
            const danePlaylisty = response.data;

            setplaylists(danePlaylisty.length);
        } catch (error) {
            console.error("Blad podczas pobierania danych z serwera:", error);
        }
        await calculate()
    };
    async function calculate () {
        await sspt();
        await sspp();
        await ssph();
    };


    async function sspt() { 
        if (TLT == 0)
            SetSPT(0)
        else
        SetSPT((steps / TLT).toFixed(2))
    }

    async function sspp() {
        if (playlists == 0)
            SetSPT(0)
        else
        SetSPP((steps / playlists).toFixed(2))
    }

    async function ssph() {
        if (MSL == 0)
            SetSPT(0)
        else
        SetSPH((steps / (MSL / 60)).toFixed(2))
    }



    useEffect(() => {
        fetchData(userId);
    }, [fetchData, userId]);

    const Style_change = () => {
        if (Style === 'false') {
            SetStyle('true')
            SetTop_color('#BF3FBF');
            SetBg_color('#330066');
            SetText_color('#280946');

        }
        else {
            SetStyle('false')
            SetTop_color('#40E0D0');
            SetBg_color('#6082B6');
            SetText_color('#191970');
        }
    }

    const Button_Press1 = async (userId) => {
        try {
            await axios.put(
                axios_path_stat,
                { id: userId, name: nameu, Tracs_Listened_To: 0, Minutes_Spend_Listening: 0, Steps_Made : 0, duration: 0}
            );
        } catch (error) {
            console.error("B��d podczas edytowania danych:", error);
        }
        fetchData(userId);
    };

    const Button_Press2 = (userId) => {

        fetchData(userId);
    };
    return (

        <View style={styles.container(Bg_color, Top_color, Text_color)}>
            <LinearGradient
                style={styles.gradient(Bg_color, Top_color, Text_color)} colors={[Bg_color, "#222222"]} >
                <View style={styles.header(Bg_color, Top_color, Text_color)}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Root', { userId: userId }) }}>
                        <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText(Bg_color, Top_color, Text_color)}>Statistics</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <IconI name="ios-arrow-back" size={30} color="#FFFFFF" opacity={0.0} />
                    </TouchableOpacity>
                </View>
            <View style={styles.container(Bg_color, Top_color, Text_color)} >
                <View style={styles.container_small(Bg_color, Top_color, Text_color)}>
                    <Text style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)} > Tracks Listined To{'\n'}</Text>
                        <Text style={styles.styles_text_button_in(Bg_color, Top_color, Text_color)}> {TLT}</Text>
                </View>
                <View style={styles.container_small(Bg_color, Top_color, Text_color)}>
                    <Text style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)} > Minutes spend listening{'\n'}
                    </Text>
                    <Text style={styles.styles_text_button_in(Bg_color, Top_color, Text_color)}> {MSL}
                    </Text>
                </View>
                <View style={styles.container_small(Bg_color, Top_color, Text_color)}>
                    <Text style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)} > Step per track listened{'\n'}

                    </Text>
                    <Text style={styles.styles_text_button_in(Bg_color, Top_color, Text_color)}> {SPT}
                    </Text>
                </View>
                <View style={styles.container_small(Bg_color, Top_color, Text_color)}>
                    <Text style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)} > Step per playlist{'\n'}

                    </Text>
                    <Text style={styles.styles_text_button_in(Bg_color, Top_color, Text_color)}> {SPP}
                    </Text>
                </View>
                <View style={styles.container_small(Bg_color, Top_color, Text_color)}>
                    <Text style={styles.styles_text_button_out(Bg_color, Top_color, Text_color)} > Step per hour{'\n'}

                    </Text>
                    <Text style={styles.styles_text_button_in(Bg_color, Top_color, Text_color)}> {SPH}
                    </Text>
                </View>
                    <View style={styles.container_small(Bg_color, Top_color, Text_color)}>
                        <Pressable onPress={() => Button_Press1(userId)}>
                         <Text style={styles.styles_button(Bg_color, Top_color, Text_color)}>Remove Statistics</Text>
                    </Pressable>
                    </View>
                </View>
                    </LinearGradient>
            </View>

    );
}

const styles = StyleSheet.create({

    container: (Bg_color, Top_color, Text_color) => {
        return {
            flex: 6,
            alignItems: 'center',
            justifyContent: 'space-around'
        }
    },
    container_small: (Bg_color, Top_color, Text_color) => {
        return {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around'
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
            height: 50,
            maxHeight: 50,
            borderRadius: 10,
            fontSize: 16,
            textAlign: 'center'
        }
    },
    styles_text_button_in: (Bg_color, Top_color, Text_color) => {
        return {
            marginTop: '-19%',
            backgroundColor: Text_color,
            color: Top_color,
            width: 200,
            height: 25,
            maxHeight: 25,
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
});
