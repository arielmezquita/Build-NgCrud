import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  value = null;
  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras?.state;

  }

  ngOnInit(): void {
  }

}
