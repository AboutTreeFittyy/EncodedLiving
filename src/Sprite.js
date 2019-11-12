/* File Name: Sprite.js
 * Author: Mathew Boland
 * Last Updated: November 11, 2019
 * Description: Class used to create and hold the value of a Sprite object
*/
import {CST} from "./CST";
export class Sprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, down, up, left, right, name) {
        super(scene, x, y, texture, down);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);     
        scene.physics.world.enableBody(this);
        this.down = down;
        this.up = up;
        this.left = left;
        this.right = right;
        this.startX = x;
        this.startY = y;
        this.name = name;
        this.state = 0;
    }

    npcSpeak(player, npc){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            this.scene.scene.launch(CST.SCENES.TALK, {player, npc});
            this.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.E.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
    }
}