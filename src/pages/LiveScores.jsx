import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api"; // ✅ Use the centralized API instance

const LiveScores = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch matches from backend (cached)
  const fetchMatches = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/matches"); // ✅ Railway backend
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMatches(sorted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch live data from API (silent by default for auto-refresh)
  const fetchLive = async (showNotification = false) => {
    try {
      if (showNotification) setRefreshing(true);
      const { data } = await API.get("/matches/live"); // ✅ Railway backend
      const sorted = data.matches.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMatches(sorted);
      if (showNotification) {
        toast.success("Live data refreshed!");
      }
    } catch (error) {
      console.error("Error fetching live matches:", error);
      if (showNotification) {
        toast.error("Failed to fetch live matches");
      }
    } finally {
      if (showNotification) setRefreshing(false);
    }
  };

  // Initial fetch + silent auto-refresh every 30 seconds
  useEffect(() => {
    fetchMatches();
    fetchLive(); // Initial fetch (silent)

    const interval = setInterval(() => fetchLive(), 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // Filter matches based on user search
  const filteredMatches = [...matches]
    .filter((m) => {
      const searchTerm = search.toLowerCase();
      return (
        m.teamA.toLowerCase().includes(searchTerm) ||
        m.teamB.toLowerCase().includes(searchTerm) ||
        (m.league && m.league.toLowerCase().includes(searchTerm))
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (loading) return <p className="page">Loading matches...</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Live Scores</h1>
        <div className="search-controls">
          <input
            type="text"
            placeholder="🔍 Search by team or league..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />
          <button 
            className="btn" 
            onClick={() => fetchLive(true)} 
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Refresh Live"}
          </button>
        </div>
      </div>

      <div className="match-grid">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((m, i) => (
            <MatchCard
              key={`${m.matchId || m._id || i}-${m.teamA}-${m.teamB}`}
              m={m}
            />
          ))
        ) : (
          <p className="no-results">No matches found for "{search}".</p>
        )}
      </div>
    </div>
  );
};

// MatchCard component
const MatchCard = ({ m }) => {
  const teamShortNames = {
    India: "IND",
    Pakistan: "PAK",
    Australia: "AUS",
    England: "ENG",
    "South Africa": "RSA",
    "New Zealand": "NZ",
    "West Indies": "WI",
    Bangladesh: "BAN",
    SriLanka: "SL",
    Afghanistan: "AFG",
    Ireland: "IRE",
    Zimbabwe: "ZIM",
    "United States": "USA",
    Nepal: "NEP",
    Scotland: "SCO",
    Netherlands: "NED",
    "Chennai Super Kings": "CSK",
    "Mumbai Indians": "MI",
    "Royal Challengers Bangalore": "RCB",
    "Kolkata Knight Riders": "KKR",
    "Rajasthan Royals": "RR",
    "Sunrisers Hyderabad": "SRH",
    "Punjab Kings": "PBKS",
    "Delhi Capitals": "DC",
    "Lucknow Super Giants": "LSG",
    "Gujarat Titans": "GT",
  };

  const leagueShortNames = {
    "Indian Premier League": "IPL",
    "Big Bash League": "BBL",
    "Pakistan Super League": "PSL",
    "Caribbean Premier League": "CPL",
    "Lanka Premier League": "LPL",
    "Bangladesh Premier League": "BPL",
    "The Hundred": "TH",
  };

  const getShortName = (teamName) => {
    if (!teamName) return "N/A";
    return (
      teamShortNames[teamName] ||
      teamName.split(" ").pop().slice(0, 3).toUpperCase()
    );
  };

  const shortA = getShortName(m.teamA);
  const shortB = getShortName(m.teamB);
  const league = leagueShortNames[m.league] || m.league || "Unknown League";

const formattedScore = m.scoreA !== null && m.scoreA !== undefined
    ? `${shortA} ${m.scoreA}${m.wicketsA != null ? `-${m.wicketsA}` : ""}${
        m.oversA ? ` (${m.oversA} ov)` : ""
      } | ${shortB} ${m.scoreB != null ? m.scoreB : "-"}${
        m.wicketsB != null ? `-${m.wicketsB}` : ""
      }${m.oversB ? ` (${m.oversB} ov)` : ""}`
    : "Score unavailable";

  const date = new Date(m.date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="match-card">
      <h3 className="match-title">
        {m.teamA} vs {m.teamB}
      </h3>
      <p>
        <strong>Sport:</strong> {m.sport.toUpperCase()}
      </p>
      <p>
        <strong>League:</strong> {league}
      </p>
      <p>
        <strong>Score:</strong> {formattedScore}
      </p>
      <p>
        <strong>Status:</strong> {m.status}
      </p>
      <p>
        <strong>Date:</strong> {date}
      </p>
    </div>
  );
};

export default LiveScores;
