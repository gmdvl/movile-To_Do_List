import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddItemPage} from '../add-item/add-item';
import {ItemDetailPage} from '../item-detail/item-detail';
import {Data} from '../../providers/data/data';
 
@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
 
  private items = [];
 
  constructor(private nav: NavController, private dataService: Data, private modalCtrl: ModalController) {
 
    this.dataService.getData().then((todos) => {
 
        if(todos){
            this.items = JSON.parse(todos); 
        }
 
    });
 
  }
 
  addItem(){
 
    let addModal = this.modalCtrl.create(AddItemPage);
 
    addModal.onDidDismiss((item) => {
 
      if(item){
        this.saveItem(item);
      }
 
    });
 
    addModal.present();
 
  }
 
  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }
 
  viewItem(item){
    this.nav.push(ItemDetailPage, {
      item: item
    });
  }
 
}