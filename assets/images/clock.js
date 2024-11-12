import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";
const Clock = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={11}
    viewBox="0 0 11 11"
    {...props}
  >
    <G id="clock" transform="translate(0.501 0.5)">
      <Circle
        id="Ellipse_64"
        data-name="Ellipse 64"
        cx={5}
        cy={5}
        r={5}
        transform="translate(-0.001)"
        fill="none"
        stroke="#959fad"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      />
      <Path
        id="Path_3942"
        data-name="Path 3942"
        d="M12,6V8.7l1.8.9"
        transform="translate(-7 -3.701)"
        fill="none"
        stroke="#959fad"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      />
    </G>
  </Svg>
);
export default Clock;
