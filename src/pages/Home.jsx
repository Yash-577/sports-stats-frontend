import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <h1>Welcome to SportsStats</h1>
      <p className="lead">
        Real-time cricket & football scores, match details, and quick analytics.
      </p>

      <div className="grid">
        <Link to="/livescores" className="card big">
          View Live Scores
        </Link>
        <Link to="/teams" className="card big">
          Teams
        </Link>
        <Link to="/players" className="card big">
          Players
        </Link>
      </div>

      <section className="about">
        <h2>About</h2>
        <p>
          This app shows live scores by fetching data from external sports APIs,
          stores snapshots in MongoDB, and uses JWT-based authentication for protected routes.
        </p>
      </section>
    </div>
  );
}
