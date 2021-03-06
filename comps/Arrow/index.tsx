import React, { FC } from 'react'

interface ArrowProps {
    text: string,
    handler: Function,
}

const Arrow: FC<ArrowProps> = ({
    text,
    handler=(d:string)=>{}
}) => {
  return (
    <div 
        className='arrow'
        onClick={()=> handler()}
    >
        {text}
    </div>
  )
}

export default Arrow