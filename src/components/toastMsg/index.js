import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';

const ToastMsg = forwardRef((props, ref, style) => {
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
        withTiming(0, {duration: 2000}, () => {
          runOnJS(turnOnIsShow)();
        }),
      );
    }
  }, []);

  return (
    <View style={styles.rootView}>
      <Animated.View style={[styles.rootContainer, animatedStyle]}>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  rootView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  rootContainer: {
    position: 'absolute',
    // left: '50%',
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 9,
    paddingHorizontal: 33,
    borderRadius: 20,
    // transform: [{translateX: -105}],
  },
  message: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '17px',
  },
  // rootContainer: {
  //   position: 'absolute',
  //   bottom: 100,
  //   backgroundColor: 'rgb(95, 209, 251)',
  //   paddingVertical: 9,
  //   paddingHorizontal: 23,
  //   borderRadius: 100,
  // },
  // message: {
  //   color: 'rgb(255, 255, 255)',
  // },
});

export default ToastMsg;
