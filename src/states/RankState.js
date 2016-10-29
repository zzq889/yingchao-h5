import 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { getScaleRateX, getScaleRateY } from 'utils';

polyfill();


export class RankState extends Phaser.State {
  init() {
    this.score = this.game.global.score;
    this.rankData = this.game.global.rankData || [];
    // some sacle info for user
    this.halfScaleX = getScaleRateX(0.5, this.game.width);
    
    this.biggerHalfScaleX = getScaleRateX(0.6, this.game.width);
    this.biggerHalfScale2X = getScaleRateX(0.62, this.game.width);
    this.biggerHalfScale3X = getScaleRateX(0.7, this.game.width);
    this.textOffset1X = getScaleRateX(15, this.game.width);
    this.textOffset2X = getScaleRateX(5, this.game.width);
    this.textOffset3X = getScaleRateX(74, this.game.width);
    this.textOffset4X = getScaleRateX(24, this.game.width);

    this.buttonOffset1X = getScaleRateX(20, this.game.width);
    this.textOffset1Y = getScaleRateY(10, this.game.height);
    this.textOffsetY = getScaleRateY(30, this.game.height);
    this.textOffset2Y = getScaleRateY(35, this.game.height);
    
    this.buttonOffset2Y = getScaleRateY(60, this.game.height);
  }
  preload() {
    const loadingLabel = this.game.add.text(this.game.width / 2, (this.game.height / 2) - this.textOffsetY, '正在加载中...', { font: `${this.textOffsetY}px Arial`, fill: '#ffffff' });
    loadingLabel.anchor.setTo(0.5, 0.5);
    const progressBar = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    progressBar.scale.setTo(window.devicePixelRatio, window.devicePixelRatio);
    const { topList = [] } = this.rankData;
    topList.forEach((element, index) => {
      if (element.headimgurl) {
        this.game.load.image(`headimgurl_${index}`, element.headimgurl);
      }
    });
  }
  create() {
    // create page
    const rankBackground = this.game.add.image(0, 0, 'backgroundInfo');
    rankBackground.scale.setTo(this.game.width / rankBackground.texture.width, this.game.height / rankBackground.texture.height);
    const label = this.game.add.image(this.game.width / 2, this.game.height / 2, 'squareLabel');
    label.scale.setTo(this.biggerHalfScaleX, this.biggerHalfScaleX);
    label.anchor.setTo(0.5, 0.5);
    const rankBar = this.game.add.image(label.x, label.y - ((label.texture.height * this.biggerHalfScaleX) / 2), 'rankbar');
    rankBar.anchor.setTo(0.5, 0.5);
    rankBar.scale.setTo(this.halfScaleX, this.halfScaleX);
    this.scoreRecords = this.game.add.group();
    this.spwanRecordsByData(this.rankData.topList || [], label);
    // buttons
    const shareScoreButton = this.game.add.button(label.x - this.buttonOffset1X, (label.y + ((label.texture.height * this.biggerHalfScaleX) / 2)) - this.buttonOffset2Y, 'shareScoreButton', this.share, this, 0.01, 1, 0);
    shareScoreButton.anchor.setTo(1, 0.5);
    shareScoreButton.scale.setTo(this.biggerHalfScale2X, this.biggerHalfScale2X);
    const findAwardsButton = this.game.add.button(label.x + this.buttonOffset1X, (label.y + ((label.texture.height * this.biggerHalfScaleX) / 2)) - this.buttonOffset2Y, 'findAwardsButton', this.findAwards, this, 0.01, 1, 0);
    findAwardsButton.anchor.setTo(0, 0.5);
    findAwardsButton.scale.setTo(this.biggerHalfScale2X, this.biggerHalfScale2X);
    const couponButton = this.game.add.button(this.game.world.centerX, this.game.world.height * 0.92, 'couponButton', this.getCoupon, this, 0.01, 1, 0);
    couponButton.anchor.setTo(0.5, 0.5);
    couponButton.scale.setTo(this.halfScaleX, this.halfScaleX);
    const myScoreLabel = this.game.add.image(this.game.world.centerX, shareScoreButton.y - ((shareScoreButton.texture.height * 0.5) / 2) - this.textOffsetY, 'scoreLabel');
    myScoreLabel.anchor.setTo(0.5, 1);
    myScoreLabel.scale.setTo(this.biggerHalfScale2X, this.biggerHalfScale2X);
    const myScoreText = this.game.add.text(this.game.world.centerX, myScoreLabel.y - ((myScoreLabel.texture.height * this.biggerHalfScale2X) / 2), `分数: ${this.score}    排名: ${this.rankData.myPosition}`,
    { font: `${getScaleRateX(28, this.game.width)}px Arial`, fill: '#ffffff' });
    myScoreText.anchor.setTo(0.5, 0.5);
    const encourageText = this.game.add.image(this.game.world.centerX, myScoreLabel.y - (myScoreLabel.texture.height * this.biggerHalfScale2X) - this.textOffsetY, 'encourageText');
    encourageText.anchor.setTo(0.5, 1);
    encourageText.scale.setTo(this.biggerHalfScale3X, this.biggerHalfScale3X);
 }
  spwanRecordsByData(data, label) {
    const length = data.length;
    let offsetY = label.y * 0.5;
    const newData = length > 3 ? data.slice(0, 3) : data;
    newData.forEach((record, index) => {
      const scoreLabel = this.game.add.image(this.game.world.centerX, offsetY, 'scoreLabel');
      scoreLabel.anchor.setTo(0.5, 0.5);
      scoreLabel.scale.setTo(this.biggerHalfScale2X, this.biggerHalfScale2X);
      offsetY = scoreLabel.y + ((scoreLabel.texture.height * this.biggerHalfScale2X) / 2) + this.textOffset2Y;
      const pentacleX = this.game.world.centerX - ((scoreLabel.texture.width * this.biggerHalfScale2X) / 2) + this.textOffset4X;
      const recordIndexX = pentacleX + (this.textOffset3X / 4);
      const recordIndex = this.game.add.text(recordIndexX, scoreLabel.y, index + 1,
    { font: `${getScaleRateX(28, this.game.width)}px Arial`, fill: '#ffffff' });
      recordIndex.anchor.setTo(1, 0.5);
      const picHolder = this.game.add.image(pentacleX + (this.textOffset3X * this.biggerHalfScaleX / 2), scoreLabel.y, 'picHolder');
      picHolder.anchor.setTo(0, 0.5);
      picHolder.scale.setTo(this.halfScaleX, this.halfScaleX);
      if (record.headimgurl && record.headimgurl.indexOf('7oxin3') > -1) { // for test
        const tmpRecordHead = this.game.add.image(picHolder.x + this.textOffset2X, picHolder.y, `headimgurl_${index}`);
        tmpRecordHead.anchor.setTo(0, 0.5);        
        tmpRecordHead.scale.setTo((picHolder.texture.width * this.halfScaleX - this.textOffset2X) / tmpRecordHead.texture.width, (picHolder.texture.height * this.halfScaleX - this.textOffset2X) / tmpRecordHead.texture.height);
      }
      const recordTitle = this.game.add.text(picHolder.x + picHolder.texture.width + this.textOffset1X, scoreLabel.y - this.textOffset1Y, record.nickname || 'unknown',
    { font: `${getScaleRateX(18, this.game.width)}px Arial`, fill: '#ffffff' });
      recordTitle.anchor.setTo(0, 0.5);
      const recordText = this.game.add.text(picHolder.x + picHolder.texture.width + this.textOffset1X, scoreLabel.y + this.textOffset1Y, record.score,
    { font: `${getScaleRateX(18, this.game.width)}px Arial`, fill: '#ffffff' });
      recordText.anchor.setTo(0, 0.5);
      const challengeButton = this.game.add.button(scoreLabel.x + ((scoreLabel.texture.width * this.biggerHalfScale2X) / 2) - this.textOffset1X, scoreLabel.y, 'challengeButton', this.startGame, this, 0.01, 1, 0);
      challengeButton.anchor.setTo(1, 0.5);
      challengeButton.scale.setTo(this.biggerHalfScale3X, this.biggerHalfScale3X);
    });
  }
  share() {
    this.game.state.start('share');
  }
  startGame() {
    this.game.state.start('play');
  }
  findAwards() {
    this.game.state.start('award');
  }
  getCoupon() {
    this.game.state.start('coupon');
  }
}
