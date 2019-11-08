/* File Name: EnemySprite.js
 * Author: Mathew Boland
 * Last Updated: November 4, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
export class EnemySprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, frame, name, hp) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(2);        
        scene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.hp = hp;
        this.name = name;
        this.startX = x;
        this.startY = y;
        this.collideName = '';
    }

    enemyCollide(player, enemy){
        //Check if it's enemy thats set
        if(enemy.name == "nerd1up"){
            enemy.setVelocityY(-90);
            enemy.name = "nerd1down";
        } else if(enemy.name == "nerd1down"){
            enemy.setVelocityY(90);
            enemy.name = "nerd1up";
        } else if(enemy.name == "nerd1right"){
            enemy.setVelocityX(90);
            enemy.name = "nerd1left";
        } else if(enemy.name == "nerd1left"){
            enemy.setVelocityX(-90);
            enemy.name = "nerd1right";
        }  
        //Check if it's player thats set
        if(player.name == "nerd1up"){
            player.setVelocityY(-90);
            player.name = "nerd1down";
        } else if(player.name == "nerd1down"){
            player.setVelocityY(90);
            player.name = "nerd1up";
        } else if(player.name == "nerd1right"){
            player.setVelocityX(90);
            player.name = "nerd1left";
        } else if(player.name == "nerd1left"){
            player.setVelocityX(-90);
            player.name = "nerd1right";
        }    
    }
}