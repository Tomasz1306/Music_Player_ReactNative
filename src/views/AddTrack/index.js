import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ImageBackground, TouchableOpacity, Image} from 'react-native';
import styles from './style';
import IconI from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export function AddTrack({ route, navigation }) {
  const {id, title} = route.params;
  console.log(id, title);
  const [tracks, setTracks] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const getPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const loadTracks = async () => {
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
      }else{

      }
  

      const albumContent = await MediaLibrary.getAssetsAsync({
        album: musicAlbum.id,
        mediaType: MediaLibrary.MediaType.audio, 
      });

  

      const mp3Files = albumContent.assets.filter(asset => asset.uri.endsWith('.mp3'));
      setTracks(mp3Files);
    } catch (error) {
      console.error('Failed to load tracks:', error);
    }
  };
  useEffect(() => {
    loadTracks();
  }, []);

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));

      setSelectedTracks(selectedTracks.filter(track => track !== tracks.find(item => item.id === id).title));
    } else {
      setSelectedIds([...selectedIds, id]);

      const selectedTrack = tracks.find(item => item.id === id);
      if (selectedTrack) {
        setSelectedTracks([...selectedTracks, selectedTrack.filename]);
      }
    }
  };
  
  const renderPlaylistItem = ({ item }) => {
    const backgroundColor = selectedIds.includes(item.id) ? "#00FF00" : "#BF3FBF";
    const duration = formatDuration(item.duration);
  

    const fileName = item.filename.replace('.mp3', '');
    const shortName = fileName.length > 20 ? fileName.substring(0, 10) + '...' : fileName;
  
    return(
      <View style={styles.playlistItem}>
        <TouchableOpacity onPress={() => toggleSelection(item.id)}>
          <Text style={styles.playlistText}>{shortName}</Text> 
        </TouchableOpacity>
        <Text style={styles.TrackText}>{duration}</Text>
        <TouchableOpacity onPress={() => toggleSelection(item.id)}>
          <View style={[styles.square, { backgroundColor }]} /> 
        </TouchableOpacity>
      </View>
    );
  };
  const AddTrack = async () => {
    console.log(selectedTracks);
    try {
      if (selectedTracks.length > 0) {

        const existingDataResponse = await axios.get(`https://d3aa-5-173-138-192.ngrok-free.app/playlist/${id}`);
        const existingTracks = existingDataResponse.data.tracks || [];
  

        const newTracks = selectedTracks.filter(track => !existingTracks.includes(track));
  
        if (newTracks.length > 0) {
          console.log("halo");
          console.log(id);

          const response = await axios.patch(
            `https://d3aa-5-173-138-192.ngrok-free.app/playlist/${id}`,
            {
              tracks: [...existingTracks, ...newTracks],
            }
          );
          console.log("Utwory zostały dodane na serwerze:", response.data);
        } else {
          console.log("Nie ma nowych utworów do dodania");
        }
      }
    } catch (error) {
      console.error("Błąd podczas dodawania utworów:", error);
    }
    navigation.navigate('Playlist', {id: id, title: title});
  };
  
  
  
  

  return (
    <View style={styles.container}>
      <LinearGradient
        start={[0.1, 0.1]}
        style={styles.gradient} colors={["#330066", "#222222"]} >

        <View style={styles.Header}>
          <TouchableOpacity onPress={() => navigation.navigate('Playlist', {id: id, title: title})}>
            <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.playListText}>Add Track</Text>
         <TouchableOpacity onPress={() => { }}>
            <IconI name="ios-arrow-back" size={30} color="#FFFFFF" opacity={0.0} />
         </TouchableOpacity>
        </View>
        <View style={styles.Body}>
          
          
          <View style={styles.flatListStyle}>
            <FlatList
              data={tracks}
              renderItem={renderPlaylistItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <View style={styles.Footer}>
          <View style={styles.AddButton}>
          <TouchableOpacity onPress={AddTrack}>
            <Text style={styles.ButtonText}>ADD</Text>
          </TouchableOpacity>
          </View>
        
        </View>
      </LinearGradient>

    </View>
  );
};

