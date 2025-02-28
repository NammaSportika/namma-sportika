import React from 'react';
import SportDetailPage from './SportDetailPage';

const FootballPage = () => {
  const footballData = {
    title: "Football",
    category: "Team",
    description: "Men - 11 vs 11",
    image: "/imgs/Events/10.svg",
    teamComposition: "11 players + 5 substitutes",
    entryFee: "₹ 1500 per team",
    prizes: [
      {
        category: "Men",
        entryFee: 1500,
        firstPrize: 10000,
        secondPrize: 7000
      }
    ],
    rules: {
      generalRules: [
        "Matches will be played as per the rules of FIFA.",
        "Each team is allowed to make a maximum of 5 substitutions per match, only 3 in cycle.",
        "Maximum of 4 international students on the field (Registration allowed for up to 6 as AIFF & ISL).",
        "A player who receives yellow cards in two different matches will be suspended for the next match.",
        "A 15-minute grace period is given before declaring a forfeit.",
        "All players must wear proper football kits."
      ],
      formatRules: [
        "Knockout rounds: 20 mins per half",
        "Semi-finals & Finals: 35 mins per half",
        "If the match ends in a tie, a penalty shootout will determine the winner."
      ]
    }
  };

  return <SportDetailPage {...footballData} />;
};

export default FootballPage;