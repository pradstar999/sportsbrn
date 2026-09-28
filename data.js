/* =====================================================================
   SSSIHL BRINDAVAN SPORTS CORNER: ALL SITE CONTENT LIVES HERE
   Edit this file, drop images into /assets, redeploy. No need to touch index.html.

   IMAGE NAMING (all inside the assets/ folder):
     Poster for a sport/event ....... assets/posters/<id>.jpg           e.g. posters/basketball.jpg, posters/800m.jpg
     Player / athlete photo ......... assets/players/<id>/<name-slug>.jpg   e.g. players/basketball/rahul-sharma.jpg
                                      (slug = lowercase name, spaces -> dashes)
                                      Optional shared photo: assets/players/all/<name-slug>.jpg
     Gallery photos ................. assets/gallery/<id>/1.jpg, 2.jpg, 3.jpg ... (numbered, no gaps)
   Anything missing shows a placeholder automatically.

   DIVISIONS: every fixture and every schedule slot carries div: "UG" or "PG".
   Use div: "All" for something common to both (rare).

   ADD A PLAYER (inside a house sport):
     players:[ {name:"Full Name", house:"bh", role:"Captain", number:7} ]
   ADD A SCHEDULE SLOT (inside an individual event):
     schedule:[ {div:"UG", round:"Heats", date:"2026-10-05", time:"07:30", venue:"Athletic track"} ]
   ADD A RESULT (inside an individual event):
     results:[ {div:"UG", name:"Full Name", house:"ar", mark:"2:04.80", round:"Final"} ]
       time events: "11.45" or "2:04.80"   distance/height events: metres like "5.82"
   ADD A FIXTURE (inside a house sport):
     fixtures:[ {div:"UG", round:"League", date:"2026-10-02", time:"16:30", venue:"Main court",
                 a:"bh", b:"ar", sa:"42", sb:"37", status:"final", winner:"a"} ]
       status: "upcoming" | "live" | "final"     winner: "a" | "b" | "none"
   ===================================================================== */
window.SITE = {
  name: "Brindavan Sports Corner",
  campus: "Sri Sathya Sai Institute of Higher Learning, Brindavan Campus",
  meet: "Annual Sports Meet 2026-27",
  updated: "2026-09-22",
  assetBase: "assets/",
  galleryMax: 60,
  divisions: ["UG", "PG"],
  points: { fixtureWin: 1 },

  houses: [
    { id: "bh", name: "Bharatha", color: "#ff5c5c" },
    { id: "ar", name: "Arjuna",   color: "#4da3ff" }
  ],

  houseSports: [
    { id: "basketball", name: "Basketball", poster: "basketball-ug.jpg", posterByDiv: { UG: "basketball-ug.jpg", PG: "basketball-pg.jpg" }, tagline: "4 quarters x 10 minutes",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-08-28", time: "16:30", venue: "Main court", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "a" },
        { div: "PG", round: "Final", date: "2026-08-27", time: "16:30", venue: "Main court", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "b" }
      ], players: [] },
    { id: "cricket", name: "Cricket", posterByDiv: { UG: "cricket-ug.jpg", PG: "cricket-pg.jpg" }, tagline: "2 innings, 20 overs a side",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-08-30", time: "08:00", venue: "Cricket ground", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "b" },
        { div: "PG", round: "Final", date: "2026-09-13", time: "08:00", venue: "Cricket ground", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "b" }
      ], players: [] },
    { id: "volleyball", name: "Volleyball", posterByDiv: { PG: "volleyball-pg.jpg" }, tagline: "Best of 5 sets",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-09-11", time: "16:30", venue: "Volleyball court", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "a" },
        { div: "PG", round: "Final", date: "2026-09-10", time: "16:30", venue: "Volleyball court", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "b" }
      ], players: [] },
    { id: "football", name: "Football", tagline: "30 + 10 + 30 minutes",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-09-15", time: "16:30", venue: "Main ground", a: "bh", b: "ar", sa: "1", sb: "1", status: "final", winner: "a", note: "Full time 1-1. Bharatha won 2-1 on penalties." }
      ], players: [] },
    { id: "ball-badminton", name: "Ball Badminton", tagline: "Best of 3 sets",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-09-17", time: "16:30", venue: "Ball badminton court", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "b" }
      ], players: [] }
  ],

  /* Individual events: track, jumps, throws, relay, racket and table sports. */

  /* cat: Track | Jumps | Throws | Other      metric: time | distance | height
     record (optional): {mark:"11.20", name:"Name", house:"bh", year:"2024"} */
  individualEvents: [
    { id: "100m", name: "100m", cat: "Track", metric: "time", results: [], schedule: [
      { div: "UG", round: "Heats", date: "2026-10-01", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Semi Finals", date: "2026-10-02", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Final", date: "2026-10-03", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Heats", date: "2026-10-01", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Semi Finals", date: "2026-10-02", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-10-03", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "200m", name: "200m", cat: "Track", metric: "time", results: [], schedule: [
      { div: "UG", round: "Heats", date: "2026-09-25", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Semi Finals", date: "2026-09-26", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Final", date: "2026-09-28", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Heats", date: "2026-09-25", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Semi Finals", date: "2026-09-26", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-28", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "400m", name: "400m", cat: "Track", metric: "time", results: [], schedule: [
      { div: "UG", round: "Heats", date: "2026-09-21", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Semi Finals", date: "2026-09-22", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Final", date: "2026-09-23", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Heats", date: "2026-09-21", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Semi Finals", date: "2026-09-22", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-23", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "800m", name: "800m", cat: "Track", metric: "time", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-19", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-19", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "1500m", name: "1500m", cat: "Track", metric: "time", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-18", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-18", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "5000m", name: "5000m", cat: "Track", metric: "time", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-27", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-27", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "10000m", name: "10000m", cat: "Track", metric: "time", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-10-04", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-10-04", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "long-jump", name: "Long Jump", cat: "Jumps", metric: "distance", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-24", time: "16:30", venue: "Jumps pit" },
      { div: "PG", round: "Final", date: "2026-09-24", time: "06:30", venue: "Jumps pit" }
    ]},
    { id: "high-jump", name: "High Jump", cat: "Jumps", metric: "height", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-29", time: "16:30", venue: "Jumps pit" },
      { div: "PG", round: "Final", date: "2026-09-29", time: "06:30", venue: "Jumps pit" }
    ]},
    { id: "triple-jump", name: "Triple Jump", cat: "Jumps", metric: "distance", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-22", time: "16:30", venue: "Jumps pit" },
      { div: "PG", round: "Final", date: "2026-09-22", time: "06:45", venue: "Jumps pit" }
    ]},
    { id: "discus-throw", name: "Discus Throw", cat: "Throws", metric: "distance", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-19", time: "16:30", venue: "Throws field" },
      { div: "PG", round: "Final", date: "2026-09-19", time: "06:45", venue: "Throws field" }
    ]},
    { id: "javelin-throw", name: "Javelin Throw", cat: "Throws", metric: "distance", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-10-03", time: "16:30", venue: "Throws field" },
      { div: "PG", round: "Final", date: "2026-10-03", time: "06:45", venue: "Throws field" }
    ]},
    { id: "shot-put", name: "Shot Put", cat: "Throws", metric: "distance", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-23", time: "16:30", venue: "Throws field" },
      { div: "PG", round: "Final", date: "2026-09-23", time: "06:45", venue: "Throws field" }
    ]},
    { id: "hammer-throw", name: "Hammer Throw", cat: "Throws", metric: "distance", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-10-02", time: "16:30", venue: "Throws field" },
      { div: "PG", round: "Final", date: "2026-10-02", time: "06:45", venue: "Throws field" }
    ]},
    { id: "4x100m-relay", name: "4x100m Relay", cat: "Other", metric: "time", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-30", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-30", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "4x400m-relay", name: "4x400m Relay", cat: "Other", metric: "time", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-09-30", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-30", time: "06:30", venue: "Athletic track" }
    ]}
,

    { id: "table-tennis", name: "Table Tennis", posterByDiv: { UG: "table-tennis-ug.jpg", PG: "table-tennis-pg.jpg" }, cat: "Racket & Table", metric: "sets", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-08-17", time: "06:30", venue: "Indoor courts" },
      { div: "PG", round: "Final", date: "2026-08-14", time: "06:30", venue: "Indoor courts" }
    ]},
    { id: "shuttle-badminton", name: "Shuttle Badminton", posterByDiv: { UG: "shuttle-badminton-ug.jpg", PG: "shuttle-badminton-pg.jpg" }, cat: "Racket & Table", metric: "sets", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-08-19", time: "06:30", venue: "Badminton courts" },
      { div: "PG", round: "Final", date: "2026-08-18", time: "06:30", venue: "Badminton courts" }
    ]},
    { id: "tennis", name: "Tennis", poster: "tennis-ug.jpg", posterByDiv: { UG: "tennis-ug.jpg", PG: "tennis-pg.jpg" }, cat: "Racket & Table", metric: "sets", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-08-26", time: "06:30", venue: "Tennis courts" },
      { div: "PG", round: "Final", date: "2026-08-25", time: "06:30", venue: "Tennis courts" }
    ]}
  ]
};
