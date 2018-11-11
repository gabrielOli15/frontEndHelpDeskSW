import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ChamadoProvider } from './../../providers/chamado/chamado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-novo-chamado',
  templateUrl: 'novo-chamado.html',
})
export class NovoChamadoPage {
  titulo: string;
  form: FormGroup;
  chamado: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: ChamadoProvider,
    private toast: ToastController
  ) {
    // maneira 1
    this.chamado = this.navParams.data.chamado || { };
    this.createForm();
    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.titulo = this.navParams.data.chamado ? 'Editar chamado' : 'Novo chamado';
  }
 
  createForm() {
    this.form = this.formBuilder.group({
      key: [this.chamado.key],
      nome: [this.chamado.nome, Validators.required],
      descricao: [this.chamado.descricao, Validators.required],
    });
  }
 
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Chamado salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

}
