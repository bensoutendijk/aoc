import sys

elves = []
calories = 0
for line in sys.stdin:
  if line == "\n":
    elves.append(calories)
    calories = 0
  else:
    calories += int(line)

total = 0
for x in range(3):
  total += sorted(elves,reverse=True)[x]
print(total)