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
            this.scene.scene.launch(CST.SCENES.TALK, player, npc);
            this.scene.scene.pause();
            //player.scene.keyboard.R.isDown = false;
            //player.scene.keyboard.R.isDown = true;
            player.scene.keyboard.R.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
        //Make sure that you can't just keep talking to someone 
        /*if(npc.name == player.npcPrev){
            return;
        }
        player.npcPrev = npc.name;*//*
        //Append new text to cmd2
        switch(npc.name){
            case "Nicole":
                npc.addCMD2Text("C:/Users/Player/To_Self/Hey is that Nicole?", player);    
                npc.addCMD2Text("C:/Users/Nicole/To_Player/Hey it's me! Thought I'd", player);
                npc.addCMD2Text(" see you here. First day of programming school eh?", player);
            break;
            case "NicoleD":
                npc.addCMD2Text("C:/Users/oliceN/To_Player/Hwy ddi sith paphen<1@?", player);
            break;
            case "Claire1":
                npc.addCMD2Text("Hey, I'm Claire! What are you doing here?", player);
            break;
            case "Claire2":
                npc.addCMD2Text("Oh hey again, I can't talk. I gotta go see Brad.", player);
            break;
            case "Kyle":
                npc.addCMD2Text("How are you doing? I'm so pumped for school!", player);
            break;
            case "Chad":
                npc.addCMD2Text("Hey bro! Wanna come to my party later?", player);
            break;
            case "Brad":
                npc.addCMD2Text("Yo dude. Can you pick up some booze?", player);
            break;
            case "Vlad":
                npc.addCMD2Text("Whoa! Are you actually looking at me!?", player);
            break
            case "Stevie":
                npc.addCMD2Text("Look, I maybe short but I'm no Starbucks item!", player);
            break;
        }*/
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