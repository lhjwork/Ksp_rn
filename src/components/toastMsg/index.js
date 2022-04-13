import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';

const ToastMsg = forwardRef((props, ref) => {
  const [message, setMessage] = useState('');
  const toastOpacity = useSharedValue(0);
  const isShowed = useRef(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: toastOpacity.value,
    };
  }, []);

  useImperativeHandle(ref, () => ({
    show: show,
  }));

  const turnOnIsShow = useCallback(() => {
    isShowed.current = false;
  }, []);

  const show = useCallback(message => {
    if (!isShowed.current) {
      setMessage(message);
      isShowed.current = true;
      toastOpacity.value = withSequence(
        withTiming(1, {duration: 0}),
        withTiming(0, {duration: 1000}, () => {
          runOnJS(turnOnIsShow)();
        }),
      );
    }
  }, []);

  return (
    <Animated.View style={[styles.rootContainer, animatedStyle]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    left: '50%',
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 9,
    paddingHorizontal: 33,
    borderRadius: 20,
    transform: [{translateX: -105}],
  },
  message: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '17px',
  },
});

export default ToastMsg;
