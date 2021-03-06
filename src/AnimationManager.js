/* File Name: AnimationManager.js
 * Author: Mathew Boland
 * Last Updated: December 1, 2019
 * Description: A class to initialize all the different animations. To keep it organized 
 * and easy to maintain.
*/
import {CST} from "./CST";

export class AnimationManager{
    
    constructor(scene) {
        this.scene = scene;
    }

    //Create all the animations for all the sprites in the game
    setAnimations(){
        //Chad sprites animation
        this.createAnimation("chadleft", 10, CST.SPRITE.CHAD, 0, 3, false);
        this.createAnimation("chadright", 10, CST.SPRITE.CHAD, 4, 7, false);
        this.createAnimation("chaddown", 10, CST.SPRITE.CHAD, 0, 3, false);
        this.createAnimation("chadup", 10, CST.SPRITE.CHAD, 4, 7, false);
        this.createAnimation("chadFlex", 10, CST.SPRITE.CHAD, 8, 15, false);
        //Vlad sprites animation
        this.createAnimation("Vladleft", 10, CST.SPRITE.VLAD, 0, 3, false);
        this.createAnimation("Vladright", 10, CST.SPRITE.VLAD, 4, 7, false);
        this.createAnimation("Vladdown", 10, CST.SPRITE.VLAD, 0, 3, false);
        this.createAnimation("Vladup", 10, CST.SPRITE.VLAD, 4, 7, false);
        this.createAnimation("VladCry", 10, CST.SPRITE.VLAD, 8, 15, false);
        //Nerd variant 1 animations
        this.createAnimation("nerd1left", 15, CST.SPRITE.NERD1, 5, 7, false);
        this.createAnimation("nerd1right", 15, CST.SPRITE.NERD1, 9, 11, false);
        this.createAnimation("nerd1down", 15, CST.SPRITE.NERD1, 1, 3, false);
        this.createAnimation("nerd1up", 15, CST.SPRITE.NERD1, 13, 15, false);
        //Nerd variant 2 animations
        this.createAnimation("nerd2left", 15, CST.SPRITE.NERD2, 5, 7, false);
        this.createAnimation("nerd2right", 15, CST.SPRITE.NERD2, 9, 11, false);
        this.createAnimation("nerd2down", 15, CST.SPRITE.NERD2, 1, 3, false);
        this.createAnimation("nerd2up", 15, CST.SPRITE.NERD2, 13, 15, false);
        //NerdGirl animations
        this.createAnimation("nerdgirlleft", 15, CST.SPRITE.NERDGIRL, 5, 7, false);
        this.createAnimation("nerdgirlright", 15, CST.SPRITE.NERDGIRL, 9, 11, false);
        this.createAnimation("nerdgirldown", 15, CST.SPRITE.NERDGIRL, 1, 3, false);
        this.createAnimation("nerdgirlup", 15, CST.SPRITE.NERDGIRL, 13, 15, false);
        //Jason enemy animations
        this.createAnimation("jasonleft", 10, CST.SPRITE.NPC_LOT, 15, 17, false);
        this.createAnimation("jasonright", 10, CST.SPRITE.NPC_LOT, 27, 29, false);
        this.createAnimation("jasondown", 10, CST.SPRITE.NPC_LOT, 3, 5, false);
        this.createAnimation("jasonup", 10, CST.SPRITE.NPC_LOT, 39, 41, false);
        //NicoleD npc walking animations
        this.createAnimation("NicoleDleft", 15, CST.SPRITE.NICOLED, 5, 7, false);
        this.createAnimation("NicoleDright", 15, CST.SPRITE.NICOLED, 9, 11, false);
        this.createAnimation("NicoleDdown", 15, CST.SPRITE.NICOLED, 1, 3, false);
        this.createAnimation("NicoleDup", 15, CST.SPRITE.NICOLED, 13, 15, false);
        //Nicole npc walking sprites
        this.createAnimation("Nicoledown", 10, CST.SPRITE.NPC_LOT, 6, 8, false);
        this.createAnimation("Nicoleleft", 10, CST.SPRITE.NPC_LOT, 18, 20, false);
        this.createAnimation("Nicoleright", 10, CST.SPRITE.NPC_LOT, 30, 32, false);
        this.createAnimation("Nicoleup", 10, CST.SPRITE.NPC_LOT, 42, 44, false);
        //Claire1 npc walking sprites
        this.createAnimation("Claire1down", 10, CST.SPRITE.NPC_LOT, 48, 50, false);
        this.createAnimation("Claire1left", 10, CST.SPRITE.NPC_LOT, 60, 62, false);
        this.createAnimation("Claire1right", 10, CST.SPRITE.NPC_LOT, 72, 74, false);
        this.createAnimation("Claire1up", 10, CST.SPRITE.NPC_LOT, 84, 86, false);
        //Claire2 npc walking sprites
        this.createAnimation("Claire2down", 10, CST.SPRITE.NPC_LOT, 9, 11, false);
        this.createAnimation("Claire2left", 10, CST.SPRITE.NPC_LOT, 21, 23, false);
        this.createAnimation("Claire2right", 10, CST.SPRITE.NPC_LOT, 33, 35, false);
        this.createAnimation("Claire2up", 10, CST.SPRITE.NPC_LOT, 45, 47, false);
        //Kyle npc walking animations
        this.createAnimation("Kyleleft", 15, CST.SPRITE.KYLE, 4, 7, false);
        this.createAnimation("Kyleright", 15, CST.SPRITE.KYLE, 8, 11, false);
        this.createAnimation("Kyledown", 15, CST.SPRITE.KYLE, 0, 3, false);
        this.createAnimation("Kyleup", 15, CST.SPRITE.KYLE, 12, 15, false);
        //Brad npc walking animations
        this.createAnimation("Bradleft", 15, CST.SPRITE.BRAD, 4, 7, false);
        this.createAnimation("Bradright", 15, CST.SPRITE.BRAD, 8, 11, false);
        this.createAnimation("Braddown", 15, CST.SPRITE.BRAD, 0, 3, false);
        this.createAnimation("Bradup", 15, CST.SPRITE.BRAD, 12, 15, false);
        //Stevie npc walking animations
        this.createAnimation("Stevieleft", 15, CST.SPRITE.STEVIE, 9, 17, false);
        this.createAnimation("Stevieright", 15, CST.SPRITE.STEVIE, 28, 36, false);
        this.createAnimation("Stevieup", 15, CST.SPRITE.STEVIE, 0, 8, false);
        this.createAnimation("Steviedown", 15, CST.SPRITE.STEVIE, 18, 26, false);
        //Prof npc walking sprites
        this.createAnimation("Profdown", 10, CST.SPRITE.NPC_LOT, 51, 53, false);
        this.createAnimation("Profleft", 10, CST.SPRITE.NPC_LOT, 63, 65, false);
        this.createAnimation("Profright", 10, CST.SPRITE.NPC_LOT, 75, 77, false);
        this.createAnimation("Profup", 10, CST.SPRITE.NPC_LOT, 87, 89, false);
        //My poorly made whip sprites       
        this.createAnimation("whip_left", 15, CST.SPRITE.WHIP, 17, 22, true);
        this.createAnimation("whip_up", 15, CST.SPRITE.WHIP, 8, 11, true);        
        this.createAnimation("whip_right", 15, CST.SPRITE.WHIP, 12, 15, true);
        this.createAnimation("whip_down", 15, CST.SPRITE.WHIP, 0, 4, true);
        this.createAnimation("redwhip_left", 15, CST.SPRITE.WHIP, 41, 46, true);
        this.createAnimation("redwhip_up", 15, CST.SPRITE.WHIP, 32, 35, true);        
        this.createAnimation("redwhip_right", 15, CST.SPRITE.WHIP, 36, 39, true);
        this.createAnimation("redwhip_down", 15, CST.SPRITE.WHIP, 24, 28, true);
        //Player attacking animation
        this.createAnimation("attackleft", 15, CST.SPRITE.PLAYER, 169, 174, false);
        this.createAnimation("attackup", 15, CST.SPRITE.PLAYER, 156, 161, false);
        this.createAnimation("attackright", 15, CST.SPRITE.PLAYER, 195, 200, false);
        this.createAnimation("attackdown", 15, CST.SPRITE.PLAYER, 182, 187, false);     
        //Player directional movements
        this.createAnimation("left", 10, CST.SPRITE.PLAYER, 117, 125, false);
        this.createAnimation("right", 10, CST.SPRITE.PLAYER, 143, 151, false);
        this.createAnimation("up", 10, CST.SPRITE.PLAYER, 104, 112, false);
        this.createAnimation("down", 10, CST.SPRITE.PLAYER, 130, 138, false);
        //Player death animation
        this.createAnimation("die", 10, CST.SPRITE.PLAYER, 260, 265, false);
        //Player death animation
        this.createAnimation("win", 10, CST.SPRITE.PLAYER, 26, 32, false);
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