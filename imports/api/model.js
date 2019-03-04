// Model:n vi använder för att lagra, hämta och hantera vår data (som inte hämtas från API:n)

const Model = function () {
  let AllGames = [];
  var test = "hej";

  this.getAllGames = function() {
      console.log(test);
  };

  this.getSpecificGame = () => {
    console.log("Empty");
  };

  this.removeSpecificGame = (id) => {
    console.log("Empty");
  };

  this.addNewGame = (id) => {
    console.log("Empty");
  };
};

export const modelInstance = new Model();
