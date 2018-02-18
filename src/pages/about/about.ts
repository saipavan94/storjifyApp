import { Component } from '@angular/core';
import {   NavController, NavParams  } from 'ionic-angular';
import {   ContactPage  } from '../contact/contact';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
   myStorage;
  qrData = null;
    createdCode = null;
    scannedCode = null;



    constructor(private barcodeScanner: BarcodeScanner,public navCtrl: NavController,public navParams: NavParams,private storage: Storage) {
      this.storage.get('mybuckets').then((val) => {
        if(val!=null){
          this.myStorage = JSON.parse(val)
        }else{
          this.myStorage =[]
        }

        console.log('Your age is', val);
      });
     }
    bucketsArr =[]
    createCode() {
      this.createdCode = this.qrData;
    }

    scanCode() {
      console.log("hi",this.navCtrl.parent);
      var scanned ="0dcdf9ffb18f6ea0a340d286;new";
      this.bucketsArr.push(scanned);
      var bid = scanned.split(";")[0]
      this.navCtrl.push( ContactPage, {id:bid,buckets:this.bucketsArr});
      this.navCtrl.parent.select(2);
      if(this.myStorage.indexOf(scanned)==-1){
        this.myStorage.push(scanned);
      }


      this.storage.set('mybuckets',JSON.stringify(this.myStorage));
      // this.barcodeScanner.scan().then(barcodeData => {
      //   this.scannedCode = barcodeData.text;
      //    this.navCtrl.parent.select(3);
      // }, (err) => {
      //     console.log('Error: ', err);
      // });
    }

  }
