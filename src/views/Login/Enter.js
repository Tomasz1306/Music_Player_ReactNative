import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
const Enter = (props) => {
    const [username, setUsername] = useState('');
    const [koniec, setKoniec] = useState(true);
    const funkcjaZwrotna = (text) => {
        // Przekazanie warto�ci do rodzica po zako�czeniu edycji
        setKoniec(true);
        if (props.onUsernameChange) {
            props.onUsernameChange(username,true);
        }
    };
    const zakonczenie = (text) => {
        // Przekazanie warto�ci do rodzica po zako�czeniu edycji
        setUsername(text);
        setKoniec(false);
        if (props.onUsernameChange) {
            props.onUsernameChange('',false);
        }
    };
    return (
        <View style={styles.inputFlex} >
            <View style={styles.space}></View>

            <Text style={styles.titleText}>{props.title}</Text>
            <TextInput
                style={koniec ? styles.input:styles.badInput}
                placeholder={props.enterTitle}
                onChangeText={zakonczenie}
                value={username}
                secureTextEntry={props.secure || false}
                onEndEditing={funkcjaZwrotna}
            />
            <View style={styles.space}></View>
        </View>
    )
}

const styles = StyleSheet.create({

    content: {
        flex: 0.75,
        alignItems: 'center',
    },
    titleText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 16,
    },
    input: {
        flexDirection: 'row',
        //flex: 0.20,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#bf3fbf',
        borderRadius: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
    },
    badInput: {
        flexDirection: 'row',
        //flex: 0.20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bf3fbf',
        borderRadius: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
    },
    inputFlex: {
        width: '80%',
        flex:1,

    },
    space: {
        flex: 1,
        height:'100%',
    },
});
export default Enter;