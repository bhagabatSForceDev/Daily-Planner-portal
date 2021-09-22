import { api,wire,track,LightningElement } from 'lwc';
import {
subscribe,
unsubscribe,
APPLICATION_SCOPE,
MessageContext
} from "lightning/messageService";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import popMC from "@salesforce/messageChannel/popMessageChannel__c";
export default class Ep_jira_detail extends LightningElement {

@wire(MessageContext) messageContext;
@track isData=false;
@track data;
@track recordId;
@track isModalOpen=false;
@api newVar;

subscription = null;

connectedCallback() {
    this.subscribeToMessageChannel();
}

@api
respondEditClose(){
    console.log('respondEditClose**&&');
    this.isData=false;
}

subscribeToMessageChannel(){
    console.log("HERE IT IS: "+this.subscription);
if (this.subscription) {
    return;
    }
    this.subscription = subscribe(
        this.messageContext,
        popMC,
        message => {
          this.handleMessage(message);
        },
        { scope: APPLICATION_SCOPE }
      );    
}


handleMessage(message){
    console.log("Message received"+JSON.stringify(message)+message.popValue);
    if(message.popValue.Name.startsWith('S')){
        console.log("IN IF");
       this.isData=true;
        this.data=message.popValue;
        this.recordId=message.popValue.Id;
    }
    
}

handleEdit(){
    console.log("RecordId= "+this.recordId);
    this.isModalOpen=true;
}

handleClose(){
    this.dispatchEvent(
        new CustomEvent('closeedit')
        );
    this.isModalOpen=false;
}

handleSuccess(){
    this.dispatchEvent(
        new CustomEvent('closeedit')
        );
    this.isModalOpen=false;
    const evt = new ShowToastEvent({
        title: 'Success',
        message: 'Record updated successfully',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
}

}