import React, { FC } from 'react'

interface CellProps {
    cellNum: number,
    bgColor: string
}

const Cell: FC<CellProps> = ({
    cellNum,
    bgColor,
}) => {
  return (
    <div className={bgColor}>
        {cellNum}
    </div>
  )
}

export default Cell