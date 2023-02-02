import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const NextButton = (props: SvgProps) => (
  <Svg
    width={16}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      d="M1 13V1l10 6-10 6Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M15 1v12"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default NextButton