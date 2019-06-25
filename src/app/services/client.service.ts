import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(public afd: AngularFireDatabase) {
    this.clients = afd.list('/clients').valueChanges();
  }

  getClients() {
    return this.clients;
  }
}
