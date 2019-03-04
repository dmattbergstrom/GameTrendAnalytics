// Model:n vi använder för att lagra, hämta och hantera vår data (som inte hämtas från API:n)

const Model = function () {

  let thisWeeksGameData = [];
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
  let thisWeeksGameData = [
     {
      _id: 1,
      name: "Apex Legends"
      data: [
        {
          popularity: 123123,
          viewers: 123,
          channels: 123,
          updated: new Date().toString(),
        },
      ]
      logo: "",
    }
  ];
  // -----------------------

  this.getAllGames = function() {
    return thisWeeksGameData;
  };

  this.getSpecificGame = (id) => {
    thisWeeksGameData.forEach(game => {
      if(game._id == id)
        return game;
    });
    return {};
  };

  this.getWatchlist = () => {
    // TODO: To be filled...
  };

  this.addToWatchlist = () => {
    // TODO: To be filled...
  };
};

export const modelInstance = new Model();
