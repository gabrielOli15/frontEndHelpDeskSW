import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class ChamadoProvider {
  private PATH = 'chamados/'
  constructor(    
    private db: AngularFireDatabase
  ) {}

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {        
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    // return this.db.list(this.PATH).valueChanges().subscribe((datas) => {
    //   return datas;        
    // },(err)=>{
    //     console.log("probleme : ", err)
    // });      
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(chamado: any) {
    return new Promise((resolve, reject) => {
      if (chamado.key) {
        this.db.list(this.PATH)
          .update(chamado.key, { nome: chamado.nome, descricao: chamado.descricao })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nome: chamado.nome, descricao: chamado.descricao })
          .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
