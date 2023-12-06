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
  console.log(getCalibrationValue(line));
  answer += getCalibrationValue(line);
});

rl.on("close", () => {
  console.log(answer);
});

function getCalibrationValue(str: string) {
  let firstDigit: number | undefined;
  let lastDigit: number | undefined;
  let firstWord = "";
  let lastWord = "";

  let i = 0;
  while(typeof firstDigit === 'undefined' || typeof lastDigit === 'undefined') {
    const j = str.length - i - 1;
    
    const chari = str[i];
    const charj = str[j];

    if (!firstDigit) {
      if (Number(chari)) {
        firstDigit = Number(chari)
      } else {
        firstWord = firstWord + chari
        firstDigit = findDigitByWord(firstWord)
      }
    }

    if (!lastDigit) {
      if (Number(charj)) {
        lastDigit = Number(charj)
      } else {
        lastWord = charj + lastWord
        lastDigit = findDigitByWord(lastWord)
      }
    }

    i++;
  }
  

  return Number([firstDigit, lastDigit].join(""));
}

function findDigitByWord(word: string) {
  const wordIndex = DIGIT_WORDS.findIndex(digitWord => word.includes(digitWord))
  return wordIndex > -1 ? wordIndex + 1 : undefined
}
