/* File Name: EnemySprite.js
 * Author: Mathew Boland
 * Last Updated: November 8, 2019
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
        let curName;
        //Save whichever is in use to a temp variable to test conditions with
        if(player.name != ''){
            curName = player;
        }else{
            curName = enemy;
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