/* File Name: LoadScene.js
 * Author: Mathew Boland
 * Last Updated: November 10, 2019
 * Description: This class loads the bulk of the data for the game while displaying 
 * a horizontal loading bar.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
import {CST} from "../CST";
export class LoadScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.LOAD
		})
	}

	loadImages(){
		this.load.setPath("./assets/image");
		//load all images in CST images
		for(let prop in CST.IMAGE){
			this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
		}
	}

	loadAudio(){
		this.load.setPath("./assets/audio");
		//load all audio in CST audio
		for(let prop in CST.AUDIO){
			this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
		}
	}

	loadSprites(){
		this.load.setPath("./assets/sprite");
		//load all sprites in CST sprites, if statements switch on which image is meant to be a certain size
		for(let prop in CST.SPRITE){
			if(CST.SPRITE[prop] == CST.SPRITE.PLAYER){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 64,
					frameWidth: 64
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.CHAD || CST.SPRITE[prop] == CST.SPRITE.VLAD || CST.SPRITE[prop] == CST.SPRITE.FAT ){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 96,
					frameWidth: 64
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.BALL || CST.SPRITE[prop] == CST.SPRITE.ITEM || CST.SPRITE[prop] == CST.SPRITE.WHIP || CST.SPRITE[prop] == CST.SPRITE.WHIPRED){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 32,
					frameWidth: 32
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.KYLE){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 48,
					frameWidth: 32
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.JSON){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 48,
					frameWidth: 160
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.HOTSTUFF || CST.SPRITE[prop] == CST.SPRITE.PATHETIC){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 320,
					frameWidth: 90
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.BRAD){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 80,
					frameWidth: 48
				});
			}else{
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 64,
					frameWidth: 48
				});
			}		
		}
	}

	preload(){
		//load assets
		this.loadImages();
		this.loadAudio();
		this.loadSprites();
		let loadingBar = this.add.graphics({
			fillStyle:{
				color: 0xffffff
			}
		})
		//display loading bar
		this.load.on("progress", (percent)=>{
			loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
		})

		//load menu when complete
		this.load.on("complete", ()=>{
			this.scene.start(CST.SCENES.MENU);
			this.scene.stop();
		})
	}
}