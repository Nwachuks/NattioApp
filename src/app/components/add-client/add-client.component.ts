import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '0'
  };

  disableBalanceOnAdd = false;

  constructor(public flashMessagesService: FlashMessagesService, public router: Router,
    public clientService: ClientService) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      // Set value balance to zero for disabled balance
      value.balance = '0';
    }

    if (!valid) {
      this.flashMessagesService.show('Please fill out all fields.', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['add-client']);
    } else {
      // Add new client
      this.clientService.newClient(value);
      this.flashMessagesService.show('New client added.', { cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/']);
    }
  }
}
