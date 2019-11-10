/* File Name: Sprite.js
 * Author: Mathew Boland
 * Last Updated: November 8, 2019
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
    }

    npcSpeak(player, npc){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.R.isDown) {
            this.scene.scene.launch(CST.SCENES.TALK, {player, npc});
            this.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.R.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
    }

    addCMD2Text(text, player){
        //If the command prompt has more than 34 lines, delete the first one before adding another
        if(player.scene.cmd2Lines >= 34){
            player.scene.cmd2Text.text = player.scene.cmd2Text.text.replace(/[\w\W]+?\n+?/,"");
        }else{
            //Still room so don't remove anything, just increase counter for lines
            player.scene.cmd2Lines ++;
        }
        player.scene.cmd2Text.text = player.scene.cmd2Text.text+text+"\n";
    }
}