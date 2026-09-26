# SSSIHL Brindavan Sports Corner

**UG and PG are separate championships.** On first visit the site asks you to choose one;
switch anytime with the UG/PG pill in the header. All standings, fixtures, individual-event
schedules/results and the schedule page are scoped to whichever division is currently selected.
A sport only appears in a division's House events list if it has a fixture in that division —
so PG currently shows only basketball, cricket and volleyball, while UG shows all five.

**Admin login:** username `admin`, password `SSSIHL@2026` (set in `index.html`, search for
`ADMIN_USER`/`ADMIN_PASSWORD`). Change both before you publish this for real.


Static site for the SSSIHL Brindavan sports meet.

## Event model

### House sports
These are house/team events:
- Basketball
- Cricket
- Volleyball
- Football
- Ball Badminton

House fixtures are between **Bharatha** and **Arjuna**. Squad players are stored under each house sport.

### Individual events
These are athlete-based events:
- 100m, 200m, 400m, 800m, 1500m, 5000m, 10000m
- Long Jump, High Jump, Triple Jump
- Discus Throw, Javelin Throw, Shot Put, Hammer Throw
- 4x100m Relay, 4x400m Relay
- Table Tennis, Shuttle Badminton, Tennis

Individual events do **not** use Arjuna/Bharatha house affiliation.

## Adding results from the website

Use **Add results** in the navigation.

### Individual result
Enter:
- Event
- Place (1/2/3)
- Name
- Class
- Registration number
- Result / mark
- UG or PG
- Round
- Optional photo filename

The individual page automatically displays:
1. Event title
2. Event date
3. 1st / 2nd / 3rd podium photos
4. Name, class, registration number and timing/distance/height

### House result
Enter:
- Sport
- Division
- Round
- Date and time
- Venue
- Bharatha score
- Arjuna score
- Winner
- Status

You can also add squad players with name, class, registration number, role, jersey number and photo filename.

## Publishing saved results

The editor saves changes in the current browser using localStorage, so the pages update immediately on that device.

To publish the same data for everyone:
1. Open **Add results**.
2. Click **Export data.js**.
3. Replace the site's `data.js` with the downloaded file.
4. Redeploy the site.

You can also export/import `sports-results.json` for moving result data between browsers.

## Bulk import: CSV, Excel or JSON

Instead of typing results in one at a time, an admin can drop a spreadsheet onto the
**Bulk import results** panel on the Add results page:

- **.csv** or **.xlsx/.xls** — adds or updates just the rows in the file. Each row needs a
  `type` column (`individual`, `house`, or `player`) plus the same fields as the on-screen
  forms (event/place/name/mark/div for individual results; sport/div/round/scores/winner for
  fixtures; sport/house/name for squad players). Use the **Download template** buttons on
  that page to get a correctly-headed starter file for each row type.
- **.json** — a full `sports-results.json` backup (from Export JSON) replaces every result at
  once; a JSON file containing an array of row objects is treated the same as a CSV/Excel
  import (added/updated row by row).

Excel parsing is done client-side with the SheetJS library, loaded on demand only when an
`.xlsx`/`.xls` file is chosen, so the public pages never pay for it.

## Images

Put images in `assets/` using these conventions:
- Posters: `assets/posters/<id>.jpg`
- Individual/event player photos: `assets/players/<event-id>/<name-slug>.jpg`
- Shared player photo: `assets/players/all/<name-slug>.jpg`
- Event galleries: `assets/gallery/<event-id>/1.jpg`, `2.jpg`, `3.jpg` ...

Missing images automatically show placeholders.
