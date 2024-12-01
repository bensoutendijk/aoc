import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

console.time();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function part1() {
  const input = fs.createReadStream(path.resolve(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: input,
    crlfDelay: Infinity,
  });

  let instructions: number[] = [];
  let map = new Map();
  for await (const line of rl) {
    if (!line) {
      continue;
    }

    if (!instructions.length) {
      instructions = line
        .replaceAll("L", "0")
        .replaceAll("R", "1")
        .split("")
        .map(Number);
      continue;
    }

    const [key, directions] = line.split(" = ");
    const match = directions.match(/(\w+)/g);

    if (!match) {
      throw new Error(`Unable to parse line: ${line}`);
    }

    const [lhs, rhs] = match;

    map.set(key, [lhs, rhs]);
  }

  console.log(instructions);
  console.log(JSON.stringify(Object.fromEntries(map)));

  let direction = 0;
  let location = "AAA";
  let steps = 0;
  while (location !== "ZZZ") {
    console.log("location:", location);
    console.log("direction:", instructions[direction] === 0 ? "L" : "R");

    const nextLocation = map.get(location).at(instructions[direction]);
    console.log("next location:", nextLocation);
    location = nextLocation;

    const nextDirection =
      direction === instructions.length - 1 ? 0 : direction + 1;
    console.log("next direction:", nextDirection);
    direction = nextDirection;

    steps++;
  }

  console.log("answer:", steps);

  console.timeEnd();
}

async function part2() {
  const input = fs.createReadStream(path.resolve(__dirname, "input.txt"));

  const rl = readline.createInterface({
    input: input,
    crlfDelay: Infinity,
  });

  let instructions: number[] = [];
  let map = new Map();
  let ghosts: string[] = [];

  for await (const line of rl) {
    if (!line) {
      continue;
    }

    if (!instructions.length) {
      instructions = line
        .replaceAll("L", "0")
        .replaceAll("R", "1")
        .split("")
        .map(Number);
      continue;
    }

    const [key, directions] = line.split(" = ");
    const match = directions.match(/(\w+)/g);

    if (!match) {
      throw new Error(`Unable to parse line: ${line}`);
    }

    const [lhs, rhs] = match;

    map.set(key, [lhs, rhs]);

    if (key.endsWith("A")) {
      ghosts.push(key);
    }
  }

  console.log("Number of ghosts:", ghosts.length);

  const stepCounts: number[] = []
  // Find the number of steps each ghost takes to reach a Z spot
  for (let i = 0; i < ghosts.length; i++) {
    let step = 0;
    let direction = instructions[0];

    let location = ghosts[i];

    while (!location.endsWith("Z")) {
      location = map.get(location).at(instructions[direction]);
      direction = direction === instructions.length - 1 ? 0 : direction + 1;
      step++;
    }

    stepCounts[i] = step
  }
  
  console.log(stepCounts)
  console.log("answer:", lcm(...stepCounts))
  console.timeEnd();
}

part2();

function gcd(a: number, b: number) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcmOverTwo(a: number, b: number) {
  return Math.abs(a * b) / gcd(a, b);
}

function lcm(...numbers: number[]) {
  return numbers.reduce((a, b) => lcmOverTwo(a, b));
}