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
  Footer: {
    flex: 1,
    width: '100%',

  },
  NewPlaylist: {
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
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderBottomColor: '#6D5CA7',
    backgroundColor: '#280946',
    marginVertical: '0.2%',
    borderRadius: 20,
  },
    playlistText: {
    color: '#FFFFFF',
    },
    playlistItemCenter: {
        flex: 5,
    },
    playlistItemRight: {
        flex: 0.6,
    },
    playlistItemLeft: {
        flex: 0.6,
    },
  playlistText: {
    color: '#FFFFFF',
    fontSize: 30,
      textAlign: 'left',
      marginLeft: '9%',
  },
  playlistText2: {
    color: '#FFFFFF',
      fontSize: 30,
      
  },

  playListText: {
    fontSize: 30,
    color: '#BF3FBF',
  },
    flatListStyle: {
        width: '1200%',
  },
  TrackText: {
    color: '#FFFFFF',
    fontSize: 30,
    marginRight: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#280946',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#280946',
    fontSize: 20,
    width: '80%',
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#BF3FBF',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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