import { Component } from '@angular/core';
 
@Component({
 selector: 'app-root',
 template: `
 <div class="container-md">
 <!-- <nav>
  <ul>
    <li><a routerLink="/tab1">Tab 1</a></li>
    <li><a routerLink="/tab2">Tab 2</a></li>
  </ul>
</nav> -->
<!-- <ul class="nav"> -->
  <!-- <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li> -->
  <!-- <li class="nav-item">
    <a class="nav-link" href="#">Users</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Contents</a>
  </li> -->
  <!-- <li class="nav-item">
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </li> -->
<!-- </ul> -->
   <router-outlet></router-outlet>
 </div>
 `
})
export class AppComponent { }