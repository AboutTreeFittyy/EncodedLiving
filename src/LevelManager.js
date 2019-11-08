/* File Name: LevelManager.js
 * Author: Mathew Boland
 * Last Updated: November 7, 2019
 * Description: A class to build a levels animations and sprites for the game
 * given the map and scene.
*/
import {CST} from "./CST";
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
        for(let i = 0; i < this.scene.enemyCont.count('visible', true); i++){
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
                case "jason":
                    //have jason look at player general direction unless behind
                    if(this.scene.player.y > this.scene.enemyCont.list[i].y+50){
                        //face down
                        this.scene.enemyCont.list[i].setFrame(1);
                    }else if(this.scene.player.x > this.scene.enemyCont.list[i].x){
                        //face right to player
                        this.scene.enemyCont.list[i].setFrame(7);
                    }else if(this.scene.player.x < this.scene.enemyCont.list[i].x){
                        //face left to player
                        this.scene.enemyCont.list[i].setFrame(4);
                    }
                    break;
            }
        } 
    }

    setPlayer(){
        //add game sprites              
        this.scene.player = new CharacterSprite(this.scene, 400, 400, CST.SPRITE.PLAYER, 130);
        this.scene.player.setCollideWorldBounds(true);
        //align the player hitbox and set its size
        this.scene.player.setSize(32,48);
        this.scene.player.setOffset(16,12);
        //the whip sprite takes any
        this.scene.whip = new CharacterSprite(this.scene, 400, 400, CST.SPRITE.WHIP, 0);
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
        this.createItems(67, 2, "money");
        //add the collider for all the items
        this.scene.physics.add.collider(this.scene.player, this.itemSet, this.scene.player.collectItem, null, this);
        //make group for npcs physics
        this.npcSet = this.scene.physics.add.group();
        //make npcs from map
        this.createNPCS(69, 0, "Nicole");
        this.createNPCS(71, 2, "Hannah");
        this.createNPCS(72, 3, "Claire");
        this.createNPCS(73, 4, "Stevie");
        //add the collider for all the npcs
        this.scene.physics.add.collider(this.scene.player, this.npcSet, this.scene.player.npcSpeak, null, this);
        //make enemies group and container to handle them with
        this.scene.enemySet = this.scene.physics.add.group();
        this.scene.enemyCont = this.scene.add.container();
        //using npcs 6 frame to have blank sprite generated so I can make my own inside the function
        //Make different enemies
        this.createEnemies(80, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1down", 5, 2)
        this.createEnemies(92, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1up", 5, 2)
        this.createEnemies(88, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1right", 5, 2)
        this.createEnemies(84, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1left", 5, 2)
        this.createEnemies(95, CST.SPRITE.NPCS, 6, CST.SPRITE.JASON, 1, "jason", 5, 1.5);
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

    createNPCS(key, frame, name){
        this.map.createFromObjects("npcs", key, {key: CST.SPRITE.NPCS, frame: frame}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            this.npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = name;
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
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
            this.scene.physics.add.collider(this.npcSet, sprite, sprite.enemyCollide, null, this);
        });
    }
}