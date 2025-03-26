import React from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';

const initialMatches = [
  {
    team1: {
      name: 'IIT BOMBAY',
      logo: '/public/imgs/icon/icon.png',
      score: '108/10',
      overs: '18.3'
    },
    team2: {
      name: 'IIT BHU',
      logo: '/public/imgs/icon/icon.png',
      score: '96/9',
      overs: '20.0'
    },
    date: '17 Dec',
    ground: 'Ground 2',
    time: '10:30',
    status: 'Live' // Added status field
  }
];

const CricketScore = () => {
  return (
    <div className="min-h-screen bg-[#f4e4c9] px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-[#07534c]">Cricket Scoreboard</h1>
        
        {initialMatches.map((match, index) => (
          <div 
            key={index} 
            className="group mb-6 transform cursor-default transition-all hover:scale-[1.02]"
          >
            {/* Status Ribbon */}
            {match.status === 'Live' && (
              <div className="relative z-10 -mb-2 ml-4 flex w-24 items-center justify-center rounded-t-lg bg-[#a58255] px-3 py-1">
                <span className="flex items-center text-sm font-semibold text-[#e7fefe]">
                  <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                  LIVE
                </span>
              </div>
            )}

            {/* Match Card */}
            <div className="relative overflow-hidden rounded-xl bg-[#07534c] shadow-2xl">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07534c]/90"></div>

              {/* Card Content */}
              <div className="relative p-6">
                {/* Teams Section */}
                <div className="flex items-center justify-between">
                  {/* Team 1 */}
                  <div className="flex flex-1 flex-col items-center">
                    <img 
                      src={match.team1.logo} 
                      alt={`${match.team1.name} logo`} 
                      className="mb-4 h-20 w-20 rounded-full border-4 border-[#a58255] bg-white p-1"
                    />
                    <h2 className="mb-1 text-center text-xl font-bold text-[#e7fefe]">
                      {match.team1.name}
                    </h2>
                    <p className="text-3xl font-bold text-[#e7fefe]">{match.team1.score}</p>
                    <p className="mt-1 text-sm text-[#e7fefe]/80">{match.team1.overs} OVERS</p>
                  </div>

                  {/* VS Separator */}
                  <div className="mx-4 flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a58255]">
                      <span className="text-xl font-black text-[#e7fefe]">VS</span>
                    </div>
                    <div className="mt-4 flex items-center space-x-2 text-[#e7fefe]">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm font-semibold">T20 Match</span>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex flex-1 flex-col items-center">
                    <img 
                      src={match.team2.logo} 
                      alt={`${match.team2.name} logo`} 
                      className="mb-4 h-20 w-20 rounded-full border-4 border-[#a58255] bg-white p-1"
                    />
                    <h2 className="mb-1 text-center text-xl font-bold text-[#e7fefe]">
                      {match.team2.name}
                    </h2>
                    <p className="text-3xl font-bold text-[#e7fefe]">{match.team2.score}</p>
                    <p className="mt-1 text-sm text-[#e7fefe]/80">{match.team2.overs} OVERS</p>
                  </div>
                </div>

                {/* Match Info */}
                <div className="mt-8 rounded-lg bg-[#07534c] p-4 shadow-inner">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-3 text-[#e7fefe]">
                      <Calendar className="h-6 w-6 text-[#a58255]" />
                      <div>
                        <p className="text-xs font-semibold uppercase">DATE</p>
                        <p className="font-medium">{match.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-[#e7fefe]">
                      <MapPin className="h-6 w-6 text-[#a58255]" />
                      <div>
                        <p className="text-xs font-semibold uppercase">VENUE</p>
                        <p className="font-medium">{match.ground}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-[#e7fefe]">
                      <Clock className="h-6 w-6 text-[#a58255]" />
                      <div>
                        <p className="text-xs font-semibold uppercase">TIME</p>
                        <p className="font-medium">{match.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="mt-6 w-full rounded-lg bg-[#a58255] py-3 font-semibold text-[#e7fefe] transition-all hover:bg-[#8a6c47] active:scale-95">
                  View Full Scorecard
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CricketScore;