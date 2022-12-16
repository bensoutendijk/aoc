import sys

WIN = 6
DRAW = 3
LOSS = 0

ROCK = 1
PAPER = 2
SCISSORS = 3

strategy = {
  "A X": LOSS + SCISSORS,
  "A Y": DRAW + ROCK,
  "A Z": WIN + PAPER,
  "B X": LOSS + ROCK,
  "B Y": DRAW + PAPER,
  "B Z": WIN + SCISSORS,
  "C X": LOSS + PAPER,
  "C Y": DRAW + SCISSORS,
  "C Z": WIN + ROCK
}

score = 0
for line in sys.stdin:
  play = line.strip()
  print(strategy[play])
  score += strategy[play]

print(score)