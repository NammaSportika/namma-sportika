import React from 'react';
import SportDetailPage from './SportDetailPage';

const KabaddiPage = () => {
  const kabaddiData = {
    title: "Kabaddi",
    category: "Team",
    description: "Men",
    image: "/imgs/Events/14.svg",
    teamComposition: "7 players + 5 substitutes",
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
        "Matches will follow PKL rules.",
        "A 15-minute grace period applies before a forfeit.",
        "Proper sports attire (with Kabaddi shoes) is mandatory.",
        "Team Composition: 7+5(substitutes) players."
      ],
      formatRules: [
        "Knockout rounds: 20-minute half.",
        "Finals: 20-minute half.",
        "Tiebreaker: Golden Raid."
      ]
    }
  };

  return <SportDetailPage {...kabaddiData} />;
};

export default KabaddiPage;