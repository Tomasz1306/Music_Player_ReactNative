import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      width: '100%',
      height: '100%',
      opacity: 0.95,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Header: {
        width: '100%',
        flex: 1,
        backgroundColor: '#280946',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%', // Dodaj margines poziomy
    },
    Body: {
      flex: 5,
    },
    Footer: {
      flex: 1,
      width: '100%',

      backgroundColor: "#280946",
    },
    SliderStyle: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '10%', // Dodaj margines poziomy
    },
    HeaderText: {
      color: "#BF3FBF",
      fontSize: 30,
    },
    navIcon: {
      color: '#FFFFFF',
      fontSize: 24,
    },
    albumArtContainer: {
      flex: 1, // Take up 4/5 of the space
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
    },
    albumArtwork: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    trackTitle: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    mediaControls: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    controlIcon: {
      color: '#FFFFFF',
      fontSize: 24,
      marginHorizontal: 20,
    },
    trackProgress: {
      height: 20,
      marginHorizontal: 10,
    },
    timeStamps: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: '5%', // Dodaj margines poziomy
    },
    timeStampText: {
      color: '#FFFFFF',
    },
    playIcon: {
      flex: 1,
      padding: 3,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80,
    },
    controllerIco: {
      flex: 1,
      padding: 3,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80,
    },
    slider: {
      width: 200,
      marginTop: 20,
    },
    thumbStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    trackStyle: {
      height: 10,
      borderRadius: 5,
    },
    playIcon2: {
      flex: 1,
      padding: 50,
      backgroundColor: '#000',
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center', 
      position: 'static',
      top: -100,
    },
    imageStyle:{
      width: 300,
      height: 300,
    },
  
  });

  export default styles;