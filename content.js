/* =====================================================================
   CONTENT.JS: everything you'd ever want to edit lives in this file.
   ---------------------------------------------------------------------
   HOW TO EDIT ON GITHUB
   1. Open this file on GitHub and click the pencil icon (Edit).
   2. Change text between the quotes '...'. Keep the quotes and commas.
   3. Click "Commit changes". The site updates in a minute or two.

   ADDING A PICTURE OR VIDEO
   1. Upload the file into the right folder (e.g. media/screens/alien-out/).
   2. Add its path to the list below, e.g. { src: 'media/screens/alien-out/1.png', note: '...' }

   RULES OF THUMB
   - Text uses straight quotes '...'. If your text needs an apostrophe,
     write it as ’ (that's a curly ’) or use it inside "double quotes".
   - Every item in a list ends with a comma.
   - Lists you leave empty [] simply don't show on the site.
   ===================================================================== */

window.GDD = {

  /* ---------- CONTACT (Party Invite room + title menu) ---------- */
  contact: {
    email: 'rohit.yentruvi.794@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rohitsy/',
    cv: 'files/Rohit-Yentruvi-CV.pdf',          // replace this PDF to update your CV
  },

  /* ---------- TITLE SCREEN ---------- */
  title: {
    label: 'PLAYER 1',
    heading: 'Who’s<br>Playing?',            // <br> = line break
    name: 'Rohit Yentruvi',
    tagline: 'Mobile game designer. Shipped puzzles, levels and loops.',
  },

  /* ---------- MAIN CHARACTER (room 01) ---------- */
  character: {
    avatar: '',                                   // e.g. 'media/img/avatar.png' (leave '' for the placeholder)
    logline: 'Mobile game designer with 2+ years across hybrid-casual, puzzle and narrative games. I take ideas from first sketch to a shipped game.',
    stats: [
      ['Class', 'Game Designer'],
      ['Base', 'Bengaluru, India'],
      ['XP', '2+ years'],
      ['Questing for', 'Game design roles'],
    ],
    // Each ability links to the room that proves it (use the room id from QUESTS below).
    abilities: [
      ['Core loop design', 'alien-out'],
      ['Progression & balancing', 'loopy-duck'],
      ['Level & puzzle design', 'murder-mystery-2'],
      ['Game documentation', 'lost-island'],
      ['Playtesting & iteration', 'escapeverse'],
      ['Narrative puzzle design', 'classified'],
      ['Economy teardowns', 'match-factory'],
      ['AI prototyping', 'ai-pipeline'],
      ['Market & trend research', 'game-tracker'],
      ['UX flows in Figma', 'island-mystery'],
    ],
    tools: ['Figma', 'Unity', 'Photoshop', 'Machinations', 'Google Docs & Sheets', 'Blender', 'Data & metrics'],
    liveEvent: 'Upskill Season: rebuilding my design craft from first principles',
  },

  /* ---------- PROGRESS (room 02) ---------- */
  progress: {
    image: 'media/img/progress.webp',            // still used as the map thumbnail
    stats: [['XP', '2+ yrs'], ['Stages', '6'], ['Solo quests', '2']],
    // main road, left to right. kind: 'edu' (blue node) or 'work' (gold node). last one is highlighted.
    stages: [
      { tag: 'WORLD 0', node: '0', kind: 'edu', title: 'Pre-University', org: 'Christ University', date: 'Jun 2017 \u2013 Mar 2019', skills: [] },
      { tag: 'TUTORIAL', node: '\u{1F393}', kind: 'edu', title: 'B.CA, Game Development', org: 'CMR University', date: 'Jun 2019 \u2013 May 2022', skills: [] },
      { tag: 'LEVEL 1', node: '1', kind: 'work', title: 'Intern Game Designer', org: 'Vincell Studios', date: 'Apr \u2013 Nov 2022', skills: ['Level design', 'GDD writing'] },
      { tag: 'LEVEL 2', node: '2', kind: 'work', title: 'Junior Game Designer', org: 'Vincell Studios', date: 'Dec 2022 \u2013 Nov 2023', skills: ['Puzzle design', 'Difficulty balancing'] },
      { tag: 'TRAINING ARC', node: '\u2605', kind: 'edu', title: 'Diploma in Game Design', org: 'Asian Institute of Design', date: 'Jul 2024 \u2013 Sep 2025', skills: ['Systems', 'Mechanics', 'Player psychology'] },
      { tag: 'LEVEL 3', node: '3', kind: 'work', title: 'Unity Game Designer', org: 'Tap N Play Studios', date: 'Oct 2025 \u2013 Mar 2026', skills: ['Market research', 'AI prototyping', 'Ad briefs'] },
    ],
    solo: [
      { title: 'Game Reviewer', org: 'G.round \u00b7 Freelance', date: 'Feb 2023 \u2013 Jan 2025' },
      { title: 'Game Designer', org: 'Surag Studios \u00b7 Part-time', date: 'Apr \u2013 Sep 2025' },
    ],
  },

  /* ---------- PARTY INVITE (room 04) ---------- */
  invite: {
    heading: 'Invite me to<br>your party',
    text: 'Open to game design roles: mobile, puzzle, hybrid-casual or narrative. Send an invite and I’ll join the lobby.',
  },

  /* ---------- SECTIONS (the yellow section cards) ---------- */
  sections: [
    { id: 'main', label: 'Main Quests', note: 'Studio work at Tap N Play, Vincell and Surag. Shipped games, and my part in each.' },
    { id: 'side', label: 'Side Quests', note: 'College and personal projects. Playable wherever a build exists.' },
    { id: 'codex', label: 'Codex', note: 'Deconstructions and re-designs of other people’s games.' },
    { id: 'inventory', label: 'Inventory', note: 'Tools I built and carry into every project.' },
    { id: 'art', label: 'Art Room', note: '3D models, digital paintings and paper sketches. The craft side of how I think.' },
  ],

  /* ---------- QUESTS: one block per project room ----------
     id        : short name used in links (no spaces)
     tab       : which section it sits in ('main', 'side', 'codex', 'inventory')
     screens   : YOUR OWN screenshots (uploaded to media/screens/...). Shown first. 'note' shows on phones.
     gameplay  : optional screen recording (mp4) of your own, plays first
     store     : real store screenshots linked from Google Play / itch.io / TapTap.
                 Shown after your own screens. If a link ever breaks, the room quietly
                 falls back to the film layout, so nothing looks broken.
                 Optional 'note' shows with the full-size screenshots.
                 Each shot has a 'title' and 'note': write one line on what to notice.
                 On phones they show as numbered notes beside the screens.
                 Leave both empty and that screen just shows in the tap stack.
     trailer   : a YouTube video id (the part after watch?v=). Plays in a big player.
     icon      : the app's store icon, used as the thumbnail in maps and section lists
     films     : the motion films (in media/videos, posters in media/posters)
  ----------------------------------------------------------------- */
  quests: [
    { id: 'alien-out', tab: 'main', title: 'Alien Out', short: 'Alien Out', sub: 'Tap N Play · 2025', eyebrow: 'Tap N Play Studios · Nov – Dec 2025', status: 'Completed · MVP shipped', st: 'MVP shipped', kind: 'done', thumb: '07-finding-the-gap',
      brief: 'A calm, strategic puzzle. Drag a UFO to one or more islands. Mismatched aliens drop off, matching ones board, and a full UFO flies away.',
      facts: [['Platform', 'Android'], ['Genre', 'Hybrid-casual puzzle'], ['Role', 'Game designer, concept to MVP']],
      listTitle: 'Objectives', list: [
        'Researched the sort-puzzle market and found an open mechanic gap',
        'Designed the core loop: drag a UFO to islands, sort aliens by colour',
        'Validated the concept with an AI-assisted HTML prototype before full development',
        'Wrote the GDD and Figma specs covering mechanics, animations, edge cases and game states for art, dev and QA',
        'Balanced progression and the difficulty curve using D3 and D7 retention data',
        'Researched competitor ads and high-CPM campaigns, then wrote ad concepts, scripts and briefs',
        'Took it from concept to a released MVP in two months',
      ],
      loot: [{ label: 'Play on Google Play', url: 'https://play.google.com/store/apps/details?id=com.tapnplay.ufoconnect' }],
      gameplay: '',
      screens: [],   // your own screenshots go here first, e.g. { src: 'media/screens/alien-out/1.png', note: 'what this screen shows' }
      icon: 'https://play-lh.googleusercontent.com/6qmGacYRzvBuM0mCCf0mbXO5CSycCsYIUzB8pOAwgtYsFCpgqs4r26CtdzfTgDNFgKSHndNu4OElavp4QbWZ=w240-h480',
      store: { label: 'Google Play', shots: [
        { src: 'https://play-lh.googleusercontent.com/Y2O2HL2oO84X6jm4CpcfYbN30Rf4AngpHQApZQBy4x6bWW4U1RBahVNmWDhdVmydksnACB4Fk6IJJSAlOTEpSA=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/qzUOui3j1tVwHvutw_P9Ag3lXI-uXOFW5VQzlcmSarUe64chU_UuIIeUYrAs9QLnWMNi6LiaG5ItfmLLEgDVZJk=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/XSkCR3xFUd0gauBO2gpmV9Cz1WwjmephcgmyPwfrFUpeVjKqsXKGGhCY6oaMSUvSMv9-1a84DPl9cElra2UUuQ=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/iDaq8Ktxt5bdGW7PHZE-ZxjV--bS64NgKh_V00zb2KywCVJ1O8LI1V_h-op3oJYMY_6iYRtICAyifdzkLLdn5Q=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/jxmqisejLIYc0qu9r7PXWy3cKdQz5H_bt9JbWFOYv5waGvC1tV-BKcpeQY-9DGXB296AWvCbZhFSoX96WEhCpA=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/8R15iYvswfE35QBR4TI85Zx6-XUnXC1L69r5ITWqBHPa1MFb_u9AVwalUJFojjpisj81wYVetWVMcplxiG0rrQ=w1280-h1280', title: '', note: '' },
      ] },
      trailer: { yt: 'N3vPJ7n7foY', label: 'Official trailer' },
      films: [{ id: '25-alien-canvas', label: 'Level design' }, { id: '07-finding-the-gap', label: 'Finding the gap' }, { id: '09-ad-research', label: 'Ad research' }] },

    { id: 'loopy-duck', tab: 'main', title: 'Loopy Duck', short: 'Loopy Duck', sub: 'Tap N Play · 2026', eyebrow: 'Tap N Play Studios · Jan – Feb 2026', status: 'Completed · MVP shipped', st: 'MVP shipped', kind: 'done', thumb: '08-tuning-curve',
      brief: 'A one-tap puzzle. Send colourful groups of ducklings into the stream. Mismatched ducklings wait on islands, the right ones fill their basket, and the jam clears.',
      facts: [['Platform', 'Android'], ['Genre', 'Hybrid-casual puzzle'], ['Role', 'Game designer, owned end to end']],
      listTitle: 'Objectives', list: [
        'Owned the game design end to end, from core loop idea to shipped MVP',
        'Designed the sort-and-match loop and the island holding mechanic',
        'Benchmarked the core loop against hybrid-casual hits for engagement depth and fun',
        'Wrote the GDD and Figma specs for every state, animation and edge case',
        'Tuned the difficulty curve and progression using D3 and D7 retention data',
        'Researched competitor ads and high-CPM campaigns, then wrote ad concepts, scripts and briefs',
      ],
      loot: [{ label: 'Play on Google Play', url: 'https://play.google.com/store/apps/details?id=com.tapnplay.loopyduck' }],
      gameplay: '',
      screens: [],   // your own screenshots go here first, e.g. { src: 'media/screens/loopy-duck/1.png', note: 'what this screen shows' }
      icon: 'https://play-lh.googleusercontent.com/La7M3hhPtyxNx0NBC00c2VquSLyPWWjtuZ5eChip7k-gwtPlfSDTtSE8mgN4F-700DwR57Ec8_rv5OLLNkF3=w240-h480',
      store: { label: 'Google Play', shots: [
        { src: 'https://play-lh.googleusercontent.com/wcsT2Ek9kujZ5fjlhZOVQLXmXU_JMwtxEdW45bukwcgzaC_zMXCsbUWtdENZUG460Qxk3k4dRiYOrB-cx6sKXA=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/fpBAZviUDrhESM3Rwo7t2emlqzBjJlEjaVYLv0ZajAIRWVXvN-C9vd417BH6ZFE83UMxf_jvkDHdyq2e1xKw=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/0Vix48F5nUrPUGrP5SmVon01Fa8aFrGn9lEFYeAXDoOnJNaBUTg4uLLAclayiGIMxUZVf4t3s64WecWYMtqBww=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/JSfqvkWJ_nY295EHcmqTfmbdVNUHrHQh2KOcHGvpl1agGvBv8mGpiwFnroeuoAjJgOS-PFsQdajsLRr-DG6tQg=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/9XIUcq8PyHIo6JYeEV148ZVPNPoFLAtS39GeJS2k0wAKZzMjmnSX576Sbh8LCIEGZmJswiqM_X1v2I0nSgYt=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/47L-VPBSE1UGoH9iKUvwGP0zKxpEBcb1pBMy0p1-H1WEyQlbXdpdAL87B53jSTOAFGbNEautDtYNh5X9QB5PLg=w1280-h1280', title: '', note: '' },
      ] },
      trailer: { yt: 'RjxXNye6wGI', label: 'Official trailer' },
      films: [{ id: '24-loopy-canvas', label: 'Level design' }, { id: '08-tuning-curve', label: 'Tuning the curve (illustrative)' }, { id: '09-ad-research', label: 'Ad research' }] },

    { id: 'murder-mystery-2', tab: 'main', title: 'Hidden Escape: Murder Mystery 2', short: 'Murder Mystery 2', sub: 'Vincell · Chapter 7', eyebrow: 'Vincell Studios · Chapter 7', status: 'Completed · shipped', st: 'Shipped', kind: 'done', thumb: '13-mm2',
      brief: 'I designed and built Chapter 7, Killer In Plain Sight, from start to finish: its levels, its puzzles and the flow between them.',
      facts: [['Platform', 'Android'], ['Genre', 'Puzzle-adventure'], ['Role', 'Game, level and puzzle designer'], ['Scope', 'Chapter 7']],
      listTitle: 'Objectives', list: [
        'Designed and implemented all of Chapter 7, Killer In Plain Sight',
        'Designed the chapter’s level mechanisms and balanced their difficulty for a smooth learning curve',
        'Wrote the design doc, level breakdown, sound and animation sheets, tech art doc and puzzle doc',
        'Built interactive flows in Figma so dev could build without back-and-forth',
        'Ran internal playtests and iterated on what players actually did',
        'Worked with art, dev and QA from concept to launch',
      ],
      loot: [{ label: 'Hidden Escape Mysteries on Google Play', url: 'https://play.google.com/store/apps/details?id=com.vincellstudios.hiddenescapelosttemple' }],
      gameplay: '', screens: [],
      icon: 'https://play-lh.googleusercontent.com/z77D17Q2XQs-bqEbHkTlbqwBzQVVBQjZp4t1yeKk9Eywkm9jhroy7o-NNxFGCSDPsF1oyuXE1TIdfgcXIviV=w240-h480',
      store: { label: 'Hidden Escape app', note: 'These store screenshots cover the whole Hidden Escape app, not only Murder Mystery 2.', shots: [
        { src: 'https://play-lh.googleusercontent.com/4Iwq-HBT0o3kxdenTe27KWSzwfQlUlwTI2NRzbtg9vTwhiDTkCGXbl12B8AAAlMy993EaAiU5ocJIzqmeL3-4Q=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/sfcxeCBMfiTLeh-QSPO_VfqYBfmYuCAn-yV7YHH4hYSUZ2gC4_EbWrg1wHqXgD_4UXHjO04-4RpBAg842Fkx=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/ui0iVMtNGZNe6ivfWPPz3oFRUQJmchqdPKCcUyDI_TtSxibNQHjGAFUrLbqaWUUX9jUrFSYCRU-9hMwqh5KI4A=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/NJp8xwX79rJrJ2wtP9cF0ajtEm6unSTFAU9ukUPG8VW2zcKUCTG6SP74FnGRPCyB7V8qAIZDuDILLzdf1vwBAg=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/917LFC6yLMDYtRykXNIYULojEi9PvXuPOCaaOaVMT1cSWt4QMJgyxofS7mq2UtB2reHfClKFRVSIKs5HY_kkYsE=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/pphU1eXEE9ebfHlpv6luEPQte3JurUv7MmZgEMoSb0RMwOhzx2ZCoEeJvn87wU3B0i-shdMt1nE1XAHFb2X3=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/SnSgBv3_rwECBNN7a6gCsa_WMsuOjN4C5yOLyraQt7s8y-LGPi6-GqPrdZpMJ_Gqxk-SUA4peejVMrXeOM3C=w1280-h1280', title: '', note: '' },
        { src: 'https://play-lh.googleusercontent.com/xS4jCK29UE8vyWpH3fFbu8HDLrF-XOsj-sP4-AOW8jb30tBQgvzzGyHrxK4G31wDIjjmDwP3JOt5WlZcjU7H=w1280-h1280', title: '', note: '' },
      ] },
      films: [{ id: '13-doc-stack', label: 'What one chapter takes', poster: '13-mm2', t: 4.6 }] },

    { id: 'lost-island', tab: 'main', title: 'Hidden Escape: Lost Island', short: 'Lost Island', sub: 'Vincell · Chapters 4 + 7', eyebrow: 'Vincell Studios · Chapters 4 + 7', status: 'Completed · shipped', st: 'Shipped', kind: 'done', thumb: '13-lost-island',
      brief: 'Scenes across two chapters: the House Exterior in Chapter 4, and the Center Hall and Tomb in Chapter 7.',
      facts: [['Platform', 'Android'], ['Genre', 'Puzzle-adventure'], ['Role', 'Game, level and puzzle designer'], ['Scope', 'Ch.4 Scene 2, Ch.7 Scenes 1 + 2']],
      listTitle: 'Objectives', list: [
        'Designed the House Exterior scene in Chapter 4',
        'Designed the Center Hall and Tomb scenes in Chapter 7',
        'Owned the GDDs for my scenes: puzzle logic, narrative structure, level flow and UX',
        'Designed level mechanisms with a difficulty curve that kept new players moving',
        'Ran playtests and iterated on the findings',
        'Kept flow and theme consistent with art, dev and QA through to launch',
      ],
      loot: [{ label: 'Hidden Escape Mysteries on Google Play', url: 'https://play.google.com/store/apps/details?id=com.vincellstudios.hiddenescapelosttemple' }, { label: 'Lost Island on the App Store', url: 'https://apps.apple.com/us/app/-/id6457256732', alt: true }],
      gameplay: '', screens: [],
      icon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/01/61/cb/0161cbfe-9a6f-8bc8-314a-bc8e30131510/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/512x512bb.jpg',
      store: { label: 'TapTap', shots: [
        { src: 'https://img.tapimg.net/market/images/d4c4147a4407500a16624810fcd1cd28.jpg?imageView2/2/w/1280/h/1280/q/80/format/jpg/interlace/1/ignore-error/1', title: '', note: '' },
      ] },
      films: [{ id: '13-doc-stack', label: 'What one chapter takes', poster: '13-lost-island', t: 6.6 }] },

    { id: 'escapeverse', tab: 'main', title: 'Escapeverse Puzzle Adventure', short: 'Escapeverse', sub: 'Vincell · Chapter 4', eyebrow: 'Vincell Studios · Chapter 4', status: 'Completed · shipped', st: 'Shipped', kind: 'done', thumb: '13-escapeverse',
      brief: 'Chapter 4, The Rare Gem: its interactions, puzzles and level layouts.',
      facts: [['Platform', 'Android'], ['Genre', 'Puzzle-adventure'], ['Role', 'Game and level designer'], ['Scope', 'Chapter 4']],
      listTitle: 'Objectives', list: [
        'Designed and researched the interactions, puzzles and level layouts',
        'Documented puzzle logic, interaction flows and level structure',
        'Led internal playtests, collected structured feedback and iterated',
        'Reviewed builds for design quality, balance and bugs',
        'Worked with artists, developers and QA testers to align visuals, tech and gameplay',
      ],
      loot: []   /* Play link hidden: the listing (com.velocitigames.escapeverse) returns an error. Add it back once confirmed live. */,
      gameplay: '', screens: [],
      films: [{ id: '13-doc-stack', label: 'What one chapter takes', poster: '13-escapeverse', t: 7.6 }] },

    // TODO (Rohit): add your chapters/scenes and a store link for these two
    { id: 'island-mystery', tab: 'main', title: 'Hidden Escape: Island Mystery', short: 'Island Mystery', sub: 'Vincell Studios', eyebrow: 'Vincell Studios', status: 'Completed · shipped', st: 'Shipped', kind: 'done', thumb: '13-doc-stack',
      brief: 'A published Hidden Escape puzzle-adventure I designed levels and puzzles for at Vincell Studios.',
      facts: [['Platform', 'Android'], ['Genre', 'Puzzle-adventure'], ['Role', 'Game and level designer']],
      listTitle: 'Objectives', list: [
        'Designed and tested level mechanisms and puzzles',
        'Wrote the GDD sections for puzzle logic, level flow and UX',
        'Built interactive design flows and UX prototypes in Figma',
        'Ran playtests and iterated on the findings',
      ],
      loot: [], gameplay: '', screens: [],
      films: [{ id: '13-doc-stack', label: 'What one chapter takes' }] },

    { id: 'seek-and-puzzles', tab: 'main', title: 'Hidden Escape: Seek & Puzzles', short: 'Seek & Puzzles', sub: 'Vincell Studios', eyebrow: 'Vincell Studios', status: 'Completed', st: 'Completed', kind: 'done', thumb: '13-doc-stack',
      brief: 'A Hidden Escape seek-and-puzzle title I designed for at Vincell Studios.',
      facts: [['Platform', 'Android'], ['Genre', 'Seek and puzzle'], ['Role', 'Game and level designer']],
      listTitle: 'Objectives', list: [
        'Designed puzzle mechanics and level layouts',
        'Documented puzzle logic and level flow for art, dev and QA',
        'Playtested and balanced the difficulty curve',
      ],
      loot: [{ label: 'Seek & Puzzles on TapTap', url: 'https://www.taptap.io/app/33686035' }], gameplay: '', screens: [],
      store: { label: 'TapTap', shots: [
        { src: 'https://img.tapimg.net/market/images/bfc1d79b0ca55bf5d00fc0d02bbe471a.png?imageView2/2/w/1280/h/1280/q/80/format/jpg/interlace/1/ignore-error/1', title: '', note: '' },
      ] },
      films: [{ id: '13-doc-stack', label: 'What one chapter takes' }] },

    { id: 'classified', tab: 'main', title: 'Classified', short: 'Classified', sub: 'Surag Studios · 2025', eyebrow: 'Surag Studios · Apr – Sep 2025 · part-time', status: 'Classified', st: 'Classified', kind: 'classified', thumb: 'classified',
      brief: 'A narrative-driven mobile game inspired by real events. The same kind of work as my Vincell chapters, at a smaller scope.',
      facts: [['Studio', 'Surag Studios'], ['Role', 'Sole game designer, under the lead designer'], ['Dates', 'Apr – Sep 2025']],
      listTitle: 'Objectives', list: [
        'Owned the design documentation, interaction systems and gameplay flows from scratch',
        'Designed puzzles and interactive scenes built around emotional storytelling',
        'Made every system serve the story instead of interrupting it',
        'Delivered production-ready docs and flows on deadline in a remote team',
      ],
      loot: [], gameplay: '', screens: [], films: [] },

    { id: 'echo-shooter', tab: 'side', title: 'Echo Shooter 2D', short: 'Echo Shooter 2D', sub: 'Solo · college module', eyebrow: 'Solo · college prototyping module', status: 'v1 shipped · v2 in design', st: 'v2 in design', kind: 'done', thumb: '14-echo-shooter',
      brief: 'Every sound is a signal. You are a lone fighter in the dark, hunted by enemies that track noise across escalating waves.',
      facts: [['Platform', 'PC'], ['Engine', 'Unity 2D'], ['Genre', 'Wave-based arcade shooter'], ['Role', 'Solo developer']],
      listTitle: 'Objectives', list: ['Built the whole game solo in Unity 2D for a prototyping module', 'Designed sound-based enemy AI: moving and shooting draw enemies in', 'Two enemy types with different behaviours', 'Hold Shift to move silently, at a cost', '50+ escalating waves, with a choice of two skills after each one', 'Now redesigning it as v2: waves out, breakable chambers in'],
      loot: [{ label: 'Play on itch.io', url: 'https://scary-ninja.itch.io/echo-shooter-2d' }],
      gameplay: '', screens: [], icon: 'https://img.itch.zone/aW1nLzIxODY0Njc4LnBuZw==/original/ifDwzB.png',
      store: { label: 'itch.io', shots: [
        { src: 'https://img.itch.zone/aW1hZ2UvMzY3NDcwNi8yMTg2NDk0Mi5wbmc=/original/0qxP5F.png', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1hZ2UvMzY3NDcwNi8yMTg3MjI5Mi5wbmc=/original/YA9Tsk.png', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1nLzIxODY0Njc4LnBuZw==/original/ifDwzB.png', title: '', note: '' },
      ] },
      films: [{ id: '14-echo-shooter', label: 'v1 and the v2 redesign' }] },

    // TODO (Rohit): replace the objectives with what YOU did on the team
    { id: 'kitts-hog', tab: 'side', title: 'Kitt’s Hog: The Nightmare of Life', short: 'Kitt’s Hog', sub: 'IGDC 2019 · 7-day team game', eyebrow: 'College team · IGDC 2019 · 1st semester', status: 'Completed · released', st: 'Released', kind: 'done', thumb: '16-kitts-hog',
      brief: 'Subject 45, a lab bat from an experiment gone wrong, escapes the laboratory and tries to find its way home. Our first-semester team built it in 7 days for IGDC 2019.',
      facts: [['Event', 'IGDC 2019'], ['Made in', '7 days'], ['Platform', 'Android'], ['Engine', 'Unity'], ['Style', '2D, black and white'], ['Team', 'Bounty Hunters']],
      listTitle: 'Objectives', list: [
        'Designed the game as part of a first-semester college team',
        'Shaped the escape story: Subject 45 flees the lab to find home',
        'Scoped it to ship in 7 days for IGDC 2019',
        'Released it free for Android on itch.io',
      ],
      loot: [{ label: 'Get it on itch.io', url: 'https://bounty-hunters.itch.io/kitts-hog-the-nightmare-of-life' }],
      gameplay: '', screens: [], icon: 'https://img.itch.zone/aW1nLzI1MzU0NDEucG5n/original/iHAdW%2F.png',
      store: { label: 'itch.io', shots: [
        { src: 'https://img.itch.zone/aW1hZ2UvNDkwNTMxLzI1MzU0MzIuanBlZw==/original/imduE%2B.jpeg', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1hZ2UvNDkwNTMxLzI1MzU0MzEuanBlZw==/original/rUkryx.jpeg', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1hZ2UvNDkwNTMxLzI1MzU0MzQuanBlZw==/original/DJECei.jpeg', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1hZ2UvNDkwNTMxLzI1MzU0MzUuanBlZw==/original/eC%2FGJB.jpeg', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1hZ2UvNDkwNTMxLzI1MzU0MzMuanBlZw==/original/9GSLDP.jpeg', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1hZ2UvNDkwNTMxLzI1MzU0MzguanBlZw==/original/Wpepd1.jpeg', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1hZ2UvNDkwNTMxLzI1MzU0MzcuanBlZw==/original/XRKGeR.jpeg', title: '', note: '' },
        { src: 'https://img.itch.zone/aW1hZ2UvNDkwNTMxLzI1MzU0MzYuanBlZw==/original/mL7tbM.jpeg', title: '', note: '' },
      ] },
      trailer: { yt: 'y_UVO3euK7U', label: 'Gameplay video' },
      films: [{ id: '16-kitts-hog', label: 'Teaser' }] },

    // TODO (Rohit): replace the objectives with what YOU did on the team
    { id: 'ghost-buster', tab: 'side', title: 'Ghost Buster', short: 'Ghost Buster', sub: 'College team project', eyebrow: 'College team project', status: 'Completed · released', st: 'Released', kind: 'done', thumb: 'ghost',
      brief: 'Akins heads back to his family’s old mansion near Bridgetown forest after years away, and the road there gets creepy. A college group project.',
      facts: [['Platform', 'PC download'], ['Genre', 'Action'], ['Role', 'Game designer'], ['Team', 'College group']],
      listTitle: 'Objectives', list: [
        'Designed the game with a college team',
        'Built the story set-up: Akins returning to the family mansion',
        'Released it on itch.io',
      ],
      loot: [{ label: 'Get it on itch.io', url: 'https://hp083625.itch.io/ghost-buster' }], gameplay: '', screens: [], icon: 'https://img.itch.zone/aW1nLzQ1MzE0NTQucG5n/original/w%2Fq92%2F.png',
      store: { label: 'itch.io cover', shots: [
        { src: 'https://img.itch.zone/aW1nLzQ1MzE0NTQucG5n/original/w%2Fq92%2F.png', title: '', note: '' },
      ] },
      trailer: { yt: 'TyqRwQAGxKA', label: 'Gameplay video' },
      films: [] },

    { id: 'match-factory', tab: 'codex', title: 'Match Factory', short: 'Match Factory', sub: 'Peak Games · teardown', eyebrow: 'Deconstruction · Peak Games', status: 'Economy teardown', st: 'Teardown', kind: 'tool', thumb: '18-match-factory',
      brief: 'A match-3D game that grew to around $400K a day. I took apart its loop and its economy: what you earn, what you spend, and what keeps you playing after a loss.',
      facts: [['Developer', 'Peak Games'], ['Genre', 'Match-3D puzzle'], ['Covers', 'Core loop, economy, monetisation']],
      listTitle: 'What’s inside', list: ['Core loop: play, win or lose, earn stars and keys, progress events and the Factory Pass', 'Six economy elements: coins, keys, stars, boosters, power-ups and hearts', 'Hearts: five max, one back every 30 minutes, teammates can send up to 10, a full refill costs 900 coins', 'Boosters are picked before a level, power-ups are used during it', 'Store packs and bundles from INR 199 to INR 9,900'],
      loot: [{ label: 'Read the deck', url: 'https://docs.google.com/presentation/d/158zDK9wbPDaWwmgYP5X8wrVGK1iwl8pxHZ7dTIWoJ7Y/edit?usp=sharing' }],
      gameplay: '', screens: [], films: [{ id: '18-match-factory', label: 'The economy, animated' }] },

    { id: 'boom-slingers', tab: 'codex', title: 'Boom Slingers', short: 'Boom Slingers', sub: 'Boom Corp · teardown', eyebrow: 'Deconstruction · Boom Corp', status: 'Systems teardown', st: 'Teardown', kind: 'tool', thumb: '19-boom-slingers',
      brief: 'A turn-based multiplayer shooter by Boom Corp, published by Supersonic. I broke down its card-and-mana combat and the Boom Box progression loop.',
      facts: [['Developer', 'Boom Corp (Finland)'], ['Publisher', 'Supersonic Studios'], ['Covers', 'Combat, core loop, economy']],
      listTitle: 'What’s inside', list: ['Combat: pick cards each turn and spend mana, which grows every round', 'Win a match, get a Boom Box: a timed chest, four slots at most', 'With every slot full, wins stop paying out boxes', 'Gems open any box instantly', 'Card upgrades are the only source of XP. Player level sets max health, from 10 HP at level 1 to 80 HP at level 8', 'Trophies climb ten galaxies, and you can’t drop back past one'],
      loot: [{ label: 'Read the deck', url: 'https://docs.google.com/presentation/d/1p2IjppwPzL28WoqqeswFOJWoqH3W3cev6nggF_UgGj8/edit?usp=sharing' }],
      gameplay: '', screens: [], films: [{ id: '19-boom-slingers', label: 'The Boom Box loop' }] },

    { id: 'pacman-non-gamers', tab: 'codex', title: 'Pac-Man for Non-Gamers', short: 'Pac-Man for Non-Gamers', sub: 'Re-design', eyebrow: 'Game re-design', status: 'Re-design', st: 'Re-design', kind: 'tool', thumb: '20-pacman-non-gamers',
      brief: 'How would a classic maze game work for someone who has never held a controller? A re-design aimed at adults new to games.',
      facts: [['Original', 'Pac-Man'], ['Player', 'Adults new to games'], ['Covers', 'Controls, readability, motivation']],
      listTitle: 'What’s inside', list: ['The barriers: unfamiliar controls, forgotten buttons, feeling lost', 'Swipe controls, familiar from Instagram and YouTube', 'A calm board with colour-coded auras: red for danger, gold for food stores, green for power-ups', 'Step-by-step tutorials, bigger always-visible controls and slower movement early on', 'A reason to play: each level, a family member asks for a dish, and its ingredients glow on the map'],
      loot: [{ label: 'Read the deck', url: 'https://docs.google.com/presentation/d/1J11_2sFrJWC1iTzAP-Ei1vCLhYMnagAZJSAIvYhLkjY/edit?usp=sharing' }],
      gameplay: '', screens: [], films: [{ id: '20-pacman-non-gamers', label: 'The re-design' }] },

    { id: 'bad-game-design', tab: 'codex', title: 'Bad Game Design', short: 'Bad Game Design', sub: 'Re-design exercise', eyebrow: 'Re-design exercise', status: 'Re-design', st: 'Re-design', kind: 'tool', thumb: '21-bad-game-design',
      brief: 'What makes a precision platformer hard but fair? I studied Super Meat Boy, then designed a platformer that breaks those rules on purpose.',
      facts: [['Reference', 'Super Meat Boy'], ['Goal', 'Frustrating by design'], ['Covers', 'Difficulty, fairness, failure']],
      listTitle: 'What’s inside', list: ['Why the reference works: timing, precision and a fast learning pace', 'Controls randomise every time you die', 'A timer runs in the main menu, and missing the deadline resets the whole game', 'Checkpoints only every 10 levels'],
      loot: [{ label: 'Read the deck', url: 'https://docs.google.com/presentation/d/1Wgk98z7llBumB4KnxjqTkDD7muKMsHgZrrNNU4Yu1kA/edit?usp=sharing' }],
      gameplay: '', screens: [], films: [{ id: '21-bad-game-design', label: 'The rules' }] },

    { id: 'ai-pipeline', tab: 'inventory', title: 'AI Prototyping Pipeline', short: 'AI Pipeline', sub: 'Built at Tap N Play', eyebrow: 'Tool · built at Tap N Play', status: 'Equipped', st: 'Equipped', kind: 'tool', thumb: '03-ai-pipeline',
      brief: 'A one-page spec format (core rules, mechanics, win and fail states) that feeds straight into an AI pipeline and comes out as a playable prototype. Idea to game feel in hours, not days.',
      facts: [['Type', 'Workflow tool'], ['Built with', 'Figma, Claude, Gemini, HTML'], ['Used for', 'Concept validation']],
      listTitle: 'How it works', steps: true, list: ['Write the one-page spec: core rules, mechanics, win and fail states', 'Mock it up in Figma: layout, game elements and interaction logic', 'Feed spec and mockup to the AI pipeline to generate a browser prototype', 'The team plays it the same day and feels the mechanic', 'Decide go or no-go before development resources are committed'],
      loot: [], gameplay: '', screens: [], films: [{ id: '03-ai-pipeline', label: 'The pipeline' }] },

    { id: 'game-tracker', tab: 'inventory', title: 'Daily Game Tracker', short: 'Daily Game Tracker', sub: 'App Store + Google Play', eyebrow: 'Tool · AI-powered, automated', status: 'Equipped', st: 'Equipped', kind: 'tool', thumb: '04-game-tracker',
      brief: 'Watches both stores for new releases and ranking moves, so I can spot hybrid-casual trends early. I used it to inform concept pitches at Tap N Play.',
      facts: [['Type', 'Research automation'], ['Sources', 'App Store, Google Play'], ['Output', 'Google Sheets, every morning']],
      listTitle: 'How it works', steps: true, list: ['Monitors the App Store and Google Play for new and trending hybrid-casual puzzle games', 'Tracks ranking movement, filtered by mechanic and publisher', 'Removes duplicates, so each game appears once', 'Delivers an organised report to Google Sheets every morning'],
      loot: [], gameplay: '', screens: [], films: [{ id: '04-game-tracker', label: 'The tracker' }] },

    { id: 'voice-generator', tab: 'inventory', title: 'Custom Text-to-Voice Generator', short: 'Voice Generator', sub: 'Google AI Studio', eyebrow: 'Tool · personal AI project', status: 'Equipped', st: 'Equipped', kind: 'tool', thumb: 'voice',
      brief: 'A personal voice model built in Google AI Studio to replace a paid text-to-speech service for my video content.',
      facts: [['Type', 'AI voice model'], ['Built with', 'Google AI Studio'], ['Used for', 'Video voice-overs']],
      listTitle: 'How it works', steps: true, list: ['Researched voice models and what a paid TTS service was really doing', 'Set up a custom voice model in Google AI Studio', 'Iterated on the output until it could replace the paid service', 'Now voices my video content for free'],
      loot: [], gameplay: '', screens: [], films: [] },
  ],

  /* ---------- ART ROOM ----------
     3D pieces: turntable videos (mp4) in media/art/3d/
     2D pieces: images in media/art/2d/
     Sketches : photos in media/art/sketch/
     Each piece: { src: '...', title: '...', tool: '...', time: '...', year: '...', note: '...' }
  ------------------------------- */
  art: [
    { id: 'art-3d', medium: '3d', title: 'Blender 3D', sub: 'Turntables and models', tools: ['Blender'], pieces: [
      // { src: 'media/art/3d/piece-1.mp4', title: 'Piece title', tool: 'Blender · Cycles', time: '~6 hours', year: '2024', note: 'What it is and why you made it.' },
    ] },
    { id: 'art-2d', medium: '2d', title: 'Digital 2D', sub: 'Paintings and drawings', tools: ['Photoshop'], pieces: [
      // { src: 'media/art/2d/piece-1.png', title: 'Piece title', tool: 'Photoshop', time: '', year: '2023', note: '' },
    ] },
    { id: 'art-sketch', medium: 'sketch', title: 'Sketchbook', sub: 'Pencil on paper', tools: ['Pencil', 'Ink'], pieces: [
      // { src: 'media/art/sketch/1.jpg', title: 'Sketch title', note: '' },
    ] },
  ],
};
