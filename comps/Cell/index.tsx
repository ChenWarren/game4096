
import { dir } from 'console'
import React, { FC, useEffect, useState } from 'react'


interface CellProps {
    cellNum: number,
    bgColor: string,
}

const Cell: FC<CellProps> = ({
    cellNum,
    bgColor,
}) => {

  return (
    <div 
      className={bgColor}
    >
        {cellNum !=0? cellNum : null}
    </div>

  )
}

export default Cell