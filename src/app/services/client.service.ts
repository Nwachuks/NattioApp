import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientele: AngularFireList<Client>;
  clients: Observable<Client[]>;

  dclient: AngularFireObject<Client>;
  client: Observable<Client>;

  constructor(public afd: AngularFireDatabase) {
    this.clientele = afd.list('/clients');

    // Use snapshotChanges().map() to store the key
    this.clients = this.clientele.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key : c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getClients() {
    return this.clients;
  }

  newClient(client: Client) {
    this.clientele.push(client);
  }

  getClient(id: string) {
    this.dclient = this.afd.object('/clients/' + id);
    this.client = this.dclient.valueChanges();
    // this.dclient.snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    // });
    return this.client;
  }

  updateClient(id: string, client: Client) {
    return this.clientele.update(id, client);
  }

  deleteClient(id: string) {
    return this.clientele.remove(id);
  }
}
