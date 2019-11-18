/* File Name: TalkScene.js
 * Author: Mathew Boland
 * Last Updated: November 10, 2019
 * Description: This class creates a scene to listen for continue input and display
 * the continue icon. This helps keep speech flow between the player and NPCs.
*/
import {CST} from "../CST";
import { Sprite } from "../Sprite";
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
        let contin = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.75 , CST.IMAGE.CONTINUE).setDepth(1);
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
        //make space resume game as well
        this.input.keyboard.on('keyup-R', ()=>{
			this.acceptInput();
		})
		//make e exit conversation as well
        this.input.keyboard.on('keyup-C', ()=>{
			//go through all inputs
			while(this.chatsDone < this.chats.length){
				this.acceptInput();
			}
			this.acceptInput();//get the last input
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

	dropItem(frame, x, y, name){
		let sprite = new Sprite(this.player.scene, this.player.x + x, this.player.y + y, CST.SPRITE.ITEM, 0, 0, frame, 0, name);
		this.player.scene.lm.itemSet.add(sprite);
		sprite.setSize(32,32);
		sprite.body.setOffset(0,0);
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
			case "skinny":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Skinny_Sister/Let me in.", 
					"C:/Users/Skinny_Sister/To_Player/No way.\nChads all mine."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Skinny_Sister/I'm not gonna\ntake him from you.", 
					"C:/Users/Skinny_Sister/To_Player/That's what\neveryone says."];
					npc.state++;
				break;
				case 2:
					this.chats = [ 
					"C:/Users/Skinny_Sister/To_Player/Stop trying\nnobodies getting in here."];
				break;
			}
			break;
			case "medium":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Medium_Sister/Let me in.", 
					"C:/Users/Skinny_Sister/To_Player/No way.\nWe gotta go on a date before I'll let you through!"];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Medium_Sister/I'm not gonna\ndate you, you're erm... not my type.", 
					"C:/Users/Medium_Sister/To_Player/That's what\neveryone says."];
					npc.state++;
				break;
				case 2:
					this.chats = [ 
					"C:/Users/Medium_Sister/To_Player/Just date me\nor you're not getting in here."];
				break;
			}
			break;
			case "large":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Large_Sister/Let me in.", 
					"C:/Users/Skinny_Sister/To_Player/No way.\nThis room is awful."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Large_Sister/I'm don't care\njust let me in.", 
					"C:/Users/Large_Sister/To_Player/That's what\neveryone says."];
					npc.state++;
				break;
				case 2:
					this.chats = [ 
					"C:/Users/Large_Sister/To_Player/Stop trying\nI won't let you see this."];
				break;
			}
			break;
			case "extralarge":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_ExtraLarge_Sister/Let me in.", 
					"C:/Users/ExtraLarge_Sister/To_Player/No way.\nThe food is all mine."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_ExtraLarge_Sister/I'm not gonna\ntake it from you.", 
					"C:/Users/ExtraLarge_Sister/To_Player/That's what\neveryone says."];
					npc.state++;
				break;
				case 2:
					this.chats = [ 
					"C:/Users/ExtraLarge_Sister/To_Player/Stop trying\nnobodies eating this food except me."];
				break;
			}
			break;
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
				case 2:
					this.chats = [
						"C:/Users/Nicole/To_Player/That's enough music.\nI think we're ready to go to cooking class.",
						"C:/Users/Player/To_Nicole/Yeah, I'm hungry."];
				break;
				case 3:
					this.chats = [
						"C:/Users/Nicole/To_Player/That's enough cooking.\nI think we're ready to take our exams now.",
						"C:/Users/Player/To_Nicole/I agree."];
				break;
				case 4:
					this.chats = [
						"C:/Users/Nicole/To_Player/Good job! Now we can\ntake our exams and be done with this semester.",
						"C:/Users/Player/To_Nicole/Yeah, what a relief.\nGuess I'm gonna skip Chads party after this debacle.",
						"C:/Users/Nicole/To_Player/Yeah, I can't go either.\nI'll be stuck in class until it's almost over.",
						"C:/Users/Player/To_Nicole/Oh well, guess we'll\nhave to have our own party next year!",
						"C:/Users/Nicole/To_Player/Haha, yeah I'll be\nlooking forward to it!"];
					npc.state++;
				break;
				case 10:
					//Unlock all rooms got mask
					this.chats = [
					"C:/Users/Nicole/To_Player/Wow I think this will\nget rid of the girls blocking your way!",
					"C:/Users/Player/To_Self/Huh, neat. Girls will let\nme go anywhere with the Chad mask."];
					//See what state to reset to
					if(npc.scene.finished2){
						npc.state = 3;
					}else if(npc.scene.finished1){
						npc.state = 2;
					}else{
						npc.state = 1;
					}
				break;
			}				
            break;
            case "NicoleD":				
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/oliceN/To_Player/Hwy$ddi%sith(paphen?",
					"C:/Users/Player/To_Self/I can't believe Chad killed\nNicole."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/oliceN/To_Player/mI'[os*rosry.",
					"C:/Users/Player/To_Self/I wish Nicole never had\nthose late classes so she'd still be here..."];
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/oliceN/To_Player/eAr^uyo+neistling?",
					"C:/Users/Player/To_Self/I miss Nicole."];
					npc.state = 0; //restart
				break;
				case 3:
					this.chats = [
					"C:/Users/oliceN/To_Player/lasePe$leph%em!",
					"C:/Users/Player/To_Self/I should go to the study room.\nNasty brown, who would colour something that?"];
					npc.state = 0; //restart
				break;
				case 4:
					this.chats = [
					"C:/Users/oliceN/To_Player/odoG#uckl%no@oruy\nxeam!",
					"C:/Users/Player/To_Self/Time for my last exam."];
				break;
				case 5:
					this.chats = [
					"C:/Users/oliceN/To_Player/m'I#os rodpu^!$oYu\nta$eslat)amde$ti...",
					"C:/Users/Player/To_Self/Guess I should leave now...\nShould probably talk to Claire first though, wonder\nif she's still mad."];
				break;
				case 10:
					//Unlock all rooms get mask
					this.chats = [
					"C:/Users/oliceN/To_Player/oWw,$I%hinkt#hatt$iwll\netg$dir#fo%het#rilgs#lbcokngi@uory#ayw!",
					"C:/Users/Player/To_Self/Huh, neat. Girls will let\nme go anywhere with the Chad mask."];
					//See what state to reset to
					if(npc.scene.finished4){
						npc.state = 4;
					}else if(npc.scene.finished3){
						npc.state = 3;
					}
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
					"C:/Users/Claire/To_Player/Well I guess we'll get\nalong great then! Oh by the way, I have exam answers\nfrom last year on this sheet. You can have it. It'll\nimprove your knowledge. *WINKS*",];
					npc.state++;
					this.dropItem(1, 0, -50, "examsheet");
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
					"C:/Users/Claire/To_Player/YOU JERK. You better\nnot have ruined his face! I'm going to see him.",
					"C:/Users/Player/To_Self/I guess it isn't only her\nclothes she changed..."];
					npc.startX = 1250;
					npc.startY = 4100;
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
				case 5:
					this.chats = [ 
					"C:/Users/Player/To_Self/I wonder if Claire is still\nmad at me.", 
					"C:/Users/Claire/To_Player/Hey! How are you doing?\nJust finished school?",
					"C:/Users/Player/To_Claire/Yeah, it's been interesting\nto say the least.",
					"C:/Users/Claire/To_Player/Lucky, I'm going to have\nto take another year because of all the time I wasted\nat parties with Brad.",
					"C:/Users/Player/To_Claire/Well that's too bad...",
					"C:/Users/Claire/To_Player/Yeah... Hey, look. I'm\nsorry about before. You were right. Brad is a jerk.\nI'm glad you put him in his place.",
					"C:/Users/Player/To_Claire/Wow really? I thought\nyou two were going strong together.",
					"C:/Users/Claire/To_Player/Oh no. Seeing him like\nthat after you... well... it made me rethink just how\ncool he really was.",
					"C:/Users/Player/To_Claire/Glad you came to your\nsenses.",
					"C:/Users/Claire/To_Player/Me too, thanks for that\nwake up call. Say you want to go get something to eat\nlater?",
					"C:/Users/Player/To_Claire/Well... sure why not.",
					"C:/Users/oliceN/To_Player/odGo^eyb.",
					"C:/Users/Player/To_Self/What else am I gonna do?"];
					npc.state = 6;
				break;
				case 7:
					this.chats = [ 
					"C:/Users/Claire/To_Player/Hey.",
					"C:/Users/Player/To_Claire/Oh, hi there.",
					"C:/Users/Claire/To_Player/I like your mask here's\na bunch of exam sheets."];
					this.dropItem(1, 0, 50, "examsheet");
					this.dropItem(1, 0, -50, "examsheet");
					this.dropItem(1, 50, 0, "examsheet");
					this.dropItem(1, -50, 0, "examsheet");
				break;
			}
            break;
            case "Kyle":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Nicole/To_Player/Ugh, these mouth\nbreathers are really annoying to listen to. All they\never talk about is JSON.",
					"C:/Users/Player/To_Nicole/Yep, they're pretty\nannoying, I feel lame just being around them.",
					"C:/Users/Nicole/To_Player/Can we leave then?",
					"C:/Users/Player/To_Nicole/No wait this guy seems\nnormal.",
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
					this.dropItem(3, 0, -50, "energy");
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
				case 4:
					this.chats = [
					"C:/Users/Kyle/To_Player/Hey...",
					"C:/Users/Player/To_Kyle/You okay. How's Stevie.",
					"C:/Users/Kyle/To_Player/...great now that she met\nBrad.",
					"C:/Users/Player/To_Kyle/I don't think he's into her.\nBesides I just beat him up.",
					"C:/Users/Kyle/To_Player/That's the first good thing\nI've heard in months. Take this exam sheet."];
					this.dropItem(1, 0, -50, "examsheet");
					npc.state++;
					break;
				case 5:
					this.chats = [
					"C:/Users/Kyle/To_Player/Sorry I'd rather not talk\nright now, kinda bummed out.",
					"C:/Users/Player/To_Kyle/Take care of yourself, man."];
					break;
			}
            break;
            case "chad":
			switch(npc.state){
				case 0:
				this.chats = [
					"C:/Users/Player/To_Chad/Hey, I hear you're throwing\na party..", 
					"C:/Users/Chad/To_Player/Duh, I'm Chad! I throw\nthe sickest parties man! So sick, everyone's invited!",
					"C:/Users/Player/To_Chad/Awesome man I can't wait\nto go!", 
					"C:/Users/Player/To_Nicole/Are you gonna go?",
					"C:/Users/Nicole/To_Player/Sorry but I'm gonna be\nstuck late here during my summer courses.", 
					"C:/Users/Chad/To_Nicole/You're gonna miss out! My\nparties are the best in the country. Drive to my place\nand crash with me if you want, no pressure.",
					"C:/Users/Nicole/To_Chad/Thanks for the offer but I\nprobably won't even be finished class by the time the\nparties over.", 
					"C:/Users/Chad/To_Nicole/Well the offers there if you\nchange your mind.",
					"C:/Users/Chad/To_Player/Hey, before you go I got\nsome exam sheets you can have.",
					"C:/Users/Player/To_Chad/Thanks, you're the best!."];
					this.dropItem(1, 0, -50, "examsheet");
				npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Chad/Got a spare bed I could\ncrash on for the party?", 
					"C:/Users/Chad/To_Player/Sure do!",
					"C:/Users/Player/To_Chad/Thanks Chad!"];
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Chad/Who's going to the party?", 
					"C:/Users/Chad/To_Player/Chicks, dudes, everyone!"];
					npc.state++;
					break;						
				case 3:
					this.chats = [ 
					"C:/Users/Chad/To_Player/Not now bro. I'm busy\nsetting up."];
					break;
				case 4:
					this.chats = [ 
					"C:/Users/Chad/To_Player/Bro you're gonna love this\nchick I just met. She's perfect for you.",
					"C:/Users/Player/To_Chad/Can this wait? I got to go\nto my exam.",
					"C:/Users/Chad/To_Player/No way you can't miss out\non this chick man! I won't let you.",
					"C:/Users/Player/To_Chad/Sorry but I'm going to go\nto my exam.",
					"C:/Users/Chad/To_Player/Just try to resist me!",
					"C:/Users/Nicole/To_Player/Oh my god don't look!\nThat's some HOT STUFF!!!"];
					//Put Chad into fighting mode
					npc.state = 7;
					break;
			}
            break;
            case "Brad":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Brad/Hey are you going to\nChads party?", 
					"C:/Users/Brad/To_Player/Of course! Everyones\ngoing to that! Chad's the coolest!",
					"C:/Users/Player/To_Brad/Cool man, I'll see you\nthere then.", 
					"C:/Users/Brad/To_Player/Oh could you get some\nbooze?",
					"C:/Users/Player/To_Brad/I would but I'm broke.", 
					"C:/Users/Brad/To_Player/Here take this cash then."];
					npc.state++;
					this.dropItem(2, 0, -50, "money");
					break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Brad/Hey.", 
					"C:/Users/Brad/To_Player/Can't talk dude, busy\nmirin Chads instagram."];
					break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Brad/Hey man long time no see.", 
					"C:/Users/Brad/To_Player/Yeah dude. Been a bummer\nsince Chad isn't here anymore.",
					"C:/Users/Player/To_Brad/He didn't graduate,\nwhere'd he go?", 
					"C:/Users/Brad/To_Player/Got locked up, it's\nridiculous. We ran out of booze at the party since\nChad did a world record keg stand it was sick!\nThen he wasn't gonna let the party dry up on his\nwatch so he drove to the store to get more.",
					"C:/Users/Player/To_Brad/He was caught drunk\ndriving?", 
					"C:/Users/Brad/To_Player/Not just that, your friend\nthere... whats her name... Nicole. She must not have\nbeen watching out cause he hit her when he left\nthe dorm and she died.",
					"C:/Users/Player/To_Brad/Oh my god... no. You're\nmessing with me, right?", 
					"C:/Users/Brad/To_Player/I know it's terrible bro.\nNo more partying with Chad.",
					"C:/Users/Player/To_Brad/Shutup, I mean Nicole.\nShe's really dead?", 
					"C:/Users/Brad/To_Player/Yeah but who cares! It's\nher fault Chad got locked up! Say have you heard\nof JSON... JSON..."];
					npc.state++;
					break;						
			}
            break;
            case "Vlad":
			switch(npc.state){
				case 0:
				this.chats = [
					"C:/Users/Player/To_Vlad/Hey.", 
					"C:/Users/Vlad/To_Player/You can see me! Most\npeople who can see me just stare.",
					"C:/Users/Player/To_Vlad/...",
					"C:/Users/Vlad/To_Player/Oh, okay. Here's some\nanswers to the exams. I'll just fail anyway."];
					this.dropItem(1, 0, -50, "examsheet");
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Vlad/Got anymore answer sheets?", 
					"C:/Users/Vlad/To_Player/Sure do!",
					"C:/Users/Player/To_Vlad/Thanks Vlad. I cancount\non you for these sheets.",
					"C:/Users/Vlad/To_Player/It's the only thing anyone\ncan count on me for.",];
					this.dropItem(1, 0, -50, "examsheet");
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Vlad/Can I have another sheet?", 
					"C:/Users/Vlad/To_Player/This is my last one.\nGOD why didn't I print more! I'm so pathetic!",
					"C:/Users/Player/To_Vlad/Uhh, okay."];
					this.dropItem(1, 0, -50, "examsheet");
					npc.state++;
					break;						
				case 3:
					this.chats = [ 
					"C:/Users/Vlad/To_Player/Not now man. I'm busy\nwallowing in self pity."];
					break;
				case 4:
					this.chats = [ 
					"C:/Users/Vlad/To_Player/I'm so sorry, I ran out of\nthose exam sheets. You must hate me now.",
					"C:/Users/Player/To_Vlad/Can this wait? I got to go\nto my exam.",
					"C:/Users/Vlad/To_Player/Oh god! Now I'm making\nyou late for your exam. You must really hate me!",
					"C:/Users/Player/To_Vlad/Are you crying?",
					"C:/Users/Vlad/To_Player/YES! *He won't move*",
					"C:/Users/oliceN/To_Player/I*nact')ese#mhi!\nsHes'%os^tahpteci!'"];
					//Put Vlad into fighting mode
					npc.state = 7;
					break;
			}
            break
            case "Stevie":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Stevie/Hey there, Mrs Short.", 
					"C:/Users/Stevie/To_Player/Hey I may be energetic\nbut I ain't no StarBucks coffee!",
					"C:/Users/Nicole/To_Stevie/You're looking great\nStevie! How are you doing?", 
					"C:/Users/Stevie/To_Player/She this nice to you?",
					"C:/Users/Player/To_Stevie/Nah I think she's hitting\non you...", 
					"C:/Users/Nicole/To_Stevie/You two... always\nscrewing around.",
					"C:/Users/Player/To_Nicole/Don't worry, I'll let you\nhit on me later. Now though, Stevie needs to hit\non Kyle.", 
					"C:/Users/Stevie/To_Player/Who's Kyle?",
					"C:/Users/Player/To_Stevie/This guy we met that you\nshould hit on. He said he'll hit on you though, so\nfeel free to just wait.", 
					"C:/Users/Stevie/To_Player/Yeah, I'll just nap. Well\nthis energy drinks no use then. Here take it.",
					"C:/Users/Nicole/To_Stevie/Aw you're both so similar,\n enjoy the nap."];
					this.dropItem(3, 0, -50, "energy");
					npc.state++;
					break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Stevie/I thought you were gonna\nnap?", 
					"C:/Users/Stevie/To_Player/Yeah I'm trying this type\nof nap where you're standing.",
					"C:/Users/Nicole/To_Stevie/Sounds pretty hard.", 
					"C:/Users/Stevie/To_Player/It is when people are\ntalking to you."];
					npc.state++;
					break;
				case 2:
					this.chats = [ 
					"C:/Users/Stevie/To_Player/ZZZZzzzZZZzzz"];
					npc.state++;
					break;						
				case 3:
					this.chats = [
					"C:/Users/Player/To_Stevie/Wake up!", 
					"C:/Users/Stevie/To_Player/Huh? why? Is that kyle\nguy here yet?",
					"C:/Users/Player/To_Stevie/Nah just bugging ya.", 
					"C:/Users/Stevie/To_Player/Oh...ZZZzzzZZZzzz"];
					npc.state=2;
					break;
				case 4:
					this.chats = [ 
					"C:/Users/Player/To_Stevie/Sup short stuff?", 
					"C:/Users/Stevie/To_Player/Don't talk to me, I heard\nyou hurt Brad!",
					"C:/Users/Player/To_Stevie/What do you care?", 
					"C:/Users/Stevie/To_Player/We're basically dating.",
					"C:/Users/Player/To_Stevie/Pretty sure he's dating\nClaire, hate to break it to you.", 
					"C:/Users/Stevie/To_Player/Ugh, just shutup will you?\nYou jerk!"];
					npc.state++;
					break;						
				case 5:
					this.chats = [
						"C:/Users/Stevie/To_Player/Buzz off, Brad hater!"];
					break;
			}
			break;
			case "Prof":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Prof/Hey why do I need to take\nmusic?", 
					"C:/Users/Prof/To_Player/Don't ask questions!",
					"C:/Users/Player/To_Prof/Wait what?", 
					"C:/Users/Prof/To_Player/Look I'll give you the exam\nanswers, just go away!",
					"C:/Users/Player/To_Nicole/Is she for real?", 
					"C:/Users/Nicole/To_Player/Shutup don't blow this!"];
					this.dropItem(1, 0, 200, "examsheet");
					npc.state++;
					break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Prof/Look we never met and I\ndon't know you, now scram!", 
					"C:/Users/Prof/To_Player/Sheesh, fine."];
					npc.state++;
					break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Prof/Hey.",
					"C:/Users/Prof/To_Player/Who are you?"];
					break;						
			}
			break;
		}
		//Print first segment of speech
		this.acceptInput();
	}	
}