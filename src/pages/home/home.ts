import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ChamadoProvider } from './../../providers/chamado/chamado';
import { Observable } from 'rxjs'; 
import { NovoChamadoPage } from '../novo-chamado/novo-chamado';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chamados: Observable<any>;  

  constructor(
    public navCtrl: NavController, 
    private provider: ChamadoProvider,
    private toast: ToastController
  ) {
    this.chamados = this.provider.getAll();    
    console.log(this.chamados);
  }

  novoChamado() {
    this.navCtrl.push('NovoChamadoPage');
  }

  editarChamado(chamado: any) {
    this.navCtrl.push(NovoChamadoPage, {
      rootNavCtrl: this.navCtrl,
      chamado: chamado
    });
    // Maneira 1
    //this.navCtrl.push('NovoChamadoPage', { chamado: chamado });
    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removerChamado(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Chamado removido com sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o chamado.', duration: 3000 }).present();
        });
    }
  }

  // filtrarItens(searchbar) {  
  //   this.estagiarios = this.estagiariosSemFiltro;
  //   // set q to the value of the searchbar
  //   var q = searchbar.srcElement.value;
  //   // if the value is an empty string don't filter the items
  //   if (!q) {
  //     return;
  //   }
  //   this.estagiarios = this.estagiarios.filter((v) => {
  //     if(v.matriculaestagiario && v.nomeestagiario && q) {
  //       if (
  //         v.nomeestagiario.toLowerCase().indexOf(q.toLowerCase()) > -1
  //         ||
  //         v.matriculaestagiario.toLowerCase().indexOf(q.toLowerCase()) > -1
  //       ) {
  //         return true;
  //       }
  //         return false;
  //     }
  //   });  
  //   console.log(q, this.estagiarios.length);  
  // }
}
