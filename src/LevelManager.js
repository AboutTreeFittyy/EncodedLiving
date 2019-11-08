/* File Name: LevelManager.js
 * Author: Mathew Boland
 * Last Updated: November 8, 2019
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
                    //Have her follow the player around                                      
                    if(this.scene.player.y - 100 > this.scene.npcCont.list[i].y){
                        //player below
                        this.scene.npcCont.list[i].setVelocityY(256);
                        anim = "nicoledown";
                    }else if (this.scene.player.y + 100 < this.scene.npcCont.list[i].y){
                        //player above
                        this.scene.npcCont.list[i].setVelocityY(-256);
                        anim = "nicoleup";
                    }else{
                        this.scene.npcCont.list[i].setVelocityY(0);
                    }
                    if(this.scene.player.x - 100 > this.scene.npcCont.list[i].x){
                        //player in front
                        this.scene.npcCont.list[i].setVelocityX(256);
                        anim = "nicoleright";
                    }else if (this.scene.player.x + 100< this.scene.npcCont.list[i].x){
                        //player behind
                        this.scene.npcCont.list[i].setVelocityX(-256);
                        anim = "nicoleleft";
                    }else{
                        this.scene.npcCont.list[i].setVelocityX(0);
                    }
                    if(anim != "nothing"){
                        this.scene.npcCont.list[i].play(anim, true);
                    }
                    break;
                case "Claire1":
                case "Claire2":
                case "Kyle":
                case "Brad":
                case "Prof":
                case "Stevie":                    
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
                        this.scene.enemyCont.list[i].play("jason" + anim, true);
                    }else{
                        //have npc look at player general direction unless behind
                        if(this.scene.player.y > this.scene.enemyCont.list[i].y+50){
                            //face down
                            this.scene.enemyCont.list[i].setFrame(4);
                        }else if(this.scene.player.y < this.scene.enemyCont.list[i].y-50){
                            //face up
                            this.scene.enemyCont.list[i].setFrame(40);
                        }else if(this.scene.player.x > this.scene.enemyCont.list[i].x){
                            //face right to player
                            this.scene.enemyCont.list[i].setFrame(28);
                        }else if(this.scene.player.x < this.scene.enemyCont.list[i].x){
                            //face left to player
                            this.scene.enemyCont.list[i].setFrame(16);
                        }
                    }
                    break;
            }
        } 
    }

    setPlayer(){
        //add game sprites              
        this.scene.player = new CharacterSprite(this.scene, 400, 3400, CST.SPRITE.PLAYER, 130);
        this.scene.player.setCollideWorldBounds(true);
        //align the player hitbox and set its size
        this.scene.player.setSize(32,48);
        this.scene.player.setOffset(16,12);
        //the whip sprite takes any
        this.scene.whip = new CharacterSprite(this.scene, 400, 3600, CST.SPRITE.WHIP, 0);
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
        this.scene.keyboard = this.scene.input.keyboard.addKeys("W, A, S, D");
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
            switch(this.scene.player.isFacing){
                case "left":this.scene.playerCont.list[0].play("playerwhipleft");
                this.scene.playerCont.list[1].play("whip_left");
                break;
                case "right":this.scene.playerCont.list[0].play("playerwhipright");
                this.scene.playerCont.list[1].play("whip_right");
                break;
                case "up":this.scene.playerCont.list[0].play("playerwhipup");
                this.scene.playerCont.list[1].play("whip_up");
                break;
                case "down":this.scene.playerCont.list[0].play("playerwhipdown");
                this.scene.playerCont.list[1].play("whip_down");
                break;
            }            
        })
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
        this.createNPCS(512, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 49, 85, 61, 73, "Claire1");
        this.createNPCS(473, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 10, 46, 22, 34, "Claire2");
        this.createNPCS(515, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 52, 88, 64, 76, "Prof");
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
        this.createEnemies(579, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2up", 5, 2);
        this.createEnemies(582, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2right", 5, 2);
        this.createEnemies(585, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2left", 5, 2);
        this.createEnemies(467, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 5, "jason", 5, 1.5);
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
            sprite.body.setSize(22,44);
            sprite.setScale(1.5);
            sprite.body.setOffset(16,16);
            this.scene.npcSet.add(sprite);
            this.scene.npcCont.add(sprite);
            //This triggers when enemy hits player
            this.scene.physics.add.collider(this.scene.player, sprite, sprite.enemyCollide, null, this);
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
            //This triggers when enemy hits player
            this.scene.physics.add.collider(this.scene.player, sprite, sprite.enemyCollide, null, this);
            //This triggers when they hit an npc
            this.scene.physics.add.collider(this.scene.npcSet, sprite, sprite.enemyCollide, null, this);
        });
    }
}