import React, { useEffect, useState } from "react";
import API from "../api";
import Loader from "../components/Loader";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Build team list from cached matches
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/matches");
        const uniq = new Set();
        data.forEach((m) => {
          if (m.teamA) uniq.add(m.teamA);
          if (m.teamB) uniq.add(m.teamB);
        });
        setTeams(Array.from(uniq).slice(0, 100));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="page">
      <h1>Teams</h1>
      {loading ? <Loader /> : (
        <div className="grid cards">
          {teams.length === 0 ? <div className="card muted">No teams found.</div> :
            teams.map((t) => <div className="card team-card" key={t}>{t}</div>)}
        </div>
      )}
    </div>
  );
}
