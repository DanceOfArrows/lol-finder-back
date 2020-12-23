'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('QueueTypes', [
      {
        queueId: 0,
        map: "Custom games",
        description: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 2,
        map: "Summoner's Rift",
        description: "5v5 Blind Pick games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 4,
        map: "Summoner's Rift",
        description: "5v5 Ranked Solo games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 6,
        map: "Summoner's Rift",
        description: "5v5 Ranked Premade games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 7,
        map: "Summoner's Rift",
        description: "Co-op vs AI games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 8,
        map: "Twisted Treeline",
        description: "3v3 Normal games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 9,
        map: "Twisted Treeline",
        description: "3v3 Ranked Flex games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 14,
        map: "Summoner's Rift",
        description: "5v5 Draft Pick games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 16,
        map: "Crystal Scar",
        description: "5v5 Dominion Blind Pick games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 17,
        map: "Crystal Scar",
        description: "5v5 Dominion Draft Pick games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 25,
        map: "Crystal Scar",
        description: "Dominion Co-op vs AI games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 31,
        map: "Summoner's Rift",
        description: "Co-op vs AI Intro Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 32,
        map: "Summoner's Rift",
        description: "Co-op vs AI Beginner Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 33,
        map: "Summoner's Rift",
        description: "Co-op vs AI Intermediate Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 41,
        map: "Twisted Treeline",
        description: "3v3 Ranked Team games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 42,
        map: "Summoner's Rift",
        description: "5v5 Ranked Team games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 52,
        map: "Twisted Treeline",
        description: "Co-op vs AI games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 61,
        map: "Summoner's Rift",
        description: "5v5 Team Builder games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 65,
        map: "Howling Abyss",
        description: "5v5 ARAM games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 67,
        map: "Howling Abyss",
        description: "ARAM Co-op vs AI games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 70,
        map: "Summoner's Rift",
        description: "One for All games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 72,
        map: "Howling Abyss",
        description: "1v1 Snowdown Showdown games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 73,
        map: "Howling Abyss",
        description: "2v2 Snowdown Showdown games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 75,
        map: "Summoner's Rift",
        description: "6v6 Hexakill games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 76,
        map: "Summoner's Rift",
        description: "Ultra Rapid Fire games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 78,
        map: "Howling Abyss",
        description: "One For All: Mirror Mode games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 83,
        map: "Summoner's Rift",
        description: "Co-op vs AI Ultra Rapid Fire games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 91,
        map: "Summoner's Rift",
        description: "Doom Bots Rank 1 games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 92,
        map: "Summoner's Rift",
        description: "Doom Bots Rank 2 games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 93,
        map: "Summoner's Rift",
        description: "Doom Bots Rank 5 games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 96,
        map: "Crystal Scar",
        description: "Ascension games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 98,
        map: "Twisted Treeline",
        description: "6v6 Hexakill games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 100,
        map: "Butcher's Bridge",
        description: "5v5 ARAM games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 300,
        map: "Howling Abyss",
        description: "Legend of the Poro King games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 310,
        map: "Summoner's Rift",
        description: "Nemesis games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 313,
        map: "Summoner's Rift",
        description: "Black Market Brawlers games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 315,
        map: "Summoner's Rift",
        description: "Nexus Siege games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 317,
        map: "Crystal Scar",
        description: "Definitely Not Dominion games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 318,
        map: "Summoner's Rift",
        description: "ARURF games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 325,
        map: "Summoner's Rift",
        description: "All Random games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 400,
        map: "Summoner's Rift",
        description: "5v5 Draft Pick games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 410,
        map: "Summoner's Rift",
        description: "5v5 Ranked Dynamic games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 420,
        map: "Summoner's Rift",
        description: "5v5 Ranked Solo games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 430,
        map: "Summoner's Rift",
        description: "5v5 Blind Pick games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 440,
        map: "Summoner's Rift",
        description: "5v5 Ranked Flex games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 450,
        map: "Howling Abyss",
        description: "5v5 ARAM games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 460,
        map: "Twisted Treeline",
        description: "3v3 Blind Pick games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 470,
        map: "Twisted Treeline",
        description: "3v3 Ranked Flex games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 600,
        map: "Summoner's Rift",
        description: "Blood Hunt Assassin games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 610,
        map: "Cosmic Ruins",
        description: "Dark Star: Singularity games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 700,
        map: "Summoner's Rift",
        description: "Clash games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 800,
        map: "Twisted Treeline",
        description: "Co-op vs. AI Intermediate Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 810,
        map: "Twisted Treeline",
        description: "Co-op vs. AI Intro Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 820,
        map: "Twisted Treeline",
        description: "Co-op vs. AI Beginner Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 830,
        map: "Summoner's Rift",
        description: "Co-op vs. AI Intro Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 840,
        map: "Summoner's Rift",
        description: "Co-op vs. AI Beginner Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 850,
        map: "Summoner's Rift",
        description: "Co-op vs. AI Intermediate Bot games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 900,
        map: "Summoner's Rift",
        description: "URF games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 910,
        map: "Crystal Scar",
        description: "Ascension games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 920,
        map: "Howling Abyss",
        description: "Legend of the Poro King games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 940,
        map: "Summoner's Rift",
        description: "Nexus Siege games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 950,
        map: "Summoner's Rift",
        description: "Doom Bots Voting games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 960,
        map: "Summoner's Rift",
        description: "Doom Bots Standard games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 980,
        map: "Valoran City Park",
        description: "Star Guardian Invasion: Normal games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 990,
        map: "Valoran City Park",
        description: "Star Guardian Invasion: Onslaught games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1000,
        map: "Overcharge",
        description: "PROJECT: Hunters games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1010,
        map: "Summoner's Rift",
        description: "Snow ARURF games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1020,
        map: "Summoner's Rift",
        description: "One for All games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1030,
        map: "Crash Site",
        description: "Odyssey Extraction: Intro games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1040,
        map: "Crash Site",
        description: "Odyssey Extraction: Cadet games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1050,
        map: "Crash Site",
        description: "Odyssey Extraction: Crewmember games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1060,
        map: "Crash Site",
        description: "Odyssey Extraction: Captain games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1070,
        map: "Crash Site",
        description: "Odyssey Extraction: Onslaught games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1090,
        map: "Convergence",
        description: "Teamfight Tactics games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1100,
        map: "Convergence",
        description: "Ranked Teamfight Tactics games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1110,
        map: "Convergence",
        description: "Teamfight Tactics Tutorial games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1111,
        map: "Convergence",
        description: "Teamfight Tactics test games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1200,
        map: "Nexus Blitz",
        description: "Nexus Blitz games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 1300,
        map: "Nexus Blitz",
        description: "Nexus Blitz games",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 2000,
        map: "Summoner's Rift",
        description: "Tutorial 1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 2010,
        map: "Summoner's Rift",
        description: "Tutorial 2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        queueId: 2020,
        map: "Summoner's Rift",
        description: "Tutorial 3",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('QueueTypes', null, {});
  }
};
