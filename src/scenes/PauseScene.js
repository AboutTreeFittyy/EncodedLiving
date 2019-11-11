/* File Name: PauseScene.js
 * Author: Mathew Boland
 * Last Updated: November 4, 2019
 * Description: This class creates a pause menu to display stats and pause the game
 * until the resume button is selected.
*/
import {CST} from "../CST";
export class PauseScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.PAUSE
		})
	}

	create(){
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.PAUSED).setDepth(1);
		//let title = this.add.image(this.game.renderer.width / 2,0,CST.IMAGE.TITLE);
		//title.setY(title.height/2);
        let resume = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.RESUME).setDepth(1);
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
		//create sounds for menu and pause!
		/*this.sound.play(CST.AUDIO.TITLE, {
			loop: true
        })*/
        //make p resume game as well
        this.input.keyboard.on('keyup-P', ()=>{
            this.sound.pauseAll();
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})
		//make buttons interactive
		resume.setInteractive();
		resume.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = resume.x - resume.width / 2 - 50;
			hoverSprite.y = resume.y;
		})
		resume.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		resume.on("pointerup", ()=>{
			this.sound.pauseAll();
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})
	}

	preload(){
		
	}
}