import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const DIGIT_WORDS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.createReadStream(path.resolve(__dirname, "input.txt"));

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity,
});

let answer = 0;

rl.on("line", (line) => {
  // Process each line here
  console.log(line);
	const game = parseGame(line)
	if (isGameMatch(game)) {
		answer += Number(game.id)
	}
});

rl.on("close", () => {
  console.log(answer);
});

function isGameMatch(game: ReturnType<typeof parseGame>) {
	return true
}
function parseGame(str: string) {
	const id = str.match(/Game\s([0-9]+)/)?.[1]
	// https://regex101.com/r/WIoJer/1
	// const rounds = str.match
	return {
		id,
		rounds: [
			{
				red,
				green,
				blue
			}
		]
	}
};
