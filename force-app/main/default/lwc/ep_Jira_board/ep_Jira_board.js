import { track,api,wire,LightningElement } from 'lwc';
import JiraId from '@salesforce/apex/ep_JiraController.getJiraId';
import { subscribe,
    unsubscribe,
    APPLICATION_SCOPE,publish, MessageContext } from 'lightning/messageService';
import { refreshApex } from '@salesforce/apex';
import popMC from '@salesforce/messageChannel/popMessageChannel__c';

export default class Ep_Jira_board extends LightningElement {
    @track jiraId='null';
    @track jiraName;
    @track daysRem;
    @track optionList;
    @track toDoList=[];
    @track inProgList=[];
    @track compList=[];
    subscription = null;
    @wire(MessageContext) messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel(){
        console.log("HERE IT IS &&JIRA: "+this.subscription);
    if (this.subscription) {
        return;
        }
        this.subscription = subscribe(
            this.messageContext,
            popMC,
            message => {
              this.handleJiraMessage(message);
            },
            { scope: APPLICATION_SCOPE }
          );    
    }

    wiredData;
    @wire(JiraId, {jId: '$jiraId'}) gettingJiraId(result){
        console.log("RESULT: "+JSON.stringify(result));
        this.wiredData=result;
        this.toDoList=[];
        this.inProgList=[];
        this.compList=[];


        if(result.data){
            let samp=result.data.detailString;
            
            let newsamp=samp.split("++");
            console.log("samp++"+newsamp);
            this.jiraId= newsamp[0];
            this.jiraName= newsamp[1];
            this.daysRem=newsamp[2];
            this.optionList=result.data.sprintList;
            console.log('this.optionList:'+this.optionList);
            let elementList=result.data.elementList;
            console.log('elementList'+JSON.stringify(elementList)+' length:'+elementList.length);
            for(var i=0;i<elementList.length;i++){
                console.log("Status="+elementList[i].Status__c);
                if(elementList[i].Status__c=='To Do'){
                    this.toDoList.push(elementList[i]);
                }
                else if(elementList[i].Status__c=='In Progress'){
                    this.inProgList.push(elementList[i]);
                }
                else if(elementList[i].Status__c=='Completed'){
                    this.compList.push(elementList[i]);
                }
            }
            console.log('toDoList: '+JSON.stringify(this.toDoList));
            console.log('inProgList: '+JSON.stringify(this.inProgList));
            console.log('compList: '+JSON.stringify(this.compList));
        }
    }  

    addElemTask(){
        console.log("Pre-Publish");
        const message={popValue: "ElemAdd"};
        publish(this.messageContext, popMC, message);
        console.log("Post-Publish");
    }

    handleRefresh(){
        refreshApex(this.wiredData);
    }

    handleEditClose(){
        console.log('Handling Edit close');
        this.handleRefresh();
        this.template.querySelector('c-ep_jira_detail').respondEditClose();
    }

    handleJiraMessage(message){
        console.log('THE MESSAGE'+JSON.stringify(message));
        this.handleRefresh();
    }

    handleSprintSelect(event){
        this.jiraId=event.target.value;
        console.log("IN SPRINT SELECT: "+event.target.value);
        this.handleEditClose();
    }
}