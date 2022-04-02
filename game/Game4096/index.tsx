import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Cell from '../../comps/Cell'
import Arrow from '../../comps/Arrow'
import matrixHandler from './model/matrixHandler'
import getHighestNumber from './model/getRecord'
import create2DArray from './model/create2DArray'

const maxtrixD = 4
const timeoutMS = 300
const initMatrix: number[][] = create2DArray(maxtrixD, 0)
const howToPlay =`
    How to play? 
    Click arrows to move the numbers. Two same numbers will add up. Keep adding numbers up to 4096 to win the game. Good luck!
  `

const Game4096: NextPage = () => {

  const [gameMatrix, setGameMatrix] = useState(initMatrix)
  const [arrowHited, setArrowHited] = useState('')
  const [win, setWin] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [notice, setNotice] = useState(true)
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [showingHelp, setShowingHelp] = useState(false)

  const arrows = useSpring({ to: { opacity: 1}, from: {opacity: 0}, delay: 800})
  const noti = useSpring({ to: { opacity: 1}, from: {opacity: 0}, delay: 1300})

  useEffect(()=> {
      setGameMatrix(initMatrix)
  }, [gameOver])

  const startGame = () => {
      if(gameOver) {
        setGameOver(false)
        setArrowHited('')
      }
      if(win) {
        setWin(false)
      }
      setNotice(true)
      setGameMatrix(initMatrix)
      setRecord(0)
  }

  const checkGameStatus = (result:any) => {
    if(result != 'GameOver'){
      setTimeout(()=>{
        setGameMatrix(result)
        setArrowHited('')
      }, timeoutMS)
      let maxNumber = getHighestNumber(result)
      setRecord(maxNumber)
      if(maxNumber==4096){
          setWin(true)
      }
    } else {
      setGameOver(true)
    }
  }

  const gameOperate = (d:string)=>{
      if(notice){
        setNotice(false)
      }
      let direction: string = d
      setArrowHited(direction)
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      checkGameStatus(res)
  }

  const leftHandler = () => {
      if(notice){
        setNotice(false)
      }
      gameOperate('left')
  }

  const rightHandler = () => {
      if(notice){
        setNotice(false)
      }
      gameOperate('right')
  }

  const upHandler = () => {
      if(notice){
        setNotice(false)
      }
      gameOperate('up')
  }

  const downHandler = () => {
      if(notice){
        setNotice(false)
      }
      gameOperate('down')
  }

  const showHelp = () => {
    setShowingHelp(!showingHelp)
  }

  const checkRnI =(row:number,ind:number, di:string) => {
      if(di=='left'){
        if(ind!==0){
          return true
        }
      } else if(di=='right'){
        if(ind!==maxtrixD-1){
          return true
        }
      } else if(di=='up'){
        if(row!==0){
          return true
        }
      } else if(di=='down'){
        if(row!==maxtrixD-1){
          return true
        }
      } else {
        return false
      }
  }
  
  return (
    <div className='container'>
      <div className='navbar'>
        <div className='title'>4096</div>
        {gameOver || win?
            <Arrow text='&#x21BA;' handler={startGame}/>
            :
            <div className='help-circle' onClick={showHelp}>?</div>
        }
      </div>
      { gameOver? 
        <div className='game-over'>Game Over</div>
        :
        win? 
          <div className='game-over'>
            <div>You win!</div>
            <div className='win-font'>Record: {record}</div>
          </div> 
          : 
          <div className='game-board'>

            <div className='board-border'>
              { gameMatrix.map((row, r)=>(
                  <div key={r} className='row'>
                      {
                        row.map((num, i) => (
                          <div 
                            key={i}
                            className='cell-box'
                            style={{
                              animation: arrowHited!='' && checkRnI(r,i,arrowHited) && num!==0? `${arrowHited} 200ms` : ''
                            }} 
                            >
                            <Cell cellNum={num} bgColor={`cell bg-${num.toString()}`}/>
                          </div>
                        ))
                      }
                  </div>
              ))
              }
            </div>
          </div>
      }

      <div className='notice'>
          { notice?
            <animated.div style={noti}>Click any arrow to start the game.</animated.div>
            :
            null
          }
      </div>

      <animated.div style={arrows} className='button-wrapper'>

          {showingHelp? 
            <div className='help-board'>
              <div className='help-text'>
                {howToPlay}
              </div>
              <div className='help-board-bottem'>
                <div className='help-circle' onClick={showHelp}>&#x21BA;</div>
              </div>
            </div>
            :
            null
          }

          <div>
              <Arrow text='&#x2190;' handler={leftHandler}/>
          </div>
          <div>
              <Arrow text = '&#x2191;' handler={upHandler}/>
              <div style={{width: 50, height: 50}}></div>
              <Arrow text = '&#x2193;' handler={downHandler}/>
          </div>
          <div>
              <Arrow text = '&#x2192;' handler={rightHandler}/>

          </div>
      </animated.div>

    </div>
  )
}

export default Game4096
