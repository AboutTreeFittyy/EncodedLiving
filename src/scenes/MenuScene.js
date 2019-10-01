/* File Name: MenuScene.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
 * Description: This class creates the menu scene for the game. Using the sprites,
 * audio and images loaded in LoadScene. It displays them and controls the players
 * selection to move to other scenes.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
import {CST} from "../CST";
export class MenuScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.MENU
		})
	}
	create(){
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.ENCODEDLIVING).setDepth(1);
		this.add.image(0,0,CST.IMAGE.TITLE).setOrigin(0);
		let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.STARTNEWGAME).setDepth(1);
		let loadButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 +100, CST.IMAGE.LOADGAME).setDepth(1);
		//create sprites
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.CAT);
		hoverSprite.setScale(2);
		hoverSprite.setVisible(false);
		//animate sprites
		this.anims.create({
			key: "walk",
			frameRate: 4,
			repeat: -1,
			frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT,{
				frames: [0,1,2,3]
			})
		})
		//create sounds for menu... commented out for the time being as its annoying
		/*this.sound.play(CST.AUDIO.TITLE, {
			loop: true
		})*/
		//make buttons interactive
		startButton.setInteractive();

		startButton.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = startButton.x - startButton.width / 2 - 50;
			hoverSprite.y = startButton.y;
		})
		startButton.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		startButton.on("pointerup", ()=>{
			this.sound.pauseAll();
			this.scene.start(CST.SCENES.FIRSTLEVEL);
		})
		loadButton.setInteractive();
		loadButton.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = loadButton.x - loadButton.width / 2 - 50;
			hoverSprite.y = loadButton.y;
		})
		loadButton.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		loadButton.on("pointerup", ()=>{
			this.sound.pauseAll();
			this.scene.start(CST.SCENES.FIRSTLEVEL);
		})
	}
	init(){
		
	}
	preload(){
		
	}
}