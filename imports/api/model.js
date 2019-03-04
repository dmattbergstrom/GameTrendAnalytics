// Model:n vi använder för att lagra, hämta och hantera vår data (som inte hämtas från API:n)

const Model = function () {

  let thisWeeksGameData = []; 
  
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

  this.removeFromWatchlist = (id) => {
    console.log("Empty");
  };

  this.addToWatchlist = (id) => {
    console.log("Empty");
  };
};

export const modelInstance = new Model();
