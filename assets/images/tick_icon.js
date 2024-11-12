import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";
const TickIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 20"
    {...props}
  >
    <G id="Group_5786" data-name="Group 5786" transform="translate(-318 -177)">
      <Circle
        id="Ellipse_22"
        data-name="Ellipse 22"
        cx={10}
        cy={10}
        r={10}
        transform="translate(318 177)"
        fill="#07d008"
      />
      <Path
        id="Path_3906"
        data-name="Path 3906"
        d="M6854.468-133.771l3,3,6-7"
        transform="translate(-6530.968 321.271)"
        fill="none"
        stroke="#fff"
        strokeWidth={1}
      />
    </G>
  </Svg>
);
export default TickIcon;
