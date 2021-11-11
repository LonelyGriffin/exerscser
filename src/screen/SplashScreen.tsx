import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

export const SplashScreen = () => {
  const [cardsOrder, setCardsOrder] = useState([0, 1, 2]);
  const topCardX = useRef(new Animated.Value(20)).current;
  const topCardY = useRef(new Animated.Value(-20)).current;
  const topCardRotate = useRef(new Animated.Value(0)).current;
  const containerShift = useRef(new Animated.Value(0)).current;
  const [isSecondAnimation, setIsSecondAnimation] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(topCardX, {
        toValue: -40,
        useNativeDriver: true,
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      }),
      Animated.timing(topCardY, {
        toValue: -210,
        useNativeDriver: true,
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      }),
      Animated.timing(topCardRotate, {
        toValue: 180,
        useNativeDriver: true,
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      }),
    ]).start(() => {
      setIsSecondAnimation(true);
    });
  }, [cardsOrder]);

  useEffect(() => {
    if (isSecondAnimation) {
      Animated.parallel([
        Animated.timing(topCardY, {
          toValue: 40,
          useNativeDriver: true,
          duration: 500,
          easing: Easing.inOut(Easing.cubic),
        }),
        Animated.timing(containerShift, {
          toValue: 20,
          useNativeDriver: true,
          duration: 500,
          easing: Easing.inOut(Easing.cubic),
        }),
      ]).start(() => {
        setIsSecondAnimation(false);
        setCardsOrder([cardsOrder[cardsOrder.length - 1], ...cardsOrder.slice(0, cardsOrder.length - 1)]);

        topCardRotate.setValue(0);
        containerShift.setValue(0);
        topCardX.setValue(20);
        topCardY.setValue(-20);
      });
    }
  }, [isSecondAnimation]);

  const cardOrderToRender = isSecondAnimation ? [cardsOrder[cardsOrder.length - 1], ...cardsOrder.slice(0, cardsOrder.length - 1)] : cardsOrder;

  const containerAnim = {transform: [{translateX: containerShift}, {translateY: containerShift.interpolate({inputRange: [0, 20], outputRange: [0, -20]})}]};

  return (
    <View style={s.root}>
      <Animated.View style={[s.centerContainer, containerAnim]}>
        {cardOrderToRender.map((cardNumber, index) => {
          let animStyle = {};

          const rotateX = topCardRotate.interpolate({inputRange: [0, 180], outputRange: ['0deg', '180deg']});
          const rotateY = topCardRotate.interpolate({inputRange: [0, 180], outputRange: ['0deg', '0deg']});

          if (isSecondAnimation) {
            if (index === 1) {
              animStyle = {
                transform: [{translateX: -20}, {translateY: 20}],
              };
            }

            if (index === 2) {
              animStyle = {
                transform: [{translateX: 0}, {translateY: 0}],
              };
            }

            if (index === 0) {
              animStyle = {
                transform: [{translateX: topCardX}, {translateY: topCardY}, {perspective: 600}, {rotateY: rotateY}, {rotateX: rotateX}],
              };
            }
          } else {
            if (index === 0) {
              animStyle = {
                transform: [{translateX: -20}, {translateY: 20}],
              };
            }

            if (index === 1) {
              animStyle = {
                transform: [{translateX: 0}, {translateY: 0}],
              };
            }

            if (index === 2) {
              animStyle = {
                transform: [{translateX: topCardX}, {translateY: topCardY}, {perspective: 600}, {rotateY: rotateY}, {rotateX: rotateX}],
              };
            }
          }

          return <Animated.View key={cardNumber} style={[s.card, (s as any)[cardNumber], animStyle]} />;
        })}
      </Animated.View>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    width: 200,
    height: 200,
  },
  card: {
    position: 'absolute',
    flex: 1,
    borderRadius: 8,
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  0: {
    backgroundColor: '#00245A',
  },
  1: {
    backgroundColor: '#007E8C',
  },
  2: {
    backgroundColor: '#809CC6',
  },
});
