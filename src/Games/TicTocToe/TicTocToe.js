import React, { useEffect, useState } from "react";
import { checkWinner, checkPossibilitites } from "../../Utils/ticTocToe";
import "./styles.css";

const initArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const winChecks = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const mapper = {
  c: "Winner is Computer.",
  u: "Winner is User.",
  d: "Match is drawn...",
};
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
export default function TicTocToe() {
  const [turn, SetTurn] = useState(null);
  const [spots, setSpots] = useState({});
  const [winner, setWinner] = useState(null);
  useEffect(() => {
    if (turn === "C") {
      const possibilitites = checkPossibilitites(winChecks, spots);
      const pKeys = Object.keys(possibilitites);
      if (!pKeys.length) {
        const emptyCells = initArr.filter((i) => !spots[i]);
        const shuffled = shuffle(emptyCells);
        const corners = shuffled.filter((i) => [0, 2, 6, 8].includes(i));
        const idx = corners.length ? corners[0] : shuffled[0];
        setSpots((prev) => ({ ...prev, [idx]: "C" }));
      } else if (pKeys.length === 1) {
        setSpots((prev) => ({ ...prev, [possibilitites[pKeys[0]]]: "C" }));
      } else {
        setSpots((prev) => ({ ...prev, [possibilitites["C"]]: "C" }));
      }
      SetTurn("U");
    }
  }, [spots, turn]);
  useEffect(() => {
    if (!winner) {
      const cells = Object.keys(spots).filter((i) => spots[i]);
      if (cells.length === 9) {
        SetTurn(null);
        setWinner("D");
      } else if (cells.length >= 4) {
        const wins = checkWinner(winChecks, spots);
        if (wins) {
          const emptyCells = initArr.reduce((acc, i) => {
            if (!spots[i]) {
              return { ...acc, [i]: "G" };
            }
            return acc;
          }, {});
          setSpots((prev) => ({ ...prev, ...emptyCells }));
          SetTurn(null);
          setWinner(wins);
        }
      }
    }
  }, [spots, winner]);
  const userSelection = (i) => {
    if (!spots[i]) {
      setSpots((prev) => ({ ...prev, [i]: "U" }));
      SetTurn("C");
    }
  };
  return (
    <div className="relative m-auto mt-5 max-w-prose border-indigo-400 border-4 p-10 rounded-lg shadow-lg bg-gradient-to-b from-white to-gray-200">
      {winner && (
        <div className="absolute z-10 bg-transparent w-full h-full top-0 left-0">
          <div className="bg-gray-600 w-full p-10 flex justify-center px-52 bg-opacity-75 text-white mt-28">
            <div className="flex flex-col">
              <h1 className="w-60 text-2xl text-center font-bold">
                {mapper[winner.toLowerCase()]}
              </h1>
              <button
                className="bg-red-700 px-5 py-3 rounded font-bold tracking-widest mt-2"
                onClick={() => {
                  setSpots({});
                  SetTurn(null);
                  setWinner(null);
                }}
              >
                REFRESH
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div className="game shadow-lg">
          {initArr.map((i) => (
            <div
              key={i}
              className="cell shadow-lg"
              onClick={() => userSelection(i)}
            >
              {spots[i] === "U" && <div className="text-red-600">X</div>}
              {spots[i] === "C" && <div className="text-blue-900">O</div>}
              {spots[i] === "G" && <div>*</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-5 font-bold text-sm text-center">
        <div className="mx-5">
          0<br/>
          <span className="text-red-600">X</span> PLAYER
        </div>
        <div className="mx-5">
          0<br/>
          TIES
        </div>
        <div className="mx-5">
          0<br/>
          <span className="text-blue-900">O</span> Computer
        </div>
      </div>
    </div>
  );
}
