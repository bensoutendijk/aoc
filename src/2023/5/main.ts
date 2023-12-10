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

let seeds: { start: number; end: number }[] = [];
let maps: {
  source: string;
  destination: string;
  routes: [number, number, number][];
}[] = [];
let source = "seed";
let destination = "soil";
let mapIdx = -1;
rl.on("line", (line) => {
  // Process each line here
  // console.log(line);
  if (line.match(/^seeds/)) {
    const match = line.match(/(\d+ \d+)/g);

    if (!match) {
      throw new Error("Unable to parse seeds");
    }

    for (const range of match) {
      const [start, length] = range.split(" ").map(Number);
      seeds.push({ start: start, end: start + length - 1 });
    }

    console.log(seeds);
    return;
  }

  if (line.includes("map")) {
    mapIdx++;
    const match = line.match(/([\w]+)-to-([\w]+) map:$/);

    if (!match) {
      throw new ReferenceError("Invalid input");
    }

    [source, destination] = match.slice(1);
    maps[mapIdx] = {
      source,
      destination,
      routes: [],
    };

    console.log([source, destination]);
    return;
  }

  const match = line.match(/(\d+)/g);
  if (!match) {
    console.log("---");
    return;
  }

  const [destinationStart, sourceStart, range] = match.map(Number);
  maps[mapIdx].routes.push([destinationStart, sourceStart, range]);
  console.log(match.map(Number));
});

rl.on("close", () => {
  // Reverse the maps so that we can start with location
  maps.reverse();

  // Just assume the answer is the lowest seed #
  // because if none of the seeds are mapped, this will be correct
  let answer = 0;
  let location = 0;
  while (!answer) {
    console.log(`analyzing location ${location}`);
    let [to, from] = [location, location];
    for (const { source, destination, routes } of maps) {
      for (const [destinationStart, sourceStart, range] of routes) {
        let sourceEnd = sourceStart + range - 1;
        let destinationEnd = destinationStart + range - 1;

        if (to >= destinationStart && to <= destinationEnd) {
          // console.log(
          //   `  route from ${source} ${sourceStart}-${sourceEnd} to ${destination} ${destinationStart}-${destinationEnd}`
          // );
          from = sourceStart + to - destinationStart;
          break;
        }
      }
			to = from;
      // console.log(
      //   `    location ${location}: ${destination} ${to} comes from ${source} ${from}`
      // );
    }

    for (const { start, end } of seeds) {
      if (from >= start && from <= end) {
        console.log(
          `Answer Found: seed ${from} ends up at location ${location} and is in seed range ${start}-${end}`
        );
        answer = location;
      }
    }

    location++;
  }
  console.log(answer);
});
