/* File Name: LoseScene.js
 * Author: Mathew Boland
 * Last Updated: December 1, 2019
 * Description: This class creates a lose scene to stop the game and allow the player to return
 * to the main menu or restart.
*/
import {CST} from "../CST";
export class LoseScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.LOSE
		})
	}

	create(){
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		//Make death animation for player
		let deathSprite = this.add.sprite(100,100,CST.SPRITE.PLAYER);
		deathSprite.x = this.game.renderer.width / 2;
		deathSprite.y = this.game.renderer.height / 2;
		deathSprite.setScale(2);
		deathSprite.play("die");
		hoverSprite.setVisible(false);
		//Check if this is game over or just a lost life
		if(this.data.player.lives <= 0){
			//add in assets for losing the game
			this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.DROPPED).setDepth(1);
			let restart = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, CST.IMAGE.RESTART).setDepth(1);
			let menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.8, CST.IMAGE.MENU).setDepth(1);
			
			//make restart button interactive
			restart.setInteractive();
			restart.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = restart.x - restart.width / 2 - 50;
				hoverSprite.y = restart.y;
			})
			restart.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			restart.on("pointerup", ()=>{
				this.data.scene.restart();
				this.scene.stop();
			})
			//Make menu button interactive
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
				this.scene.stop(CST.SCENES.FIRSTLEVEL);
				this.scene.run(CST.SCENES.MENU);
				this.scene.stop();
			})
		}else{
			//add in assets for losing a life
			this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.DECREASE).setDepth(1);
			let contin = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.6, CST.IMAGE.CONTINUE).setDepth(1);
			let menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.8, CST.IMAGE.MENU).setDepth(1);
			
			//make contin button interactive
			contin.setInteractive();
			contin.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = contin.x - contin.width / 2 - 50;
				hoverSprite.y = contin.y;
			})
			contin.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			contin.on("pointerup", ()=>{
				//Move player to start position
				this.data.player.x = 700;
				this.data.player.y = 4100;
				//Make player visible again
				this.data.player.visible = true;
				//Reset reputation points
				this.data.player.rep = this.data.player.repMax;
				//Refresh the console to display new rep
				this.data.player.displayInventory();
				//Reset all input
				this.data.player.scene.keyboard.E.reset();
				this.data.player.scene.keyboard.W.reset();
				this.data.player.scene.keyboard.A.reset();
				this.data.player.scene.keyboard.S.reset();
				this.data.player.scene.keyboard.D.reset();				
				//Resume sound
				this.data.sound.play(CST.AUDIO.THEME1, {
					volume: 0.25,
					loop: true
				})
				this.data.scene.resume(); //Resume the game
				this.scene.stop();
			})
			//Make menu button interactive
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
				this.scene.stop(CST.SCENES.FIRSTLEVEL);
				this.scene.run(CST.SCENES.MENU);
				this.scene.stop();
			})
		}
    }
    
    init(data){
		//Get data from Level scene to work with in this scene
		this.data = data;
	}
}