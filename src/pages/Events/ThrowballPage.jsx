import React from 'react';
import SportDetailPage from '../Events/SportDetailPage';

const ThrowballPage = () => {
  const throwballData = {
    title: "Throwball",
    category: "Team",
    description: "Men & Women",
    image: "/imgs/Events/14.png",
    teamComposition: "7 players + 5 substitutes",
    entryFee: "₹ 1500 per team",
    prizes: [
      {
        category: "Men",
        entryFee: 1500,
        firstPrize: 10000,
        secondPrize: 7000
      },
      {
        category: "Women",
        entryFee: 1500,
        firstPrize: 10000,
        secondPrize: 7000
      }
    ],
    rules: {
      generalRules: [
        "Matches will follow the Throwball Federation of India rules.",
        "Teams must report 15 minutes before the match.",
        "A 15-minute grace period is given before declaring a forfeit.",
        "Proper attire is required.",
        "Team Composition: 7+5(substitutes) players."
      ],
      formatRules: [
        "Knockout rounds: Best of 3 sets (15 points).",
        "Finals: Best of 5 sets (21 points).",
        "Tiebreaker set (15 points) in case of a tie."
      ]
    }
  };

  return <SportDetailPage {...throwballData} />;
};

export default ThrowballPage;