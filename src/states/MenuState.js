export class MenuState extends Phaser.State {
  create() {
    const home = this.game.add.image(0, 0, 'home');
    console.log('home', home.texture);
    home.scale.setTo(this.game.width / home.texture.width, this.game.height / home.texture.height);
    const titleLabel = this.game.add.text(this.game.width / 2, 80,
            '英潮', { font: '50px Arial', fill: '#ffffff' });
    titleLabel.anchor.setTo(0.5, 0.5);
    const upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.start, this);
    const button = this.game.add.button(this.game.world.centerX, this.game.world.height - 60, 'startButton', this.start, this, 0.01, 1, 0);
    button.anchor.setTo(0.5, 0.5);
    button.scale.setTo(0.5, 0.5);
  }
  start() {
    this.game.state.start('play');
  }
}
