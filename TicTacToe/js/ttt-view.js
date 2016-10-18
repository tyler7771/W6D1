class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    let $square = $("li")
    $square.click( e => {
      let $square = $(e.currentTarget);
      let posArray = $square.attr("data-pos").split(",")
      if ($square.attr("checked") === "checked") {
        alert("Invalid move")
      } else {
        $square.attr("checked", "true")
        this.makeMove($square);
        this.game.playMove(posArray);
        if (this.game.isOver()) {
          alert(`${this.game.winner()} is the winner!`);
          $square.off()
        }
      }
    })
  }

  makeMove($square) {
    if (this.game.currentPlayer === 'x') {
      $square.text(this.game.currentPlayer);
      $square.addClass("xmarked");
    } else {
      $square.text(this.game.currentPlayer);
      $square.addClass("omarked");
    }

  }

  setupBoard() {
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      const $row = $("<ul>").addClass("group")
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        let $square = $("<li>").addClass("square").attr("data-pos", [rowIdx, colIdx]);
        // debugger
        // $square.on("mouseenter", e => {
        //   let $square = $(e.currentTarget);
        //   $square.css("background-color", "yellow");
        // })
        // $square.on("mouseout", e => {
        //   let $square = $(e.currentTarget);
        //   $square.css("background-color", "grey");
        // })
        $row.append($square);
      }
      this.$el.append($row);
    }
  }
}

module.exports = View;
