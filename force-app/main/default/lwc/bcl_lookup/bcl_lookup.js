import { api,track,LightningElement } from 'lwc';

export default class Bcl_lookup extends LightningElement {
    options=[{label:'New', value:'New'},{label:'In Progress', value:'In Progress'},{label:'Closed', value:'Closed'}];
    @api value='New';
    searchText='';
    isDropdown=false;
    newAccs=[];
    get strRegExPattern(){
        // console.log('Patter Search: '+this.searchText);
        return this.searchText;
    }

    accounts=[{Id:'1',label:'Burlington'},{Id:'1',label:'ACME'},{Id:'1',label:'Next Gen'}];

    get searchedAccs(){
       this.newAccs=[];
        this.accounts.forEach(el => {
            // console.log('LABEL LIST: '+el.label +'Searched: '+this.strRegExPattern);
            let samp=this.strRegExPattern.toLowerCase();
            let sampLabel=el.label.toLowerCase();
            if(sampLabel.search(samp)!=-1){
                this.newAccs.push(el);
            }
        });
        // console.log('searchedAccs '+JSON.stringify(this.newAccs));
        return this.newAccs;
    }

    renderedCallback(){
        // console.log('R '+JSON.stringify(this.searchText));
    }

    handleChange(e){
        this.value=e.target.value;
        console.log('SEL Val= '+JSON.stringify(e.target.value)+' VAL= '+JSON.stringify(this.value));
    } 

    onSearch(){
        this.isDropdown=true;    
    }

    onOutFocus(){
        this.isDropdown=false;
    }

    handleSelection(e){
        console.log("SELECTED VAL: "+e.target.dataset.value);
    }

    handleTextChange(e){
        console.log('CHANGED: '+e.target.value);
        this.searchText=e.target.value;
    }
}