import { wire,track,api,LightningElement } from 'lwc';
import getRevisionQs from '@salesforce/apex/ep_RevisionClass.getRevisionQuestions';
import addRevQ from '@salesforce/apex/ep_RevisionClass.addRevisionQuestion';
import {refreshApex} from '@salesforce/apex';

export default class Ep_Revision_coll extends LightningElement {

@track textInput='';
@track revInput='';
@track revList;
@track index;

wiredProperty;
@wire(getRevisionQs) revisionQues(result){
    this.wiredProperty=result;
    this.revList=[];
    this.index=0;
    console.log("TODAY REVISION: "+JSON.stringify(this.wiredProperty));
    if(this.wiredProperty.data){
        //this.revList=this.wiredProperty.data;
        for(let i=0;i<this.wiredProperty.data.length;i++){
            this.index++;
          let str='Q-'+this.index+': '+this.wiredProperty.data[i].Question;
          let obj={'str': str,'ref': this.wiredProperty.data[i].Reference};
          console.log("STr= "+str);
          this.revList.push(obj);
        }
    }
}; 

handleKey(e){
   // console.log(e.keyCode +e.key );
    if(e.keyCode==13){
        //alert("ENTER PRESSED");
        this.handleSave();
    }
}

handleSave(){
addRevQ({ques: this.textInput,ref: this.revInput}).then(()=>{
    refreshApex(this.wiredProperty);
}).then(()=>{
    //alert(this.textInput);
    this.textInput='';
    this.revInput='';
});

}

handleSearch(e){
    let searchTerm=e.target.value.slice(4);
    searchTerm='https://www.google.com/search?q='+searchTerm;
    window.open(searchTerm);
}

handleTextchange(e){
    this.textInput=e.target.value;
}

handleRevchange(e){
    this.revInput=e.target.value;
}

handleRef(e){
    let refurl='';
    if(e.target.value){
        refurl=e.target.value;
        window.open(refurl);
    }
    else{
        this.handleSearch(e);
    }
    
}

}