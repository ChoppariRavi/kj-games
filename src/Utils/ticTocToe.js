export function checkWinner(winChecks, spots) {
  let wins = null;
  winChecks.forEach((arr) => {
    const users = Object.keys(spots).filter((i) => spots[i] === "U");
    const comps = Object.keys(spots).filter((i) => spots[i] === "C");
    const uLen = users.filter((i) => arr.includes(parseInt(i, 10)));
    const cLen = comps.filter((i) => arr.includes(parseInt(i, 10)));
    if (uLen.length === 3) {
      wins = "U";
    }
    if (cLen.length === 3) {
      wins = "C";
    }
  });
  return wins;
}

export function checkPossibilitites(winChecks, spots) {
  let possibilitites = {};
  winChecks.forEach((arr) => {
    const users = Object.keys(spots).filter((i) => spots[i] === "U");
    const comps = Object.keys(spots).filter((i) => spots[i] === "C");
    const uLen = users.filter((i) => arr.includes(parseInt(i, 10)));
    const cLen = comps.filter((i) => arr.includes(parseInt(i, 10)));
    if (uLen.length === 2) {
      const idx = arr.find((i) => !spots[i]);
      if (idx !== undefined) {
        possibilitites["U"] = idx;
      }
    }
    if (cLen.length === 2) {
      const idx = arr.find((i) => !spots[i]);
      if (idx !== undefined) {
        possibilitites["C"] = idx;
      }
    }
  });
  return possibilitites;
}
