import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';
import Animated, {
  FadeIn,
  SlideInUp,
  ZoomIn,
  SlideInLeft,
  SlideInRight
} from 'react-native-reanimated';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }

    onPickNumber(chosenNumber);
  }

return (
  <View style={styles.rootContainer}>
    <Animated.View entering={FadeIn.duration(1500)}>
      <Title>Guess My Number</Title>
    </Animated.View>

    <Card>
      <Animated.View entering={SlideInUp.duration(1200)}>
        <InstructionText>Enter a Number</InstructionText>
      </Animated.View>

      <Animated.View entering={ZoomIn.duration(1000)}>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
      </Animated.View>

      <View style={styles.buttonsContainer}>
        <Animated.View entering={SlideInLeft.duration(1000)} style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </Animated.View>
        <Animated.View entering={SlideInRight.duration(1000)} style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </Animated.View>
      </View>
    </Card>
  </View>
);

}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
