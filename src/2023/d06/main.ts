import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

console.time();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.createReadStream(path.resolve(__dirname, "input.txt"));

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity,
});

let answer = 1;
let times: number[] = [];
let distances: number[] = [];
rl.on("line", (line) => {
  // Process each line here
  // console.log(line);

  if (line.match(/^Time:/)) {
    const match = line.replaceAll(" ", "").match(/(\d+)/g);
    if (!match) {
      throw new Error("Unable to parse times.");
    }

    times = match.map(Number);
    console.log("time", ...times);
  }

  if (line.match(/^Distance:/g)) {
    const match = line.replaceAll(" ", "").match(/(\d+)/g);
    if (!match) {
      throw new Error("Unable to parse distances.");
    }

    distances = match.map(Number);
    console.log("distance", ...distances);
  }
});

rl.on("close", () => {
  for (let raceIndex = 0; raceIndex < times.length; raceIndex++) {
    const raceTime = times[raceIndex];
    const recordDistance = distances[raceIndex];
    const acceleration = 1; // mm/ms^2

    let numberOfWins = 0;

		const range = [0, raceTime]
    for (let goalDuration = range[0]; goalDuration <= range[1]; goalDuration++) {
      let speed = goalDuration * acceleration; // mm/ms
      let distance = speed * (raceTime - goalDuration); // mm;

			if (distance > recordDistance) {
				numberOfWins++
			}
    }

		answer = numberOfWins
  }

  console.log("---");
  console.log("answer", answer);
  console.timeEnd();
});
