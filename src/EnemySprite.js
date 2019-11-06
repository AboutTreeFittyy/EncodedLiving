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
        //Make sure that you can't just keep talking to someone 
        if(enemy.name == "nerdup"){
            enemy.setVelocityY(-90);
            enemy.name = "nerddown";
        } else if(enemy.name == "nerddown"){
            enemy.setVelocityY(90);
            enemy.name = "nerdup";
        }  
        if(player.name == "nerdup"){
            player.setVelocityY(-90);
            player.name = "nerddown";
        } else if(player.name == "nerddown"){
            player.setVelocityY(90);
            player.name = "nerdup";
        }    
    }
}