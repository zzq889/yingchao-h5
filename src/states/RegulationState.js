export class RegulationState extends Phaser.State {
  init() {
    // add init code
  }
  create() {
    // create init scene
    const background = this.game.add.image(0, 0, 'blurGameHome');
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
    this.themeDetail = this.game.add.image(this.game.width / 2, this.game.height / 2, 'themeDetail');
    const scaleRate = (this.game.width - 20) / background.texture.width;
    this.themeDetail.scale.setTo(scaleRate, scaleRate);
    this.themeDetail.anchor.setTo(0.5, 0.5);
    this.arrowButton = this.game.add.button(this.game.width - 20, this.game.world.height / 2, 'arrowButton', this.nextPage, this, 0.01, 1, 0);
    this.arrowButton.anchor.setTo(1, 0.5);
    this.arrowButton.scale.setTo(0.5, 0.5);
    // add pointer
    // this.game.input.addPointer();
  }
  // render() {
  //   this.game.debug.pointer(this.game.input.pointer1);
  // }
  // update() {
    // console.log(this.game.input.pointer1);
  nextPage() {
    this.themeDetail.loadTexture('gameRegulation');
    this.arrowButton.kill();
  // this.game.state.start('regulation');
    const startButton = this.game.add.button(this.game.world.centerX, this.game.world.height * 0.92, 'startButton', this.startGame, this, 0.01, 1, 0);
    startButton.anchor.setTo(0.5, 0.5);
    startButton.scale.setTo(0.5, 0.5);
  }
  startGame() {
    this.game.state.start('play');
  }
}
