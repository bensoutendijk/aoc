import sys

WIN = 6
DRAW = 3
LOSS = 0

ROCK = 1
PAPER = 2
SCISSORS = 3

strategy = {
  "A X": ROCK + DRAW,
  "A Y": PAPER + WIN,
  "A Z": SCISSORS + LOSS,
  "B X": ROCK + LOSS,
  "B Y": PAPER + DRAW,
  "B Z": SCISSORS + WIN,
  "C X": ROCK + WIN,
  "C Y": PAPER + LOSS,
  "C Z": SCISSORS + DRAW
}

score = 0
for line in sys.stdin:
  play = line.strip()
  print(strategy[play])
  score += strategy[play]

print(score)