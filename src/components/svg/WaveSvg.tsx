import Svg, { Path } from "react-native-svg";

function WaveSvg(props: { fill?: string }) {
  return (
    <Svg viewBox="0 0 1526 433">
      <Path
        fill={props.fill ?? "#128F51"}
        d="M 0 433 C 382.5 433 382.5 146 759 146 L 759 146 L 759 -1000 L 0 -1000 Z"
        stroke-width="0"
      ></Path>
      <Path
        fill={props.fill ?? "#128F51"}
        d="M 758 146 C 1142 146 1142 433 1526 433 L 1526 433 L 1526 -1000 L 758 -1000 Z"
        stroke-width="0"
      ></Path>
    </Svg>
  );
}

export default WaveSvg;
