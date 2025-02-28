import React from 'react';
import SportDetailPage from '../Events/SportDetailPage';

const VolleyballPage = () => {
  const volleyballData = {
    title: "Volleyball",
    category: "Team",
    description: "Men",
    image: "/imgs/Events/11.svg",
    teamComposition: "6 players + 5 substitutes",
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
        "Matches will follow FIVB rules.",
        "Teams must report 15 minutes before match time.",
        "A 15-minute grace period applies before declaring a forfeit.",
        "Proper volleyball attire is mandatory.",
        "Team Composition: 6+5(substitutes) players"
      ],
      formatRules: [
        "Knockout rounds: Best of 3 sets.",
        "Finals: Best of 5 sets.",
        "No extra time; a tiebreaker set (15 points) will be played if needed."
      ]
    }
  };

  return <SportDetailPage {...volleyballData} />;
};

export default VolleyballPage;