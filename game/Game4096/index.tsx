import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'

import Cell from '../../comps/Cell'
import Arrow from '../../comps/Arrow'
import matrixHandler from './model/matrixHandler'
import getHighestNumber from './model/getRecord'
import create2DArray from './model/create2DArray'
import SoundManager from './model/soundManager'

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
  const [mergedCells, setMergedCells] = useState<Array<{row: number, col: number}>>([])
  const [newTilePosition, setNewTilePosition] = useState<{row: number, col: number} | null>(null)
  const [steps, setSteps] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const soundManager = useRef<SoundManager | null>(null)

  const arrows = useSpring({ to: { opacity: 1}, from: {opacity: 0}, delay: 800})
  const noti = useSpring({ to: { opacity: 1}, from: {opacity: 0}, delay: 1300})

  useEffect(()=> {
      setGameMatrix(initMatrix)
  }, [gameOver])

  useEffect(() => {
    soundManager.current = new SoundManager()
  }, [])

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
      setSteps(0)
  }

  const checkGameStatus = (result:any) => {
    if(result != 'GameOver'){
      const matrix = result.matrix || result
      const mergedCells = result.mergedCells || []
      const newTilePos = result.newTilePosition || null
      const hasMovement = result.hasMovement !== undefined ? result.hasMovement : true
      
      if(mergedCells.length > 0) {
        setMergedCells(mergedCells)
        soundManager.current?.play('merge')
        setTimeout(() => setMergedCells([]), 400)
      }
      
      setTimeout(()=>{
        // Create matrix without the new tile first
        if(newTilePos && hasMovement) {
          const matrixWithoutNewTile = matrix.map((row: number[], r: number) => 
            row.map((cell: number, c: number) => 
              r === newTilePos.row && c === newTilePos.col ? 0 : cell
            )
          )
          setGameMatrix(matrixWithoutNewTile)
          setArrowHited('')
          
          // Then add the new tile after 500ms delay
          soundManager.current?.play('spawn')
          setTimeout(() => {
            setGameMatrix(matrix)
            setNewTilePosition(newTilePos)
            setTimeout(() => setNewTilePosition(null), 400)
          }, 500)
        } else if(newTilePos && !hasMovement) {
          // No movement occurred, don't spawn new tile, just play noway sound
          setArrowHited('')
        } else {
          setGameMatrix(matrix)
          setArrowHited('')
        }
      }, timeoutMS)
      
      let maxNumber = getHighestNumber(matrix)
      setRecord(maxNumber)
      if(maxNumber==4096){
          setWin(true)
          soundManager.current?.play('win')
      }
    } else {
      setGameOver(true)
      soundManager.current?.play('gameover')
    }
  }

  const gameOperate = (d:string)=>{
      const isFirstMove = notice
      if(notice){
        setNotice(false)
      }
      let direction: string = d
      setArrowHited(direction)
      setSteps(steps + 1)
      let matrix= gameMatrix
      const res = matrixHandler({matrix, direction, score, setScore})
      
      if(!isFirstMove && res !== 'GameOver') {
        const hasMovement = res.hasMovement !== undefined ? res.hasMovement : true
        if(hasMovement) {
          soundManager.current?.play('slide')
        } else {
          soundManager.current?.play('noway')
        }
      }
      
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

  const toggleSound = () => {
    const newSoundState = soundManager.current?.toggle() ?? false
    setSoundEnabled(newSoundState)
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

  const isCellMerged = (row: number, col: number) => {
    return mergedCells.some(cell => cell.row === row && cell.col === col)
  }

  const isNewTile = (row: number, col: number) => {
    return newTilePosition && newTilePosition.row === row && newTilePosition.col === col
  }

  const SpeakerOnIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  )

  const SpeakerOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
  )
  
  return (
    <div className='container'>
      <div className='navbar'>
        <div className='title'>4096</div>
        <div className='navbar-controls'>
          <div className='sound-toggle' onClick={toggleSound}>
            {soundEnabled ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
          </div>
          {gameOver || win?
              <Arrow text='&#x21BA;' handler={startGame}/>
              :
              <div className='help-circle' onClick={showHelp}>?</div>
          }
        </div>
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
                        row.map((num, i) => {
                          let animationStyle = ''
                          
                          if (isCellMerged(r, i) && num !== 0) {
                            animationStyle = 'merge 400ms ease-in-out'
                          } else if (isNewTile(r, i) && num !== 0) {
                            animationStyle = 'newTile 400ms ease-in-out'
                          } else if (arrowHited !== '' && checkRnI(r, i, arrowHited) && num !== 0) {
                            animationStyle = `${arrowHited} 200ms ease-in-out`
                          }
                          
                          return (
                            <div 
                              key={i}
                              className='cell-box'
                              style={{
                                animation: animationStyle
                              }} 
                              >
                              <Cell cellNum={num} bgColor={`cell bg-${num.toString()}`}/>
                            </div>
                          )
                        })
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
            steps > 0 ? <div>{steps} step{steps !== 1 ? 's' : ''}</div> : null
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
