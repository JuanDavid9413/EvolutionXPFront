import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { WarComponent } from './war/war.component';
import { InitGameComponent } from './init-game/init-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    WarComponent,
    InitGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  exports: [
    NavbarComponent,
    WarComponent,
    InitGameComponent
  ]
})
export class ComponetsModule { }
