/* File Name: LevelManager.js
 * Author: Mathew Boland
 * Last Updated: November 7, 2019
 * Description: A class to build a levels animations and sprites for the game
 * given the map and scene.
*/
import {CST} from "./CST";
import { EnemySprite } from "./EnemySprite";

export class LevelManager{
    
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.addObjects();
    }

    addObjects(){
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