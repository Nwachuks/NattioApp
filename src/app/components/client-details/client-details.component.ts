import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(public clientService: ClientService, public router: Router, public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    // console.log(this.id);

    // Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      // if (client.balance > '0') {
      //   this.hasBalance = true;
      // }
      this.client = client;
      console.log(this.client);
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance updated', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/client/' + this.id]);
  }

  onDeleteClick() {
    if (confirm('Are you sure to delete?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client deleted', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/']);
    }
  }
}
