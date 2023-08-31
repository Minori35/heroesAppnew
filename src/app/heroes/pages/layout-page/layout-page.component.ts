import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  constructor(
    private router: Router,
    private authServices: AuthService
  ){}
  public sidebarItems=[
    {label : 'Listado', icon: 'label', url:'./list'},
    {label : 'Añadir', icon: 'add', url:'./new-hero'},
    {label : 'Buscar', icon: 'search', url:'./search'},

  ]

  get user(): User | undefined{
    return this.authServices.currentUSer;
  }

  onLogout(){
    this.authServices.logout();
    this.router.navigate(['/auth'])
  }
}
