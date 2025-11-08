// /api/players.js — Vercel Serverless Function
import data from "./names-2025.json" assert { type: "json" };

export default function handler(req, res) {
  // Allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();

  const { position, q, number } = req.query;
  let players = data;

  if (position) {
    players = players.filter(p => p.position.toLowerCase() === String(position).toLowerCase());
  }

  if (q) {
    const term = String(q).toLowerCase();
    players = players.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        String(p.number) === term ||
        p.nationality.toLowerCase().includes(term)
    );
  }

  if (number) {
    const player = players.find(p => String(p.number) === String(number));
    return player
      ? res.status(200).json(player)
      : res.status(404).json({ error: "Player not found" });
  }

  res.status(200).json({
    season: 2025,
    team: "Real Madrid",
    count: players.length,
    players
  });
}
