import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientele: AngularFireList<any>;
  clients: Observable<Client[]>;
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
}
