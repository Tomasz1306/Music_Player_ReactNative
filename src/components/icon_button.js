import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const IconButton = ({ icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.iconButton}>
        <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
    );
  
};

const styles = StyleSheet.create({
  iconButton: {
    // Definiuj styl dla przycisku, jeśli jest potrzebny
  },
  icon: {
    width: 30,    // Ustaw odpowiednią szerokość
    height: 30,   // Ustaw odpowiednią wysokość
    resizeMode: 'contain' // Zapewnia, że obraz będzie skalowany proporcjonalnie
  }
});

export default IconButton;