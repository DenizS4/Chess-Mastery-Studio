"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette } from "lucide-react"

interface BoardCustomizationProps {
  boardTheme: {
    lightSquares: string
    darkSquares: string
    highlightColor: string
    moveColor: string
    checkColor: string
  }
  setBoardTheme: (theme: any) => void
  pieceStyle: string
  setPieceStyle: (style: string) => void
}

export default function BoardCustomization({
  boardTheme,
  setBoardTheme,
  pieceStyle,
  setPieceStyle,
}: BoardCustomizationProps) {
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
          <div className="grid grid-cols-3 gap-3">
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
          <div className="grid grid-cols-2 gap-4">
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
