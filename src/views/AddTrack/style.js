import {StyleSheet} from'react-native';

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
    square: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#280946',
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

    },
    AddButton: {
      alignItems: 'center', // Wyśrodkowanie pionowe
      borderBottomColor: '#6D5CA7',
      backgroundColor: '#280946',
      marginVertical: '0.2%',
      marginHorizontal:'30%',
      borderRadius: 30,
      paddingVertical: '4%',
      paddingHorizontal: '6%',
    },
    ButtonText: {
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 30,
      color: "#fff",
    },
    NewTrack: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: "#280946",
      marginVertical: '5%',
      borderRadius: 20,
      paddingVertical: '4%',
      paddingHorizontal: '4%',
      
    },
    playlistItem: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#6D5CA7',
      backgroundColor: '#280946',
      marginVertical: '0.2%',
      borderRadius: 20,
      paddingVertical: '2%',
      paddingHorizontal: '2%',
      width: '100%',
    },
  
    playlistText: {
      color: '#FFFFFF',
      fontSize: 30,
      flex: 1, // Rozszerz tekst, aby zajmować dostępne miejsce
    },
  
    TrackText: {
      color: '#FFFFFF',
      fontSize: 30,
      marginLeft: 'auto', // Umieść czas i kwadracik na końcu
      marginRight: 20, // Odległość między czasem a kwadracikiem
    },
    playlistItem2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', // Wyśrodkowanie pionowe
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#6D5CA7',
      backgroundColor: '#280946',
      marginTop: 100,
    },
    
    playlistText2: {
      color: '#FFFFFF',
      fontSize: 30,
    },
    navHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 40,
      marginTop: 20,
      backgroundColor: '#280946',
    },
    playListText: {
      fontSize: 30,
      color: '#BF3FBF',
    },
    flatListStyle: {
      
    },
    
  });

  export default styles;