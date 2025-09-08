import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const HelloWorldScreen = () => {
  const insets = useSafeAreaInsets();
  
  // Animation values
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  React.useEffect(() => {
    // Entrance animation
    scale.value = withDelay(300, withTiming(1, { duration: 800 }));
    opacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    translateY.value = withDelay(300, withTiming(0, { duration: 800 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Animated.View style={[styles.textContainer, animatedStyle]}>
            <Text style={styles.helloText}>Hello</Text>
            <Text style={styles.worldText}>World</Text>
            <View style={styles.underline} />
          </Animated.View>
          
          <Animated.Text style={[styles.subtitle, animatedStyle]}>
            Welcome to your beautiful app
          </Animated.Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  helloText: {
    fontSize: 64,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: 2,
    textAlign: 'center',
  },
  worldText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: -10,
  },
  underline: {
    width: 80,
    height: 3,
    backgroundColor: '#ffffff',
    marginTop: 15,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});

export default HelloWorldScreen;