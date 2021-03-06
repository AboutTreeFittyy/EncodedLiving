/* File Name: WinScene.js
 * Author: Mathew Boland
 * Last Updated: November 17, 2019
 * Description: This class creates a winning scene to stop the game and allow the player to return
 * to the main menu or restart.
*/
import {CST} from "../CST";
export class WinScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.WIN
		})
	}

	create(){
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.GRADUATED).setDepth(1);
        let restart = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, CST.IMAGE.RESTART).setDepth(1);
        let menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.8, CST.IMAGE.MENU).setDepth(1);
        let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
        //Make death animation for player
        let winSprite = this.add.sprite(100,100,CST.SPRITE.PLAYER);
        winSprite.x = this.game.renderer.width / 2;
        winSprite.y = this.game.renderer.height / 2;
        winSprite.setScale(2);
        winSprite.play("win");
		hoverSprite.setVisible(false);
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
			this.data.scene.stop();
			let password = null;
			this.scene.start(CST.SCENES.FIRSTLEVEL, {password});
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
    
    init(data){
		//Get data from Level scene to work with in this scene
		this.data = data;
	}
}