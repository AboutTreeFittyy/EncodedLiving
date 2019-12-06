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
		let menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.9, CST.IMAGE.MENU).setDepth(1);
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
		menu.setInteractive();
		menu.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = menu.x - menu.width / 2 - 50;
			hoverSprite.y = menu.y;
		})
		menu.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		menu.on("pointerup", ()=>{
			this.sc.sound.removeByKey(CST.AUDIO.THEME1);
			this.scene.stop(CST.SCENES.FIRSTLEVEL);
			this.scene.run(CST.SCENES.MENU);
			this.scene.stop();
		})
		//Generate password
		let pw = this.add.image(this.game.renderer.width / 2 - 200, this.game.renderer.height / 2 + 150, CST.IMAGE.PASSWORD).setDepth(1);
		let pwField = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 130, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(3);
		pwField.setColor("red");
		this.pm = new PasswordManager(); 
		pwField.text = this.pm.generatePassword(this.sc, this.player);
	}
}