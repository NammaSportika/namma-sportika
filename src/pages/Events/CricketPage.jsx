import React from 'react';
import SportDetailPage from './SportDetailPage';

const CricketPage = () => {
  const cricketData = {
    title: "Cricket",
    category: "Team",
    description: "Men",
    image: "/imgs/Events/13.svg",
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
        "Matches will be played as per ICC rules.",
        "Players must wear proper cricket attire.",
        "Teams must report 30 minutes before the match.",
        "A 15-minute grace period is given before declaring a forfeit.",
        "Umpire's & organizers decision is final."
      ],
      formatRules: [
        "Knockout rounds: 10 overs per side.",
        "Semi-finals & Finals: 20 overs per side.",
        "No extra time; Super Over will decide tied matches."
      ]
    }
  };

  return <SportDetailPage {...cricketData} />;
};

export default CricketPage;