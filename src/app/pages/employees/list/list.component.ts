import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  fakeData = [
    {
      name: 'Manuel',
      lastName: 'Baez',
      email: 'mbaez@mail.com',
      startDate: '01/01/1900' 
    },
    {
      name: 'Pedro',
      lastName: 'Reyes',
      email: 'preyes@mail.com',
      startDate: '01/01/1900' 
    },
    {
      name: 'Juan',
      lastName: 'Rios',
      email: 'jrios@mail.com',
      startDate: '01/01/1900' 
    },
    {
      name: 'Alex',
      lastName: 'Ruiz',
      email: 'aruiz@mail.com',
      startDate: '01/01/1900' 
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onGoToEdit(item: any): void{
    this.navigationExtras.state.value= item;
    this.router.navigate(['edit'], this.navigationExtras);
  }
  
  onGoToSee(item: any): void{
    this.navigationExtras.state.value= item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  onGoToDeletet(item: any): void{
    alert('Deleted');
  }

}
