import { wire,api,track,LightningElement } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import popMC from '@salesforce/messageChannel/popMessageChannel__c';
export default class Ep_JiraCard extends LightningElement {

    @api element;
    @track isLow=true;
    @track isMed=false;
    @track isHigh=false;

    @wire(MessageContext) messageContext;

    renderedCallback(){
        if(this.element.Priority__c=='High'){
            this.isHigh=true;
            this.isLow=false;
            this.isMed=false;
            this.template.querySelector('.container').classList.add('high-mob');
           
        }
        else if(this.element.Priority__c=='Medium'){
            this.isHigh=false;
            this.isLow=false;
            this.isMed=true;
            this.template.querySelector('.container').classList.add('med-mob');
            
        }
        else if(this.element.Priority__c=='Low'){
            this.isHigh=false;
            this.isLow=true;
            this.isMed=false;
            this.template.querySelector('.container').classList.add('low-mob');
            
        }

        if(this.element.Status__c=='Completed'){ 
            this.template.querySelector('.num-cont').classList.add('complete-cls');
            this.template.querySelector('.name-cont').classList.add('complete-cls');
            
        }
    }

    handleSelectCard(){
    console.log("Pre-Publish");
    const message={popValue: this.element};
    publish(this.messageContext, popMC, message);
    //this.dispatchEvent(new CustomEvent('selectedcard',{detail:this.element.Id}));
    console.log("Post-Publish");
    }
}