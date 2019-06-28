import { Component, OnInit } from '@angular/core';
import { ClientService } from './../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  disableBalanceOnEdit = true;

  constructor(public clientService: ClientService, public router: Router, public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill out all fields.', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['edit-client/' + this.id]);
    } else {
      // Update client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client updated', { cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
