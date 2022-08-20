import { LightningElement,wire } from 'lwc';
import pinnedList from '@salesforce/apex/ToDoController.returnPinnedList';
import searchList from '@salesforce/apex/ToDoController.searchList';
import pinList from '@salesforce/apex/ToDoController.pinList';
import createList from '@salesforce/apex/ToDoController.createList';
import { refreshApex } from '@salesforce/apex';

export default class ToDoListParent extends LightningElement {

    searchText='';
    //searchDate=new Date();
    searchDate;
    listItems;
    isLoaded=false;

    //dispList;

    get pinnedId(){
        if(this.pinList.data){
        return this.pinList.data.Id;
        }
    }
    get pinnedName(){
        if(this.pinList.data){
        return this.pinList.data.Name;
    }
    }


    handleOpenList(){
        console.log('In handle Open list');
        this.isLoaded=false;
        let temp=this.template.querySelector('.opencls');
        console.log('temp->'+temp);
        searchList({searchText: this.searchText,searchDate: this.searchDate}).then((result)=>{
            console.log('Items->'+JSON.stringify(result));
            this.listItems=result;
            this.isLoaded=true;
        })
        temp.classList.add('slds-is-open');
    }

    handleMouseOut(e){
        console.log('In main');
        if(e.target.value==undefined){
        let temp=this.template.querySelector('.opencls');
        console.log('temp->'+temp +e.currentTarget.value);
        console.log('e.Target.value->' +e.target.value);
        temp.classList.remove('slds-is-open');
    }
    }

    handleChange(e){
        console.log('Changing->'+e.currentTarget.value);
        this.searchText=e.currentTarget.value;
        this.handleOpenList();
    }

    handleSelect(e){
        
        console.log('Selecting->'+e.currentTarget.value);
        if(e.currentTarget.value!=null && e.currentTarget.value!=''){
        this.searchDate=e.currentTarget.value;
        this.handleOpenList();
    }else{
        this.searchDate=null;
    }
    }

    @wire(pinnedList) pinList;

    handleSelectedList(e){
        console.log('Handling select');
        //this.handleMouseOut();
        console.log('handleSelectedList->'+e.currentTarget.dataset.value+e.currentTarget.dataset.name);
        this.searchText=e.currentTarget.dataset.name;
        let clickedId=e.currentTarget.dataset.value;
        //console.log('e.target.value->'+e.target.value);
        let temp=this.template.querySelector('.opencls');
        if(clickedId!=this.pinList.data.Id){
            pinList({recId: clickedId}).then(()=>{
                this.refreshCallback();
                
            }).then(()=>{
                this.template.querySelector('.wrapper-cls').refreshCallback();
            }).catch((e)=>{
                console.log('Error:'+e.message);
            });
            setTimeout(() => {
                console.log('pinNed->'+JSON.stringify(this.pinList) +'getting: '+this.pinnedId);
            }, 1000);
            
        }
        
        //console.log('temp->'+temp +e.currentTarget.value);
        temp.classList.remove('slds-is-open');
    }

    refreshCallback(){
        console.log('this.pinList'+JSON.stringify(this.pinList.data.Id))
        refreshApex(this.pinList);
    }

    handleCreateList(){
        if((this.searchText==null || this.searchText=='')&&(this.searchDate==null || this.searchDate=='')){
            createList({listName: 'Test '+Math.random()*10,listDate: new Date()}).then(()=>{
                this.refreshCallback();
            });
        }else if(this.searchText==null || this.searchText==''){
            createList({listName: 'Test '+Math.random()*10,listDate: this.searchDate}).then(()=>{
                this.refreshCallback();
            });
        }else if(this.searchDate==null || this.searchDate==''){
            createList({listName: this.searchText,listDate: new Date()}).then(()=>{
                this.refreshCallback();
            });
        }else{
            createList({listName: this.searchText,listDate: this.searchDate}).then(()=>{
                this.refreshCallback();
            });
        }
        
    }
}