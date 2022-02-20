import type { NextPage } from 'next'
import { useState } from 'react'

import Game4096 from '../game/Game4096'

const Home: NextPage = () => {

  return (
    <div className='container'>
      <Game4096/>
    </div>
  )
}

export default Home
