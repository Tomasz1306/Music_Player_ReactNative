import React, { createContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from './style';

import IconD from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import Slider from "@react-native-community/slider";
import IconI from 'react-native-vector-icons/Ionicons';
import Iconf from 'react-native-vector-icons/Feather';
import IconAs from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import * as MediaLibrary from 'expo-media-library';
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from 'expo-av';


import { useFocusEffect } from '@react-navigation/native';

import IconButton from '../../components/icon_button';

import { useMusicPlayer } from '../MusicPlayerContext';


export function Playlist({ route, navigation }) {
  const { id, title } = route.params;
  const [tytuly, setTytuly] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [dostepne, setDostepne] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [actualTrack, setActualTrack] = useState(':)');

  const [TLT, SetTLT] = useState(0);
  const [MSL, SetMSL] = useState(0);
  const [steps, SetSTEPS] = useState(0);
  const [nameu, Setnameu] = useState('');


  const { index, setIndex, setTrackName, trackName, currentTrack, isPlaying, setIsPlaying,
    setTrack, togglePlay, playSound, stopSound, setSound, sound, getTrackDuration, setCurrentTrack, idP, setId, userId, photo_uri, setUserId } = useMusicPlayer();


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
        setActualTrack(matchingFile.filename);
        await newSound.playAsync();
        setTrackName(matchingFile.filename);
        setCurrentTrack(matchingFile.filename);
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
    console.log("TABLICA TRACKS: ", tracks)
    console.log("ACTUAL TRACKS: ", actualTrack)
    const currentIndex = tracks.findIndex(track => track.filename === actualTrack);
    console.log("INDEX: ", currentIndex)
    if (currentIndex !== -1 && currentIndex < tracks.length - 1) {

      await playSoundK(tracks[currentIndex + 1].filename);
      setTrackName(tracks[currentIndex + 1].filename)
      console.log(tracks[currentIndex + 1].filename)
      //console.log(tracks[currentIndex + 1].filename)
    } else if (currentIndex == tracks.length - 1) {
      await playSoundK(tracks[0].filename);
      setTrackName(tracks[0].filename)
      console.log(tracks[0].filename)
      //console.log(tracks[0].filename)
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
  useEffect(() => {
    console.log("USTAWIAMY ID : ", id)
    setId(id)
    console.log("USTAWIONO  ID : ", idP)
    fetchData();
  }, []);

  useEffect(() => {

    if (tytuly && tytuly.length > 0) {
      loadTracks();
    }
  }, [tytuly]);

  useEffect(() => {
    if (dostepne.length > 0 && tytuly.length > 0) {
      filtrowanie();
    }
  }, [dostepne, tytuly]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();

    }, [])
  );
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://d3aa-5-173-138-192.ngrok-free.app/playlist'
      );
      if (response.data && Array.isArray(response.data)) {
        const matchingItem = response.data.find(item => item.id === id);
        if (matchingItem) {
          const matchingTracks = matchingItem.tracks;
          setTytuly(matchingTracks);
          console.log(matchingItem);

        } else {
          console.log('Brak pasującego obiektu');
        }
      }
    } catch (error) {
      console.error("Błąd podczas pobierania listy produktów:", error);
    }

  };

  const loadTracks = async () => {
    console.log("load Tracks");
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
    }

    const albumContent = await MediaLibrary.getAssetsAsync({
      album: musicAlbum.id,
      mediaType: MediaLibrary.MediaType.audio,
    });

    const mp3Files = albumContent.assets.filter(asset => asset.uri.endsWith('.mp3'));
    setDostepne(mp3Files);


  };
  const filtrowanie = () => {

    const noweUtwory = dostepne.filter(utwor => tytuly.includes(utwor.filename));

    setTracks(noweUtwory);

  }
  const removeTrackFromPlaylist = async (trackName) => {
    try {

      const updatedTracks = tracks.filter(track => track.filename !== trackName);
      setTracks(updatedTracks);

      const updatedPlaylist = {
        id: id,
        title: title,
        tracks: updatedTracks.map(track => track.filename)
      };

      const response = await axios.put(`https://d3aa-5-173-138-192.ngrok-free.app/playlist/${id}`, updatedPlaylist);

      console.log('Playlist updated successfully', response.data);
    } catch (error) {
      console.error('Error updating playlist', error);
    }
  };





  const renderPlaylistItem = ({ item }) => {
    const duration = formatDuration(item.duration);

    const fileName = item.filename.replace('.mp3', '');
    const shortName = fileName.length > 20 ? fileName.substring(0, 10) + '...' : fileName;
    return (
      <View style={styles.playlistItem}>
        <TouchableOpacity onPress={() => playSoundK(item.filename)}>
          <Text style={styles.playlistText}>{shortName}</Text>
        </TouchableOpacity>
        <Text style={styles.TrackText}>{duration}</Text>
        <TouchableOpacity onPress={() => removeTrackFromPlaylist(item.filename)}>
          <IconD name="ellipsis1" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );

  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={[0.1, 0.1]}
        style={styles.gradient} colors={["#330066", "#222222"]} >

        <View style={styles.Header}>
          <TouchableOpacity onPress={() => navigation.navigate('Playlists', { id: id, title: title })}>
            <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.playListText}>Playlist</Text>
          <TouchableOpacity onPress={filtrowanie}>
            <IconF name="refresh-ccw" size={25} color="#FFFFFF" opacity={0} />
          </TouchableOpacity>
        </View>
        <View style={styles.Body}>
          <View style={styles.NewTrack}>
            <TouchableOpacity onPress={() => navigation.navigate('AddTrack', { id: id, title: title })}>
              <Text style={styles.playlistText2}>New Track</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddTrack', { id: id, title: title })}>
              <IconI name="add-circle-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.flatListStyle}>
            <FlatList
              data={tracks}
              renderItem={renderPlaylistItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <View style={styles.Footer}>
          <View style={styles.upperRow}>
            <IconAs name="music" marginLeft={20} size={30} color="#FFFFFF" />
            <Text style={styles.trackTitle}>{trackName}</Text>
          </View>

          <View style={styles.mediaControls}>
            <TouchableOpacity style={styles.mediaButton} onPress={ButtonBackward}>
              <IconA name="stepbackward" size={30} color="#330066" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton} onPress={ButtonPlay}>
              {isPlaying ? (
                <Iconf name="pause-circle" size={40} color="#330066" />
              ) : (
                <Iconf name="play-circle" size={40} color="#330066" />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton} onPress={ButtonForward}>
              <IconA name="stepforward" size={30} color="#330066" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

    </View>
  );
};

