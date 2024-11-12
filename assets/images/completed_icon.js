import * as React from "react";
import Svg, { Path, Polyline } from "react-native-svg";
const CompleteActionImg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    viewBox="0 0 24 24"
    fill="none"
    stroke="gray"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-check-circle"
    {...props}
  >
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <Polyline points="22 4 12 14.01 9 11.01" />
  </Svg>
);
export default CompleteActionImg;
