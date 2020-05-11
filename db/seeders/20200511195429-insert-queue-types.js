'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('QueueTypes', [
      {
        queueId: 0,
        map: "Custom",
        description: "Custom Game",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 72,
        map: "Howling Abyss",
        description: "1v1 Snowdown Showdown",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 73,
        map: "Howling Abyss",
        description: "2v2 Snowdown Showdown",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 75,
        map: "Summoner's Rift",
        description: "6v6 Hexakill",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 76,
        map: "Summoner's Rift",
        description: "Ultra Rapid Fire",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 78,
        map: "Howling Abyss",
        description: "One For All: Mirror Mode",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 83,
        map: "Summoner's Rift",
        description: "Co-op vs AI Ultra Rapid Fire",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 98,
        map: "Twisted Treeline",
        description: "6v6 Hexakill",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 100,
        map: "Butcher's Bridge",
        description: "5v5 ARAM",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 310,
        map: "Summoner's Rift",
        description: "Nemesis",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 313,
        map: "Summoner's Rift",
        description: "Black Market Brawlers",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 317,
        map: "Crystal Scar",
        description: "Definitely Not Dominion",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 325,
        map: "Summoner's Rift",
        description: "All Random",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 400,
        map: "Summoner's Rift",
        description: "5v5 Draft Pick",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 420,
        map: "Summoner's Rift",
        description: "5v5 Ranked Solo",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 430,
        map: "Summoner's Rift",
        description: "5v5 Blind Pick",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 440,
        map: "Summoner's Rift",
        description: "5v5 Ranked Flex",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 450,
        map: "Howling Abyss",
        description: "5v5 ARAM",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 600,
        map: "Summoner's Rift",
        description: "Blood Hunt Assassin",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 610,
        map: "Cosmic Ruins",
        description: "Dark Star: Singularity",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 700,
        map: "Summoner's Rift",
        description: "Clash",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 820,
        map: "Twisted Treeline",
        description: "Co-op vs. AI Beginner Bot",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 830,
        map: "Summoner's Rift",
        description: "Co-op vs. AI Intro Bot",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 840,
        map: "Summoner's Rift",
        description: "Co-op vs. AI Beginner Bot",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 850,
        map: "Summoner's Rift",
        description: "Co-op vs. AI Intermediate Bot",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 900,
        map: "Summoner's Rift",
        description: "URF",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 910,
        map: "Crystal Scar",
        description: "Ascension",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 920,
        map: "Howling Abyss",
        description: "Legend of the Poro King",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 940,
        map: "Summoner's Rift",
        description: "Nexus Siege",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 950,
        map: "Summoner's Rift",
        description: "Doom Bots Voting",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 960,
        map: "Summoner's Rift",
        description: "Doom Bots Standard",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 980,
        map: "Valoran City Park",
        description: "Star Guardian Invasion: Normal",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 990,
        map: "Valoran City Park",
        description: "Star Guardian Invasion: Onslaught",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1000,
        map: "Overcharge",
        description: "PROJECT: Hunters",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1010,
        map: "Summoner's Rift",
        description: "Snow ARURF",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1020,
        map: "Summoner's Rift",
        description: "One for All",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1030,
        map: "Crash Site",
        description: "Odyssey Extraction: Intro",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1040,
        map: "Crash Site",
        description: "Odyssey Extraction: Cadet",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1050,
        map: "Crash Site",
        description: "Odyssey Extraction: Crewmember",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1060,
        map: "Crash Site",
        description: "Odyssey Extraction: Captain",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1070,
        map: "Crash Site",
        description: "Odyssey Extraction: Onslaught",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1090,
        map: "Convergence",
        description: "Teamfight Tactics",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1100,
        map: "Convergence",
        description: "Ranked Teamfight Tactics",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 1110,
        map: "Convergence",
        description: "Teamfight Tactics Tutorial",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 2000,
        map: "Summoner's Rift",
        description: "Tutorial 1",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 2010,
        map: "Summoner's Rift",
        description: "Tutorial 2",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        queueId: 2020,
        map: "Summoner's Rift",
        description: "Tutorial 3",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('QueueTypes', null, {});
  }
};
