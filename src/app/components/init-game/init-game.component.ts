import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { modulesEnum } from 'src/app/enums/enumerables';
import { GenericService } from 'src/app/services/generic.service';
import { GenericMethods } from '../../generics/genericMethods';

@Component({
  selector: 'app-init-game',
  templateUrl: './init-game.component.html',
  styleUrls: ['./init-game.component.css']
})
export class InitGameComponent implements OnInit {

  @Output() changeView = new EventEmitter<boolean>();
  nameGame!: string;   
  formPlayersGame!: FormGroup;

  constructor( private fb: FormBuilder, private service: GenericService, private genericMethods: GenericMethods ) { }

  ngOnInit(): void {
    this.initializate();
  }

  get ValidatePlayerOne() {
    return this.formPlayersGame.get('namePlayerOne')?.touched && this.formPlayersGame.get('namePlayerOne')?.invalid;
  }

  get ValidatePlayerTwo() {
    return this.formPlayersGame.get('namePlayerTwo')?.touched && this.formPlayersGame.get('namePlayerTwo')?.invalid;
  }

  initializate() {
    this.formPlayersGame = this.fb.group({
      namePlayerOne: ['', Validators.required],
      namePlayerTwo: ['', Validators.required]
    });
  }

  savePlayers() {
    if (this.formPlayersGame.valid) {
      this.searchGame();
      this.savePlayer();
    }
  }

  // Private methods
  private searchGame() {
    this.service.get(modulesEnum.Game)
        .subscribe( resp => {
            const totalGames = resp.data.length;
            this.nameGame = 'Game ' + (totalGames + 1);
            // Insert new game
            this.saveGame(this.nameGame);
        }, error => {
          switch(error.error.code)
          {
            case 400:
              console.log(error.error.data.length === 0);
              if(error.error.data.length === 0) {
                this.nameGame = 'Game' + 1;
                // Insert new game
                this.saveGame(this.nameGame);
              }
              else {
                this.genericMethods.MessageWarning('Oppss....', error.error.message);
              }
              break;
            case 500:
              this.genericMethods.MessageError('Oppss....', error.error.message);
              break;
            }
        });    
  }

  private saveGame(nameRound: string) {
    const params = { NameRound: nameRound };
    this.service.post(modulesEnum.Game, params)
      .subscribe( resp => {
        this.genericMethods.MessageSuccess('Que comience el juego', resp.message);
        localStorage.setItem('game', JSON.stringify(resp.data));
        this.changeView.emit(true);
      }, error => {
        switch(error.error.code)
        {
          case 400:
            this.genericMethods.MessageWarning('Oppps...', error.error.message);
            break;
          case 500:
            this.genericMethods.MessageError('Oppps...', error.error.message);
            break;
        }
      });

  }

  private savePlayer() {
    const parameters = [
      {
        Name: this.formPlayersGame.get('namePlayerOne')?.value
      },
      {
        Name: this.formPlayersGame.get('namePlayerTwo')?.value
      }
    ];
    this.service.post(modulesEnum.Players, parameters)
      .subscribe( resp => {
        let count = 1;
        resp.data.forEach( item => {
           localStorage.setItem('player'+count, JSON.stringify(item));
           count++;
          });
      });
  }
}
