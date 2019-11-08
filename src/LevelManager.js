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
        //get interactive objects from the map
        let itemSet = this.scene.physics.add.group();
        this.map.createFromObjects("items", 67, {key: CST.SPRITE.ITEM, frame: 2}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            itemSet.add(sprite);
            sprite.setSize(32,32);
            sprite.body.setOffset(0,0);
        });
        //add the collider for all the items
        this.scene.physics.add.collider(this.scene.player, itemSet, this.scene.player.collectItem, null, this);
        //make npcs
        let npcSet = this.scene.physics.add.group();
        this.map.createFromObjects("npcs", 69, {key: CST.SPRITE.NPCS, frame: 0}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = "Nicole";
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
        });
        this.map.createFromObjects("npcs", 71, {key: CST.SPRITE.NPCS, frame: 2}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = "Hannah";
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
        });
        this.map.createFromObjects("npcs", 72, {key: CST.SPRITE.NPCS, frame: 3}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = "Claire";
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
        });
        this.map.createFromObjects("npcs", 73, {key: CST.SPRITE.NPCS, frame: 4}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = "Stevie";
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
        });
        //add the collider for all the npcs
        this.scene.physics.add.collider(this.scene.player, npcSet, this.scene.player.npcSpeak, null, this);
        //make enemies
        this.scene.enemySet = this.scene.physics.add.group();
        this.scene.enemyCont = this.scene.add.container();
        //using npcs 6 frame to have blank inserted as i make my own sprite after
        this.map.createFromObjects("enemies", 80, {key: CST.SPRITE.NPCS, frame: 6}).map((sprite)=>{
            sprite = new EnemySprite(this.scene, sprite.x, sprite.y, CST.SPRITE.NERD1, 1, "nerddown", 5);
            sprite.body.setSize(22,44);
            sprite.body.setOffset(16,16);
            this.scene.enemySet.add(sprite);
            this.scene.enemyCont.add(sprite);
            sprite.setCollideWorldBounds(true);
            //This triggers when enemy hits player
            this.scene.physics.add.collider(this.scene.player, sprite, sprite.enemyCollide, null, this);
            //This triggers when they hit an npc
            this.scene.physics.add.collider(npcSet, sprite, sprite.enemyCollide, null, this);
        });
         //using npcs 6 frame to have blank inserted as i make my own sprite after
         this.map.createFromObjects("enemies", 95, {key: CST.SPRITE.NPCS, frame: 6}).map((sprite)=>{
            sprite = new EnemySprite(this.scene, sprite.x, sprite.y, CST.SPRITE.JASON, 1, "jason", 5);
            sprite.body.setSize(22,44);
            sprite.setScale(1.5);
            sprite.body.setOffset(16,16);
            this.scene.enemySet.add(sprite);
            this.scene.enemyCont.add(sprite);
            sprite.setCollideWorldBounds(true);
            //This triggers when enemy hits player
            this.scene.physics.add.collider(this.scene.player, sprite, sprite.enemyCollide, null, this);
            //This triggers when they hit an npc
            this.scene.physics.add.collider(npcSet, sprite, sprite.enemyCollide, null, this);
        });
    }
}