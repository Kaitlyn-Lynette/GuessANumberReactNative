import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import {Ionicons} from '@expo/vector-icons'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor((Math.random() * (max-min))) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
     } else {
         return rndNum;     }
 }

 const renderListItem = () => (
    <View key={value} styles={styles.listItem}>
    <BodyText>#{numofRound}</BodyText>
    <BodyText>{value}</BodyText>

 </View>)

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1,100, props.userChoice))

        const [rounds, setRounds] = useState(0)
        const currentLow = useRef(1);
        const currentHigh = useRef(100);

        const {userChoice, onGameOver} = props;

        useEffect(()=> {
            if(currentGuess === userChoice) {
                onGameOver(rounds);
            }
        },[currentGuess, userChoice, onGameOver])

        const nextGuessHandler = direction => {
            if (
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice)
             ) {
                Alert.alert('Dont like' , 'You know that this is wrong...',[{text:
                'Sorry!', style: 'cancel'}
            ]);
            return;
            }
            if(direction === 'lower') {
                currentHigh.current = currentGuess;
            } else {
                currentLow.current = currentGuess
            }

           const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
            setCurrentGuess(nextNumber)
            setRounds(curRounds => curRounds +1)
        }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
        <MainButton
          onPress={nextGuessHandler.bind(this, 'lower')}> Lower
             <Ionicons name="md-remove" size={24} color="white"/>
        </MainButton> 
        <MainButton
          onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name="md-add" size={24} color="white"/>
        </MainButton>
            </Card>
        <View>
            <ScrollView>
                {pastGuess.map((guess, index)=> renderListItem(guess, pastGuesses.length-index))}
            </ScrollView>
        </View>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '80%'
    }, 
    listItem: {
        borderColor: 'black', 
        padding: 15,
        margin: 10,
        backgroundColor: 'white', 
        flexDirection: 'row', 
        width: '80%',
        justifyContent: 'space-between'
    }
});

export default GameScreen;