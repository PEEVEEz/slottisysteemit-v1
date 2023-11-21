import { Hunt } from "../types";

export const getFixedHuntData = (hunt: Hunt) => {
  var win = null;
  var betAmount = null;
  var allOpened = true;
  var start = hunt.start;

  for (let i = 0; i < hunt.bonuses.length; i++) {
    const bonus = hunt.bonuses[i];

    if (bonus.payout !== undefined) {
      win += bonus.payout;
    } else {
      allOpened = false;
    }

    betAmount += bonus.bet;
  }

  if (!betAmount) return hunt;
  if (win !== null) {
    hunt.winnings = Number(win).toFixed(2);

    if (allOpened) hunt.reqavg = 0;
    else if (win >= start) hunt.reqavg = 0;
    else hunt.reqavg = ((Number(start) - win) / betAmount).toFixed(2);
  } else {
    hunt.reqavg = (Number(start) / betAmount).toFixed(2);
  }

  return hunt;
};
