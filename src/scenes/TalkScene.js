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
					this.chats = [
					"C:/Users/Player/To_Self/Hey is that Nicole?", 
					"C:/Users/Nicole/To_Player/Hey! Thought I'd see\nyou here. First day of programming school eh?",
					"C:/Users/Player/To_Nicole/Yep, you're here for\nthat too right?",
					"C:/Users/Nicole/To_Player/Sure am! I'm so happy\nwe met up. Things are a bit weird here...",
					"C:/Users/Player/To_Nicole/Really? It can't be too\nbad its just University.",
					"C:/Users/Nicole/To_Player/Maybe it's just me but\nthose nerds running around are just gross.",
					"C:/Users/Player/To_Nicole/Sheesh, I get nerds are\nlame but I wouldn't go that far...",
					"C:/Users/Nicole/To_Player/No they are! These nerds\nmust not shower cause I smell them a mile a way.\nIt doesn't help they're always running through\nthe halls! One accidently touched me and I\nnearly threw up, he was that greasy!",
					"C:/Users/Player/To_Nicole/Damn, sounds like they're\nplaying too much smash.",
					"C:/Users/Nicole/To_Player/Huh? Oh and don't touch\nthe dorky girls!",
					"C:/Users/Player/To_Nicole/Wasn't planning on it.",
					"C:/Users/Nicole/To_Player/No seriously. I bumped\ninto one and got rushed by like 10 nerds. Apparently\nthey thought I was hitting on her. I'm not even\nattracted to girls!",
					"C:/Users/Player/To_Nicole/HaHa that's too funny.\nMust be quite the territorial geeks here.",
					"C:/Users/Nicole/To_Player/You're telling me. Come\non now. Let's get to class, I'll follow you.",];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Nicole/Know where to go?", 
					"C:/Users/Nicole/To_Player/Yeah, the blue room."];
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
					this.chats = [
					"C:/Users/Player/To_Claire/You look like you know\n your way around here, what's your name?", 
					"C:/Users/Claire/To_Player/The name's Claire and I\nsure do! What are you doing here?",
					"C:/Users/Player/To_Claire/Introducing myself, I\nalways liked it when a friend cooks.",
					"C:/Users/Claire/To_Player/Well I guess we'll get\nalong great then! Oh by the way, I have exam answers from\nlast year on this sheet. You can have it. It'll improve\nyour knowledge. *WINKS*",];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Claire/Is that food free?", 
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
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Self/Wow Claire changed clothes.", 
					"C:/Users/Claire/To_Player/Have you seen Brad?",
					"C:/Users/Player/To_Claire/Wow, nice to see you too.",
					"C:/Users/Claire/To_Player/I don't have time for\ngames. Have you seen him or not?",
					"C:/Users/Player/To_Claire/Actually we just fought.",
					"C:/Users/Claire/To_Player/No way you don't even\nlook hurt! And there's no way you would beat him\nin a fight!",
					"C:/Users/Player/To_Claire/Well I did. Broke that\nlosers nose right at the school entrance.",
					"C:/Users/Claire/To_Player/YOU JERK. You better\nnot have ruined his face!",
					"C:/Users/Player/To_Self/I guess it isn't only her\nclothes she changed..."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Self/Here it comes.", 
					"C:/Users/Claire/To_Player/You are so immature!\nWhy would you hurt Brad?",
					"C:/Users/Player/To_Claire/Someone had to put him\nin his place. He may try to act like him but he'll\nnever be a great guy like Chad.",
					"C:/Users/Claire/To_Player/Chad killed Nicole. Are\nyou forgetting that?",
					"C:/Users/Player/To_Claire/I forgive him for making\na mistake. I can't forgive Brad intentionally trying\nto hurt my feelings like he did.",
					"C:/Users/Claire/To_Player/You think that justifies\nfighting him? A fight won't bring your dead friend\nback!",
					"C:/Users/Player/To_Claire/Well...",
					"C:/Users/Claire/To_Player/I don't want to hear it. I'm\nnever talking to you again!",
					"C:/Users/Player/To_Claire/Whatever..."];
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Claire/Really gonna be like this?",
					"C:/Users/Claire/To_Player/*IGNORES YOU*", 
					"C:/Users/Claire/To_Self/Why won't he leave?"];
					npc.state++;
				break;
				case 3:
					this.chats = [ 
					"C:/Users/Claire/To_Player/Go away."];
					npc.state++;
				break;
				case 4:
					this.chats = [ 
					"C:/Users/Claire/To_Player/I hate you."];
					npc.state = 2;
				break;
			}
            break;
            case "Kyle":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Kyle/How's the weather down\nthere?", 
					"C:/Users/Kyle/To_Player/Amazing! I'm so pumped to\nbe here!",
					"C:/Users/Player/To_Kyle/Good, someone who isn't\neasily offended.",
					"C:/Users/Kyle/To_Player/Me? Never! Chicks don't\nlike insecure dudes.",
					"C:/Users/Player/To_Kyle/You're a ladies man then?", 
					"C:/Users/Kyle/To_Player/Yeah, know any girls that I\nshould?",
					"C:/Users/Nicole/To_Player/Awe he would be so cute\nwith Stevie!",
					"C:/Users/Player/To_Kyle/Yeah, you should try with\nStevie. As long as you don't mind short people haha.",
					"C:/Users/Kyle/To_Player/Ha, perfect I love em short.\nThanks pal. You want the rest of this energy drink?",
					"C:/Users/Player/To_Kyle/Sure *Grabs drink* Why is\nit still full?", 
					"C:/Users/Kyle/To_Player/People my size don't need\nmuch of that. Enjoy the drink, I'll see you around."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Kyle/You ask out Stevie yet?", 
					"C:/Users/Kyle/To_Player/Not yet. Need to think of\nan opener.",
					"C:/Users/Player/To_Kyle/I'll leave you to it."];
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/Kyle/To_Player/Can't talk, I'm scouting for\ngirls."];
					npc.state++;
					break;						
				case 3:
					this.chats = [
					"C:/Users/Kyle/To_Player/How's this opener:\nWant to see my... No never mind it sucks.",
					"C:/Users/Player/To_Kyle/You'll get it. Keep trying."];
					npc.state=2;
					break;
			}
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