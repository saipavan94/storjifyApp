import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  files =[];
  buckets = [];
  httpCall: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public httpClient: HttpClient,private storage: Storage) {
    console.log(this.navParams.get('id'));
    this.buckets = this.navParams.get('buckets');
  }
  ionViewDidLoad(){
    console.log(this.navParams.get('id'));
    this.storage.get('mybuckets').then((val) => {
      console.log(val)
    })
  }

  loadFiles(data){
    var bucketId = data.split(";")[0];
    this.httpCall = this.httpClient.get('http://localhost:7000/getBucketFiles/'+data.split(";")[0]);
     this.httpCall
     .subscribe(data => {
       this.files =data.files
       console.log(this.files);
       console.log('my data: ', data);

     var options = {
      title: 'Choose a file to download',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log(data);
            window.location.assign(`http://localhost:7000/downloadBucketListFile/`+bucketId+'/'+data.id+'/'+data.filename);
          }
        }
      ]
    };

    options.inputs = [];
    console.log(this.files);
    // Now we add the radio buttons
    for(let i=0; i< this.files.length; i++) {
      options.inputs.push({ name : 'options', value: this.files[i], label: this.files[i].filename, type: 'radio' });
    }

    // Create the alert with the options
    let alert = this.alertCtrl.create(options);
    alert.present();
     })
  }
}
