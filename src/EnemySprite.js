/* File Name: EnemySprite.js
 * Author: Mathew Boland
 * Last Updated: November 16, 2019
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
        this.state = 0;
        this.rep = rep;
        this.jsons = 5;
        this.name = name;
        this.startX = x;
        this.startY = y;
    }

    failPlayer(player){
        //Play death sound effect
        player.visible = false;
        player.scene.sound.play(CST.AUDIO.DEATH, {
            volume: 0.5,
            loop: false
        })
        //Enter the game over scene (LoseScene)
        player.scene.scene.pause();
        player.scene.scene.launch(CST.SCENES.LOSE, player.scene);
    }

    projectileHitPlayer(player, projectile){
        //adjust inventory and player stats on hit from projectile
        player.rep -= projectile.dmg;
        //Play sound effect
        if(projectile.name == "json"){
            projectile.scene.sound.play(CST.AUDIO.JSON, {
                loop: false
            })
        }       
        player.displayInventory();
        if(player.rep <= 0){
            projectile.failPlayer(player);//Player loses
        }
        projectile.destroy();
    }

    projectileHitWall(projectile, wall){
        //timer calls this even if its been deleted so make sure it still exists
        if(projectile.scene != null){
            projectile.jsons++;
            projectile.destroy();
        }        
    }

    projectileTimeOut(projectile, enemy){
        //timer calls this even if its been deleted so make sure it still exists
        if(enemy.scene != null){
            enemy.jsons++;
            projectile.destroy();
        }        
    }

    enemyCollide(player, enemy){
        let curName;
        //Save whichever is in use to a temp variable to test conditions with
        if(player.name != ''){
            curName = player;
        }else{
            curName = enemy;
            //adjust inventory and player stats on hit from json if not in cooldown state
            if(curName.state == 0){
                player.rep -= curName.dmg;
                player.displayInventory();
                if(player.rep <= 0){
                    curName.failPlayer(player); //Player loses
                }
                if(curName.dmg > 0){
                    //Play player hit sound effect
                    curName.scene.sound.play(CST.AUDIO.PLAYERHIT, {
                        loop: false
                    })
                }
            }
        }
        let coolTime = 500; //Standard for nerds
        if(curName.state == 0){
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
                case "nerdgirl":  
                    //Spawn in ten nerds from above without hitboxes for the map
                    let sprite;
                    for(var i = -5; i < 5; i++){
                        sprite = new EnemySprite(curName.scene, curName.x + i * 50, curName.y - 500, CST.SPRITE.NERD1, 0, "nerd1down", 5, 3);
                        sprite.body.setSize(22,44);
                        sprite.setScale(2);
                        sprite.body.setOffset(16,16);
                        curName.scene.enemySet.add(sprite);
                        curName.scene.enemyCont.add(sprite);
                        curName.scene.physics.add.collider(curName.scene.player, sprite, sprite.enemyCollide, null, curName.scene);
                    }
                    coolTime = 4000; //Have longer cooldown delay for spawning nerds
                break;
            }
            //Now store the temp variable back into the game object
            if(player.name != ''){
                player.name = curName.name;
            }else{
                enemy.name = curName.name;
            }
            curName.state = 1; //Set a timer to make enemies only be affected by collisions at most once per second
            curName.scene.time.delayedCall(coolTime, curName.coolDown, [this.scene.player, curName], this.scene);
        }  
    }

    coolDown(player, enemy){
        //Set active hitting state
        enemy.state = 0;
    }
}