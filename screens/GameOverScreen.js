import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText'
import Colors from '../constants/Colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
        
        <View style={styles.imageContainer}>
            <Image source = {require('../assets/success.png')} 
            style={styles.image} 
            resizeMode="cover"
            />
        </View>
        <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{' '}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>

      
        </View>
    );
};

const styles = StyleSheet.create ({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'darkblue',
        overflow: 'hidden', 
        marginVertical: 30
    },
    image: {
        width: '100%', 
        height: '100%',
        borderRadius: 200
    }, 
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    }, 
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: 20
    }, 
    resultText: {
        textAlign: 'center'
    }
})

export default GameOverScreen