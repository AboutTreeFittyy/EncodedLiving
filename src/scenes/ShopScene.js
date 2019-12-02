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
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT).setScale(0.5);
		hoverSprite.setVisible(false);
		//make dialogue box for loch ness monster
		let dialogue = this.add.image(this.game.renderer.width / 2 + 25, this.game.renderer.height * 0.4, CST.IMAGE.DIALOGUE).setDepth(1);		
		//Add player stats to screen
		this.playerMoney = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.35, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerMoney.setColor("blue");
		this.playerMoney.text = "$" +this.player.money;
		this.playerLevel = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.38, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerLevel.setColor("blue");
		this.playerLevel.text = this.player.knowledgeLevel;
		this.playerKnowledge = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.41, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerKnowledge.setColor("blue");
		this.playerKnowledge.text = this.player.knowledgeProgress+"/"+this.player.knowledgeNeeded;
		this.playerWill = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.44, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerWill.setColor("blue");
		this.playerWill.text = this.player.will+"/"+this.player.willMax;
		this.playerRep = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.47, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerRep.setColor("blue");
		this.playerRep.text = this.player.rep+"/"+this.player.repMax;
		//Make purchase buttons for upgrades
		let whipUp = this.add.image(this.game.renderer.width / 2 - 500, this.game.renderer.height * 0.7, CST.IMAGE.WHIPUPGRADE).setDepth(1);
		let ballUp = this.add.image(this.game.renderer.width / 2 - 400, this.game.renderer.height * 0.7, CST.SPRITE.BALL).setDepth(1).setScale(5);
		//Make purchase buttons for items
		let exam = this.add.image(this.game.renderer.width / 2 + 250, this.game.renderer.height * 0.7, CST.IMAGE.EXAM).setDepth(1);
		let dvd = this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.DVD).setDepth(1);
		let energy = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.ENERGY).setDepth(1);
        //make space resume game as well
        this.input.keyboard.on('keyup-SPACE', ()=>{
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})	
		//Mark items that are maxed out or upgrades that are already purchased "sold out"
		if(this.player.will == this.player.willMax){
			this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
		}else{
			//Make energy button interactive and purchase energy on click for 1 dollars if player has enough
			energy.setInteractive();
			energy.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = energy.x;
				hoverSprite.y = energy.y - 100;
			})
			energy.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			energy.on("pointerup", ()=>{
				if(this.player.money > 1 && this.player.will != this.player.willMax){
					this.player.money -= 1;
					this.playerMoney.text = "$" +this.player.money;
					this.player.addItem(this.player,"energy");	
					this.playerWill.text = this.player.will+"/"+this.player.willMax;			
				}
				//Make button not work if maxed out
				if(this.player.will == this.player.willMax){
					energy.on("pointerover", ()=>{hoverSprite.setVisible(false);})
					energy.on("pointerup", ()=>{hoverSprite.setVisible(false);})
					hoverSprite.setVisible(false);
					this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				}
			})
		}
		if(this.player.rep == this.player.repMax){
			this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
		}else{
			//Make  button interactive and purchased on click for 2.5 dollars if player has enough
			dvd.setInteractive();
			dvd.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = dvd.x;
				hoverSprite.y = dvd.y - 100;
			})
			dvd.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			dvd.on("pointerup", ()=>{
				if(this.player.money > 2.5 && this.player.rep != this.player.repMax){
					this.player.money -= 2.5;
					this.playerMoney.text = "$" +this.player.money;
					this.player.addItem(this.player,"dvd");	
					this.playerRep.text = this.player.rep+"/"+this.player.repMax;			
				}
				//Make button not work if maxed out
				if(this.player.rep == this.player.repMax){
					dvd.on("pointerover", ()=>{hoverSprite.setVisible(false);})
					dvd.on("pointerup", ()=>{hoverSprite.setVisible(false);})
					hoverSprite.setVisible(false);
					this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				}
			})
		}
		if(this.player.maxBalls > 3){
			this.add.image(this.game.renderer.width / 2 - 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
		}else{
			//Make  button interactive and purchased on click for 3.5 dollars if player has enough
			ballUp.setInteractive();
			ballUp.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = ballUp.x;
				hoverSprite.y = ballUp.y - 100;
			})
			ballUp.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			ballUp.on("pointerup", ()=>{
				if(this.player.money > 7 && this.player.maxBalls != 4){
					this.player.money -= 7;
					this.playerMoney.text = "$" +this.player.money;
					this.player.maxBalls++;	
					this.player.balls++;
					this.player.displayInventory(); //Updates the ball count
					//Make button not work after purchase
					ballUp.on("pointerover", ()=>{hoverSprite.setVisible(false);})
					ballUp.on("pointerup", ()=>{hoverSprite.setVisible(false);})
					hoverSprite.setVisible(false);
					this.add.image(this.game.renderer.width / 2 - 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				}
			})
		}
		if(this.player.whipUpgrade > 0){
			this.add.image(this.game.renderer.width / 2 - 500, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
		}else{
			//Make  button interactive and purchased on click for 3.5 dollars if player has enough
			whipUp.setInteractive();
			whipUp.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = whipUp.x;
				hoverSprite.y = whipUp.y - 100;
			})
			whipUp.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			whipUp.on("pointerup", ()=>{
				if(this.player.money > 10.5 && this.player.whipUpgrade == 0){
					this.player.money -= 10.5;
					this.playerMoney.text = "$" +this.player.money;
					this.player.whipUpgrade++;
					this.player.displayInventory();
					//Make button not work after purchase
					whipUp.on("pointerover", ()=>{hoverSprite.setVisible(false);})
					whipUp.on("pointerup", ()=>{hoverSprite.setVisible(false);})
					hoverSprite.setVisible(false);
					this.add.image(this.game.renderer.width / 2 - 500, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				}
			})
		}	
		//Make exam button interactive and purchase exam sheet on click for 3.5 dollars if player has enough
		exam.setInteractive();
		exam.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = exam.x;
			hoverSprite.y = exam.y - 100;
		})
		exam.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		exam.on("pointerup", ()=>{
			if(this.player.money > 3.5){
				this.player.money -= 3.5;
				this.playerMoney.text = "$" +this.player.money;
				this.player.addItem(this.player,"examsheet");	
				this.playerRep.text = this.player.rep+"/"+this.player.repMax;
				this.playerWill.text = this.player.will+"/"+this.player.willMax;
				this.playerKnowledge.text = this.player.knowledgeProgress+"/"+this.player.knowledgeNeeded;
				this.playerLevel.text = this.player.knowledgeLevel;			
			}
			//This makes other two items unavailable if level up occurs maxing them out
			if(this.player.rep == this.player.repMax && this.player.will == this.player.willMax){
				dvd.on("pointerover", ()=>{hoverSprite.setVisible(false);})
				dvd.on("pointerup", ()=>{hoverSprite.setVisible(false);})
				hoverSprite.setVisible(false);
				this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				energy.on("pointerover", ()=>{hoverSprite.setVisible(false);})
				energy.on("pointerup", ()=>{hoverSprite.setVisible(false);})
				hoverSprite.setVisible(false);
				this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
			}
		})		
		//make resume button interactive and exit game on click
		resume.setInteractive();
		resume.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.setScale(1);
			hoverSprite.play("walk");
			hoverSprite.x = resume.x - resume.width / 2 - 50;
			hoverSprite.y = resume.y;
		})
		resume.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
			hoverSprite.setScale(0.5);
		})
		resume.on("pointerup", ()=>{
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})
	}

	init(data){
		//Get data from FirstLevel scene to work with in this scene
		this.player = data;
	}
}