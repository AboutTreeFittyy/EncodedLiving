/* File Name: LoadScene.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
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

	create(){
		
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
		//load all sprites in CST sprites
		for(let prop in CST.SPRITE){
			if(CST.SPRITE[prop] == CST.SPRITE.PLAYER){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 64,
					frameWidth: 64
				});
			}   else if (CST.SPRITE[prop] == CST.SPRITE.CAT || CST.SPRITE[prop] == CST.SPRITE.ITEM || CST.SPRITE[prop] == CST.SPRITE.WHIP){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 32,
					frameWidth: 32
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
			console.log(percent);
		})

		//load menu when complete
		this.load.on("complete", ()=>{
			this.scene.start(CST.SCENES.MENU);
		})
	}
}