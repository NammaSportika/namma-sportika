import React from 'react';
import SportDetailPage from './SportDetailPage';

const ChessPage = () => {
  const chessData = {
    title: "Chess",
    category: "Mixed",
    description: "Mixed Team Event",
    image: "/imgs/Events/12.svg",
    teamComposition: "5 players (2 girls in team is mandatory)",
    entryFee: "₹ 500 per team",
    prizes: [
      {
        category: "Mixed (team of 5)",
        entryFee: 500,
        firstPrize: 5000,
        secondPrize: 3000
      }
    ],
    rules: {
      generalRules: [
        "The tournament will follow FIDE rules.",
        "The arbiter's decision is final. Any disputes must be addressed to the organizer.",
        "Players must report at least 15 minutes before their scheduled match.",
        "A grace period of 10 minutes is allowed; failure to arrive will result in a forfeit.",
        "Each player must press the clock with the same hand they move the piece.",
        "Any violation of fair play will result in disqualification.",
        "College ID card is mandatory for all participants.",
        "Team Composition: 5 players( 2 girls in team is mandatory)."
      ],
      formatRules: [
        "Format: Swiss League / Knockout (based on participation).",
        "Time control: Flat15 (Rapid) or 5 (Blitz)",
        "(Decided based on event format).",
        "In case of a tie, a tiebreaker match will be played."
      ]
    }
  };

  return <SportDetailPage {...chessData} />;
};

export default ChessPage;