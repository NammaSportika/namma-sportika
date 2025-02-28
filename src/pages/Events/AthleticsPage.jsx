import React from 'react';
import SportDetailPage from './SportDetailPage';

const AthleticsPage = () => {
  const athleticsData = {
    title: "Athletics",
    category: "Individual",
    description: "Men & Women - 100m & 200m",
    image: "/imgs/Events/8.svg",
    teamComposition: "Individual participants",
    entryFee: "₹ 500 per participant",
    prizes: [
      {
        category: "Men (100m)",
        entryFee: 500,
        firstPrize: 2500,
        secondPrize: 1500
      },
      {
        category: "Men (200m)",
        entryFee: 500,
        firstPrize: 2500,
        secondPrize: 1500
      },
      {
        category: "Women (100m)",
        entryFee: 500,
        firstPrize: 2500,
        secondPrize: 1500
      },
      {
        category: "Women (200m)",
        entryFee: 500,
        firstPrize: 2500,
        secondPrize: 1500
      }
    ],
    rules: {
      generalRules: [
        "Races will follow the World Athletics rules.",
        "Proper running gear is mandatory.",
        "False starts will lead to disqualification."        
      ],
      formatRules: [
        "100m & 200m: Knockout heats leading to finals.",
        "In case of a tie, a tiebreaker lap will be played."
      ]
    }
  };

  return <SportDetailPage {...athleticsData} />;
};

export default AthleticsPage;