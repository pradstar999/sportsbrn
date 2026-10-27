/* =====================================================================
   SSSIHL BRINDAVAN SPORTS CORNER: ALL SITE CONTENT LIVES HERE
   Edit this file, drop images into /assets, redeploy. No need to touch index.html.

   IMAGE NAMING (all inside the assets/ folder):
     Poster for a sport/event ....... assets/posters/<id>.jpg           e.g. posters/basketball.jpg, posters/800m.jpg
                                      Two posters (e.g. one per house): posterByDiv:{UG:["a.jpg","b.jpg"]} shows them side by side
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
   OPTIONAL ON A FIXTURE: per-set / per-quarter scores and scorers (a = Bharatha, b = Arjuna):
     periods:{label:"Quarter", rows:[[9,4],[4,4],[6,4],[10,3]]}      (label "Quarter" or "Set"; each row = [Bharatha, Arjuna])
     scorers:{bh:[{name:"Name", pts:4}], ar:[{name:"Name", pts:11}]}
     result:"Short result line"   (shown under the scoreboard; if sa and sb are empty the big score shows "vs")
     periods label can also be "Innings" (cricket: one column per innings, put each score in the batting side's cell)
   OPTIONAL ON AN INDIVIDUAL EVENT (racket sports): set-by-set match results
     matches:[ {div:"UG", round:"Singles Final", a:"Player A", b:"Player B", sets:[[21,15],[17,21],[24,22]], winner:"a"} ]
       (each set = [A's points, B's points]).  Podium places use results:[{place, name, mark:"Winner", round:"Singles", div}]
   ADD A FIXTURE (inside a house sport):
     fixtures:[ {div:"UG", round:"League", date:"2026-10-02", time:"16:30", venue:"Main court",
                 a:"bh", b:"ar", sa:"42", sb:"37", status:"final", winner:"a"} ]
       status: "upcoming" | "live" | "final"     winner: "a" | "b" | "none"
   ===================================================================== */
window.SITE = {
  name: "Brindavan Sports Corner",
  campus: "Sri Sathya Sai Institute of Higher Learning, Brindavan Campus",
  meet: "Annual Sports Meet 2026-27",
  updated: "2026-10-26",
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
        { div: "UG", round: "Final", date: "2026-08-28", time: "16:30", venue: "Main court", a: "bh", b: "ar", sa: "29", sb: "15", status: "final", winner: "a",
          periods: { label: "Quarter", rows: [[4, 9], [8, 13], [12, 19], [15, 29]] },
          scorers: {
            bh: [{ name: "Rushi", pts: "2×2" }, { name: "Prathamesh", pts: "2×6, 2×3" }, { name: "Kishan", pts: "2×1" }, { name: "Own basket (by Arjunas)", pts: 2 }],
            ar: [{ name: "Piyush Yadav", pts: "2×4, 1×3" }, { name: "Subhash", pts: "2×2" }]
          } },
        { div: "PG", round: "Final", date: "2026-08-27", time: "16:30", venue: "Main court", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "b" }
      ], players: [] },
    { id: "cricket", name: "Cricket", posterByDiv: { UG: ["cricket-ug.jpg"], PG: ["cricket-pg-arjuna.jpg", "cricket-pg-bharatha.jpg"] }, tagline: "UG Final · Three innings · Target 94",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-08-30", time: "08:20", venue: "Cricket ground", a: "bh", b: "ar", sa: "124", sb: "138", status: "final", winner: "b",
          result: "Arjunas won. Three innings were played; the target in the third innings was 94.",
          periods: { label: "Innings", rows: [["124/9", "–"], ["–", "138/8"], ["106 all out", "–"], ["–", "77/1"]] } },
        { div: "PG", round: "Final", date: "2026-09-13", time: "08:00", venue: "Cricket ground", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "b" }
      ], players: [] },
    { id: "volleyball", name: "Volleyball", posterByDiv: { PG: "volleyball-pg.jpg" }, tagline: "Best of 5 sets",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-09-11", time: "16:30", venue: "Volleyball court", a: "bh", b: "ar", sa: "4", sb: "1", status: "final", winner: "a",
          periods: { label: "Set", rows: [[21, 16], [22, 20], [18, 21], [21, 12]] }, result: "Bharathas won 4–1." },
        { div: "PG", round: "Final", date: "2026-09-10", time: "16:30", venue: "Volleyball court", a: "bh", b: "ar", sa: "", sb: "", status: "final", winner: "b" }
      ], players: [] },
    { id: "football", name: "Football", posterByDiv: { UG: ["football-ug-arjuna.jpg", "football-ug-bharatha.jpg"] }, tagline: "30 + 10 + 30 minutes",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-09-15", time: "16:30", venue: "Main ground", a: "bh", b: "ar", sa: "1", sb: "1", status: "final", winner: "a", note: "Full time 1-1. Bharatha won 2-1 on penalties." }
      ], players: [] },
    { id: "ball-badminton", name: "Ball Badminton", posterByDiv: { UG: "ball-badminton-ug.jpg" }, tagline: "Best of 3 sets",
      fixtures: [
        { div: "UG", round: "Final", date: "2026-09-17", time: "16:30", venue: "Ball badminton court", a: "bh", b: "ar", sa: "0", sb: "2", status: "final", winner: "b",
          periods: { label: "Set", rows: [[18, 21], [6, 22]] } }
      ], players: [] }
  ],

  /* Individual events: track, jumps, throws, relay, racket and table sports. */

  /* cat: Track | Jumps | Throws | Other      metric: time | distance | height
     record (optional): {mark:"11.20", name:"Name", house:"bh", year:"2024"} */
  individualEvents: [
    { id: "100m", name: "100m", cat: "Track", metric: "time", results: [{"div":"UG","round":"Final","place":1,"name":"Deep Das","mark":"12.34"},{"div":"UG","round":"Final","place":2,"name":"Ojas Jagtap","mark":"12.50"},{"div":"UG","round":"Final","place":3,"name":"Amon Sahu","mark":"12.53"}], schedule: [
      { div: "UG", round: "Heats", date: "2026-10-01", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Semi Finals", date: "2026-10-02", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Final", date: "2026-10-03", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Heats", date: "2026-10-01", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Semi Finals", date: "2026-10-02", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-10-03", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "200m", name: "200m", cat: "Track", metric: "time", results: [{"div":"UG","round":"Final","place":1,"name":"Deep Das","mark":"27.28"},{"div":"UG","round":"Final","place":2,"name":"Sivaramakrishnan","mark":"27.28"},{"div":"UG","round":"Final","place":3,"name":"Kishan","mark":"27.60"}], schedule: [
      { div: "UG", round: "Heats", date: "2026-09-25", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Semi Finals", date: "2026-09-26", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Final", date: "2026-09-28", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Heats", date: "2026-09-25", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Semi Finals", date: "2026-09-26", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-28", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "400m", name: "400m", cat: "Track", metric: "time", results: [{"div":"UG","round":"Final","place":1,"name":"Deep Das","mark":"1:01.94"},{"div":"UG","round":"Final","place":2,"name":"Sivaramakrishnan","mark":"1:02.66"},{"div":"UG","round":"Final","place":3,"name":"Amar Aditya","mark":"1:06.28"}], schedule: [
      { div: "UG", round: "Heats", date: "2026-09-21", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Semi Finals", date: "2026-09-22", time: "06:30", venue: "Athletic track" },
      { div: "UG", round: "Final", date: "2026-09-23", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Heats", date: "2026-09-21", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Semi Finals", date: "2026-09-22", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-23", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "800m", name: "800m", cat: "Track", metric: "time", results: [{"div":"UG","round":"Final","place":1,"name":"Shoyam Chettri","mark":"2:12.46"},{"div":"UG","round":"Final","place":2,"name":"Nikhil Thapa","mark":"2:17.91"},{"div":"UG","round":"Final","place":3,"name":"Anmol Chettri","mark":"2:21.73"}], schedule: [
      { div: "UG", round: "Final", date: "2026-09-19", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-19", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "1500m", name: "1500m", cat: "Track", metric: "time", results: [{"div":"UG","round":"Final","place":1,"name":"Shoyam Chettri","mark":"4:36.41"},{"div":"UG","round":"Final","place":2,"name":"Nikhil Thapa","mark":"4:46.53"},{"div":"UG","round":"Final","place":3,"name":"Abhinav Gurung","mark":"4:51.15"}], schedule: [
      { div: "UG", round: "Final", date: "2026-09-18", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-18", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "5000m", name: "5000m", cat: "Track", metric: "time", results: [{"div":"UG","round":"Final","place":1,"name":"Shoyam Chettri","mark":"19:25"},{"div":"UG","round":"Final","place":2,"name":"Madhusudan","mark":"20:26"},{"div":"UG","round":"Final","place":3,"name":"Anmol Chettri","mark":"20:31"}], schedule: [
      { div: "UG", round: "Final", date: "2026-09-27", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-09-27", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "10000m", name: "10000m", cat: "Track", metric: "time", results: [{"div":"UG","round":"Final","place":1,"name":"Shoyam Chettri","mark":"34:16"},{"div":"UG","round":"Final","place":2,"name":"Anmol Chettri","mark":"34:21"},{"div":"UG","round":"Final","place":3,"name":"Nikhil Thapa","mark":"34:52"}], schedule: [
      { div: "UG", round: "Final", date: "2026-10-04", time: "06:30", venue: "Athletic track" },
      { div: "PG", round: "Final", date: "2026-10-04", time: "06:30", venue: "Athletic track" }
    ]},
    { id: "long-jump", name: "Long Jump", cat: "Jumps", metric: "distance", results: [{"div":"UG","round":"Final","place":1,"name":"Deep Das","mark":"5.72"},{"div":"UG","round":"Final","place":2,"name":"Sivaramakrishnan","mark":"5.72"},{"div":"UG","round":"Final","place":3,"name":"Shoyam Chettri","mark":"5.18"}], schedule: [
      { div: "UG", round: "Final", date: "2026-09-24", time: "16:30", venue: "Jumps pit" },
      { div: "PG", round: "Final", date: "2026-09-24", time: "06:30", venue: "Jumps pit" }
    ]},
    { id: "high-jump", name: "High Jump", cat: "Jumps", metric: "height", results: [{"div":"UG","round":"Final","place":1,"name":"Mohit","mark":"1.50"},{"div":"UG","round":"Final","place":2,"name":"Anand Sai","mark":"1.49"},{"div":"UG","round":"Final","place":3,"name":"Deep Das","mark":"1.49"}], schedule: [
      { div: "UG", round: "Final", date: "2026-09-29", time: "16:30", venue: "Jumps pit" },
      { div: "PG", round: "Final", date: "2026-09-29", time: "06:30", venue: "Jumps pit" }
    ]},
    { id: "triple-jump", name: "Triple Jump", cat: "Jumps", metric: "distance", results: [{"div":"UG","round":"Final","place":1,"name":"Sivaramakrishnan","mark":"11.44"},{"div":"UG","round":"Final","place":2,"name":"Kasinath M","mark":"10.81"},{"div":"UG","round":"Final","place":3,"name":"Aditya Sai","mark":"10.68"}], schedule: [
      { div: "UG", round: "Final", date: "2026-09-22", time: "16:30", venue: "Jumps pit" },
      { div: "PG", round: "Final", date: "2026-09-22", time: "06:45", venue: "Jumps pit" }
    ]},
    { id: "discus-throw", name: "Discus Throw", cat: "Throws", metric: "distance", results: [{"div":"UG","round":"Final","place":1,"name":"G Tushar","mark":"24.73"},{"div":"UG","round":"Final","place":2,"name":"Subhash Reddy P","mark":"24.11"},{"div":"UG","round":"Final","place":3,"name":"B Piyush Yadav","mark":"23.94"}], schedule: [
      { div: "UG", round: "Final", date: "2026-09-19", time: "16:30", venue: "Throws field" },
      { div: "PG", round: "Final", date: "2026-09-19", time: "06:45", venue: "Throws field" }
    ]},
    { id: "javelin-throw", name: "Javelin Throw", cat: "Throws", metric: "distance", results: [{"div":"UG","round":"Final","place":1,"name":"Lakshya Bhandari","mark":"39.31"},{"div":"UG","round":"Final","place":2,"name":"Jashwant Roy","mark":"38.84"},{"div":"UG","round":"Final","place":3,"name":"Dewanth Naidu","mark":"33.85"}], schedule: [
      { div: "UG", round: "Final", date: "2026-10-03", time: "16:30", venue: "Throws field" },
      { div: "PG", round: "Final", date: "2026-10-03", time: "06:45", venue: "Throws field" }
    ]},
    { id: "shot-put", name: "Shot Put", cat: "Throws", metric: "distance", results: [{"div":"UG","round":"Final","place":1,"name":"Subhash Reddy P","mark":"8.59"},{"div":"UG","round":"Final","place":2,"name":"Sai Kishan","mark":"8.57"},{"div":"UG","round":"Final","place":3,"name":"B Piyush Yadav","mark":"8.28"}], schedule: [
      { div: "UG", round: "Final", date: "2026-09-23", time: "16:30", venue: "Throws field" },
      { div: "PG", round: "Final", date: "2026-09-23", time: "06:45", venue: "Throws field" }
    ]},
    { id: "hammer-throw", name: "Hammer Throw", cat: "Throws", metric: "distance", results: [{"div":"UG","round":"Final","place":1,"name":"Vydhik","mark":"18.03"},{"div":"UG","round":"Final","place":2,"name":"Rahul Sahu","mark":"15.08"},{"div":"UG","round":"Final","place":3,"name":"Ankit Kumar","mark":"14.23"}], schedule: [
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

    { id: "table-tennis", name: "Table Tennis", cat: "Racket & Table", metric: "sets", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-08-17", time: "06:30", venue: "Indoor courts" },
      { div: "PG", round: "Final", date: "2026-08-14", time: "06:30", venue: "Indoor courts" }
    ]},
    { id: "shuttle-badminton", name: "Shuttle Badminton (Singles)", poster: "shuttle-badminton.jpg", cat: "Racket & Table", metric: "sets",
      results: [
        { div: "UG", round: "Singles", place: 1, name: "Aman Sahu", mark: "Winner" },
        { div: "UG", round: "Singles", place: 2, name: "G Hemanth", mark: "Runner-up" },
        { div: "UG", round: "Singles", place: 3, name: "Subhash", mark: "Third" },
        { div: "PG", round: "Singles", place: 1, name: "Aditya Gurung", className: "2nd MBA", mark: "Winner" },
        { div: "PG", round: "Singles", place: 2, name: "Sai Ram R", className: "2nd MA", mark: "Runner-up" },
        { div: "PG", round: "Singles", place: 3, name: "Sravan Sai", className: "2nd MBA", mark: "Third" }
      ],
      matches: [
        { div: "UG", round: "Singles Final", a: "Aman Sahu", b: "G Hemanth", sets: [[21, 15], [17, 21], [24, 22]], winner: "a" },
        { div: "UG", round: "Bronze Match", a: "Subhash", b: "Shikar", sets: [[21, 18], [17, 21], [21, 16]], winner: "a" },
        { div: "PG", round: "Singles Final", a: "Aditya Gurung", b: "Sai Ram R", sets: [[21, 16], [21, 11]], winner: "a" },
        { div: "PG", round: "Bronze Match", a: "Sravan Sai", b: "Arjun", sets: [[21, 19], [18, 21], [21, 16]], winner: "a" }
      ],
      schedule: [
        { div: "UG", round: "Final", date: "2026-08-19", time: "06:30", venue: "Badminton courts" },
        { div: "PG", round: "Final", date: "2026-08-18", time: "06:30", venue: "Badminton courts" }
      ]},
    { id: "shuttle-badminton-doubles", name: "Shuttle Badminton (Doubles)", poster: "shuttle-badminton.jpg", cat: "Racket & Table", metric: "sets",
      results: [
        { div: "UG", round: "Doubles", place: 1, name: "Pranav & Gnaneswar", mark: "Winner" },
        { div: "UG", round: "Doubles", place: 2, name: "Subhash & Maheshwar", mark: "Runner-up" }
      ],
      matches: [
        { div: "UG", round: "Doubles Final", a: "Pranav & Gnaneswar", b: "Subhash & Maheshwar", sets: [[21, 15], [21, 11]], winner: "a" }
      ],
      schedule: [
        { div: "UG", round: "Final", date: "2026-08-19", time: "06:30", venue: "Badminton courts" },
        { div: "PG", round: "Final", date: "2026-08-18", time: "06:30", venue: "Badminton courts" }
      ]},
    { id: "tennis", name: "Tennis", poster: "tennis-ug.jpg", posterByDiv: { UG: "tennis-ug.jpg", PG: "tennis-pg.jpg" }, cat: "Racket & Table", metric: "sets", results: [], schedule: [
      { div: "UG", round: "Final", date: "2026-08-26", time: "06:30", venue: "Tennis courts" },
      { div: "PG", round: "Final", date: "2026-08-25", time: "06:30", venue: "Tennis courts" }
    ]}
  ]
};

  /* PG podium results imported from the supplied PG results sheet. */
  const pgPodiums = {"100m":[["Iraianbu",1,"12.41","1st MBA"],["Sneho",2,"13.03","2nd MA"],["Vignesh",3,"13.25","1st MBA"]],"200m":[["Iraianbu",1,"27.97","1st MBA"],["Sneho",2,"29.28","2nd MA"],["Satwik",3,"28.63","2nd MBA"]],"400m":[["Iraianbu",1,"1:00.88","1st MBA"],["Surya Vamshi",2,"1:05.75","1st MBA"],["Sneho Sakey",3,"1:08.00","2nd MA"]],"800m":[["Abhay Shah",1,"2:23.54","2nd MBA"],["Deen Dayal",2,"2:34.50","2nd MA"],["A. Prem",3,"2:36.95","2nd MBA"]],"1500m":[["Abhay Shah",1,"4:56.63","2nd MBA"],["Anshuman Gurung",2,"5:16.63","2nd MBA"],["Rishab",3,"5:17.38","2nd MBA"]],"5000m":[["Abhay Shah",1,"19:42","2nd MBA"],["Rishab",2,"20:58","2nd MBA"],["Anshuman",3,"21:22","2nd MBA"]],"hammer-throw":[["Ankush",1,"14.28","2nd MBA"],["Naga Ketan",2,"14.14","2nd MBA"],["Abhishek",3,"13.20","1st MBA"]],"javelin-throw":[["Ganesh",1,"35.82","2nd MBA"],["Abhay",2,"34.22","2nd MBA"],["Jaswanth",3,"31.57","2nd MA"]],"discus-throw":[["Rajesh Thami",1,"22.51","2nd MBA"],["Muing Limbu",2,"18.47","2nd MA"],["Gourav Das",3,"17.91","2nd MBA"]],"shot-put":[["Arjun",1,"8.49","2nd MA"],["Rajesh Thami",2,"7.91","2nd MBA"],["Satwik Bhat",3,"7.60","2nd MBA"]],"triple-jump":[["Iraianbu",1,"11.41","1st MBA"],["A. Prem",2,"10.18","2nd MBA"],["Satwik Bhat",3,"9.83","2nd MBA"]],"long-jump":[["Satwik",1,"5.50","2nd MA"],["Charan Raju",2,"4.96","1st MBA"],["Santosh",3,"4.81","1st MBA"]],"high-jump":[["Iraianbu",1,"1.48","1st MBA"],["B Santhosh",2,"1.46","1st MBA"],["A Prem Sai",3,"1.41","2nd MBA"]],"4x100m-relay":[["Bharatas (Vignesh, Pavan, Jaswanth P.S, Sneho Sarkey)",1,"56.79","Team"],["Arjunas (Dhanvi, B Santhosh, Rajesh Thami, Deen Dayal)",2,"59.25","Team"],["Bharatas (Fayaz Ali, Kushu Vardhan, Sumukh, Mano Sai)",3,"59.94","Team"]],"4x400m-relay":[["Arjunas (Surya Vamshi, Ayush, Abhay, Iraianbu)",1,"4:39.43","Team"],["Arjunas (Mahendra, Siddarth, Abhinaya, Sravan Sai)",2,"4:53.51","Team"],["Bharatas (Ganesh, Siddharth, Aditya Gurung, Rishab)",3,"5:02.00","Team"]],"tennis":[["Aditya Thakur",1,"Winner","1st MBA"],["Naga Ketan",2,"Runner-up","2nd MBA"],["Pavan B S",3,"Third","1st MBA"]]};
  for (const ev of window.SITE.individualEvents) {
    const rows = pgPodiums[ev.id];
    if (!rows) continue;
    ev.results = (ev.results || []).filter(r => r.div !== "PG" || r.round !== "Final");
    for (const [name, place, mark, className] of rows) {
      ev.results.push({div:"PG", round:"Final", place, name, mark, className});
    }
  }
