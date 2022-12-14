import sys

winner = 0
calories = 0
for line in sys.stdin:
  if line == "\n":
    if calories > winner:
      winner = calories
    calories = 0
  else:
    calories += int(line)

print(winner)