
import React, { createContext, useState, useContext } from 'react';
import { Audio } from 'expo-av';


const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState();
    const [trackName, setTrackName] = useState('');
    const [index, setIndex] = useState();
    const [musicTime, setMusicTime] = useState();
    const [actualTime, setActualTime] = useState();
    const [idP, setId] = useState();
    const [userId, setUserId] = useState('');
    const [photo_uri, setPhoto] = useState();
    const getPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
      };
    const setTrack = (track) => {
        setCurrentTrack(track);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        console.log("halo");
    };


    const getTrackDuration = async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                return status.durationMillis;
            }
        }
        return 0; 
    };

    const playSound = async (uri) => {
        if (sound) {
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        await newSound.playAsync();
    };

    const stopSound = async () => {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }
    };

    return (
        <MusicPlayerContext.Provider value={{index, setIndex, setTrackName, trackName, 
        currentTrack, isPlaying, setIsPlaying, setTrack, togglePlay, 
        playSound, stopSound, setSound, sound, getTrackDuration, setCurrentTrack, idP, setId, userId, photo_uri, setUserId, setPhoto}}>
            {children}
        </MusicPlayerContext.Provider>
    );
};
