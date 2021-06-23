import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { PlayersComponent } from './pages/players/players.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'players', component: PlayersComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'game'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
