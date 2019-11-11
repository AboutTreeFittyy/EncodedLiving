/* File Name: EnemySprite.js
 * Author: Mathew Boland
 * Last Updated: November 11, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
import {CST} from "./CST";
export class EnemySprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, frame, name, rep, dmg) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(2);        
        scene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.dmg = dmg;
        this.rep = rep;
        this.jsons = 5;
        this.name = name;
        this.startX = x;
        this.startY = y;
    }

    ballHit(ball){
        this.rep--;
        if(this.rep <= 0){
            this.destory();
        }
    }

    jsonHitPlayer(player, json){
        //adjust inventory and player stats on hit from json
        player.rep -= json.dmg;
        json.scene.sound.play(CST.AUDIO.JSON, {
            loop: false
        })
        player.displayInventory();
        if(player.rep <= 0){
            //player.destroy();
        }
        json.destroy();
    }

    jsonHitWall(json, wall){
        //timer calls this even if its been deleted so make sure it still exists
        if(json.scene != null){
            json.jsons++;
            json.destroy();
        }        
    }

    jsonTimeOut(json, jason){
        //console.log("as"+JSON.stringify(jason));//timer calls this even if its been deleted so make sure it still exists
        if(jason.scene != null){
            jason.jsons++;
            json.destroy();
        }        
    }

    enemyCollide(player, enemy){
        let curName;
        //Save whichever is in use to a temp variable to test conditions with
        if(player.name != ''){
            curName = player;
        }else{
            curName = enemy;
            //adjust inventory and player stats on hit from json
            player.rep -= curName.dmg;
            player.displayInventory();
            if(player.rep <= 0){
                //player.destroy();
            }
        }
        //Based on the name from the collision decide what to do
        switch(curName.name){
            //For nerds just switch their current direction, slice their name so that it keeps the same variation number
            case "nerd1up":
            case "nerd2up":
                curName.setVelocityY(-90);
                curName.name = curName.name.slice(0, 5)+"down";
            break;
            case "nerd1down":
            case "nerd2down":  
                curName.setVelocityY(90);
                curName.name = curName.name.slice(0, 5)+"up";
            break;
            case "nerd1right":
            case "nerd2right":  
                curName.setVelocityX(90);
                curName.name = curName.name.slice(0, 5)+"left"; 
            break;
            case "nerd1left":
            case "nerd2left":  
                curName.setVelocityX(-90);
                curName.name = curName.name.slice(0, 5)+"right";
            break;
        }
        //Now store the temp variable back into the game object
        if(player.name != ''){
            player.name = curName.name;
        }else{
            enemy.name = curName.name;
        }  
    }
}