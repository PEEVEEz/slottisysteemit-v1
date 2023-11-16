import { Hunt } from "../types";

export const getFixedHuntData = (hunt: Hunt) => {
  var win = null;
  var betAmount = null;
  var start = hunt.start;

  for (let i = 0; i < hunt.bonuses.length; i++) {
    const bonus = hunt.bonuses[i];

    if (bonus.payout) {
      win += bonus.payout;
    }

    betAmount += bonus.bet;
  }

  if (!betAmount) return hunt;

  if (win) {
    hunt.winnings = win;

    if (win >= start) hunt.reqavg = 0;
    else hunt.reqavg = ((Number(start) - win) / betAmount).toFixed(2);
  } else {
    hunt.reqavg = (Number(start) / betAmount).toFixed(2);
  }

  return hunt;
};