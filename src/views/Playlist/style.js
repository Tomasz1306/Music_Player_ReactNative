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
      paddingHorizontal: '10%', 
    },
    Body: {
      flex: 5,
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
    
    playlistItem2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      flex: 1, 
    },
  
    TrackText: {
      color: '#FFFFFF',
      fontSize: 30,
      marginLeft: 'auto', 
      marginRight: 20,
    },
    Footer: {
      height: 100, 
      backgroundColor: '#BF3FBF',
      paddingHorizontal: 1,
      paddingTop: 1,
      borderTopWidth: 0,
      borderTopColor: '#FFFFFF',
      width: '100%',
      borderRadius: 15,
    },
    upperRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10, 
      backgroundColor: '#330066',
      borderRadius: 15,
      height: '50%',
    },
    mediaControls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    mediaButton: {
      marginHorizontal: 10,
    },
    trackTitle: {
      color: '#FFFFFF',
      fontSize: 18,

      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: 20,
    },

  });

  export default styles;