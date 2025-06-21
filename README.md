
## 4096 Game

A web game that invites the player to join the numbers and try to reach 4096. The idea was inspired by the 1024 game and the 2048 but developed with my technology solution. 
- Developed with React.js, Next.js, and JavaScript.
- Have a clean and neat interface design.
- Have fun with some simple math.

## Play the gaem: 

[Game 4096](https://game4096.net)


# Game4096 - Complete Project Summary

## Overview
Game4096 is a modern implementation of the classic 4096 number puzzle game built with Next.js, React, and TypeScript. The game features smooth animations, immersive sound effects, and a polished user interface that provides an engaging gaming experience.

## Game Rules
- **Objective**: Combine tiles to reach the number 4096
- **Controls**: Use arrow buttons to slide tiles in four directions (up, down, left, right)
- **Mechanics**: When two tiles with the same number touch, they merge into one tile with double the value
- **Win Condition**: Create a tile with the value 4096
- **Game Over**: When no more moves are possible

## Features & Functionality

### 🎮 Core Game Features
- **4x4 Grid**: Classic puzzle game layout
- **Tile Sliding**: Smooth tile movement in all four directions
- **Tile Merging**: Automatic combination of matching numbers
- **Score Tracking**: Real-time score updates and high score display
- **Step Counter**: Track number of moves made
- **Win/Lose Detection**: Automatic game state management
- **Restart Functionality**: Quick game reset option

### 🎵 Sound System
- **Complete Audio Experience**: 6 different sound effects
  - `slide.mp3` - Tile movement sound
  - `merge.mp3` - Tile merging sound  
  - `spawn.mp3` - New tile appearing sound
  - `win.mp3` - Victory sound
  - `gameover.mp3` - Game over sound
  - `noway.mp3` - Invalid move sound
- **Sound Controls**: Toggle sound on/off with speaker icon
- **Volume Management**: Optimized audio levels (50% default)
- **Performance**: Preloaded audio for instant playback

### 🎨 Animation System
- **Tile Animations**: Smooth movement transitions using React Spring
- **Merge Effects**: Visual pulse/scale animations for combining tiles
- **Spawn Animations**: Fade-in and scale effects for new tiles
- **Direction-based Movement**: Realistic sliding animations
- **Timing Coordination**: Synchronized audio-visual feedback

### 🖥️ User Interface
- **Modern Design**: Clean, responsive layout
- **Interactive Controls**: Touch-friendly arrow buttons
- **Visual Feedback**: Highlighted merge cells and new tile indicators
- **Help System**: Built-in game instructions
- **Status Display**: Game over, victory, and progress notifications
- **Accessibility**: Clear icons and intuitive navigation

## Technical Stack

### Frontend Technologies
- **Next.js**: React framework for web application
- **React**: Component-based UI library
- **TypeScript**: Type-safe JavaScript development
- **React Spring**: Animation library for smooth transitions
- **CSS3**: Custom animations and responsive design

### Project Structure
```
game4096/
├── game/Game4096/
│   ├── index.tsx                    # Main game component
│   └── model/
│       ├── matrixHandler.ts         # Game logic and state management
│       ├── soundManager.ts          # Audio system management
│       ├── getRecord.ts             # High score tracking
│       └── create2DArray.ts         # Utility functions
├── comps/
│   ├── Cell.tsx                     # Individual tile component
│   └── Arrow.tsx                    # Control button component
├── public/sounds/                   # Audio assets (6 files)
├── styles/globals.css               # Global styles and animations
└── react-spring.d.ts               # TypeScript definitions
```

## Recent Development History

### Latest Updates (June 20, 2025)
1. **Sound System Implementation** - Complete audio experience with 6 sound effects
2. **Enhanced Animation System** - React Spring integration for smooth transitions
3. **UI/UX Improvements** - Sound controls, step counter, visual feedback
4. **Performance Optimizations** - Preloaded audio, optimized rendering
5. **Code Quality** - TypeScript integration, modular architecture

## Installation & Setup

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Game Controls
- **Arrow Buttons**: Click directional arrows to move tiles
- **Sound Toggle**: Click speaker icon to enable/disable audio
- **Help**: Click "?" for game instructions
- **Restart**: Click refresh icon when game ends

## Browser Compatibility
- Modern browsers with HTML5 audio support
- Mobile-friendly responsive design
- Touch and click input support

---

**Game4096** - A polished, feature-rich implementation of the classic number puzzle game with modern web technologies and exceptional user experience.