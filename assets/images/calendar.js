import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CalenderIcon = (props) => (
  <Svg
    id="calendar"
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      id="Path_50"
      data-name="Path 50"
      d="M1,5.25v10a1,1,0,0,0,1,1H14a1,1,0,0,0,1-1v-10Zm1-3a2,2,0,0,0-2,2v11a2,2,0,0,0,2,2H14a2,2,0,0,0,2-2v-11a2,2,0,0,0-2-2Z"
      transform="translate(0 -1.25)"
      fill="#858995"
      fillRule="evenodd"
    />
    <Path
      id="Path_51"
      data-name="Path 51"
      d="M7.25,0a.5.5,0,0,1,.5.5V1a.5.5,0,0,1-1,0V.5A.5.5,0,0,1,7.25,0Zm9,0a.5.5,0,0,1,.5.5V1a.5.5,0,0,1-1,0V.5A.5.5,0,0,1,16.25,0Z"
      transform="translate(-3.75)"
      fill="#858995"
      fillRule="evenodd"
    />
  </Svg>
);
export default CalenderIcon;
