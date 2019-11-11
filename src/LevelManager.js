/* File Name: LevelManager.js
 * Author: Mathew Boland
 * Last Updated: November 10, 2019
 * Description: A class to build a levels animations and sprites for the game
 * given the map and scene.
*/
import {CST} from "./CST";
import { Sprite } from "./Sprite";
import { EnemySprite } from "./EnemySprite";
import { CharacterSprite } from "./CharacterSprite";
export class LevelManager{
    
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.setPlayer();
        this.setObjects();
        this.setCMDS();
        this.setCameras();
        this.setInputs();
    }

    updateEnemies(){
        //Scan through all the NPCs to update them
        for(let i = 0; i < this.scene.npcCont.count('visible', true); i++){
            let anim = "nothing";  
            switch(this.scene.npcCont.list[i].name){
                case "Nicole":
                case "NicoleD":
                    //Have her follow the player around                                      
                    if(this.scene.player.y - 100 > this.scene.npcCont.list[i].y){
                        //player below
                        this.scene.npcCont.list[i].setVelocityY(256);
                        anim = "down";
                    }else if (this.scene.player.y + 100 < this.scene.npcCont.list[i].y){
                        //player above
                        this.scene.npcCont.list[i].setVelocityY(-256);
                        anim = "up";
                    }else{
                        this.scene.npcCont.list[i].setVelocityY(0);
                    }
                    if(this.scene.player.x - 100 > this.scene.npcCont.list[i].x){
                        //player in front
                        this.scene.npcCont.list[i].setVelocityX(256);
                        anim = "right";
                    }else if (this.scene.player.x + 100< this.scene.npcCont.list[i].x){
                        //player behind
                        this.scene.npcCont.list[i].setVelocityX(-256);
                        anim = "left";
                    }else{
                        this.scene.npcCont.list[i].setVelocityX(0);
                    }
                    if(anim != "nothing"){
                        this.scene.npcCont.list[i].play(this.scene.npcCont.list[i].name + anim, true);
                    }
                    break;
                case "Kyle":
                case "Claire1":
                case "Claire2":
                case "Brad":
                case "Prof":
                case "Stevie": 
                case "chad":                   
                    //Now check if they've been pushed from their origin
                    if(this.scene.npcCont.list[i].startY - 50 > this.scene.npcCont.list[i].y){
                        //npc below
                        this.scene.npcCont.list[i].setVelocityY(128);
                        anim = "down";
                    }else if (this.scene.npcCont.list[i].startY + 50 < this.scene.npcCont.list[i].y){
                        //npc above
                        this.scene.npcCont.list[i].setVelocityY(-128);
                        anim = "up";
                    }else{
                        this.scene.npcCont.list[i].setVelocityY(0);
                    }
                    if(this.scene.npcCont.list[i].startX - 50 > this.scene.npcCont.list[i].x){
                        //npc in front
                        this.scene.npcCont.list[i].setVelocityX(128);
                        anim = "right";
                    }else if (this.scene.npcCont.list[i].startX + 50 < this.scene.npcCont.list[i].x){
                        //npc behind
                        this.scene.npcCont.list[i].setVelocityX(-128);
                        anim = "left";
                    }else{
                        this.scene.npcCont.list[i].setVelocityX(0);
                    }
                    if(anim != "nothing"){
                        this.scene.npcCont.list[i].play(this.scene.npcCont.list[i].name + anim, true);
                    }else{
                        //have npc look at player general direction unless behind
                        if(this.scene.player.y > this.scene.npcCont.list[i].y+50){
                            //face down
                            this.scene.npcCont.list[i].setFrame(this.scene.npcCont.list[i].down);
                        }else if(this.scene.player.y < this.scene.npcCont.list[i].y-50){
                            //face up
                            this.scene.npcCont.list[i].setFrame(this.scene.npcCont.list[i].up);
                        }else if(this.scene.player.x > this.scene.npcCont.list[i].x){
                            //face right to player
                            this.scene.npcCont.list[i].setFrame(this.scene.npcCont.list[i].right);
                        }else if(this.scene.player.x < this.scene.npcCont.list[i].x){
                            //face left to player
                            this.scene.npcCont.list[i].setFrame(this.scene.npcCont.list[i].left);
                        }
                    }
                    break
            }
        } 
        //Scan through all the enemy objects to update them
        for(let i = 0; i < this.scene.enemyCont.count('visible', true); i++){
            let anim = "nothing"; 
            switch(this.scene.enemyCont.list[i].name){
                case "nerd1down":
                    this.scene.enemyCont.list[i].play("nerd1down", true);
                    this.scene.enemyCont.list[i].setVelocityY(90);
                    break;
                case "nerd1up":
                    this.scene.enemyCont.list[i].play("nerd1up", true);
                    this.scene.enemyCont.list[i].setVelocityY(-90);
                    break;
                case "nerd1left":
                        this.scene.enemyCont.list[i].play("nerd1left", true);
                        this.scene.enemyCont.list[i].setVelocityX(-90);
                        break;
                case "nerd1right":
                        this.scene.enemyCont.list[i].play("nerd1right", true);
                        this.scene.enemyCont.list[i].setVelocityX(90);
                        break;
                case "nerd2down":
                    this.scene.enemyCont.list[i].play("nerd2down", true);
                    this.scene.enemyCont.list[i].setVelocityY(90);
                    break;
                case "nerd2up":
                    this.scene.enemyCont.list[i].play("nerd2up", true);
                    this.scene.enemyCont.list[i].setVelocityY(-90);
                    break;
                case "nerd2left":
                        this.scene.enemyCont.list[i].play("nerd2left", true);
                        this.scene.enemyCont.list[i].setVelocityX(-90);
                        break;
                case "nerd2right":
                        this.scene.enemyCont.list[i].play("nerd2right", true);
                        this.scene.enemyCont.list[i].setVelocityX(90);
                        break;
                case "jason":
                case "nerdgirl":
                    //Now check if they've been pushed from their origin
                    if(this.scene.enemyCont.list[i].startY - 50 > this.scene.enemyCont.list[i].y){
                        //npc below
                        this.scene.enemyCont.list[i].setVelocityY(128);
                        anim = "down";
                    }else if (this.scene.enemyCont.list[i].startY + 50 < this.scene.enemyCont.list[i].y){
                        //npc above
                        this.scene.enemyCont.list[i].setVelocityY(-128);
                        anim = "up";
                    }else{
                        this.scene.enemyCont.list[i].setVelocityY(0);
                    }
                    if(this.scene.enemyCont.list[i].startX - 50 > this.scene.enemyCont.list[i].x){
                        //npc in front
                        this.scene.enemyCont.list[i].setVelocityX(128);
                        anim = "right";
                    }else if (this.scene.enemyCont.list[i].startX + 50 < this.scene.enemyCont.list[i].x){
                        //npc behind
                        this.scene.enemyCont.list[i].setVelocityX(-128);
                        anim = "left";
                    }else{
                        this.scene.enemyCont.list[i].setVelocityX(0);
                    }
                    if(anim != "nothing"){
                        this.scene.enemyCont.list[i].play(this.scene.enemyCont.list[i].name + anim, true);
                    }else{
                        //have npc look at player general direction unless behind
                        if(this.scene.player.y > this.scene.enemyCont.list[i].y+50){
                            //face down
                            if(this.scene.enemyCont.list[i].name == "jason"){
                                this.scene.enemyCont.list[i].setFrame(4);//jason
                            }else{
                                this.scene.enemyCont.list[i].setFrame(2);//nerdgirl
                            }                            
                        }else if(this.scene.player.y < this.scene.enemyCont.list[i].y-50){
                            //face up
                            if(this.scene.enemyCont.list[i].name == "jason"){
                                this.scene.enemyCont.list[i].setFrame(40);//jason
                            }else{
                                this.scene.enemyCont.list[i].setFrame(12);//nerdgirl
                            } 
                        }else if(this.scene.player.x > this.scene.enemyCont.list[i].x){
                            //face right to player
                            if(this.scene.enemyCont.list[i].name == "jason"){
                                this.scene.enemyCont.list[i].setFrame(28);//jason
                            }else{
                                this.scene.enemyCont.list[i].setFrame(8);//nerdgirl
                            } 
                        }else if(this.scene.player.x < this.scene.enemyCont.list[i].x){
                            //face left to player
                            if(this.scene.enemyCont.list[i].name == "jason"){
                                this.scene.enemyCont.list[i].setFrame(16);//jason
                            }else{
                                this.scene.enemyCont.list[i].setFrame(4);//nerdgirl
                            } 
                        }
                    }
                    break;
            }
        } 
    }

    setPlayer(){
        //add game sprites              
        this.scene.player = new CharacterSprite(this.scene, 700, 4000, CST.SPRITE.PLAYER, 130);
        //align the player hitbox and set its size
        this.scene.player.setSize(32,48);
        this.scene.player.setOffset(16,12);
        //the whip sprite takes any
        this.scene.whip = new CharacterSprite(this.scene, 700, 4000, CST.SPRITE.WHIP, 0);
        this.scene.whip.setVisible(false);
        this.scene.whip.setScale(3);
        this.scene.playerCont = this.scene.add.container(0, 0, [this.scene.player, this.scene.whip]).setDepth(1);
        //initialize player and whip to face down at start
        this.scene.player.isFacing = "down";
        this.scene.player.setPosition(this.scene.player.x,this.scene.player.y);
        this.scene.whip.setPosition(this.scene.player.x,this.scene.player.y+70);
    }

    setCMDS(){
        //create info cmd prompts on sides
        this.scene.cmd1 = this.scene.add.image(-1000, -1000, CST.IMAGE.CMD).setDepth(1);
        this.scene.cmd1.displayHeight = this.scene.game.renderer.height;
        this.scene.cmd2 = this.scene.add.image(-1000, 1000, CST.IMAGE.CMD).setDepth(1);
        this.scene.cmd2.displayHeight = this.scene.game.renderer.height;
        //now make their text fields
        this.scene.cmd1Text = this.scene.add.text(this.scene.cmd1.x - (this.scene.cmd1.width/2), this.scene.cmd1.y - (this.scene.cmd1.height/2), 'C:/Users/Player/Stats>\n', { fontFamily: '"Roboto Condensed"' }).setDepth(2);
        this.scene.cmd1Text.setColor("green");
        this.scene.cmd2Text = this.scene.add.text(this.scene.cmd2.x - (this.scene.cmd2.width/2), this.scene.cmd2.y - (this.scene.cmd2.height/2), 'C:/Users/Player/Conversations>\n', { fontFamily: '"Roboto Condensed"' }).setDepth(2);
        this.scene.cmd2Text.setColor("green");
        //Create a counter for the lines entered so we can keep track of when they run out
        this.scene.cmd1Lines = 1;
        this.scene.cmd2Lines = 1;
    }

    setInputs(){
        //set up keyboard controls
        this.scene.keyboard = this.scene.input.keyboard.addKeys("W, A, S, D, R");
        //Set listener for p to pause game
        this.scene.input.keyboard.on('keyup-P', ()=>{
            this.scene.scene.launch(CST.SCENES.PAUSE);
            this.scene.scene.pause();
        })
        this.scene.input.keyboard.on('keyup-Y', ()=>{
            this.scene.scene.launch(CST.SCENES.SHOP);
            this.scene.scene.pause();
        })
        //Adjust zoom out
        this.scene.input.keyboard.on('keyup-U', ()=>{
            this.scene.cameras.main.setZoom(0.5);
        })
        //Adjust zoom in
        this.scene.input.keyboard.on('keyup-I', ()=>{
            this.scene.cameras.main.setZoom(1);
        })
        //attack with whip input
        this.scene.input.keyboard.on("keydown-F", ()=>{
            //indicate that attack animation is playing
            this.scene.player.setState(1);
            //stop player from moving if they were
            this.scene.player.setVelocityY(0);
            this.scene.player.setVelocityX(0);
            //Create a one time listener to make player movable again after animation finishes
            this.scene.playerCont.list[1].once("animationcomplete", this.toggleAttack);
            //if(!this.scene.player.state){
                switch(this.scene.player.isFacing){
                    case "left":this.scene.whip.setPosition(this.scene.player.x-70,this.scene.player.y+20);
                    this.scene.playerCont.list[0].play("attackleft", true);
                    this.scene.playerCont.list[1].play("whip_left", true);                    
                    break;
                    case "right": this.scene.whip.setPosition(this.scene.player.x+70,this.scene.player.y);    
                    this.scene.playerCont.list[0].play("attackright");
                    this.scene.playerCont.list[1].play("whip_right");
                    break;
                    case "up":this.scene.whip.setPosition(this.scene.player.x,this.scene.player.y-70);
                    this.scene.playerCont.list[0].play("attackup");
                    this.scene.playerCont.list[1].play("whip_up");
                    break;
                    case "down":this.scene.whip.setPosition(this.scene.player.x,this.scene.player.y+70);
                    this.scene.playerCont.list[0].play("attackdown");
                    this.scene.playerCont.list[1].play("whip_down");
                    break;
                }         
        })
        //attack with ping pong ball input
        this.scene.input.keyboard.on("keydown-SPACE", ()=>{
            if(this.scene.player.balls >= 1){   
                this.scene.player.balls--;
                //create the new ball sprite to throw, with colliders and a timer to destroy it on contact or no contact
                let ball = new CharacterSprite(this.scene, this.scene.player.x, this.scene.player.y, CST.SPRITE.BALL, 0).setDepth(5);
                this.scene.physics.add.collider(this.scene.enemySet, ball, ball.ballHitEnemy, null, this.scene);
                this.scene.physics.add.collider(this.scene.topLayer, ball, ball.ballHitWall, null, this.scene);
                this.scene.time.delayedCall(1000, ball.ballHitWall, [ball, ball], this.scene);
                ball.setOffset(8,6);
                switch(this.scene.player.isFacing){
                    case "left":this.scene.playerCont.list[0].play("attackleft");
                    ball.setVelocityX(-512);  
                    ball.x -=25;              
                    break;                
                    case "right":this.scene.playerCont.list[0].play("attackright");
                    ball.setVelocityX(512);
                    ball.x +=25
                    break;                
                    case "up":this.scene.playerCont.list[0].play("attackup");
                    ball.setVelocityY(-512);
                    ball.y -=25;
                    break;                
                    case "down":this.scene.playerCont.list[0].play("attackdown");
                    ball.setVelocityY(512);
                    ball.y+=25;
                    break;
                } 
            }           
        })
    }

    toggleAttack(){
        //this flag checks if the player can move or not
        this.scene.player.setState(0);
        //this flag checks if an enemy has already taken damage from the whip
        this.scene.whip.setState(0);
        //this puts the whip sprite out of view until its needed again
        this.scene.whip.x = 0;
        this.scene.whip.y = 0;
    }

    setCameras(){
        //have camera follow player around
        this.scene.cameras.add( 0, 0, this.scene.cmd1.displayWidth, this.scene.game.renderer.height, false, "cmd1");
        let cam1 = this.scene.cameras.getCamera("cmd1");
        cam1.centerOn(-1000,-1000);
        //have camera follow player around
        this.scene.cameras.add( this.scene.game.renderer.width-this.scene.cmd2.displayWidth-50, 0, this.scene.cmd2.displayWidth, this.scene.game.renderer.height, false, "cmd2");
        let cam2 = this.scene.cameras.getCamera("cmd2");
        cam2.centerOn(-1000,1000);
        this.scene.cameras.main.startFollow(this.scene.player);
        this.scene.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
    }

    setObjects(){
        //Make item physcis group
        this.itemSet = this.scene.physics.add.group();
        //Make items from map
        this.createItems(459, 0, "dvd");
        this.createItems(460, 1, "examsheet");
        this.createItems(461, 2, "money");
        this.createItems(462, 3, "energy");
        //add the collider for all the items
        this.scene.physics.add.collider(this.scene.player, this.itemSet, this.scene.player.collectItem, null, this);
        //make group for npcs physics
        this.scene.npcSet = this.scene.physics.add.group();
        //make npcs from map
        //add the collider for all the npcs
        this.scene.physics.add.collider(this.scene.player, this.npcSet, this.scene.player.npcSpeak, null, this);
        
        this.scene.npcCont = this.scene.add.container();
        this.createNPCS(470, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 8, 44, 20, 32, "Nicole");
        //this.createNPCS(591, CST.SPRITE.NPCS, 6, CST.SPRITE.NICOLED, 2, 14, 6, 10, "NicoleD");
        this.createNPCS(4704, CST.SPRITE.NPCS, 6, CST.SPRITE.CHAD, 0, 3, 1, 4, "chad");
        this.createNPCS(512, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 49, 85, 61, 73, "Claire1");
        this.createNPCS(473, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 10, 46, 22, 34, "Claire2");
        this.createNPCS(515, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 52, 88, 64, 76, "Prof");
        this.createNPCS(4741, CST.SPRITE.NPCS, 6, CST.SPRITE.KYLE, 2, 14, 6, 10, "Kyle");
        this.createNPCS(4756, CST.SPRITE.NPCS, 6, CST.SPRITE.BRAD, 2, 14, 6, 10, "Brad");
        this.createNPCS(4792, CST.SPRITE.NPCS, 6, CST.SPRITE.STEVIE, 18, 0, 9, 27, "Stevie");
        //make enemies group and container to handle them with*/
        this.scene.enemySet = this.scene.physics.add.group();
        this.scene.enemyCont = this.scene.add.container();
        //using npcs 6 frame to have blank sprite generated so I can make my own inside the function
        //Make different enemies
        this.createEnemies(560, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1down", 5, 2);
        this.createEnemies(564, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1up", 5, 2);
        this.createEnemies(568, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1right", 5, 2);
        this.createEnemies(572, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1left", 5, 2);
        this.createEnemies(576, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2down", 5, 2);
        this.createEnemies(588, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2up", 5, 2);
        this.createEnemies(580, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2right", 5, 2);
        this.createEnemies(584, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2left", 5, 2);
        this.createEnemies(467, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 5, "jason", 5, 1.5);
        this.createEnemies(4724, CST.SPRITE.NPCS, 6, CST.SPRITE.NERDGIRL, 2, "nerdgirl", 1500, 1.5);
        this.scene.physics.add.collider(this.scene.enemySet, this.scene.topLayer);
    }

    createItems(key, frame, name){
        this.map.createFromObjects("items", key, {key: CST.SPRITE.ITEM, frame: frame}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            sprite.name = name;
            this.itemSet.add(sprite);
            sprite.setSize(32,32);
            sprite.body.setOffset(0,0);
        });
    }

    createNPCS(key, cst1, frame, cst2, down, up, left, right, name){
        this.map.createFromObjects("npcs", key, {key: cst1, frame: frame}).map((sprite)=>{
            sprite = new Sprite(this.scene, sprite.x, sprite.y, cst2, down, up, left, right, name);
            sprite.body.setSize(sprite.displayWidth/2,sprite.displayHeight/2);
            sprite.setScale(1.5);
            this.scene.npcSet.add(sprite);
            this.scene.npcCont.add(sprite);
            //This triggers when enemy hits player
            this.scene.physics.add.collider(this.scene.player, sprite, sprite.npcSpeak, null, this);
        });
    }

    createEnemies(key, cst1, frame, cst2, st, name, hp, size){
        this.map.createFromObjects("enemies", key, {key: cst1, frame: frame}).map((sprite)=>{
            sprite = new EnemySprite(this.scene, sprite.x, sprite.y, cst2, st, name, hp);
            sprite.body.setSize(22,44);
            sprite.setScale(size);
            sprite.body.setOffset(16,16);
            this.scene.enemySet.add(sprite);
            this.scene.enemyCont.add(sprite);
            sprite.setCollideWorldBounds(true);
            //This triggers when enemy hits player, npc, furnishings or the toplayer/borders of the game
            this.scene.physics.add.collider(this.scene.player, sprite, sprite.enemyCollide, null, this);
            this.scene.physics.add.collider(this.scene.npcSet, sprite, sprite.enemyCollide, null, this);
            this.scene.physics.add.collider(this.scene.furnishing, sprite, sprite.enemyCollide, null, this);
            this.scene.physics.add.collider(this.scene.topLayer, sprite, sprite.enemyCollide, null, this);
        });
    }
}