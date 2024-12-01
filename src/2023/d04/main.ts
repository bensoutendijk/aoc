import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.createReadStream(path.resolve(__dirname, "input.txt"));

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity,
});

let answer = 0;
let cards: number[] = [];
rl.on("line", (line) => {
  // Process each line here
  console.log(line);
  const card = parseCard(line);
  cards[card.id] = cards[card.id] ?? 1;
  const score = getScore(card);
  answer += score;
});

rl.on("close", () => {
  console.log(answer);
  console.log(cards.reduce((sum, c) => (sum += c), 0));
});

function getScore(card: ReturnType<typeof parseCard>) {
	console.log('card', card.id, 'multiplier', cards[card.id])
  const multiplier = cards[card.id] ?? 1;
  let nextId = card.id + 1;
  let score = 0;
  for (const number of card.winningNumbers) {
    if (card.selectedNumbers.includes(number)) {
      console.log(number, "won", "card", nextId, "at", multiplier + "x");
			
			if (typeof cards[nextId] === 'undefined') {
				cards[nextId] = 1
			}

			
      cards[nextId] += 1 * multiplier;
			console.log('set card', nextId, 'to muliplier', cards[nextId])
      nextId++;
    }
  }
  return score;
}

function parseCard(line: string) {
  let id = 0;
  let winningNumbers: number[] = [];
  let selectedNumbers: number[] = [];
  let section = 0;
  let buffer = "";
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char.match(/c|a|r|d/s)) {
      continue;
    }

    if (char === ":") {
      id = Number(buffer);
      buffer = "";
      section = 1;
      continue;
    }

    if (char === "|") {
      section = 2;
    }

    if (char.match(/\d/)) {
      buffer += char;
    }

    if (buffer && (!char.match(/\d/) || i === line.length - 1)) {
      const number = Number(buffer);
      buffer = "";
      if (section === 1) {
        winningNumbers.push(number);
      }

      if (section === 2) {
        selectedNumbers.push(number);
      }
    }
  }
  return {
    id,
    winningNumbers,
    selectedNumbers,
  };
}
