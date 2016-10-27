import { BootState } from 'states/BootState';
import { LoadState } from 'states/LoadState';
import { PlayState } from 'states/PlayState';
import { MenuState } from 'states/MenuState';
import { RegulationState } from 'states/RegulationState';
import { ResultState } from 'states/ResultState';
import { RankState } from 'states/RankState';


export class Game extends Phaser.Game {
  constructor() {
    super('100%', '100%', Phaser.AUTO, 'game', null, false, false);
    this.state.add('boot', new BootState());
    this.state.add('load', new LoadState());
    this.state.add('play', new PlayState());
    this.state.add('menu', new MenuState());
    this.state.add('result', new ResultState());
    this.state.add('regulation', new RegulationState());
    this.state.add('rank', new RankState());
    this.state.start('boot');
  }
}
