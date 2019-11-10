/* File Name: TalkScene.js
 * Author: Mathew Boland
 * Last Updated: November 10, 2019
 * Description: This class creates a scene to listen for continue input and display
 * the continue icon. This helps keep speech flow between the player and NPCs.
*/
import {CST} from "../CST";
export class TalkScene extends Phaser.Scene{
	constructor(){
		super({
			key: CST.SCENES.TALK
		})
	}

	init(data){
		//Get data from FirstLevel scene to work with in this scene
		this.npc = data.npc;
		this.player = data.player;
	}

	create(){
		//Handle input for dialogue
		this.chatsDone = 0; //The number of sections finished so far
		this.selectDialogue(this.player, this.npc);

		//add in assets
        let contin = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.CONTINUE).setDepth(1);
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.CAT);
		hoverSprite.setScale(2);
		hoverSprite.setVisible(false);
		//animate sprites
		this.anims.create({
			key: "walk",
			frameRate: 4,
			repeat: -1,
			frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT,{
				frames: [0,1,2,3]
			})
		})
        //make space resume game as well
        this.input.keyboard.on('keyup-SPACE', ()=>{
			this.acceptInput();
		})
		//make buttons interactive
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
			this.acceptInput();
		})
	}

	acceptInput(){		
		if(this.chatsDone >= this.chats.length){
			//Return to game, no more dialogue now
			this.scene.resume(CST.SCENES.FIRSTLEVEL);
			this.scene.stop();
		}else{
			//Add next dialogue to cmd2
			this.addCMD2Text(this.chats[this.chatsDone], this.player);
			this.chatsDone++;			
		}		
	}

	selectDialogue(player, npc){
		//Append new text to chats array based on npc name for acceptInputs function to print
        switch(npc.name){
            case "Nicole":
				this.chats = ["C:/Users/Player/To_Self/Hey is that Nicole?", 
				"C:/Users/Nicole/To_Player/Hey it's me! Thought I'd\n see you here. First day of programming school eh?"];	
            break;
            case "NicoleD":
				this.chats = ["C:/Users/oliceN/To_Player/Hwy ddi sith paphen<1@?"];
            break;
            case "Claire1":
				this.chats = ["Hey, I'm Claire! What are you doing here?"];
            break;
            case "Claire2":
				this.chats = ["Oh hey again, I can't talk. I gotta go see Brad."];
            break;
            case "Kyle":
				this.chats = ["How are you doing? I'm so pumped for school!"];
            break;
            case "Chad":
				this.chats = ["Hey bro! Wanna come to my party later?"];
            break;
            case "Brad":
				this.chats = ["Yo dude. Can you pick up some booze?"];
            break;
            case "Vlad":
				this.chats = ["Whoa! Are you actually looking at me!?"];
            break
            case "Stevie":
				this.chats = ["Look, I maybe short but I'm no Starbucks item!"];
			break;
			case "Prof":
				this.chats = ["Hey I lost some... oh nevermind..."];
			break;
		}
		//Print first segment of speech
		this.acceptInput();
	}

	addCMD2Text(text, player){
		//If the command prompt has more than 34 lines, delete the first one before adding another
        if(text.split(/\r\n|\r|\n/).length + player.scene.cmd2Lines >= 35){
			//Increment the number of lines tracker for each line of dialogue in the string
			for(var i = 0; i <  text.split(/\r\n|\r|\n/).length; i++){
				player.scene.cmd2Text.text = player.scene.cmd2Text.text.replace(/[\w\W]+?\n+?/,"");
			}
        }else{
            //Still room so don't remove anything, just increase counter for lines
            player.scene.cmd2Lines += text.split(/\r\n|\r|\n/).length;
        }
		player.scene.cmd2Text.text += text+"\n";
    }
}