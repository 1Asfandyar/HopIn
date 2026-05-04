import { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import type { BrandedLoaderProps } from '@/types/types';

const BrandedLoader = ({
  variant = 'screen',
  onFinish,
}: BrandedLoaderProps) => {
  const pulse = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const revealScale = useRef(new Animated.Value(1)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const isButton = variant === 'button';
  const isInline = variant === 'inline';
  const isSplash = variant === 'splash';

  useEffect(() => {
    if (isSplash) {
      const animation = Animated.sequence([
        Animated.timing(rotate, {
          toValue: 1,
          duration: 720,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(revealScale, {
            toValue: 34,
            duration: 560,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 620,
            delay: 180,
            useNativeDriver: true,
          }),
        ]),
      ]);

      animation.start(({ finished }) => {
        if (finished) {
          onFinish?.();
        }
      });

      return () => {
        animation.stop();
      };
    }

    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rotate, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [isSplash, onFinish, overlayOpacity, pulse, revealScale, rotate]);

  const iconOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.72, 1],
  });

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const containerClassName = [
    isInline || isButton ? 'bg-transparent px-0 flex-none' : 'flex-1 px-6',
    isSplash ? 'bg-primary' : 'bg-white',
    isInline ? 'py-2' : '',
    'items-center justify-center',
  ].join(' ');
  const markWrapClassName = [
    isButton ? 'w-[22px] h-[22px]' : isInline ? 'w-11 h-11' : 'w-24 h-24',
    isButton || isInline ? 'mb-0' : 'mb-5',
    'items-center justify-center',
  ].join(' ');
  const iconWrapClassName = [
    'items-center justify-center',
    isButton ? 'w-5 h-5' : isInline ? 'w-8 h-8' : 'w-[66px] h-[66px]',
  ].join(' ');
  const iconClassName = isButton
    ? 'w-[14px] h-[14px]'
    : isInline
      ? 'w-5 h-5'
      : 'w-[42px] h-[42px]';

  return (
    <Animated.View
      className={containerClassName}
      style={{ opacity: isSplash ? overlayOpacity : 1 }}
    >
      <View className={markWrapClassName}>
        {isSplash && (
          <Animated.View
            style={[
              {
                opacity: 1,
                transform: [{ scale: revealScale }],
              },
            ]}
            className="absolute h-24 w-24 rounded-full bg-white"
          />
        )}
        <Animated.View
          style={[
            isSplash
              ? {
                  transform: [{ scale: 1 }, { rotate: spin }],
                }
              : {
                  opacity: iconOpacity,
                },
          ]}
          className={iconWrapClassName}
        >
          <Image
            source={require('../../assets/icons/hopin_icon.png')}
            className={iconClassName}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default BrandedLoader;
