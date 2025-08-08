"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Crown, Target, TrendingUp, History, Users, Play, Trophy, Clock } from "lucide-react"
import OpeningExplorer from "@/components/opening-explorer"
import EndgameTrainer from "@/components/endgame-trainer"


export default function ChessStudyApp() {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedOpeningId, setSelectedOpeningId] = useState<string | null>(null);

  const openingStats = [
    { name: "Sicilian Defense", games: 15420, winRate: "42.3%", level: "Advanced" },
    { name: "Queen's Gambit", games: 12890, winRate: "45.1%", level: "Intermediate" },
    { name: "Ruy Lopez", games: 11230, winRate: "43.8%", level: "Advanced" },
    { name: "French Defense", games: 8940, winRate: "41.2%", level: "Intermediate" },
  ]

  const endgameCategories = [
    { name: "Pawn Endgames", positions: 340, difficulty: "Essential", icon: "♟" },
    { name: "Rook Endgames", positions: 280, difficulty: "Advanced", icon: "♜" },
    { name: "Queen Endgames", positions: 120, difficulty: "Expert", icon: "♛" },
    { name: "Minor Piece Endgames", positions: 190, difficulty: "Intermediate", icon: "♗" },
  ]

  // Popular openings for the openings tab
  const popularOpenings = [
    {
      id: "sicilian-defense",
      name: "Sicilian Defense",
      eco: "B20-B99",
      moves: "1.e4 c5",
      description: "The most popular and complex opening, offering Black excellent winning chances",
      popularity: 95,
      level: "Advanced",
    },
    {
      id: "queens-gambit-accepted",
      name: "Queen's Gambit",
      eco: "D06-D69",
      moves: "1.d4 d5 2.c4",
      description: "A classical opening focusing on central control and piece development",
      popularity: 90,
      level: "Intermediate",
    },
    {
      id: "ruy-lopez",
      name: "Ruy Lopez",
      eco: "C60-C99",
      moves: "1.e4 e5 2.Nf3 Nc6 3.Bb5",
      description: "One of the oldest chess openings, named after Spanish priest Ruy López",
      popularity: 88,
      level: "Advanced",
    },
    {
      id: 'french-defense',
      name: "French Defense",
      eco: "C00-C19",
      moves: "1.e4 e6",
      description: "A solid defense that leads to strategic, positional games",
      popularity: 75,
      level: "Intermediate",
    },
    {
      id: "caro-kann",
      name: "Caro-Kann Defense",
      eco: "B10-B19",
      moves: "1.e4 c6",
      description: "A reliable defense that avoids the tactical complications of other openings",
      popularity: 72,
      level: "Intermediate",
    },
    {
      id: "english-opening",
      name: "English Opening",
      eco: "A10-A39",
      moves: "1.c4",
      description: "A flexible opening that can transpose into many different pawn structures",
      popularity: 68,
      level: "Advanced",
    },
    {
      id: 'kings-indian-defense',
      name: "King's Indian Defense",
      eco: "E60-E99",
      moves: "1.d4 Nf6 2.c4 g6 3.Nc3 Bg7",
      description: "A hypermodern opening where Black allows White to occupy the center, planning a counterattack",
      popularity: 82,
      level: "Advanced",
    },
    {
      id: "italian-game",
      name: "Italian Game",
      eco: "C50-C59",
      moves: "1.e4 e5 2.Nf3 Nc6 3.Bc4",
      description: "An aggressive and classical opening focusing on rapid development and early attacks",
      popularity: 80,
      level: "Beginner",
    },
    {
      id: "queens-gambit-declined",
      name: "Queen's Gambit Declined",
      eco: "D30-D69",
      moves: "1.d4 d5 2.c4 e6",
      description: "A classical and solid response to the Queen’s Gambit, emphasizing control and defense",
      popularity: 78,
      level: "Intermediate",
    },
    {
      id: 'slav-defense',
      name: "Slav Defense",
      eco: "D10-D19",
      moves: "1.d4 d5 2.c4 c6",
      description: "A rock-solid defense to the Queen’s Gambit with few weaknesses",
      popularity: 76,
      level: "Intermediate",
    },
    {
      id: 'grunfeld-defense',
      name: "Grünfeld Defense",
      eco: "D70-D99",
      moves: "1.d4 Nf6 2.c4 g6 3.Nc3 d5",
      description: "A hypermodern defense where Black allows White the center, then attacks it",
      popularity: 74,
      level: "Advanced",
    },
    {
      id: "london-system",
      name: "London System",
      eco: "D02-D03",
      moves: "1.d4 d5 2.Nf3 Nf6 3.Bf4",
      description: "A solid, system-based opening ideal for club players and easier to learn",
      popularity: 70,
      level: "Beginner",
    },
    {
      id: "nimzo-indian-defense",
      name: "Nimzo-Indian Defense",
      eco: "E20-E59",
      moves: "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4",
      description: "One of the most strategic defenses against 1.d4, played at all levels",
      popularity: 69,
      level: "Advanced",
    },
    {
      id: "pirc-defense",
      name: "Pirc Defense",
      eco: "B07-B09",
      moves: "1.e4 d6 2.d4 Nf6 3.Nc3 g6",
      description: "A hypermodern defense allowing White to build the center, then strike back",
      popularity: 66,
      level: "Intermediate",
    },
    {
      id: "modern-defense",
      name: "Modern Defense",
      eco: "B06",
      moves: "1.e4 g6",
      description: "A flexible and provocative defense, similar to the Pirc but even more hypermodern",
      popularity: 63,
      level: "Intermediate",
    },
    {
      id: "dutch-defense",
      name: "Dutch Defense",
      eco: "A80-A99",
      moves: "1.d4 f5",
      description: "An aggressive defense where Black takes early kingside space",
      popularity: 60,
      level: "Advanced",
    },
    {
      id: "kings-gambit",
      name: "King's Gambit",
      eco: "C30-C39",
      moves: "1.e4 e5 2.f4",
      description: "A bold gambit where White sacrifices a pawn for a swift attack",
      popularity: 59,
      level: "Advanced",
    },
    {
      id: "benoni-defense",
      name: "Benoni Defense",
      eco: "A56-A79",
      moves: "1.d4 Nf6 2.c4 c5 3.d5 e6",
      description: "A dynamic defense that leads to sharp and imbalanced positions",
      popularity: 58,
      level: "Advanced",
    },
    {
      id: "alekhine-defense",
      name: "Alekhine Defense",
      eco: "B02-B05",
      moves: "1.e4 Nf6",
      description: "A provocative defense where Black attacks White's center with pieces",
      popularity: 56,
      level: "Advanced",
    },
    {
      id: "reti-opening",
      name: "Réti Opening",
      eco: "A04-A09",
      moves: "1.Nf3 d5 2.c4",
      description: "A flexible hypermodern opening that controls the center from the flanks",
      popularity: 55,
      level: "Intermediate",
    },
    {
      id: "scandinavian-defense",
      name: "Scandinavian Defense",
      eco: "B01",
      moves: "1.e4 d5",
      description: "An early central challenge that often leads to fast piece play",
      popularity: 52,
      level: "Beginner",
    },
    {
      id: "bird-opening",
      name: "Bird Opening",
      eco: "A02-A03",
      moves: "1.f4",
      description: "A flank opening aiming for a Stonewall structure and kingside attack",
      popularity: 49,
      level: "Intermediate",
    },
    {
      id: "four-knights-game",
      name: "Four Knights Game",
      eco: "C47-C49",
      moves: "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6",
      description: "A symmetrical and balanced opening great for classical development",
      popularity: 47,
      level: "Beginner",
    }
  ];

  // Essential endgame positions
  const essentialEndgames = [
    {
      name: "King and Pawn vs King",
      category: "Pawn Endgames",
      difficulty: "Essential",
      description: "The foundation of all endgame knowledge - learn opposition and key squares",
      positions: 45,
    },
    {
      name: "Lucena Position",
      category: "Rook Endgames",
      difficulty: "Essential",
      description: "The most important rook endgame position - building a bridge technique",
      positions: 12,
    },
    {
      name: "Philidor Position",
      category: "Rook Endgames",
      difficulty: "Essential",
      description: "Defensive technique in rook endgames - passive rook defense",
      positions: 8,
    },
    {
      name: "Queen vs Pawn on 7th",
      category: "Queen Endgames",
      difficulty: "Advanced",
      description: "Critical technique for stopping advanced passed pawns",
      positions: 15,
    },
    {
      name: "Opposite Color Bishops",
      category: "Minor Piece Endgames",
      difficulty: "Intermediate",
      description: "Understanding the drawing tendencies and winning methods",
      positions: 28,
    },
    {
      name: "Rook vs Minor Piece",
      category: "Mixed Endgames",
      difficulty: "Advanced",
      description: "Complex endgames requiring precise technique",
      positions: 22,
    },
  ]

  if (activeSection === "openings") {
    return (
        <OpeningExplorer
            openingId={selectedOpeningId} //
            onBack={() => setActiveSection("overview")}
        />
    )
  }

  if (activeSection === "endgames") {
    return <EndgameTrainer onBack={() => setActiveSection("overview")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-2">Chess Mastery Studio</h1>
          <p className="text-slate-600 text-sm sm:text-lg">Advanced Opening & Endgame Study Platform</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Intermediate to Professional
            </Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              2000+ Variations
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
            <TabsTrigger value="overview" className="text-sm sm:text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="openings" className="text-sm sm:text-lg">
              Openings
            </TabsTrigger>
            <TabsTrigger value="endgames" className="text-sm sm:text-lg">
              Endgames
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 sm:space-y-8">
            {/* Main Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl">Opening Explorer</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Master opening theory with extensive variations, historical context, and grandmaster games
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <Button
                    className="w-full text-sm sm:text-lg py-4 sm:py-6"
                    onClick={() => setActiveSection("openings")}
                  >
                    Explore Openings
                  </Button>
                  <div className="mt-4 text-xs sm:text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Total Openings:</span>
                      <span className="font-semibold">150+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variations:</span>
                      <span className="font-semibold">1,200+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Master Games:</span>
                      <span className="font-semibold">5,000+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-200">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl">Endgame Trainer</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Perfect your endgame technique with theoretical positions and practical training
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <Button
                    className="w-full text-sm sm:text-lg py-4 sm:py-6 bg-transparent"
                    variant="outline"
                    onClick={() => setActiveSection("endgames")}
                  >
                    Train Endgames
                  </Button>
                  <div className="mt-4 text-xs sm:text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Categories:</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Positions:</span>
                      <span className="font-semibold">930+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty Levels:</span>
                      <span className="font-semibold">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Openings */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  Most Studied Openings
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Popular openings among advanced players with win rates and game statistics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid gap-3 sm:gap-4">
                  {openingStats.map((opening, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{opening.name}</h3>
                        <p className="text-xs sm:text-sm text-slate-600">
                          {opening.games.toLocaleString("en-US")} games analyzed
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm sm:text-lg font-bold text-green-600">{opening.winRate}</div>
                        <Badge variant={opening.level === "Advanced" ? "default" : "secondary"} className="text-xs">
                          {opening.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Endgame Categories */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                  Endgame Categories
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Comprehensive endgame training from basic to expert level
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {endgameCategories.map((category, index) => (
                    <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl sm:text-3xl">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{category.name}</h3>
                        <p className="text-xs sm:text-sm text-slate-600">{category.positions} positions</p>
                      </div>
                      <Badge
                        variant={category.difficulty === "Essential" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {category.difficulty}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="text-center p-4 sm:p-6">
                  <History className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-amber-600 mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Historical Context</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Learn the history and evolution of each opening with first recorded uses and famous practitioners
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center p-4 sm:p-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-red-600 mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Tactical Training</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Practice specific tactical motifs and patterns that arise from your studied openings
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center p-4 sm:p-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-purple-600 mb-2" />
                  <CardTitle className="text-sm sm:text-lg">Master Games</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Study games from world champions and top grandmasters featuring your chosen openings
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* OPENINGS TAB CONTENT */}
          <TabsContent value="openings" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Opening Database</h2>
              <p className="text-slate-600">Explore the most important chess openings with detailed analysis</p>
            </div>

            <div className="grid gap-4">
              {popularOpenings.map((opening, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-800">{opening.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {opening.eco}
                          </Badge>
                          <Badge variant={opening.level === "Advanced" ? "default" : "secondary"} className="text-xs">
                            {opening.level}
                          </Badge>
                        </div>
                        <p className="font-mono text-sm text-slate-600 mb-2">{opening.moves}</p>
                        <p className="text-sm text-slate-700">{opening.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{opening.popularity}%</div>
                          <div className="text-xs text-slate-500">Popular</div>
                        </div>
                        <Button  onClick={() => {
                          setSelectedOpeningId(opening.id);
                          setActiveSection("openings");
                        }} className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Study
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Opening Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold mb-2">King's Pawn Openings</h4>
                    <p className="text-sm text-slate-600 mb-2">Starting with 1.e4</p>
                    <div className="text-xs text-slate-500">Sicilian, Ruy Lopez, Italian Game</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Queen's Pawn Openings</h4>
                    <p className="text-sm text-slate-600 mb-2">Starting with 1.d4</p>
                    <div className="text-xs text-slate-500">Queen's Gambit, Nimzo-Indian, King's Indian</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Flank Openings</h4>
                    <p className="text-sm text-slate-600 mb-2">Starting with 1.c4, 1.Nf3, etc.</p>
                    <div className="text-xs text-slate-500">English Opening, Réti Opening</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ENDGAMES TAB CONTENT */}
          <TabsContent value="endgames" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Essential Endgames</h2>
              <p className="text-slate-600">Master the fundamental endgame positions every player must know</p>
            </div>

            <div className="grid gap-4">
              {essentialEndgames.map((endgame, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-800">{endgame.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {endgame.category}
                          </Badge>
                          <Badge
                            variant={endgame.difficulty === "Essential" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {endgame.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">{endgame.description}</p>
                        <div className="text-xs text-slate-500">{endgame.positions} training positions</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button onClick={() => setActiveSection("endgames")} className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Practice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Endgame Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-sm">King Activity</h4>
                        <p className="text-xs text-slate-600">The king becomes a powerful piece in the endgame</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-sm">Pawn Promotion</h4>
                        <p className="text-xs text-slate-600">Creating and advancing passed pawns</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-sm">Opposition</h4>
                        <p className="text-xs text-slate-600">Key concept in king and pawn endgames</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Study Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-sm font-medium">Week 1-2: Basic Pawn Endgames</span>
                      <Badge variant="outline" className="text-xs">
                        Essential
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-sm font-medium">Week 3-4: Rook Endgames</span>
                      <Badge variant="secondary" className="text-xs">
                        Important
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                      <span className="text-sm font-medium">Week 5-6: Minor Piece Endgames</span>
                      <Badge variant="secondary" className="text-xs">
                        Advanced
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
