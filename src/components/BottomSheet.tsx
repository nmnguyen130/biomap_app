import React, { useCallback, useEffect, useImperativeHandle } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);
    const start = useSharedValue({ y: 0 });
    const active = useSharedValue(true);

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        start.value = { y: translateY.value };
      })
      .onUpdate((e) => {
        translateY.value = e.translationY + start.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    useEffect(() => {
      scrollTo(-SCREEN_HEIGHT / 3);
    }, []);

    const sheetAnimatedStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolation.CLAMP
      );
      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    const backdropAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active.value ? 1 : 0),
      };
    }, []);

    const backdropProps = useAnimatedProps(() => {
      return { pointerEvents: active.value ? "auto" : "none" } as any;
    }, []);

    return (
      <>
        <Animated.View
          onTouchStart={() => {
            // Dismiss the BottomSheet
            scrollTo(0);
          }}
          animatedProps={backdropProps}
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,.4)",
            },
            backdropAnimatedStyle,
          ]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.bottomSheetContainer, sheetAnimatedStyle]}
          >
            <View className="w-14 h-1 bg-gray-500 self-center my-3 rounded-sm" />
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "97%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 24,
    marginHorizontal: 6,
  },
});

export default BottomSheet;
