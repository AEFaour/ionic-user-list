import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

const STORAGE_KEY = "taskList";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  public taskList= [
    {taskName: 'Nettoyer les écuries d\'Augias', done: false, id:1},
    {taskName: 'Résoudre le problème du réchauffement climatique', done: true, id:2}
  ];

  constructor(private modelCtrl: ModalController) { }

  ngOnInit() {
    Storage.get({key: STORAGE_KEY}).then(
      (data:any)=> {
        console.log(data.value);
        this.taskList = JSON.parse(data.value) || [];
      }
    );
    
  }

  async addTask(){
    const modal = await this.modelCtrl.create({
      component: ModalFormComponent
    }); 

    modal.onDidDismiss().then(
      (res:any)=>{
        res.data.id = (new Date()).getTime();
        console.log(res.data);
        if(res.data.taskName && res.data.taskName.trim() != ""){
          this.taskList.push(res.data);

          this.persist();
        }
      }
    )
    modal.present();
  }

  public persist() {
    Storage.set({
      key: STORAGE_KEY,
      value: JSON.stringify(this.taskList)
    });
  }
}
