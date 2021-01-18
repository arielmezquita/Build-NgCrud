import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  value = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;
   }

  ngOnInit(): void {
  }

}
