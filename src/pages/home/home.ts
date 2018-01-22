import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TouchID } from '@ionic-native/touch-id';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat:any;
  lang:any;

  constructor(public navCtrl: NavController,private geolocation: Geolocation,private touchId: TouchID) {
    }
    getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
    this.lat=resp.coords.latitude;
    this.lang=resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
    }
    touch(){
      this.touchId.isAvailable()
      .then(
        res => console.log('TouchID is available!'),
        err => console.error('TouchID is not available', err)
      );
    
    this.touchId.verifyFingerprint('Scan your fingerprint please')
      .then(
        res => console.log('Ok', res),
        err => console.error('Error', err)
      );
    }
}
