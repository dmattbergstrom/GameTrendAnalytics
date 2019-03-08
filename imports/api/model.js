// Model:n vi använder för att lagra, hämta och hantera vår data (som inte hämtas från API:n)

const Model = function () {

  // let thisWeeksGameData = [];
  // NOTE: Skeleton for how each game will be represented.
  // thisWeeksGameData = [
  //    {
  //     _id:
  //     name:
  //     data: [
  //       {
  //         popularity:
  //         viewers:
  //         channels:
  //         updated:
  //       },
  //       ...
  //       ...
  //       ...
  //       {
  //         popularity:
  //         viewers:
  //         channels:
  //         updated:
  //       }
  //     ]
  //     logo:
  //   }
  // ];

  // NOTE: For testing
  let watchlistItems = [1,2];  // An array that contains the _id's of the games in a users watchlist
  console.log(watchlistItems); // NOTE: For testing

  let thisWeeksGameData = [
     {
      _id: 1,
      name: "Apex Legends",
      data: [  // This will always include 7 days data (of last week) 
        {  // Day 1
          popularity: 10,
          viewers: 123,
          channels: 123,
          dow: "Mon",   // dow: Represents "Day of week", as of which dow the data was collected
          updated: new Date().toString(),
        },
        {  // Day 2
          popularity: 20,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 3
          popularity: 30,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 4
          popularity: 40,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 5
          popularity: 50,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 6
          popularity: 60,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 7
          popularity: 70,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
      ],
      logo: "",
    },
    {
      _id: 2,
      name: "Fortnite",
      data: [
        {  // Day 1
          popularity: 0,
          viewers: 123,
          channels: 123,
          dow: "Mon",   // dow: Represents "Day of week", as of which dow the data was collected
          updated: new Date().toString(),
        },
        {  // Day 2
          popularity: 40,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 3
          popularity: 470,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 4
          popularity: 900,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 5
          popularity: 100,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 6
          popularity: 600,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
        {  // Day 7
          popularity: 1000,
          viewers: 123,
          channels: 123,
          dow: "Mon",
          updated: new Date().toString(),
        },
      ],
      logo: "",
    },
  ];
  // -----------------------

  this.getAllGames = function() {
    return thisWeeksGameData;
  };

  this.getSpecificGame = (id) => {
    let to_return = {}
    thisWeeksGameData.forEach(game => {        
      if(game._id == id)        
        to_return = game;
    });
    return to_return;
  };

  this.getWatchlist = () => {
    return watchlistItems;
  };

  this.addToWatchlist = (id) => {
    // TODO: To be filled... [Push to watchlist-array declared on row 33]
    watchlistItems.push(id);
    console.log(watchlistItems); // NOTE: For testing
  };

  this.removeFromWatchlist = (id) => {
    // TODO: To be filled... [Remove from watchlist-array declared on row 33]
    var index = watchlistItems.indexOf(id);
    if (index > -1) {
      watchlistItems.splice(index, 1);
    }
    console.log(watchlistItems); // NOTE: For testing
    
  };
};

export const modelInstance = new Model();
