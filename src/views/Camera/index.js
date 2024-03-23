import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import IconI from 'react-native-vector-icons/Ionicons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMusicPlayer } from '../MusicPlayerContext';

export default function Cam({ navigation }) {
    let cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [image, setImage] = useState(null);
    const [photo, setPhoto2] = useState(null);

    const { index, setIndex, setTrackName, trackName, currentTrack, isPlaying, setIsPlaying, setTrack,
        togglePlay, playSound, stopSound, setSound, sound, getTrackDuration , userId, photo_uri, setUserId, setPhoto} = useMusicPlayer();


    async function seting(result) {
        setImage(result.assets[0].uri);
        setPhoto(result.assets[0].uri);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });



        if (!result.canceled) {
            await seting(result)
            navigation.navigate('Root')
        }
    };

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    let takePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto2(newPhoto);
    };

    if (photo) {
        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto2(undefined);
            });
        };

        return (
            <SafeAreaView style={styles.camera}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <SafeAreaView style={styles.header_small}>
                {hasMediaLibraryPermission ?
                    <TouchableOpacity onPress={savePhoto}>
                        <IconI name="checkmark-sharp" size={60} color="#000000" />
                    </TouchableOpacity> : undefined}
                    <TouchableOpacity onPress={() => setPhoto2(undefined)}>
                        <IconI name="close" size={60} color="#000000" />
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Root') }}>
                        <IconI name="ios-arrow-back" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                </View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={pickImage}>
                        <MaterialCommunityIcons name="view-gallery" style={styles.Gallery} size={30} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => takePicture()}>
                        <IconI name="radio-button-on" size={60} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleCameraType}>
                        <IconI name="sync" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
    },
    container: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    camera: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',

    },
    header: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%'
    },
    header_small: {
        width: '100%',
        flex: 0.1,
        backgroundColor: '#BF3FBF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1,
        height: '100%',
        width: '100%',

    },
    button1: {
        backgroundColor: '#BF3FBF',
        color: '#280946',
        width: 100,
        borderRadius: 10,
        fontSize: 16,
        textAlign: 'center',

    },


});