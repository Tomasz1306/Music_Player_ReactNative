import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, View, Text, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import IconD from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import Slider from "@react-native-community/slider";
import IconI from 'react-native-vector-icons/Ionicons';
import Iconf from 'react-native-vector-icons/Feather';
import IconAs from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import { Audio } from 'expo-av';

import { useMusicPlayer } from '../MusicPlayerContext';
import * as MediaLibrary from 'expo-media-library';

import IconButton from '../MusicPlayerContext';

export function Playlists({ route, navigation }) {
  const [playlist, setPlaylist] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [actualTrack, setActualTrack] = useState();
  const [dostepne, setDostepne] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [tytuly, setTytuly] = useState([]);


  const { index, setIndex, setTrackName, trackName, currentTrack, isPlaying, setIsPlaying,
    setTrack, togglePlay, playSound, stopSound, setSound, sound, getTrackDuration, setCurrentTrack, idP, setId } = useMusicPlayer();



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
    console.log("NOWE TRACKS", tracks)
    const currentIndex = tracks.findIndex(track => track.filename === currentTrack);
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
    console.log("DOSTEPNE: ", dostepne);
    filtrowanie();

  };
  const filtrowanie = () => {

    const noweUtwory = dostepne.filter(utwor => tytuly.includes(utwor.filename));

    setTracks(noweUtwory);

  }


  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };



  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://d3aa-5-173-138-192.ngrok-free.app/playlist"
      );
      setPlaylist(response.data);
        console.log("ID PRSESKLANE: " , idP);
      const response2 = await axios.get(
        'https://d3aa-5-173-138-192.ngrok-free.app/playlist'
      );
      if (response2.data && Array.isArray(response2.data)) {
        const matchingItem = response2.data.find(item => item.id === idP);
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

  //useEffect(() => {
  //    setActualTrack(currentTrack);
  //    fetchData();
  //    loadTracks();
  //    filtrowanie();
  //}, []);

  useEffect(() => {
    setActualTrack(currentTrack);
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


  const createPlaylist = async () => {
    try {
      const response = await axios.post(
        "https://d3aa-5-173-138-192.ngrok-free.app/playlist",
        { title: newPlaylistName }
      );
      setModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Błąd podczas tworzenia playlisty:", error);
    }
  };
  const deletePlaylist = async (playlistId) => {
    try {
      await axios.delete(`https://d3aa-5-173-138-192.ngrok-free.app/playlist/${playlistId}`);
      const updatedPlaylists = playlist.filter(item => item.id !== playlistId);
      setPlaylist(updatedPlaylists);
    } catch (error) {
      console.error("Błąd podczas usuwania playlisty:", error);
    }
  };



  const renderPlaylistItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <TouchableOpacity style={styles.playlistItemLeft} onPress={() => { navigation.navigate('Playlist', { id: item.id, title: item.title }) }}>
        <IconI name="musical-notes" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playlistItemCenter} onPress={() => { navigation.navigate('Playlist', { id: item.id, title: item.title }) }}>
        <Text style={styles.playlistText}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.playlistItemRight} onPress={() => deletePlaylist(item.id)}>
        <IconD name="ellipsis1" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        start={[0.1, 0.1]}
        style={styles.gradient} colors={["#330066", "#222222"]} >
        <View style={styles.Header}>
          <TouchableOpacity onPress={() => { navigation.navigate('Root') }}>
            <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.playListText}>Playlists</Text>
          <TouchableOpacity onPress={() => { }}>
            <IconI name="ios-arrow-back" size={30} color="#FFFFFF" opacity={0.0} />
          </TouchableOpacity>
        </View>
        <View style={styles.Body}>
          <View style={styles.NewPlaylist}>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput
                    placeholder="Nazwa Playlisty"
                    value={newPlaylistName}
                    onChangeText={setNewPlaylistName}
                    style={styles.modalText}
                  />
                  <Button
                    title="Utwórz Playlistę"
                    onPress={() => createPlaylist()}
                  />
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.playlistText2}>New Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <IconI name="add-circle-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.flatListStyle}>
            <FlatList
              data={playlist}
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
