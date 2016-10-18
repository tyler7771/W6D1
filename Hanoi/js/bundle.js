/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(2)
	const HanoiView = __webpack_require__(3)// require appropriate file
	
	$( () => {
	  const rootEl = $('#hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }
	
	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];
	
	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }
	
	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }
	
	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }
	
	  print() {
	      console.log(JSON.stringify(this.towers));
	  }
	
	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }
	
	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }
	
	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class HanoiView {
	  constructor(game, view) {
	    this.game = game;
	    this.view = view
	    this.setupTowers()
	    // this.render()
	    this.clickTower();
	    this.firstNum = null;
	
	
	  }
	
	  setupTowers() {
	    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
	      const $tower = $("<ul>").addClass("tower").attr("pile", towerIdx);
	      if (towerIdx === 0) {
	        for (let diskIdx = 1; diskIdx < 4; diskIdx++){
	          let $disk = $("<li>").addClass(`disk${diskIdx}`)
	          $tower.append($disk)
	        }
	      }
	      this.view.append($tower)
	    }
	  }
	
	  clickTower() {
	    let $towers = $("ul");
	    $towers.click(e => {
	      let $tower = $(e.currentTarget);
	      if (this.firstNum === null) {
	        this.firstNum = parseInt($tower.attr("pile"));
	        console.log(this.firstNum);
	      } else {
	        let secondNum = parseInt($tower.attr("pile"));
	        this.game.move(this.firstNum, secondNum);
	        $tower.append($($towers[this.firstNum]).children().first());
	        // debugger
	        this.firstNum = null;
	      }
	    });
	  }
	
	  render() {
	    // let $tower = $("ul")
	    // debugger
	  }
	
	
	
	
	}
	module.exports = HanoiView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map