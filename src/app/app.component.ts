import { Component, ViewChild } from '@angular/core';
import { Nav, Platform , AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public push : Push, public alertControler :AlertController) {
    this.initializeApp();

    //alert("v1");
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];
    this.pushSetup();


  }

  pushSetup()
  {
    const options: PushOptions = {
   android: {
       senderID: '107784739375'
   },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {}
};
const pushObject: PushObject = this.push.init(options);

pushObject.on('notification').subscribe((notification: any) => {
  if(notification.additionalData.foreground){
    let youalert = this.alertControler.create({
      title : 'new Push notification',
      message :  notification.message
    });
    youalert.present();
  }
});

pushObject.on('registration').subscribe((registration: any) => alert('Device registered' + registration));

pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));

  }

  
 

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    
  }
}
