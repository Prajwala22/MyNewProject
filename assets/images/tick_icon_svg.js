import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";
const TickIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    {...props}
  >
    <G id="Group_56" data-name="Group 56" transform="translate(-318 -177)">
      <Circle
        id="Ellipse_22"
        data-name="Ellipse 22"
        cx={7}
        cy={7}
        r={7}
        transform="translate(318 177)"
        fill="#008960"
      />
      <Path
        id="Path_3906"
        data-name="Path 3906"
        d="M6854.172-135.149l2.612,2.311,4.1-5.014"
        transform="translate(-6532.529 319.345)"
        fill="none"
        stroke="#fff"
        strokeWidth={1}
      />
    </G>
  </Svg>
);
export default TickIcon;
