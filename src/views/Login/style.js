import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: 60, // przykładowa wysokość
      backgroundColor: '#f8f8f8', // przykładowy kolor tła
      alignItems: 'center',
      justifyContent: 'center',
    },
    body: {
      flex: 1, // zajmuje całą dostępną przestrzeń
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footer: {
      height: 50, // przykładowa wysokość
      backgroundColor: '#f8f8f8', // przykładowy kolor tła
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default styles;