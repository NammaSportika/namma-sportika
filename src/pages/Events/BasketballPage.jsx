import React from 'react';
import SportDetailPage from './SportDetailPage';

const BasketballPage = () => {
  const basketballData = {
    title: "Basketball",
    category: "Team",
    description: "Men & Women",
    image: "/imgs/Events/9.png",
    teamComposition: "5 players + 5 substitutes",
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
        "Matches will follow FIBA rules.",
        "A 15-minute grace period is given before declaring a forfeit.",
        "Players must wear proper basketball attire, including jerseys and shoes.",
        "Team Composition: 5+5(substitutes) players."
      ],
      formatRules: [
        "Knockout format for initial rounds (10-minute quarters).",
        "Finals: 12-minute quarters.",
        "Shot clock and time-outs as per FIBA rules.",
        "If tied at the end of regulation, a 5-minute overtime will be played."
      ]
    }
  };

  return <SportDetailPage {...basketballData} />;
};

export default BasketballPage;