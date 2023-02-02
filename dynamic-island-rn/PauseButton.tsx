import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const PauseButton = (props: SvgProps) => (
  <Svg
    width={8}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      d="M7 1v12M1 1v12"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default PauseButton
