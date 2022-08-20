import { wire,api,LightningElement } from 'lwc';
import getAllitems from '@salesforce/apex/ToDoController.getAllItems';
import createItem from '@salesforce/apex/ToDoController.createItem';
import { refreshApex } from '@salesforce/apex';
export default class ToDoChildWrapper extends LightningElement {
    @api listId;
    @api listName;
    isLoaded=false;
    arr;

    lvl2arr=['a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z'];

    lvl3arr=['i','ii','iii','iv','v','vi','vii','viii','ix','x',
    'xi','xii','xiii','xiv','xv','xvi','xvii','xviii','xix','xx'];

    wiredResults;
    @wire(getAllitems,{listId: '$listId'}) gettingAllItems(result){
        this.isLoaded=false;
        this.wiredResults=result;
        if(result.data){
            
            console.log('ToDoChildWrapper getAllItems->'+JSON.stringify(result));
            this.arr=result.data;
            let lvl1=1;
            let lvl2=0;
            let lvl3=0;
            console.log('arr->'+JSON.stringify(this.arr));
            this.arr.forEach(e => {
                let obj={...e};
                if(e.Type__c=='Lvl1'){
                    obj.Style='margin-left: 0rem';
                    obj.Number=lvl1+'. ';
                    lvl1++;
                    lvl2=0;
                    lvl3=0; 
                }else if(e.Type__c=='Lvl2'){
                    obj.Style='margin-left: 1rem';
                    obj.Number=this.lvl2arr[lvl2]+') ';
                    lvl2++;
                    lvl3=0;
                }else if(e.Type__c=='Lvl3'){
                    obj.Style='margin-left: 2rem';
                    obj.Number=this.lvl3arr[lvl3]+'. ';
                    lvl3++;
                }
              console.log('Obj->'+JSON.stringify(obj));  
              this.finalArr.push(obj);  
              console.log('this.finalArr->'+JSON.stringify(this.finalArr));
              this.isLoaded=true;
            });
        }
    }

    @api refreshCallback(){
        console.log('this.wiredResults Refresh');
        this.arr=[];
           this.finalArr=[];
        refreshApex(this.wiredResults);
    }

    finalArr=[];

    handleCreateLvl1(){
        this.isLoaded=false;
        createItem({lvl: 'Lvl1',summText: '',parentId: null, listId: this.listId}).then(()=>{
           
            this.refreshCallback(); 
        }).then(()=>{
            this.isLoaded=true;
        });
    }

    handleChanged(){
        console.log('In Handle Changed wrapper');
        this.isLoaded=false;
        this.refreshCallback();
        this.isLoaded=true;
    }
}