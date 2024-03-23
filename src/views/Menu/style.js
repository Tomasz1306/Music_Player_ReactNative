import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    gradient: {
      width: '100%',
      height: '100%',
      opacity: 0.95,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuItem: {
      backgroundColor: '#BF3FBF',
      marginVertical: '5%',
      borderRadius: 20,
      paddingVertical: '2%',
      paddingHorizontal: '4%',


    },
    MenuText: {
      fontSize: 40,
      color: "#fff",
      width: 300,
      textAlign: 'center',
      
    },
    NavigationText: {
      fontSize: 30,
      color: "#000",
      width: 300,
      textAlign: 'center',
    },
    HeaderText: {
      fontSize: 40,
      color: "#fff",
    },
    menuItem2: {
        backgroundColor: '#280A46',
        marginVertical: '10%',
        borderRadius: 20,
        paddingVertical: '6%',
        paddingHorizontal: '4%',

      },
    menuItemText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
    menuItemText2: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
      },
      container: {
        flex: 1,
      },
      header: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: '10%', // Dodaj margines poziomy
      },
      body: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      footer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
  });

export default styles;