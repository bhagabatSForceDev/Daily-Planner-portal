import { api,LightningElement } from 'lwc';
import modifyItem from '@salesforce/apex/ToDoController.modifyItem';
import deleteItem from '@salesforce/apex/ToDoController.deleteItem';
import createItem from '@salesforce/apex/ToDoController.createItem';
import checkItem from '@salesforce/apex/ToDoController.checkItem';
export default class ToDoChild extends LightningElement {

    @api toDoItem;
    isEdited=false;
    isAdd=false;
    isDesktop=false;
    tempText;
    timer=0;
    isDbl=false;

    get checkVal(){
        if(this.toDoItem.Is_Complete__c){
            return true;
        }else{
            return false;
        }
    }

    handleEdit(){
        // setTimeout(() => {
        //     this.isEdited=true;
        // }, 600);
        
    }

    handleDblClick(){
        console.log('DBL CLICK TRY....');
        this.isDbl=this.isDbl?false:true;
        
        if(!this.isDbl && this.timer>0 && this.timer<10){
            console.log('Double Click');
            this.isDbl=false;
            this.timer=0;
            this.handleCreate();
        }

        if(this.isDbl){
            this.handleCount();
        }
    }

    handleCount(){
       let serInt= setInterval(() => {
            this.timer++;
            //console.log('this.timer->'+this.timer);
            if(this.timer>10){
                clearInterval(serInt);
                console.log('Single Click');
                this.isDbl=false;
                this.timer=0;
                this.isEdited=true;
            }
        }, 100);

        
        
    }

    handleTextChange(e){
        this.tempText=e.currentTarget.value;
    }

    handleSave(){
        if(this.tempText!=this.toDoItem.Summary__c && this.tempText!=null && this.tempText!=''){
            modifyItem({recId: this.toDoItem.Id,summText: this.tempText}).then(()=>{
                this.dispatchEvent(new CustomEvent('changed'));
            });
        }else{
            this.isEdited=false;
        }
        
    }

    connectedCallback(){
        let wid=window.innerWidth;
        console.log('WID>'+wid);
        if(wid>600){
            this.isDesktop=true;
        }else{
            this.isDesktop=false;
        }
    }
    

    handleDelete(){
        deleteItem({itemId: this.toDoItem.Id}).then(()=>{
            this.dispatchEvent(new CustomEvent('changed'));
        }).then(()=>{
            this.isEdited=false;
        });
    }

    handleCreate(){
        let lvlString=this.toDoItem.Type__c=='Lvl1'?'Lvl2':'Lvl3';
        if(this.toDoItem.Type__c!='Lvl3'){
            createItem({lvl: lvlString,summText: '',parentId: this.toDoItem.Id,listId: this.toDoItem.To_Do_List__c}).then(()=>{
                this.dispatchEvent(new CustomEvent('changed'));
            });
        }
        
    }

    handleCheck(){
        checkItem({listId: this.toDoItem.Id}).then(()=>{
            this.dispatchEvent(new CustomEvent('changed')); 
        });
    }

    mouseEnter(){
        if(this.toDoItem.Type__c!='Lvl3'){
            this.isAdd=true;
        }
        
    }

    mouseLeave(){
        this.isAdd=false;
    }
}