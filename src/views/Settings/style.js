import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 6,
      backgroundColor: '#3e3e3e',
      alignItems: "center",
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 300,
      height: 60,
      flexShrink: 0,
      marginVertical: 10,
      borderRadius: 20,
      backgroundColor: '#BF3FBF',
    },
    settingRow_2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 300,
      height: 30,
      flexShrink: 0,
      marginVertical: 10,
      borderRadius: 20,
      backgroundColor: '#BF3FBF',
    },
    slider: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 300,
      height: 9,
      flexShrink: 0,
      marginVertical: 10,
      borderRadius: 20,
    },
    font: {
        color: '#280A46',
        fontSize: 16,
    },
    font_2: {
      color: '#FFF',
      fontSize: 30,
      flex: 0.7,
      lineHeight: 50,
  },
    font_3: {
     color: '#D9D9D9',
     fontSize: 16,
     flex: 0.7,
     lineHeight: 25,
  },
   font_4: {
     color: '#D9D9D9',
     fontSize: 16,
     flex: 0.7,
     lineHeight: 18,
 },
    font_5: {
      color: '#280A46',
      fontSize: 16,
      flex: 1,
      textAlign: 'center',
 },
    sw: {
        width: 53,
        height: 30,
        flexShrink: 1,
        borderWidth: 10,
        borderRadius: 20,
        borderColor: '#BF3FBF', // Kolor ramki
        padding: 5,
    },
      gradient: {
        width: '100%',
        height: '100%',
        opacity: 0.95,
        justifyContent: 'center',
        alignItems: 'center',
      },
      header: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%', // Dodaj margines poziomy
      },
      body: {
        alignItems: "center",
        flex: 5, // Zajmuje 5/6 ekranu
        width: '100%',
        marginVertical: '10%',
        borderRadius: 20,
        paddingVertical: '6%',
        paddingHorizontal: '4%',
      },  

      top_bar: (Bg_color, Top_color, Text_color) => {
        return {

            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row'
        }
    },
styles_text_TOP: (Bg_color, Top_color, Text_color) => {
        return {
            color: '#BF3FBF',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 30,
            fontWeight: 'bold'
        }
    },
  });

  export default styles;