import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Slider from "@react-native-community/slider";
import IconI from 'react-native-vector-icons/Ionicons';
import Iconf from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import { Audio } from 'expo-av';

import { useMusicPlayer } from '../MusicPlayerContext';
import * as MediaLibrary from 'expo-media-library';

import styles from './style';
import { LinearGradient } from "expo-linear-gradient";
export function Player({ route, navigation }) {
  const onPlay = () => { };
  const onPause = () => { };
  const onPrev = () => { };
  const onNext = () => { };
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState('00:00');
  const [currentPositionMillis, setCurrentPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const { index, setIndex, setTrackName, trackName, currentTrack, isPlaying, setIsPlaying, setTrack,
    togglePlay, playSound, stopSound, setSound, sound, getTrackDuration } = useMusicPlayer();

  const handleDuration = async () => {
    setDurationMillis(await getTrackDuration());
    const minutes = Math.floor(durationMillis / 60000);
    const seconds = ((durationMillis % 60000) / 1000).toFixed(0);
    setDuration(`${minutes}:${seconds.padStart(2, '0')}`);
  };
  const getCurrentPosition = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setCurrentPositionMillis(status.positionMillis);
      }
    }
  };
  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  useEffect(() => {
    handleDuration(); 

    const interval = setInterval(() => {
      getCurrentPosition(); 
      if (durationMillis > 0) {
        const newPosition = (currentPositionMillis / durationMillis) * 100;
        console.log(newPosition);
        setSliderValue(newPosition);
      }
    }, 1000);
    

    return () => clearInterval(interval); 
  }, [getTrackDuration, sound, currentPositionMillis, durationMillis]); 



 
  const getPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };
  const playSoundK = async (tytul) => {
    try {

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Brak uprawnień do czytania mediów');
        return;
      }
      const albums = await MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true });
      const musicAlbum = albums.find(album => album.title === "Music");

      if (!musicAlbum) {
        console.log('Nie znaleziono albumu "Music"');
        return;
      } else {
      }
      const albumContent = await MediaLibrary.getAssetsAsync({
        album: musicAlbum.id,
        mediaType: MediaLibrary.MediaType.audio,
      });
      console.log(albumContent);
      console.log(tytul);
      const matchingFile = albumContent.assets.find(asset => asset.filename === tytul);
      console.log("Grany utwor: ", matchingFile);
      if (sound) {
        await sound.unloadAsync();
        setSound(null);

      }

      if (matchingFile) {

        const { sound: newSound } = await Audio.Sound.createAsync({ uri: matchingFile.uri });
        setSound(newSound);
        await newSound.playAsync();
        setActualTrack(matchingFile.filename);
      } else {
        console.log('Nie znaleziono pliku:', tytul);
      }
    } catch (error) {
      console.error('Failed to load tracks:', error);
    }
  }
  const ButtonPlay = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const ButtonForward = async () => {

    const currentIndex = tracks.findIndex(track => track.filename === actualTrack);
    if (currentIndex !== -1 && currentIndex < tracks.length - 1) {

      await playSoundK(tracks[currentIndex + 1].filename);
      setTrackName(tracks[currentIndex + 1].filename)
    } else if (currentIndex == tracks.length - 1) {
      await playSoundK(tracks[0].filename);
      setTrackName(tracks[0].filename)
    }
  };
  const ButtonBackward = async () => {

    const currentIndex = tracks.findIndex(track => track.filename === actualTrack);
    if (currentIndex !== -1 && currentIndex == 0) {

      await playSoundK(tracks[tracks.length - 1].filename);
      setTrackName(tracks[tracks.length - 1].filename)
    } else {
      await playSoundK(tracks[currentIndex - 1].filename);
      setTrackName(tracks[currentIndex - 1].filename)
    }
  };


  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        start={[0.1, 0.1]}
        style={styles.gradient} colors={["#330066", "#222222"]} >


        <View style={styles.Header}>

          <TouchableOpacity onPress={() => { navigation.navigate('Root') }}>
            <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Player</Text>
          <TouchableOpacity onPress={() => { }}>

          </TouchableOpacity>
        </View>
        <View style={styles.Body}>
          <View style={styles.albumArtContainer}>
            <ImageBackground source={{ uri: 'your-album-artwork-uri' }} style={styles.albumArtwork}>

            </ImageBackground>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={require('../../../rsc/music.png')} />
            <Text style={styles.trackTitle}>{trackName}</Text>
          </View>
        </View>


        <View style={styles.Footer}>
          <View style={styles.mediaControls}>
            <TouchableOpacity style={styles.controllerIco} onPress={onPrev}>

              <IconI name="shuffle" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controllerIco} onPress={onNext}>

              <IconA name="stepbackward" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playIcon} onPress={ButtonPlay}>
              {isPlaying ? (
                <Iconf style={styles.newstyle} name="pause" size={60} color="#FFFFFF" />
              ) : (
                <Iconf style={styles.newstyle} name="play-circle" size={60} color="#FFFFFF" />
              )}

              
            </TouchableOpacity>

            <TouchableOpacity style={styles.controllerIco} onPress={onNext}>

              <IconA name="stepforward" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controllerIco} onPress={onNext}>

              <IconI name="repeat" size={40} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Slider
            style={styles.SliderStyle}
            maximumValue={100}
            minimumValue={0}
            minimumTrackTintColor="#3E1D5F"
            maximumTrackTintColor="#FFF"
            thumbTintColor='#3E1D5F'
            step={5}
            value={sliderValue}
            onValueChange={(value) => setSliderValue2(value)}
          />
          <View style={styles.timeStamps}>
            <Text style={styles.timeStampText}>{formatTime(currentPositionMillis)}</Text>
            <Text style={styles.timeStampText}>{duration}</Text>
          </View>
        </View>

      </LinearGradient>
    </View>
  );
};



export default Player;
