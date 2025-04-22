import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import KabaddiScore from './KabaddiScore';
import CricketScore from './CricketScore';
import FootballScore from './FootballScore';
import ThrowballScoreMen from './ThrowballScoreMen';
import VolleyballScore from './VolleyballScore';
import SportsStandings from './SportsStandings';
import SportsList from './SportsList';
import NotFound from '../../pages/NotFound';
import ChessScore from './ChessScore';
import ThrowballScoreWomen from './ThrowballScoreWomen';
import BasketballScoreboardMen from './BasketballScoreboardMen';
import BasketballScoreboardWomen from './BasketballScoreboardWomen';
import SportsAdmin from '../ScoreBoardAdmin/SportsAdmin';
import AthleticsScore from './AthleticsScore';
const ScoreBoardRouter = () => {
  return (
    <Routes>
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
      <Route path="score-admin" element={<SportsAdmin />} />
      <Route path="athletics" element={<AthleticsScore />} />
      {/* Default route to redirect to SportsList if no specific scoreboard is matched */}
      <Route index element={<SportsList />} />

      <Route path="*" element={<NotFound />} />
    </Routes> 
  );
};

export default ScoreBoardRouter;