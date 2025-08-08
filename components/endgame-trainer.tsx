"use client"

import {useState, useEffect, useMemo} from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Crown,
  Target,
  BookOpen,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  SkipForward,
} from "lucide-react"
import ChessBoard from "@/components/chess-board"
import { Chess } from "chess.js"

interface EndgameTrainerProps {
  onBack: () => void
}

interface EndgamePosition {
  name: string
  fen: string
  winningMoves: string[]
  difficulty: string
  description: string
  objective: string
  keyPrinciples: string[]
  moveExplanations: { [key: number]: string }
}

interface EndgameCategory {
  id: string
  name: string
  icon: string
  difficulty: string
  description: string
  positions: EndgamePosition[]
}

export default function EndgameTrainer({ onBack }: EndgameTrainerProps) {
  const [selectedCategory, setSelectedCategory] = useState("basic-mates")
  const [selectedPosition, setSelectedPosition] = useState<EndgamePosition | null>(null)
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [boardFen, setBoardFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

  const endgameCategories: EndgameCategory[] = [
    {
      id: "basic-mates",
      name: "Basic Checkmates",
      icon: "♛",
      difficulty: "Essential",
      description: "Fundamental checkmate patterns every player must know",
      positions: [
        {
          name: "Queen vs King - Basic Mate",
          fen: "8/8/8/8/8/8/4k3/4K2Q w - - 0 1",
          winningMoves: ["Qh2+", "Kd3", "Qh5", "Ke3", "Qg4", "Kd3", "Qf4+", "Kc3", "Kd2", "Qe4#"],
          difficulty: "Beginner",
          description: "Use your queen to control space, push the king to the edge, and deliver mate.",
          objective: "Checkmate the lone king with queen and king coordination.",
          keyPrinciples: [
            "Cut off the king’s escape squares with the queen.",
            "Slowly push the king toward the edge.",
            "Bring your own king closer to assist in the mate.",
            "Checkmate on the edge with queen support.",
          ],
          moveExplanations: {
            0: "Check the king and restrict its movement.",
            1: "Black king flees toward the center.",
            2: "Place queen closer to control more escape squares.",
            3: "Black king continues dodging.",
            4: "Continue limiting black king's mobility.",
            5: "Black repeats move to avoid checkmate.",
            6: "Force the black king even closer to the corner.",
            7: "Black king tries to stay near center.",
            8: "Bring white king up to support mate.",
            9: "Final checkmate with queen, king supports escape squares.",
          },
        }
      ],
    },
  ]

  const currentCategory = endgameCategories.find((c) => c.id === selectedCategory) || endgameCategories[0]

  // Play out the selected position
  useEffect(() => {
    if (selectedPosition?.fen && selectedPosition?.winningMoves) {
      const game = new Chess(selectedPosition.fen)

      // Only apply legal moves up to currentMoveIndex
      for (let i = 0; i <= currentMoveIndex; i++) {
        const move = selectedPosition.winningMoves[i]
        if (!move) break

        try {
          game.move(move)
        } catch (err) {
          console.error("Invalid move:", move)
          break
        }
      }

      // Update FEN to reflect current board
      setBoardFen(game.fen())
    }
  }, [selectedPosition?.fen, selectedPosition?.winningMoves, currentMoveIndex])

  const playPosition = (position: EndgamePosition) => {
    setSelectedPosition(position)
    setCurrentMoveIndex(0)
    setBoardFen(position.fen) // Optional – instant visual sync
    document.getElementById("move-panel")?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToMove = (moveIndex: number) => {
    if (moveIndex >= 0 && moveIndex < (selectedPosition?.winningMoves.length || 0)) {
      setCurrentMoveIndex(moveIndex)
    }
  }

  const goToPreviousMove = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(currentMoveIndex - 1)
    }
  }

  const goToNextMove = () => {
    if (selectedPosition && currentMoveIndex < selectedPosition.winningMoves.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1)
    }
  }

  const goToCurrentPosition = () => {
    if (selectedPosition) {
      setCurrentMoveIndex(selectedPosition.winningMoves.length - 1)
    }
  }

  const resetPosition = () => {
    setCurrentMoveIndex(0)
  }

  const getCurrentExplanation = () => {
    if (selectedPosition && selectedPosition.moveExplanations) {
      return selectedPosition.moveExplanations[currentMoveIndex] || ""
    }
    return ""
  }

  const moveHistory = useMemo(() => {
    if (!selectedPosition) return []

    const game = new Chess(selectedPosition.fen)
    const moves = []

    for (let i = 0; i < selectedPosition.winningMoves.length; i++) {
      try {
        const move = game.move(selectedPosition.winningMoves[i])
        if (!move) continue

        const moveNumber = Math.floor(i / 2) + 1
        moves.push({
          san: move.san,
          moveNumber,
          isWhite: i % 2 === 0,
          index: i,
        })
      } catch (error) {
        console.error("Invalid move in history:", selectedPosition.winningMoves[i])
      }
    }

    return moves
  }, [selectedPosition?.fen, selectedPosition?.winningMoves])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 bg-transparent text-xs sm:text-sm"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to Overview</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <h1 className="text-xl sm:text-3xl font-bold text-slate-800">Endgame Trainer</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Category Selection */}
          <Card className="w-full lg:w-80 lg:max-w-80">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                Endgame Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 sm:p-6 max-h-96 overflow-y-auto">
              {endgameCategories.map((category) => (
                <div
                  key={category.id}
                  className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category.id
                      ? "bg-green-100 border-2 border-green-300"
                      : "bg-slate-50 hover:bg-slate-100"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSelectedPosition(null)
                    setCurrentMoveIndex(0)
                  }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-xl sm:text-2xl flex-shrink-0">{category.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{category.name}</h3>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <Badge
                          variant={category.difficulty === "Essential" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {category.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {category.positions.length} positions
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{category.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Main Training Area */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* Current Position */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      {selectedPosition ? selectedPosition.name : currentCategory.name}
                    </CardTitle>
                    <CardDescription className="mt-2 text-xs sm:text-sm">
                      <strong>Objective:</strong>{" "}
                      {selectedPosition ? selectedPosition.objective : "Select a position to start training"}
                    </CardDescription>
                  </div>
                  {selectedPosition && (
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {selectedPosition.difficulty}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ChessBoard fen={boardFen} showCoordinates={true} interactive={false} />

                {/* Theory Explanation */}
                {selectedPosition && getCurrentExplanation() && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-green-900 mb-2">
                          Move {currentMoveIndex + 1}: {selectedPosition.winningMoves[currentMoveIndex]}
                        </h4>
                        <p className="text-green-800 leading-relaxed">{getCurrentExplanation()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Position Details */}
            <Tabs defaultValue="positions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
                <TabsTrigger value="positions">Positions</TabsTrigger>
                <TabsTrigger value="theory">Theory</TabsTrigger>
                <TabsTrigger value="principles">Principles</TabsTrigger>
              </TabsList>

              <TabsContent value="positions" className="space-y-4">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">{currentCategory.name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Click on any position to study the winning technique
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      {currentCategory.positions.map((position, index) => (
                        <div
                          key={index}
                          className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-colors ${
                            selectedPosition === position
                              ? "bg-blue-100 border-2 border-blue-300"
                              : "bg-slate-50 hover:bg-slate-100"
                          }`}
                          onClick={() => playPosition(position)}
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                            <h4 className="font-semibold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                              {position.name}
                              <Play className="w-4 h-4 text-green-600" />
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {position.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {position.winningMoves.length} moves
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 mb-1">{position.objective}</p>
                          <p className="text-xs text-slate-500">{position.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="theory" className="space-y-4">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                      {currentCategory.name} Theory
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-slate-700 mb-4 text-sm sm:text-base">{currentCategory.description}</p>
                    {selectedPosition && (
                      <>
                        <h4 className="font-semibold mb-3 text-sm sm:text-base">Key Principles:</h4>
                        <div className="space-y-2">
                          {selectedPosition.keyPrinciples.map((principle, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                              <span className="text-xs sm:text-sm text-slate-700">{principle}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="principles" className="space-y-4">
                <Card>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">General Endgame Principles</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-sm">King Activity</h4>
                          <p className="text-xs text-slate-600">The king becomes a powerful piece in the endgame</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-sm">Opposition</h4>
                          <p className="text-xs text-slate-600">Key concept in king and pawn endgames</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-sm">Piece Coordination</h4>
                          <p className="text-xs text-slate-600">All pieces must work together in endgames</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-sm">Pawn Promotion</h4>
                          <p className="text-xs text-slate-600">Creating and advancing passed pawns</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Move Navigation Panel */}
          <div className="w-full lg:w-80">
            <Card key={selectedPosition?.name}>
              <CardHeader  className="pb-3">
                <CardTitle className="text-lg">Winning Moves</CardTitle>
                {selectedPosition && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Button size="sm" onClick={goToPreviousMove} disabled={currentMoveIndex === 0}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={goToNextMove}
                      disabled={!selectedPosition || currentMoveIndex >= selectedPosition.winningMoves.length - 1}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetPosition}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={goToCurrentPosition}>
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    <Badge variant="secondary" className="text-xs">
                      {currentMoveIndex + 1} / {selectedPosition?.winningMoves.length || 0}
                    </Badge>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div key={selectedPosition?.name} className="space-y-2 max-h-60 sm:max-h-80 overflow-y-auto">
                  {!selectedPosition ? (
                    <p className="text-slate-500 text-sm">Select a position to see winning moves</p>
                  ) : (
                    <div className="space-y-1">
                      {Array.from({ length: Math.ceil(moveHistory.length / 2) }, (_, i) => {
                        const whiteMove = moveHistory[i * 2]
                        const blackMove = moveHistory[i * 2 + 1]
                        const moveNumber = i + 1

                        return (
                          <div key={i} className="flex items-center gap-1 sm:gap-2 text-sm">
                            <span className="text-slate-500 w-6 sm:w-8 text-xs sm:text-sm">{moveNumber}.</span>
                            {whiteMove && (
                              <button
                                className={`px-1 sm:px-2 py-1 rounded hover:bg-slate-100 transition-colors text-xs sm:text-sm ${
                                  currentMoveIndex === whiteMove.index ? "bg-blue-100 font-semibold" : ""
                                }`}
                                onClick={() => goToMove(whiteMove.index)}
                              >
                                {whiteMove.san}
                              </button>
                            )}
                            {blackMove && (
                              <button
                                className={`px-1 sm:px-2 py-1 rounded hover:bg-slate-100 transition-colors text-xs sm:text-sm ${
                                  currentMoveIndex === blackMove.index ? "bg-blue-100 font-semibold" : ""
                                }`}
                                onClick={() => goToMove(blackMove.index)}
                              >
                                {blackMove.san}
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
