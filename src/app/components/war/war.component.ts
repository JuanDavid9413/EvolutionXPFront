import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { modulesEnum } from 'src/app/enums/enumerables';
import { GenericService } from 'src/app/services/generic.service';
import { GenericMethods } from '../../generics/genericMethods';

@Component({
  selector: 'app-war',
  templateUrl: './war.component.html',
  styleUrls: ['./war.component.css']
})
export class WarComponent implements OnInit {

  @Output() finishGame = new EventEmitter<boolean>();
  formGames!: FormGroup;
  nextRound!: string;
  jugadorNumber: number = 1;
  countRounds = 1;
  optionsGame: any[] = [];
  currentGame: any[] = [];
  
  constructor( private fb: FormBuilder, private service: GenericService, private genericMethods: GenericMethods ) { 
  }

  ngOnInit(): void {
    this.initializate();
    this.getMovimients();
  }

  get ValidateMovimient() {
    return this.formGames.get('movimient')?.touched && this.formGames.get('movimient')?.invalid;
  }

  initializate() {
    this.formGames = this.fb.group({
      movimient: ['', Validators.required]
    });
  }

  getMovimients() {
    this.service.get(modulesEnum.Movimients)
      .subscribe( resp => {
        resp.data.forEach(item => { this.optionsGame.push(item) });
      });
  }

  saveMovimient() {
    if ( this.formGames.valid ) {
      this.SaveWar();
    }
  }

  private SaveWar() {
    const name = JSON.stringify(localStorage.getItem('player'+ this.jugadorNumber));
    let convertString = JSON.parse(name);
    const player = JSON.parse(convertString);
    const converGame = JSON.stringify(localStorage.getItem('game'));
    const convertGameObject = JSON.parse(converGame);
    const game = JSON.parse(convertGameObject);
    const params = {
      id_player: player.id,
      id_game: game.id,
      id_movimient: this.formGames.get('movimient')?.value.id,
      round: this.countRounds
    };

    this.service.post(modulesEnum.War, params)
        .subscribe( resp => {
          this.MovimientsPlayers(game.id);
          this.genericMethods.MessageSuccess('Turno el siguiente Jugador', resp.message);
          if (this.jugadorNumber === 2) {
            this.jugadorNumber = 1;
            this.countRounds++;
          }
          else {
            this.jugadorNumber++;
          }

          if (this.countRounds === 4 ) {
            this.finishRounds();
          }
          this.clearFields();
    });
  }

  private MovimientsPlayers(numGame: number) {
    this.service.getFilterSubModule(modulesEnum.War, modulesEnum.WarGetFilterSubModule, `Id_Game=${ numGame }`)
      .subscribe( resp => {
        this.currentGame = resp.data;
        console.log(resp.data);
      });
  }

  private finishRounds() {
    localStorage.clear();
    this.finishGame.emit(false);
  }

  private clearFields() {
    this.formGames.reset({
      movimient: ''
    })
  }
}
