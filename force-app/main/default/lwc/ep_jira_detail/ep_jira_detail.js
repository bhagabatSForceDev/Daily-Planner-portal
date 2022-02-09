import { api,wire,track,LightningElement } from 'lwc';
import {
subscribe,
unsubscribe,
publish,
APPLICATION_SCOPE,
MessageContext
} from "lightning/messageService";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import popMC from "@salesforce/messageChannel/popMessageChannel__c";
import getComments from '@salesforce/apex/ep_JiraController.getComments';
import deleteElement from '@salesforce/apex/ep_JiraController.deleteElement';
import { refreshApex } from '@salesforce/apex';
export default class Ep_jira_detail extends LightningElement {

@wire(MessageContext) messageContext;
@track isData=false;
@track data;
@track recordId;
@track isModalOpen=false;
@api newVar;
@track isComment=false;
@track comments=[];

formats = ['font', 'size', 'bold', 'italic', 'underline',
    'strike', 'list', 'indent', 'align', 'link',
    'image', 'clean', 'table', 'header', 'color'];

subscription = null;


renderedCallback(){
console.log('**Rendered Details**');
}

connectedCallback() {
this.subscribeToMessageChannel();
}

wiredContext;
@wire(getComments,{recId: '$recordId'}) gettingComments(result){
this.wiredContext=result;
if(result.data){
console.log("NO OF COMMENTS= "+this.comments.length);
        console.log("In then"+JSON.stringify(result));
        this.comments = result.data;
        if(this.comments.length>0){
            this.isComment=true;
        }
        else{
            this.isComment=false;
        }
}
} 

handleRefresh(){
refreshApex(this.wiredContext);
}


@api
respondEditClose(){

this.isData=false;
}

subscribeToMessageChannel(){

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

addComment(){
console.log("Pre-Publish");
const message={popValue: 'CommAdd;'+this.recordId};
publish(this.messageContext, popMC, message);
console.log("Post-Publish");
}

handleMessage(message){
console.log("*****ADD COMMENT CHECK"+message.popValue);
if(message.popValue=='Refresh'){
    console.log("*****ADD COMMENT CHECK");
    this.handleRefresh();
    //this.getCommentFn();
}
if(message.popValue.Name.startsWith('S')){
    console.log("IN IF");
    this.isData=true;
    this.data=message.popValue;
    this.recordId=message.popValue.Id;
    //this.isComment=false;
    // this.getCommentFn();
}


}

handleDelete(){
console.log("In Delete element");
if(window.confirm("Are you sure you want to delete?")){
    deleteElement({recId: this.recordId}).then(
        result => {
            console.log("DELETEd");
            console.log("Pre-Publish");
    const message={popValue: 'Refresh'};
    
    const evt = new ShowToastEvent({
        title: 'Success',
        message: 'Element deleted successfully',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
    this.isData=false;
    publish(this.messageContext, popMC, message);
    
    console.log("Post-Publish");
        }
    ).catch(
        error =>{
            console.log("ERROR:"+error.message); 
        }
    );
}

}

getCommentFn(){

getComments({recId: this.recordId}).then(
    result => {
        console.log("NO OF COMMENTS= "+this.comments.length);
        console.log("In then"+JSON.stringify(result));
        this.comments = result;
        if(this.comments.length>0){
            this.isComment=true;
        }
        
    }
).catch(
    error => {
        console.log("ERROR:"+error.message);
    }
);
//this.comments= this.getComments({recId: this.recordId});
console.log('In comments: '+JSON.stringify(this.comments)+'STATUS: '+this.isComment);
}

handleEdit(){

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