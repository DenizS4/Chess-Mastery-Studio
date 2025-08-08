"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Chess } from "chess.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, RotateCcw, ChevronLeft, ChevronRight, SkipForward } from "lucide-react"

interface Arrow {
  from: string
  to: string
  color: string
}

interface ChessBoardProps {
  fen?: string
  onMove?: (move: any) => void
  showCoordinates?: boolean
  interactive?: boolean
  lastMove?: { from: string; to: string } | null
}

interface BoardTheme {
  lightSquares: string
  darkSquares: string
  highlightColor: string
  moveColor: string
  checkColor: string
}

interface BoardCustomizationProps {
  boardTheme: BoardTheme
  setBoardTheme: (theme: BoardTheme) => void
  pieceStyle: string
  setPieceStyle: (style: string) => void
}

function BoardCustomization({ boardTheme, setBoardTheme, pieceStyle, setPieceStyle }: BoardCustomizationProps) {
  const boardThemes = [
    {
      name: "Classic",
      lightSquares: "#f0d9b5",
      darkSquares: "#b58863",
      highlightColor: "#ffff00",
      moveColor: "#00ff00",
      checkColor: "#ff0000",
    },
    {
      name: "Chess.com Green",
      lightSquares: "#eeeed2",
      darkSquares: "#769656",
      highlightColor: "#f7f769",
      moveColor: "#baca2b",
      checkColor: "#ff6b6b",
    },
    {
      name: "Chess.com Brown",
      lightSquares: "#f0d9b5",
      darkSquares: "#b58863",
      highlightColor: "#f7f769",
      moveColor: "#baca2b",
      checkColor: "#ff6b6b",
    },
    {
      name: "Blue",
      lightSquares: "#dee3e6",
      darkSquares: "#8ca2ad",
      highlightColor: "#f7f769",
      moveColor: "#4fc3f7",
      checkColor: "#ff5722",
    },
    {
      name: "Purple",
      lightSquares: "#e8e4e6",
      darkSquares: "#9c7fb5",
      highlightColor: "#f7f769",
      moveColor: "#ba68c8",
      checkColor: "#f44336",
    },
    {
      name: "Dark Mode",
      lightSquares: "#4a4a4a",
      darkSquares: "#2d2d2d",
      highlightColor: "#ffd54f",
      moveColor: "#66bb6a",
      checkColor: "#ef5350",
    },
  ]

  const pieceStyles = [
    { name: "Chess.com 3D", value: "chesscom", preview: "♔♛" },
    { name: "Modern Flat", value: "modern", preview: "♔♛" },
    { name: "Classic", value: "classic", preview: "♔♛" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Board Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Board Themes */}
        <div>
          <h4 className="font-semibold mb-3">Board Themes</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {boardThemes.map((theme) => (
              <div
                key={theme.name}
                className={`cursor-pointer rounded-lg border-2 transition-all ${
                  boardTheme.lightSquares === theme.lightSquares
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setBoardTheme(theme)}
              >
                <div className="p-3">
                  <div className="grid grid-cols-4 gap-0 w-16 h-16 mx-auto mb-2 rounded overflow-hidden">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-1"
                        style={{
                          backgroundColor:
                            (Math.floor(i / 4) + (i % 4)) % 2 === 0 ? theme.lightSquares : theme.darkSquares,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {theme.name}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Piece Styles */}
        <div>
          <h4 className="font-semibold mb-3">Piece Styles</h4>
          <div className="grid grid-cols-3 gap-3">
            {pieceStyles.map((style) => (
              <div
                key={style.value}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                  pieceStyle === style.value
                    ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setPieceStyle(style.value)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{style.preview}</div>
                  <Badge variant={pieceStyle === style.value ? "default" : "outline"} className="text-xs">
                    {style.name}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Customization */}
        <div>
          <h4 className="font-semibold mb-3">Custom Colors</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Light Squares</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={boardTheme.lightSquares}
                  onChange={(e) => setBoardTheme({ ...boardTheme, lightSquares: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <span className="text-sm font-mono">{boardTheme.lightSquares}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dark Squares</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={boardTheme.darkSquares}
                  onChange={(e) => setBoardTheme({ ...boardTheme, darkSquares: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <span className="text-sm font-mono">{boardTheme.darkSquares}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Highlight Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={boardTheme.highlightColor}
                  onChange={(e) => setBoardTheme({ ...boardTheme, highlightColor: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <span className="text-sm font-mono">{boardTheme.highlightColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Move Indicators</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={boardTheme.moveColor}
                  onChange={(e) => setBoardTheme({ ...boardTheme, moveColor: e.target.value })}
                  className="w-8 h-8 rounded border cursor-pointer"
                />
                <span className="text-sm font-mono">{boardTheme.moveColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h4 className="font-semibold mb-3">Preview</h4>
          <div className="grid grid-cols-8 gap-0 w-32 h-32 mx-auto rounded overflow-hidden border-2 border-slate-300">
            {Array.from({ length: 64 }, (_, i) => {
              const row = Math.floor(i / 8)
              const col = i % 8
              const isLight = (row + col) % 2 === 1
              return (
                <div
                  key={i}
                  className="w-4 h-4 flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: isLight ? boardTheme.lightSquares : boardTheme.darkSquares,
                  }}
                >
                  {i === 28 && "♔"}
                  {i === 35 && "♛"}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ChessBoard({
  fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  onMove,
  showCoordinates = true,
  interactive = true,
  lastMove

}: ChessBoardProps) {
  const [game, setGame] = useState(new Chess(fen))
  const [gameHistory, setGameHistory] = useState<Chess[]>([new Chess(fen)])
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [moveHistory, setMoveHistory] = useState<any[]>([])
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [possibleMoves, setPossibleMoves] = useState<string[]>([])
  const [arrows, setArrows] = useState<Arrow[]>([])
  const [isDrawingArrow, setIsDrawingArrow] = useState(false)
  const [arrowStart, setArrowStart] = useState<string | null>(null)
  const [showCustomization, setShowCustomization] = useState(false)
  const [boardTheme, setBoardTheme] = useState({
    lightSquares: "#f0d9b5",
    darkSquares: "#b58863",
    highlightColor: "#d9c126",
    moveColor: "#00ff00",
    checkColor: "#ff0000",
  })
  const [pieceStyle, setPieceStyle] = useState("chesscom")

  const boardRef = useRef<HTMLDivElement>(null)
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"]

  // Reset game when FEN changes
  useEffect(() => {
    const newGame = new Chess(fen)
    setGame(newGame)
    setGameHistory([newGame])
    setCurrentMoveIndex(0)
    setMoveHistory([])
    setSelectedSquare(null)
    setPossibleMoves([])
    setArrows([])
  }, [fen])

  const isLightSquare = (file: string, rank: string) => {
    const fileIndex = files.indexOf(file)
    const rankIndex = Number.parseInt(rank)
    return (fileIndex + rankIndex) % 2 === 1
  }

  const getSquareColor = (square: string) => {
    const isLight = isLightSquare(square[0], square[1])
    if (selectedSquare === square) return boardTheme.highlightColor
    if (possibleMoves.includes(square)) return boardTheme.moveColor
    if (lastMove && (square === lastMove.from || square === lastMove.to)) {
      return boardTheme.highlightColor;
    }
    if (game.inCheck() && new Chess(fen).get(square)?.type === "k" && new Chess(fen).get(square)?.color === game.turn()) {
      return boardTheme.checkColor
    }
    return isLight ? boardTheme.lightSquares : boardTheme.darkSquares
  }

  const handleSquareClick = (square: string) => {
    if (!interactive || currentMoveIndex < gameHistory.length - 1) return

    if (selectedSquare && possibleMoves.includes(square)) {
      // Make move
      try {
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: "q",
        })

        if (move) {
          const newGame = new Chess(game.fen())
          const newHistory = [...gameHistory, newGame]
          const newMoveHistory = [...moveHistory, move]

          setGame(newGame)
          setGameHistory(newHistory)
          setMoveHistory(newMoveHistory)
          setCurrentMoveIndex(newHistory.length - 1)
          onMove?.(move)
        }
      } catch (error) {
        console.log("Invalid move")
      }

      setSelectedSquare(null)
      setPossibleMoves([])
    } else {
      // Select piece
      const piece = new Chess(fen).get(square)
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square)
        const moves = game.moves({ square, verbose: true })
        setPossibleMoves(moves.map((move) => move.to))
      } else {
        setSelectedSquare(null)
        setPossibleMoves([])
      }
    }
  }

  const handleRightClick = (e: React.MouseEvent, square: string) => {
    e.preventDefault()

    if (!arrowStart) {
      setArrowStart(square)
      setIsDrawingArrow(true)
    } else {
      if (arrowStart !== square) {
        const newArrow: Arrow = {
          from: arrowStart,
          to: square,
          color: "#ff6b35",
        }

        const filteredArrows = arrows.filter((arrow) => !(arrow.from === newArrow.from && arrow.to === newArrow.to))
        setArrows([...filteredArrows, newArrow])
      }
      setArrowStart(null)
      setIsDrawingArrow(false)
    }
  }

  const clearArrows = () => {
    setArrows([])
    setArrowStart(null)
    setIsDrawingArrow(false)
  }

  const resetPosition = () => {
    const newGame = new Chess()
    setGame(newGame)
    setGameHistory([newGame])
    setCurrentMoveIndex(0)
    setMoveHistory([])
    setSelectedSquare(null)
    setPossibleMoves([])
    clearArrows()
  }

  const goToMove = (moveIndex: number) => {
    if (moveIndex >= 0 && moveIndex < gameHistory.length) {
      setCurrentMoveIndex(moveIndex)
      const targetGame = new Chess(gameHistory[moveIndex].fen())
      setGame(targetGame)
      setSelectedSquare(null)
      setPossibleMoves([])
    }
  }

  const goToPreviousMove = () => {
    if (currentMoveIndex > 0) {
      goToMove(currentMoveIndex - 1)
    }
  }

  const goToNextMove = () => {
    if (currentMoveIndex < gameHistory.length - 1) {
      goToMove(currentMoveIndex + 1)
    }
  }

  const goToCurrentPosition = () => {
    goToMove(gameHistory.length - 1)
  }

  const getSquarePosition = (square: string) => {
    const file = files.indexOf(square[0])
    const rank = ranks.indexOf(square[1])
    return {
      x: file * 64 + 32,
      y: rank * 64 + 32,
    }
  }

  const renderPiece = (piece: any, square: string) => {
    if (!piece) return null

    const pieceKey = `${piece.color}${piece.type.toUpperCase()}`

    // FIXED: White pieces are WHITE, Black pieces are BLACK
    const chesscomPieces = {
      wK: "♔",
      wQ: "♕",
      wR: "♖",
      wB: "♗",
      wN: "♘",
      wP: "♙",
      bK: "♚",
      bQ: "♛",
      bR: "♜",
      bB: "♝",
      bN: "♞",
      bP: "♟",
    }

    return (
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer select-none transition-all duration-200"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: "900",
          // WHITE pieces are WHITE, BLACK pieces are BLACK
          color: piece.color === "w" ? "#ffffff" : "#000000",
          textShadow:
            piece.color === "w"
              ? "2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000, 0px 2px 0px #000000, 0px -2px 0px #000000, 2px 0px 0px #000000, -2px 0px 0px #000000"
              : "2px 2px 0px #ffffff, -2px -2px 0px #ffffff, 2px -2px 0px #ffffff, -2px 2px 0px #ffffff, 0px 2px 0px #ffffff, 0px -2px 0px #ffffff, 2px 0px 0px #ffffff, -2px 0px 0px #ffffff",
          filter:
            selectedSquare === square
              ? "brightness(1.2) drop-shadow(0 0 8px rgba(255,255,0,0.8))"
              : "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
          transform: selectedSquare === square ? "scale(1.05)" : "scale(1)",
        }}
      >
        {chesscomPieces[pieceKey as keyof typeof chesscomPieces]}
      </div>
    )
  }

  const renderMoveIndicators = (square: string) => {
    if (!possibleMoves.includes(square)) return null

    const piece = new Chess(fen).get(square)

    if (piece) {
      return (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-1 rounded-full border-4 opacity-80"
            style={{
              borderColor: "#646f40",
              borderStyle: "solid",
            }}
          />
        </div>
      )
    } else {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-6 h-6 rounded-full opacity-80"
            style={{
              backgroundColor: "#646f40",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )
    }
  }

  const renderArrows = () => {
    return (
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" style={{ zIndex: 10 }}>
        {arrows.map((arrow, index) => {
          const fromPos = getSquarePosition(arrow.from)
          const toPos = getSquarePosition(arrow.to)

          return (
            <g key={index}>
              <defs>
                <marker id={`arrowhead-${index}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill={arrow.color} opacity="0.8" />
                </marker>
              </defs>
              <line
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={arrow.color}
                strokeWidth="4"
                opacity="0.8"
                markerEnd={`url(#arrowhead-${index})`}
              />
            </g>
          )
        })}
      </svg>
    )
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Board Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-sm">
              {game.turn() === "w" ? "White" : "Black"} to move
            </Badge>
            {game.inCheck() && (
              <Badge variant="destructive" className="text-sm">
                Check!
              </Badge>
            )}
            {game.isCheckmate() && (
              <Badge variant="destructive" className="text-sm">
                Checkmate!
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomization(!showCustomization)}
              className="bg-transparent"
            >
              <Palette className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Customize</span>
            </Button>
            <Button variant="outline" size="sm" onClick={clearArrows} className="bg-transparent">
              <span className="hidden sm:inline">Clear Arrows</span>
              <span className="sm:hidden">Clear</span>
            </Button>
            <Button variant="outline" size="sm" onClick={resetPosition} className="bg-transparent">
              <RotateCcw className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>

        {/* Board Customization Panel */}
        {showCustomization && (
          <div className="mb-4">
            <BoardCustomization
              boardTheme={boardTheme}
              setBoardTheme={setBoardTheme}
              pieceStyle={pieceStyle}
              setPieceStyle={setPieceStyle}
            />
          </div>
        )}

        {/* Main Game Area - NO EVAL BAR */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Chess Board - Centered */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative inline-block">
              <div
                ref={boardRef}
                className="relative border-2 sm:border-4 border-slate-800 rounded-lg overflow-hidden"
                style={{
                  width: "min(90vw, 512px)",
                  height: "min(90vw, 512px)",
                  maxWidth: "512px",
                  maxHeight: "512px",
                }}
              >
                {/* Board Squares */}
                <div className="grid grid-cols-8 gap-0 h-full w-full">
                  {ranks.map((rank) =>
                    files.map((file) => {
                      const square = `${file}${rank}`
                      const piece = new Chess(fen).get(square)
                      const squareColor = getSquareColor(square)

                      return (
                        <div
                          key={square}
                          className="relative cursor-pointer transition-all duration-150 aspect-square"
                          style={{ backgroundColor: squareColor }}
                          onClick={() => handleSquareClick(square)}
                          onContextMenu={(e) => handleRightClick(e, square)}
                        >
                          {/* Move indicators */}
                          {renderMoveIndicators(square)}

                          {/* Chess Piece */}
                          {renderPiece(piece, square)}

                          {/* Square coordinates */}
                          {showCoordinates && (
                            <>
                              {file === "a" && (
                                <div className="absolute left-0.5 sm:left-1 top-0.5 sm:top-1 text-xs font-bold opacity-60">
                                  {rank}
                                </div>
                              )}
                              {rank === "1" && (
                                <div className="absolute right-0.5 sm:right-1 bottom-0.5 sm:bottom-1 text-xs font-bold opacity-60">
                                  {file}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )
                    }),
                  )}
                </div>

                {/* Arrows */}
                {renderArrows()}
              </div>


            </div>
          </div>

          {/* Move Notation Panel*/}
          {/*<div className="w-full lg:w-80">*/}
          {/*  <Card>*/}
          {/*    <CardHeader className="pb-3">*/}
          {/*      <CardTitle className="text-lg">Game Moves</CardTitle>*/}
          {/*    </CardHeader>*/}
          {/*    <CardContent>*/}
          {/*      <div className="space-y-2 max-h-60 sm:max-h-80 overflow-y-auto">*/}
          {/*        {moveHistory.length === 0 ? (*/}
          {/*          <p className="text-slate-500 text-sm">No moves yet</p>*/}
          {/*        ) : (*/}
          {/*          <div className="space-y-1">*/}
          {/*            {Array.from({ length: Math.ceil(moveHistory.length / 2) }, (_, i) => {*/}
          {/*              const moveIndex = Math.ceil(moveHistory.length / 2) - 1 - i*/}
          {/*              const whiteMove = moveHistory[moveIndex * 2]*/}
          {/*              const blackMove = moveHistory[moveIndex * 2 + 1]*/}
          {/*              const moveNumber = moveIndex + 1*/}

          {/*              return (*/}
          {/*                <div key={moveIndex} className="flex items-center gap-1 sm:gap-2 text-sm">*/}
          {/*                  <span className="text-slate-500 w-6 sm:w-8 text-xs sm:text-sm">{moveNumber}.</span>*/}
          {/*                  {whiteMove && (*/}
          {/*                    <button*/}
          {/*                      className={`px-1 sm:px-2 py-1 rounded hover:bg-slate-100 transition-colors text-xs sm:text-sm ${*/}
          {/*                        currentMoveIndex === moveIndex * 2 + 1 ? "bg-blue-100 font-semibold" : ""*/}
          {/*                      }`}*/}
          {/*                      onClick={() => goToMove(moveIndex * 2 + 1)}*/}
          {/*                    >*/}
          {/*                      {whiteMove.san}*/}
          {/*                    </button>*/}
          {/*                  )}*/}
          {/*                  {blackMove && (*/}
          {/*                    <button*/}
          {/*                      className={`px-1 sm:px-2 py-1 rounded hover:bg-slate-100 transition-colors text-xs sm:text-sm ${*/}
          {/*                        currentMoveIndex === moveIndex * 2 + 2 ? "bg-blue-100 font-semibold" : ""*/}
          {/*                      }`}*/}
          {/*                      onClick={() => goToMove(moveIndex * 2 + 2)}*/}
          {/*                    >*/}
          {/*                      {blackMove.san}*/}
          {/*                    </button>*/}
          {/*                  )}*/}
          {/*                </div>*/}
          {/*              )*/}
          {/*            }).reverse()}*/}
          {/*          </div>*/}
          {/*        )}*/}
          {/*      </div>*/}

          {/*      /!* Game Status *!/*/}
          {/*      <div className="mt-4 pt-4 border-t">*/}
          {/*        <div className="text-sm space-y-2">*/}
          {/*          <div className="flex justify-between">*/}
          {/*            <span>Move:</span>*/}
          {/*            <span className="font-mono">*/}
          {/*              {currentMoveIndex + 1} / {gameHistory.length}*/}
          {/*            </span>*/}
          {/*          </div>*/}
          {/*          <div className="flex justify-between">*/}
          {/*            <span>Status:</span>*/}
          {/*            <div>*/}
          {/*              {game.isGameOver() ? (*/}
          {/*                <Badge variant="destructive" className="text-xs">*/}
          {/*                  Game Over*/}
          {/*                </Badge>*/}
          {/*              ) : currentMoveIndex < gameHistory.length - 1 ? (*/}
          {/*                <Badge variant="secondary" className="text-xs">*/}
          {/*                  Reviewing*/}
          {/*                </Badge>*/}
          {/*              ) : (*/}
          {/*                <Badge variant="default" className="text-xs">*/}
          {/*                  Live*/}
          {/*                </Badge>*/}
          {/*              )}*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}

          {/*      /!* Navigation Controls *!/*/}
          {/*      <div className="mt-4 pt-4 border-t">*/}
          {/*        <div className="flex items-center justify-center gap-2">*/}
          {/*          <Button*/}
          {/*            variant="outline"*/}
          {/*            size="sm"*/}
          {/*            onClick={goToPreviousMove}*/}
          {/*            disabled={currentMoveIndex === 0}*/}
          {/*            className="bg-transparent"*/}
          {/*          >*/}
          {/*            <ChevronLeft className="w-4 h-4" />*/}
          {/*          </Button>*/}
          {/*          <Button*/}
          {/*            variant="outline"*/}
          {/*            size="sm"*/}
          {/*            onClick={goToNextMove}*/}
          {/*            disabled={currentMoveIndex === gameHistory.length - 1}*/}
          {/*            className="bg-transparent"*/}
          {/*          >*/}
          {/*            <ChevronRight className="w-4 h-4" />*/}
          {/*          </Button>*/}
          {/*          <Button*/}
          {/*            variant="outline"*/}
          {/*            size="sm"*/}
          {/*            onClick={goToCurrentPosition}*/}
          {/*            disabled={currentMoveIndex === gameHistory.length - 1}*/}
          {/*            className="bg-transparent text-xs sm:text-sm"*/}
          {/*          >*/}
          {/*            <SkipForward className="w-4 h-4" />*/}
          {/*            <span className="hidden sm:inline ml-1">Current</span>*/}
          {/*          </Button>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </CardContent>*/}
          {/*  </Card>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}
