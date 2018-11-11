import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoChamadoPage } from './novo-chamado';

@NgModule({
  declarations: [
    NovoChamadoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoChamadoPage),
  ],
})
export class NovoChamadoPageModule {}
