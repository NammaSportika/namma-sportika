import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import KabaddiScore from './KabaddiScore';
import CricketScore from './CricketScore';
import FootballScore from './FootballScore';
import ThrowballScoreMen from './ThrowballScoreMen';
import VolleyballScore from './VolleyballScore';
import SportsStandings from './SportsStandings';
import SportsList from './SportsList'; // Importing SportsList as a fallback
import NotFound from '../../pages/NotFound';
import ChessScore from './ChessScore';
import ThrowballScoreWomen from './ThrowballScoreWomen';
import BasketballScoreboardMen from './BasketballScoreboardMen';
import BasketballScoreboardWomen from './BasketballScoreboardWomen';
import AthleticsScoreMen100 from './AthleticsScoreMen100';
import AthleticsScoreMen200 from './AthleticsScoreMen200';
import AthleticsScoreWomen100 from './AthleticsScoreWomen100';
import AthleticsScoreWomen200 from './AthleticsScoreWomen200';
import SportsAdmin from '../ScoreBoardAdmin/SportsAdmin';
const ScoreBoardRouter = () => {
  return (
    <Routes>
      {/* Existing specific routes */}
      <Route path="kabaddi" element={<KabaddiScore />} />
      <Route path="cricket" element={<CricketScore />} />
      <Route path="football" element={<FootballScore />} />
      <Route path="throwball-men" element={<ThrowballScoreMen />} />
      <Route path="throwball-women" element={<ThrowballScoreWomen />} />
      <Route path="volleyball" element={<VolleyballScore />} />
      <Route path="standings" element={<SportsStandings />} />
      <Route path="chess" element={<ChessScore />} />
      <Route path="basketball-men" element={<BasketballScoreboardMen />} />
      <Route path="basketball-women" element={<BasketballScoreboardWomen />} />
      {/* <Route path="athletics-men-100" element={<AthleticsScoreMen100 />} />
      <Route path="athletics-men-200" element={<AthleticsScoreMen200 />} />
      <Route path="athletics-women-100" element={<AthleticsScoreWomen100 />} />
      <Route path="athletics-women-200" element={<AthleticsScoreWomen200 />} /> */}
      <Route path="score-admin" element={<SportsAdmin />} />
      {/* Default route to redirect to SportsList if no specific scoreboard is matched */}
      <Route index element={<SportsList />} />
      
      {/* Catch-all route to handle any undefined scoreboard routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ScoreBoardRouter;