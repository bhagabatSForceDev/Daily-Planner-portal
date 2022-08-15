import { wire,LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/Badge_Images';
import getRank from '@salesforce/apex/WellbeingManager.getRankInfo';
export default class Ep_BadgeDisplay extends LightningElement {
    imgPath=images+'/Badges/Lvl0.png';
    daysSince=0;
    rankText='Unranked';
    msgText='';

    @wire(getRank) rankDetail(result){
        console.log('RANKS->'+JSON.stringify(result));
        if(result.data){
        console.log(this.imgPath);    
        this.imgPath=result.data.rank.Url__c;
        this.rankText=result.data.rank.MasterLabel;
        console.log(this.rankText);
        this.daysSince=result.data.since;
        this.msgText=result.data.rank.Message__c;
    }
    }
}