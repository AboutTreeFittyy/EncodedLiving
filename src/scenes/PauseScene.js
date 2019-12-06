/* File Name: PauseScene.js
 * Author: Mathew Boland
 * Last Updated: November 17, 2019
 * Description: This class creates a pause menu to display stats and pause the game
 * until the resume button is selected.
*/
import {CST} from "../CST";
import { PasswordManager } from "../PasswordManager";
export class PauseScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.PAUSE
		})
	}
	
	init(data){
		//Get data from FirstLevel scene to work with in this scene
		this.sc = data.scene;
		this.player = data.player;
	}

	create(){
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.PAUSED).setDepth(1);
        let resume = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.RESUME).setDepth(1);
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
        //make p resume game as well
        this.input.keyboard.on('keyup-P', ()=>{
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
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})
		//Generate password
		this.pm = new PasswordManager(); 
		console.log(this.pm.decodePassword("ABCDEFG"));
		console.log(this.pm.decodePassword("ABCDEFB"));
		console.log(this.pm.decodePassword("BBCDEFB"));
		this.pm.decodePassword(this.pm.generatePassword(this.sc, this.player));
	}
}