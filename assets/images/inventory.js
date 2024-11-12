import * as React from "react";
import Svg, { Path } from "react-native-svg";
const InventoryIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    viewBox="0 0 17 17"
    {...props}
  >
    <Path
      id="chart-bar"
      d="M17.429,18.036V4.679H12.571V18.036H10.143v-8.5H5.286v8.5H3.464V2.25H2.25V18.036A1.214,1.214,0,0,0,3.464,19.25H19.25V18.036Zm-8.5,0H6.5V10.75H8.929Zm7.286,0H13.786V5.893h2.429Z"
      transform="translate(-2.25 -2.25)"
      fill="#959fad"
    />
  </Svg>
);
export default InventoryIcon;
