import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const PrevButton = (props: SvgProps) => (
  <Svg
    width={16}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      d="M15 1v12L5 7l10-6Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M1 13V1"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default PrevButton