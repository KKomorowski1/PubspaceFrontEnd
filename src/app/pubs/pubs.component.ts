import {Component, OnInit} from '@angular/core';
import {Pub} from "./model/pub";
import {ApiService} from "../shared/api.service";
import {Seat} from "./model/seat";

@Component({
  selector: 'app-pubs',
  templateUrl: './pubs.component.html',
  styleUrls: ['./pubs.component.css']
})
export class PubsComponent implements OnInit {
  pubs: Pub[] = [];
  seats: Seat[] = [];
  selectedPub: Pub;
  space: string[] = ["Full", "Full/Empty", "Empty"];
  seat: Seat;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllPubs();
    this.getLast10();
  }

  public getAllPubs() {
    this.apiService.getAllPubs().subscribe(
      res => {
        this.pubs = res;
      },
      error => {
        alert("Error has occured");
      }
    );
  }

  getLast10() {
    this.apiService.getLast10Updates().subscribe(
      res => {
        this.seats = res;
      },
      err => {
        alert("Error occurred while downloading latest updates")
      }
    );
  }

  createPub() {
    let newPub: Pub = {
      name: '',
      id: null,
      address: ''
    };
    this.apiService.postPub(newPub).subscribe(
      res => {
        newPub.id = res.id;
        this.pubs.push(newPub);
      },
      error => {
        alert("An error has occurred while saving the Pub");
      }
    );
  }

  updatePub(updatedPub: Pub) {
    this.apiService.postPub(updatedPub).subscribe(
      res => {
        alert("Pub was updated successfully")
      },
      error => {
        alert("An error has occurred while saving the Pub");
      }
    );
  }

  deletePub(pub: Pub) {
    if (confirm("Are you sure you want to delete the Pub?")) {
      this.apiService.deletePub(pub.id).subscribe(
        res => {
          let indexOfPub = this.pubs.indexOf(pub);
          this.pubs.splice(indexOfPub, 1);
        },
        error => {
          alert("Could not delete pub");
        }
      );
    }
  }

  selectPub(pub: Pub) {
    this.selectedPub = pub;
    this.apiService.getLatest5Updates(pub.id).subscribe(
      res => {
        this.seats = res;
      },
      error => {
        alert("Error has occurred while getting the updates")
      }
    );
  }

  createUpdate(id: number, value: string) {
    let newUpdate: Seat = {
      seatId: null,
      space: value,
      dateTime: '',
      pubId: null
    };
    this.apiService.postNewUpdate(newUpdate, id).subscribe(
      res => {
        newUpdate.seatId = res.seatId;
        this.seats.push(newUpdate);
        alert("Thank You :)");
        this.apiService.getLatest5Updates(id).subscribe(
          res => {
            this.seats = res;
          },
          error => {
            alert("could not download updates after new submission")
          }
        );
      },
      error => {
        alert("An error has occurred while saving the update");
      }
    );
  }
}
