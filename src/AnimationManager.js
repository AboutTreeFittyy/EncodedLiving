/* File Name: AnimationManager.js
 * Author: Mathew Boland
 * Last Updated: November 7, 2019
 * Description: A class to initialize all the different animations. To keep it organized 
 * and easy to maintain.
*/
import {CST} from "./CST";

export class AnimationManager{
    
    constructor(scene) {
        this.scene = scene;
    }

    setAnimations(){
        //Nerd variant 1 animations
        this.createAnimation("nerd1left", 15, CST.SPRITE.NERD1, 5, 7, false);
        this.createAnimation("nerd1right", 15, CST.SPRITE.NERD1, 9, 11, false);
        this.createAnimation("nerd1down", 15, CST.SPRITE.NERD1, 1, 3, false);
        this.createAnimation("nerd1up", 15, CST.SPRITE.NERD1, 13, 15, false);
        //My poorly made whip sprites       
        this.createAnimation("whip_left", 15, CST.SPRITE.WHIPL, 0, 4, true);
        this.createAnimation("whip_up", 15, CST.SPRITE.WHIPU, 0, 4, true);        
        this.createAnimation("whip_right", 15, CST.SPRITE.WHIPR, 0, 4, true);
        this.createAnimation("whip_down", 15, CST.SPRITE.WHIPD, 0, 4, true);
        //Player whip animation
        this.createAnimation("playerwhipleft", 15, CST.SPRITE.PLAYER, 169, 174, false);
        this.createAnimation("playerwhipup", 15, CST.SPRITE.PLAYER, 156, 161, false);
        this.createAnimation("playerwhipright", 15, CST.SPRITE.PLAYER, 195, 200, false);
        this.createAnimation("playerwhipdown", 15, CST.SPRITE.PLAYER, 182, 187, false);        
        //Player directional movements
        this.createAnimation("left", 10, CST.SPRITE.PLAYER, 117, 125, false);
        this.createAnimation("right", 10, CST.SPRITE.PLAYER, 143, 151, false);
        this.createAnimation("up", 10, CST.SPRITE.PLAYER, 104, 112, false);
        this.createAnimation("down", 10, CST.SPRITE.PLAYER, 130, 138, false);
    }

    createAnimation(k, fr, cst, st, fin, hide){
        if(hide == true){
            this.scene.anims.create({
                key: k,
                frameRate: fr,
                frames: this.scene.anims.generateFrameNumbers(cst, {
                    start: st,
                    end: fin
                }),
                showOnStart: true,
                hideOnComplete: true
            });
        }else{
            this.scene.anims.create({
                key: k,
                frameRate: fr,
                frames: this.scene.anims.generateFrameNumbers(cst, {
                    start: st,
                    end: fin
                })
            });
        }
    }

}