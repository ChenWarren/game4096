import React, { FC } from 'react'
import { useSpring, animated } from 'react-spring'

interface CellProps {
    cellNum: number,
    bgColor: string
}

const Cell: FC<CellProps> = ({
    cellNum,
    bgColor,
}) => {

  const anim = useSpring({ to: { opacity: 1}, from: {opacity: 0}, delay: 600})

  return (
    <animated.div style={anim} className={bgColor}>
      <div>
        {cellNum}
      </div>
    </animated.div>
  )
}

export default Cell