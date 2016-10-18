const View = require("./ttt-view.js")// require appropriate file
const Game = require("../gameLogic/game.js")// require appropriate file

$( () => {
  let $view = $("#ttt")
  new View(new Game, $view)
});
