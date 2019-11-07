/* File Name: CharacterSprite.js
 * Author: Mathew Boland
 * Last Updated: November 4, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
export class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(2);        
        scene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.hp = 10;
        this.money = 0;
        this.npcPrev = '';
        this.score = 0;
    }

    collectItem(player, item){
        item.setVisible(false);
        //this.physics.world.remove(item.body);
        item.destroy(item.body);
        player.money++;
        player.scene.cmd1Text.text = player.scene.cmd1Text.text+"Player Money: "+player.money+"\n";
    }

    npcSpeak(player, npc){
        //Make sure that you can't just keep talking to someone 
        if(npc.name == player.npcPrev){
            return;
        }
        player.npcPrev = npc.name;
        player.scene.cmd2Text.text = player.scene.cmd2Text.text+npc.name+"\n";
    }
}