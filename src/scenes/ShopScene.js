/* File Name: PauseScene.js
 * Author: Mathew Boland
 * Last Updated: November 16, 2019
 * Description: This class creates a pause menu to display stats and pause the game
 * until the resume button is selected.
*/
import {CST} from "../CST";
export class ShopScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.SHOP
		})
	}

	create(){
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.10, CST.IMAGE.FIDDY).setDepth(1);
		let title = this.add.image(this.game.renderer.width / 2,0,CST.IMAGE.SHOP);
		title.setY(title.height/2);
        let resume = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.9, CST.IMAGE.EXIT).setDepth(1);
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
		//Make purchase buttons for items
		let exam = this.add.image(this.game.renderer.width / 2 + 250, this.game.renderer.height * 0.7, CST.IMAGE.EXAM).setDepth(1);
		let dvd = this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.DVD).setDepth(1);
		let energy = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.ENERGY).setDepth(1);
        //make space resume game as well
        this.input.keyboard.on('keyup-SPACE', ()=>{
            this.sound.pauseAll();
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})
		//make resume button interactive and exit game on click
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
		//Make exam button interactive and purchase exam sheet on click for 3.5 dollars if player has enough
		exam.setInteractive();
		exam.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = exam.x;
			hoverSprite.y = exam.y - 150;
		})
		exam.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		exam.on("pointerup", ()=>{
			if(this.player.money > 3){
				this.player.money -= 3.5;
				this.player.addItem(this.player,"examsheet");				
			}
		})
		//Make energy button interactive and purchase energy on click for 3.5 dollars if player has enough
		energy.setInteractive();
		energy.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = energy.x;
			hoverSprite.y = energy.y - 150;
		})
		energy.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		energy.on("pointerup", ()=>{
			if(this.player.money > 3){
				this.player.money -= 3.5;
				this.player.addItem(this.player,"energy");				
			}
		})
		//Make  button interactive and purchased on click for 3.5 dollars if player has enough
		dvd.setInteractive();
		dvd.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = dvd.x;
			hoverSprite.y = dvd.y - 150;
		})
		dvd.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		dvd.on("pointerup", ()=>{
			if(this.player.money > 3){
				this.player.money -= 3.5;
				this.player.addItem(this.player,"dvd");				
			}
		})
	}

	init(data){
		//Get data from FirstLevel scene to work with in this scene
		this.player = data;
	}
}