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

const CARDS = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
] as const;

const HANDS: {
  label: string;
  match: (hand: string) => boolean;
}[] = [
  {
    label: "five-of-a-kind",
    match(hand) {
      return hand.split("").every((c) => c === "J" || c === hand[0]);
    },
  },
  {
    label: "four-of-a-kind",
    match: (hand) => {
      return hand
        .split("")
        .some((c) => hand.replaceAll(c, "J").replaceAll("J", "").length === 1);
    },
  },
  {
    label: "full-house",
    match(hand) {
      const charCount = new Map<string, number>();

      // Count each character
      for (const char of hand) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
      }

      // Check for pairs
      let pairCount = 0;
      let tripleCount = 0;
      for (const [char, count] of charCount.entries()) {
        const jokers = charCount.get("J") || 0;
        if (count === 2 || count + jokers === 2) {
          pairCount++;
        }

        if (count === 3 || count + jokers === 3) {
          tripleCount++;
        }
      }

      return pairCount > 0 && tripleCount > 0;
    },
  },
  {
    label: "three-of-a-kind",
    match(hand) {
      return hand
        .split("")
        .some((c) => hand.replaceAll(c, "J").replaceAll("J", "").length === 2);
    },
  },
  {
    label: "two-pair",
    match(hand) {
      const charCount = new Map<string, number>();

      // Count each character
      for (const char of hand) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
      }

      // Check for pairs
      let pairCount = 0;
      for (const count of charCount.values()) {
        const jokers = charCount.get("J") || 0;

        if (count === 2 || count + jokers === 2) {
          pairCount++;
        }
      }

      return pairCount === 2;
    },
  },
  {
    label: "one-pair",
    match(hand) {
      return hand
        .split("")
        .some((c) => hand.replaceAll(c, "J").replaceAll("J", "").length === 3);
    },
  },
  {
    label: "high-card",
    match(hand) {
      return new Set(hand).size === hand.length;
    },
  },
];

let answer = 0;
let plays: { hand: string; bid: number }[][] = [];
rl.on("line", (line) => {
  const hand = line
    .split(" ")[0]
    .match(/(\w|\d)/g)
    ?.join("");
  const bid = Number(line.split(" ")[1].match(/(\d+)/g));

  if (!hand || !bid) {
    throw new Error("Unable to parse hand");
  }

  const currentPlay = { hand, bid };

  for (let handIndex = 0; handIndex < HANDS.length; handIndex++) {
    plays[handIndex] = plays[handIndex] ?? [];
    if (HANDS[handIndex].match(hand)) {
      let nextIndex = plays[handIndex].length;
      for (
        let playIndex = 0;
        playIndex < plays[handIndex].length;
        playIndex++
      ) {
        const play = plays[handIndex][playIndex];
        if (isGreater(currentPlay.hand, play.hand)) {
          nextIndex = playIndex;
          break;
        }
      }
      plays[handIndex].splice(nextIndex, 0, currentPlay);
      break;
    }
  }
});

rl.on("close", () => {
  plays.forEach((hands, i) => {
    if (hands.length) {
      console.log(HANDS[i].label);
      hands.forEach((hand) => {
        console.log(hand)
        if (hand.hand.includes("J")) {
        }
      });
    }
  });
  answer = plays
    .flat()
    .reverse()
    .reduce((sum, play, rank) => sum + play.bid * (rank + 1), 0);
  console.log("---");
  console.log("answer", answer);
  console.timeEnd();
});

function isGreater(leftHand: string, rightHand: string) {
  for (let i = 0; i < leftHand.length; i++) {
    let lc = leftHand[i] as (typeof CARDS)[number];
    let rc = rightHand[i] as (typeof CARDS)[number];
    if (lc === rc) continue;
    if (CARDS.indexOf(lc) < CARDS.indexOf(rc)) {
      return true;
    } else {
      return false;
    }
  }

  return false;
}
