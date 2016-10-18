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
