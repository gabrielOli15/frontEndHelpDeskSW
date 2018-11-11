import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// RxJS
import { ReplaySubject } from "rxjs/ReplaySubject";
// Side Menu Component
import { SideMenuSettings } from './../shared/side-menu-content/models/side-menu-settings';
import { SideMenuOption } from './../shared/side-menu-content/models/side-menu-option';
import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';
import { HomePage } from '../pages/home/home';
import { NovoChamadoPage } from '../pages/novo-chamado/novo-chamado';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild(Nav) navCtrl: Nav;


  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

    // Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

  // Options to show in the SideMenuContentComponent
	public options: Array<SideMenuOption>;

  // Settings for the SideMenuContentComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option'		
  }

  private unreadCountObservable: any = new ReplaySubject<number>(0);

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private menuCtrl: MenuController,
	  private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Initialize some options
			this.initializeOptions();
    });

    // Change the value for the batch every 5 seconds
		setInterval(() => {
			this.unreadCountObservable.next(Math.floor(Math.random() * 10) + 1);
    }, 5000);
  }

  private initializeOptions(): void {
		this.options = new Array<SideMenuOption>();		
		// CADASTROS
		this.options.push({
			displayText: 'Chamados',
			iconName:'add-circle',
			suboptions: [
				{
					iconName: 'calendar',
					displayText: 'Abrir chamado',
					component: NovoChamadoPage
				}		
			]
		});
	}

  public onOptionSelected(option: SideMenuOption): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Get the params if any
				const params = option.custom && option.custom.param;
				// Redirect to the selected page
				this.navCtrl.push(option.component, params);
			}
		});
	}
    
  public collapseMenuOptions(): void {
    this.sideMenu.collapseAllOptions();
  }

  public presentAlert(message: string): void {
    let alert = this.alertCtrl.create({
    title: 'Information',
    message: message,
    buttons: ['Ok']
  });
    alert.present();
  }	
}
