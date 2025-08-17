import { PlayerTeamGame } from '../../../shared/types/db/auto/PlayerTeamGame';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DbService } from '../../../shared/services/db.service';
import { DashboardComponent } from '../../dashboards/dashboard/dashboard.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Dashboard } from '../../../shared/types/db/auto/Dashboard';
import { FormsModule } from '@angular/forms';
import { Team } from '../../../shared/types/db/auto/Team';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { LeagueYear } from '../../../shared/types/db/auto/LeagueYear';
import { League } from '../../../shared/types/db/auto/League';
import { TypeLeagueTypeGame } from '../../../shared/types/db/auto/TypeLeagueTypeGame';
import { TypeGame } from '../../../shared/types/db/auto/TypeGame';
import { Game } from '../../../shared/types/db/auto/Game';
import { Player } from '../../../shared/types/db/auto/Player';

@Component({
    selector: 'app-lineup',
    templateUrl: './lineup.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        DashboardComponent,
        BreadcrumbComponent,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        DatePipe,
        CommonModule,
    ]
})
export class LineupComponent {

    teamId: number | undefined;
    minute: number = 0;
    plus_minus: number = 0;
    team: Team | undefined;
    dashboards: Dashboard[] = [];
    teams: Team[] = [];
    dataLoading: boolean = false;

    selectedDashboardId: number | undefined;

    selectedLeagueId: number | undefined;
    selectedLeagueYearId: number | undefined;
    selectedTypeGameId: number[] = [];
    selectedGameId: number[] = [];
    selectedPlayerId: number[] = [];
    selectedPlayerOutId: number[] = [];
    selectedOtherPlayersIn: number[] = [];

    leaguesYears: LeagueYear[] = [];
    leagues: League[] = [];
    typeLeagueTypeGame: TypeLeagueTypeGame[] = [];
    typeGame: TypeGame[] = [];
    game: Game[] = [];
    players: Player[] = [];
    playersOpponent: Player[] = [];
    otherPlayers: Player[] = [];
    allPlayers: Player[] = [];
    allTeams: Team[] = [];
    playerTeamGame: PlayerTeamGame[] = [];

    playerFilter: string = '';
    teamOpponent: number | undefined;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dbService: DbService,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const idFromParams = params.get('id');
            if (idFromParams) {
                this.teamId = +idFromParams;
            }
            let pIds: string[] = [];
            this.route.queryParams.subscribe(params => {
                pIds = params['pIds'];
            });

            if (pIds) {
                this.loadData(pIds.map(id => Number(id)));
            }
            else {
                this.loadData();
            }

        });
    }

    async loadData(pIds?: number[]): Promise<void> {
        this.dataLoading = true;
        if (this.teamId) {
            this.team = await this._dbService.readUnique(new Team(), { id: this.teamId }) as Team;
        } else {
            this.team = undefined;
        }
        this.dashboards = await this._dbService.readList(new Dashboard()) as Dashboard[];
        this.dashboards = this.dashboards.filter(x => x.card_type_id === 'LINEUP');
        this.teams = await this._dbService.readList(new Team()) as Team[];
        if (!this.selectedDashboardId && this.dashboards.length > 0) {
            this.selectedDashboardId = this.dashboards[0].dashboard_id;
        }

        this.leaguesYears = await this._dbService.readList(new LeagueYear()) as LeagueYear[];
        this.leagues = await this._dbService.readList(new League()) as League[];
        this.typeLeagueTypeGame = await this._dbService.readList(new TypeLeagueTypeGame()) as TypeLeagueTypeGame[];
        this.typeGame = await this._dbService.readList(new TypeGame()) as TypeGame[];
        this.playerTeamGame = await this._dbService.readList(new PlayerTeamGame(), { team_id: this.teamId }) as PlayerTeamGame[];

        this.allPlayers = await this._dbService.readList(new Player()) as Player[];
        this.allTeams = await this._dbService.readList(new Team()) as Team[];

        if (this.playerTeamGame.length > 0) {
            const gameIds = this.playerTeamGame.map(x => x.game_id);
            const playerIds = this.playerTeamGame.map(x => x.player_id);
            this.game = await this._dbService.readList(new Game(), { id: { in: gameIds, }, }) as Game[];
            this.players = this.allPlayers.filter(x => playerIds.some(y => y === x.id));
            if (pIds && pIds?.length > 0) {
                this.selectedPlayerId.push(...pIds)
            }
            else {
                this.selectedPlayerId = await this._dbService.callCustomFirstLineup<any[]>('lineup-boxscore', { team_id: this.teamId, game_ids: gameIds, });
            }
        }
        this.selectedOtherPlayersIn[0] = 0;
        this.selectedOtherPlayersIn[1] = 0;
        this.selectedOtherPlayersIn[2] = 0;
        this.selectedOtherPlayersIn[3] = 0;
        this.selectedOtherPlayersIn[4] = 0;

        if (!this.selectedLeagueId) {
            this.selectedLeagueId = this.leagues[0].id;
        }
        if (!this.selectedLeagueYearId) {
            this.selectedLeagueYearId = this.getSeason()[0].id;
        }
        if (this.selectedTypeGameId.length === 0) {
            this.selectedTypeGameId = (this.getTypeGame().map(x => x.id).filter((id): id is number => id !== undefined)) || [];
        }
        if (this.selectedGameId.length === 0) {
            this.selectedGameId = (this.getGame().map(x => x.id).filter((id): id is number => id !== undefined)) || [];
        }
        this.getMinute();
        this.dataLoading = false;
    }

    getTeamFromId(id: number | undefined): Team | undefined {
        return this.teams.find(x => x.id === id);
    }

    getSeason(): LeagueYear[] {
        return this.leaguesYears.filter(x => x.league_id === this.selectedLeagueId);
    }

    getTypeGame(): TypeGame[] {
        return this.typeGame.filter(x => this.typeLeagueTypeGame
            .some(y => y.type_game_id === x.id &&
                y.type_league_id === this.leagues.find(k => k.id === this.selectedLeagueId)?.type_league_id));
    }

    getGame(): Game[] {
        return this.game.filter(x => this.selectedTypeGameId.some(y => y === x.type_game_id) && x.league_year_id === this.selectedLeagueYearId)
    }

    loadDataSelect(tipo?: string): void {
        if (tipo === 'lega') {
            this.selectedLeagueId = this.getSeason()[0].id;
        }
        this.selectedTypeGameId = (this.getTypeGame().map(x => x.id).filter((id): id is number => id !== undefined)) || [];
        this.selectedGameId = (this.getGame().map(x => x.id).filter((id): id is number => id !== undefined)) || [];
    }

    selezionaTutte(): void {
        this.loadDataSelect();
    }

    selezionaNessuna(): void {
        this.selectedGameId = [];
    }

    getPlayerFromId(id: number): Player | undefined {
        return this.allPlayers.find(x => x.id === id);
    }
    cancelPlayer(i: number, clean?: boolean): void {
        if (clean) {
            this.selectedPlayerId[0] = 0;
            this.selectedPlayerId[1] = 0;
            this.selectedPlayerId[2] = 0;
            this.selectedPlayerId[3] = 0;
            this.selectedPlayerId[4] = 0;
        }
        else {
            this.selectedPlayerId[i] = 0;
        }
    }
    getSelectedPlayerId(): number[] {
        return [...this.selectedPlayerId.filter(x => x !== 0), ...this.selectedOtherPlayersIn.filter(x => x !== 0)];
    }
    getDescrizioneOther(): string {
        return this.selectedOtherPlayersIn.map(id => this.getPlayerFromId(id)?.name + ' ' + this.getPlayerFromId(id)?.surname).join(', ');
    }
    async teamChange(): Promise<void>{
        const playerTeamGame = await this._dbService.readList(new PlayerTeamGame(), { team_id: this.teamOpponent }) as PlayerTeamGame[];

        if (playerTeamGame.length > 0) {
            const playerIds = playerTeamGame.map(x => x.player_id);
            this.otherPlayers = this.allPlayers.filter(x => playerIds.some(y => y === x.id));
        }
    };
    async getMinute(): Promise<any> {
        const dati = await this._dbService.minuteLineupRoute<any>({
            team_id: this.team?.id,
            game_ids: this.selectedGameId,
            playerIn: this.getSelectedPlayerId(),
            playerNotIn: this.selectedPlayerOutId
        });
        const prova = await this._dbService.plusMinusLineupRoute<any>({
            team_id: this.teamId,
            game_ids: this.selectedGameId,
            playerIn: this.getSelectedPlayerId(),
            playerNotIn: this.selectedPlayerOutId
        });
        this.minute = dati.total_minutes;
        this.plus_minus = prova?.plus_minus;
    }
}