import { track,LightningElement } from 'lwc';

export default class Ep_pomodoro2 extends LightningElement {

    minimized=true;
    iconName='utility:arrowup';

    handleMinimize(){
        if(this.minimized){
            let sec= this.template.querySelector('.slds-docked-composer');
            console.log("Maximized"+JSON.stringify(sec));
            sec.classList.add('slds-is-open');
            this.iconName='utility:minimize_window';
            this.minimized=false;
        }
        else{

       let sec= this.template.querySelector('.slds-docked-composer');
       console.log("Minimized"+JSON.stringify(sec));
       sec.classList.remove('slds-is-open');
       this.iconName='utility:arrowup';
       this.minimized=true;
    }
    }

    handleMaximize(){
        let sec= this.template.querySelector('.slds-docked-composer');
       console.log("Maximized"+JSON.stringify(sec));
       sec.classList.add('slds-is-open');
       this.iconName='utility:minimize_window';
       this.minimized=false;
    }
}