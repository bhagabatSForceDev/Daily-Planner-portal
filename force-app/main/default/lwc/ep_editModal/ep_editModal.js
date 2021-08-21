import {api,LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import deleteTask from '@salesforce/apex/ep_HistoryClass.deleteOneTask';
export default class Ep_editModal extends LightningElement {

@api thisId;    
objectApiName='Daily_Task__c';
    closeModal(){
        const event=new CustomEvent('close');
        this.dispatchEvent(event);
    }

    deleteRecord(e){
        console.log('IN DELETE RECORD 1');
        e.preventDefault();
        console.log('IN DELETE RECORD 2');
        // e.stopPropagation();
        if(window.confirm('Do you want to delete this record?')){
            
                // alert("DELETED RECORD SUCCESSFULLY");
                deleteTask({recId: this.thisId.Id}).
                then(this.closeModal()).
                then(location.reload());
                
              
            }
    }

    saveRecord(){
        // alert("SAVED!!");
        console.log('this.template.querySelector'+this.template.querySelector('lightning-record-edit-form'));
        this.template.querySelector('lightning-record-edit-form').submit();
        // this.closeModal();
    }

    handleSuccess(){
        const event = new ShowToastEvent({
            title: 'Updated',
            message: 'The record has been update!',
            variant: 'success'
        });
        this.dispatchEvent(event).then(location.reload());
    
    }
}