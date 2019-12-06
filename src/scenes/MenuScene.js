/* File Name: MenuScene.js
 * Author: Mathew Boland
 * Last Updated: November 17, 2019
 * Description: This class creates the menu scene for the game. Using the sprites,
 * audio and images loaded in LoadScene. It displays them and controls the players
 * selection to move to other scenes.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
import {CST} from "../CST";
import { PasswordManager } from "../PasswordManager";
export class MenuScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.MENU
		})
	}
	create(){
		//Stuff for password entry
		let password = null;
		this.pm = new PasswordManager();
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.ENCODEDLIVING).setDepth(1);
		let title = this.add.image(this.game.renderer.width / 2,0,CST.IMAGE.TITLE);
		title.setY(title.height/2);
		let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.STARTNEWGAME).setDepth(1);
		let loadGameButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 +100, CST.IMAGE.LOADGAME).setDepth(1);
		//create sprites
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
		//animate sprites
		this.anims.create({
			key: "walk",
			frameRate: 5,
			repeat: -1,
			yoyo: true,
			frames: this.anims.generateFrameNumbers(CST.SPRITE.FAT, {
				start: 0,
				end: 11
			})
		})
		//create sounds for menu... commented out for the time being as its annoying
		/*this.sound.play(CST.AUDIO.TITLE, {
			volume: 0.25,
			loop: true
		})*/
		//make start button interactive
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
			this.scene.start(CST.SCENES.FIRSTLEVEL, {password});
		})
		//Make load button interactive (currently no load capability in this version so commented out)
		loadGameButton.setInteractive();
		loadGameButton.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = loadGameButton.x - loadGameButton.width / 2 - 50;
			hoverSprite.y = loadGameButton.y;
		})
		loadGameButton.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		loadGameButton.on("pointerup", ()=>{
			//Change menu layout to be for loading a game
			startButton.setVisible(false);
			loadGameButton.setVisible(false);
			hoverSprite.setVisible(false);
			let pw = this.add.image(this.game.renderer.width / 2 - 200, this.game.renderer.height / 2, CST.IMAGE.PASSWORD).setDepth(1);
			let exitButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.85, CST.IMAGE.EXIT).setDepth(1);
			let loadButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, CST.IMAGE.LOAD).setDepth(1);
			this.keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
			let pwField = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 - 20, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(3);
			pwField.setColor("green");
			//Create all the bindings for the keys to enter in the text for a password
			for(let i = 0; i < 26; i++){
				this.input.keyboard.on('keyup-'+this.keys[i], ()=>{
					if(pwField.text.length < 10){
						pwField.text += this.keys[i];
					}
				})
			}
			//make backspace delete the end character of the string
			this.input.keyboard.on('keyup-BACKSPACE', ()=>{
				pwField.text = pwField.text.substring(0, pwField.text.length - 1);;
			})
			//Make exit button interactive to return to main part of menu if clicked
			exitButton.setInteractive();
			exitButton.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = exitButton.x - exitButton.width / 2 - 50;
				hoverSprite.y = exitButton.y;
			})
			exitButton.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			exitButton.on("pointerup", ()=>{
				startButton.setVisible(true);
				loadGameButton.setVisible(true);
				loadButton.setVisible(false);
				exitButton.setVisible(false);
				pw.setVisible(false);
				pwField.setVisible(false);
				hoverSprite.setVisible(false);
			})
			//Make load button interactive to return to main part of menu if clicked
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
				//Check if password is valid
				let pw = this.pm.decodePassword(pwField.text);
				//If valid then load game with it
				if(pw != null){
					password = pw;
					this.sound.pauseAll();
					this.scene.start(CST.SCENES.FIRSTLEVEL, {password});
				}else{
					//Not valid, delete entry 
					pwField.text = '';
				}

			})			
		})
	}
}