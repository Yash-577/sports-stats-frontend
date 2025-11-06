import React from "react";

export default function MatchCard({ m }) {
  return (
    <div className="card match-card">
      <div className="row">
        <div className="team">
          <div className="team-name">{m.teamA}</div>
          <div className="team-score">{m.scoreA}</div>
        </div>

        <div className="vs">vs</div>

        <div className="team">
          <div className="team-name">{m.teamB}</div>
          <div className="team-score">{m.scoreB}</div>
        </div>
      </div>

      <div className="meta">
        <span className="badge">{m.sport}</span>
        <span>{m.league}</span>
        <span className="status">{m.status}</span>
      </div>
    </div>
  );
}
