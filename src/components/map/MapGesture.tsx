import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { G, Svg } from "react-native-svg";

const AnimatedG = Animated.createAnimatedComponent(G);

interface Props {
  width: number;
  height: number;
  children: React.ReactNode;
}

const MapGesture: React.FC<Props> = ({ width, height, children }) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const center = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: start.value.x + e.translationX / scale.value,
        y: start.value.y + e.translationY / scale.value,
      };
    })
    .onEnd(() => {
      start.value = { ...offset.value };
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
      center.value = {
        x: width / 2,
        y: height / 2,
      };
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composed = Gesture.Simultaneous(pan, pinch);

  const animatedProps = useAnimatedStyle(() => ({
    transform: [
      { translateX: center.value.x },
      { translateY: center.value.y },
      { scale: scale.value },
      { translateX: -center.value.x },
      { translateY: -center.value.y },
      { translateX: offset.value.x },
      { translateY: offset.value.y },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Svg width={width} height={height}>
        <AnimatedG animatedProps={animatedProps}>{children}</AnimatedG>
      </Svg>
    </GestureDetector>
  );
};

export default MapGesture;
