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
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
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
			switch(npc.state){
				case 0:
					this.chats = ["C:/Users/Player/To_Self/Hey is that Nicole?", 
					"C:/Users/Nicole/To_Player/Hey it's me! Thought I'd\n see you here. First day of programming school eh?"];
					npc.state++;
				break;
				case 1:
					this.chats = ["C:/Users/Player/To_Self/Hey is that Nicole?", 
					"C:/Users/Nicole/To_Player/Hey it's me! Thought I'd\n see you here. First day of programming school eh?"];
				break;
			}				
            break;
            case "NicoleD":				
			switch(npc.state){
				case 0:
					this.chats = ["C:/Users/oliceN/To_Player/Hwy$ddi%sith(paphen?"];
					npc.state++;
				break;
				case 1:
					this.chats = ["C:/Users/oliceN/To_Player/mI'[os*rosry."];
					npc.state++;
				break;
				case 2:
					this.chats = ["C:/Users/oliceN/To_Player/eAr^uyo+neistling?"];
					npc.state = 0; //restart
				break;
			}
            break;
            case "Claire1":
				switch(npc.state){
					case 0:
						this.chats = ["C:/Users/Player/To_Claire/You look like you know\n your way around here, what's your name?", 
						"C:/Users/To_Player/The name's Claire and I sure do!\n What are you doing here?",
						"C:/Users/Player/To_Claire/Introducing myself, I\nalways liked it when a friend cooks.",
						"C:/Users/To_Player/Well I guess we'll get along\ngreat then! Oh by the way, I have exam answers from\nlast year on this sheet. You can have it. It'll improve\nyour knowledge. *WINKS*",];
						npc.state++;
					break;
					case 1:
						this.chats = ["C:/Users/Player/To_Claire/Is that food free?", 
						"C:/Users/Claire/To_Player/Nothing in life is free. I\nmight sneak some out to Chads partylater, so you\ncan have some then if you go.",
						"C:/Users/Player/To_Claire/Guess I'll have to go, see\nya there."];
						npc.state++;
					break;
					case 2:
						this.chats = ["C:/Users/Claire/To_Player/Sorry I can't talk anymore\nor this food won't be ready in time for Chads party."];
						npc.state++;
						break;						
					case 3:
						this.chats = ["C:/Users/Claire/To_Player/*IGNORES YOU*"];
						break;
				}
            break;
            case "Claire2":
				this.chats = ["C:/Users/Claire/To_Player/Oh hey again, I can't\ntalk. I gotta go see Brad."];
            break;
            case "Kyle":
				this.chats = ["C:/Users/Kyle/To_Player/How are you doing? I'm so \npumped for school!"];
            break;
            case "chad":
				this.chats = ["C:/Users/Chad/To_Player/Hey bro! Wanna come to my\nparty later?"];
            break;
            case "Brad":
				this.chats = ["C:/Users/Brad/To_Player/Yo dude. Can you pick up\nsome booze?"];
            break;
            case "Vlad":
				this.chats = ["C:/Users/Vlad/To_Player/Whoa! Are you actually\nlooking at me!?"];
            break
            case "Stevie":
				this.chats = ["C:/Users/Stevie/To_Player/Look, I maybe short but\nI'm no Starbucks item!"];
			break;
			case "Prof":
				this.chats = ["C:/Users/Prof/To_Player/Hey I lost some... \noh nevermind..."];
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