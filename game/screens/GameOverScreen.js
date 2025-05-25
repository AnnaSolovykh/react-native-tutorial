import { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
} from 'react-native-reanimated';

import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const imageScale = useSharedValue(0.3);
  const imageRotate = useSharedValue(0); // ⬅ поворот
  const buttonScale = useSharedValue(0.5);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    imageScale.value = withDelay(200, withTiming(1, { duration: 800 }));

    // ⬇ Бесконечное вращение картинки
    imageRotate.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1, // -1 = infinite
      false // не реверс
    );

    buttonScale.value = withDelay(500, withTiming(1, { duration: 800 }));
    buttonOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: imageScale.value },
        { rotate: `${imageRotate.value}deg` }, 
      ],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
      opacity: buttonOpacity.value,
    };
  });

  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>

      <Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
        <Image style={styles.image} source={require('../assets/images/success.png')} />
      </Animated.View>

      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>

      <Animated.View style={buttonAnimatedStyle}>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </Animated.View>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});
