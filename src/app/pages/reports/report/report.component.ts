import { PlayerTeamGame } from '../../../shared/types/db/auto/PlayerTeamGame';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { DatePipe, NgClass } from '@angular/common';
import { LeagueYear } from '../../../shared/types/db/auto/LeagueYear';
import { League } from '../../../shared/types/db/auto/League';
import { TypeLeagueTypeGame } from '../../../shared/types/db/auto/TypeLeagueTypeGame';
import { TypeGame } from '../../../shared/types/db/auto/TypeGame';
import { Game } from '../../../shared/types/db/auto/Game';
import { Player } from '../../../shared/types/db/auto/Player';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';
import * as htmlToImage from 'html-to-image';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
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
    ]
})
export class ReportComponent {

    @ViewChild('exportArea', { static: false }) exportArea!: ElementRef;

    teamId: number | undefined;
    team: Team | undefined;
    dashboards: Dashboard[] = [];
    dashboardsTeam: Dashboard[] = [];
    dashboardsPlayer: Dashboard[] = [];
    dashboardsGame: Dashboard[] = [];
    dashboardsLineup: Dashboard[] = [];
    teams: Team[] = [];
    dataLoading: boolean = false;
    pdfLoading: boolean = false;

    selectedDashboardIdTeam: number | undefined;
    selectedDashboardIdPlayer: number | undefined;
    selectedDashboardIdGame: number | undefined;
    selectedDashboardIdLineup: number | undefined;

    selectedLeagueId: number | undefined;
    selectedLeagueYearId: number | undefined;
    selectedTypeGameId: number[] = [];
    selectedGameId: number[] = [];

    leaguesYears: LeagueYear[] = [];
    leagues: League[] = [];
    typeLeagueTypeGame: TypeLeagueTypeGame[] = [];
    typeGame: TypeGame[] = [];
    game: Game[] = [];
    playerTeamGame: PlayerTeamGame[] = [];
    playerTeamLastGame: PlayerTeamGame[] = [];
    playerLastGame: Player[] = [];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dbService: DbService,
    ) {

    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const idFromParams = params.get('id');
            if (idFromParams) {
                this.teamId = +idFromParams;
            }
            this.loadData();
        });
    }

    async loadData(): Promise<void> {
        this.dataLoading = true;
        if (this.teamId) {
            this.team = await this._dbService.readUnique(new Team(), { id: this.teamId }) as Team;
        } else {
            this.team = undefined;
        }
        this.dashboards = await this._dbService.readList(new Dashboard()) as Dashboard[];
        this.dashboardsTeam = this.dashboards.filter(x => x.card_type_id === 'TEAM');
        this.dashboardsPlayer = this.dashboards.filter(x => x.card_type_id === 'PLAYER');
        this.dashboardsGame = this.dashboards.filter(x => x.card_type_id === 'GAME');
        this.dashboardsLineup = this.dashboards.filter(x => x.card_type_id === 'LINEUP');
        this.teams = await this._dbService.readList(new Team()) as Team[];
        if (!this.selectedDashboardIdTeam && this.dashboardsTeam.length > 0) {
            this.selectedDashboardIdTeam = this.dashboardsTeam[0].dashboard_id;
        }
        if (!this.selectedDashboardIdPlayer && this.dashboardsPlayer.length > 0) {
            this.selectedDashboardIdPlayer = this.dashboardsPlayer[0].dashboard_id;
        }
        if (!this.selectedDashboardIdGame && this.dashboardsGame.length > 0) {
            this.selectedDashboardIdGame = this.dashboardsGame[0].dashboard_id;
        }
        if (!this.selectedDashboardIdLineup && this.dashboardsLineup.length > 0) {
            this.selectedDashboardIdLineup = this.dashboardsLineup[0].dashboard_id;
        }

        this.leaguesYears = await this._dbService.readList(new LeagueYear()) as LeagueYear[];
        this.leagues = await this._dbService.readList(new League()) as League[];
        this.typeLeagueTypeGame = await this._dbService.readList(new TypeLeagueTypeGame()) as TypeLeagueTypeGame[];
        this.typeGame = await this._dbService.readList(new TypeGame()) as TypeGame[];
        this.playerTeamGame = await this._dbService.readList(new PlayerTeamGame(), { team_id: this.teamId }) as PlayerTeamGame[];
        if (this.playerTeamGame.length > 0) {
            const gameIds = this.playerTeamGame.map(x => x.game_id);
            this.game = await this._dbService.readList(new Game(), { id: { in: gameIds, }, }) as Game[];
            this.playerTeamLastGame = await this._dbService.readList(new PlayerTeamGame(), { game_id: this.game.slice(-1)[0].id }) as PlayerTeamGame[];
            this.playerLastGame = await this._dbService.readList(new Player(), { id: { in: this.playerTeamLastGame.filter(x => x.team_id === this.team?.id).map(x => x.player_id), }, }) as Player[];
        }

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
    async exportPdf(): Promise<void> {
        this.pdfLoading = true;

        console.log("Avvio exportPdf…");
        await new Promise(r => setTimeout(r, 300)); // permette ai dashboard di stabilizzarsi
        await this.doPdfExport();
    }
    
    private async doPdfExport(): Promise<void> {
        const area: HTMLElement = this.exportArea.nativeElement;
        const blocks: HTMLElement[] = Array.from(
            area.querySelectorAll('.pdf-block')
        );
    
        if (blocks.length === 0) {
            console.error("Nessuna sezione .pdf-block trovata!");
            return;
        }
    
        const images: string[] = [];
    
        // 1. Converti ogni blocco in immagine PNG
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
    
            try {
                const dataUrl = await htmlToImage.toPng(block, {
                    cacheBust: true,
                    pixelRatio: 2,
                    quality: 1,
                    backgroundColor: '#ffffff',
                    skipFonts: true
                });
    
                images.push(dataUrl);
            } catch (err) {
                console.error(`Errore nel blocco ${i + 1}`, err);
            }
        }
    
        if (images.length === 0) {
            console.error("Nessuna immagine generata");
            return;
        }
    
        // 2. Funzione per calcolare le proporzioni di ogni immagine
        const getImageDimensions = (base64: string, targetWidth: number): Promise<{ width: number; height: number }> => {
            return new Promise(resolve => {
                const img = new Image();
                img.onload = () => {
                    const ratio = img.height / img.width;
                    resolve({
                        width: targetWidth,
                        height: targetWidth * ratio
                    });
                };
                img.src = base64;
            });
        };
    
        const targetWidth = 822; // 842 - 20 margini laterali (A4 landscape)
        const dims: any[] = [];
    
        // 3. Calcolo dimensioni reali di ogni immagine
        for (const img of images) {
            const dim = await getImageDimensions(img, targetWidth);
            dims.push(dim);
        }
    
        // 4. Altezza totale della pagina PDF
        const totalHeight = dims.reduce((sum, d) => sum + d.height + 20, 0); // +20 margin verticali
    
        console.log("Altezza totale PDF:", totalHeight);
    
        // 5. Costruzione contenuto PDF
        const content: Content[] = images.map((img, i) => ({
            image: img,
            width: dims[i].width,
            height: dims[i].height,
            margin: [0, 10, 0, 10] as [number, number, number, number]
        }));
    
        // 6. Definizione PDF: pagina singola, orizzontale, altezza dinamica
        const docDef: TDocumentDefinitions = {
            pageSize: {
                width: 842,        // A4 landscape
                height: totalHeight  // calcolata dinamicamente
            },
            pageMargins: [10, 10, 10, 10] as [number, number, number, number],
            content
        };
    
        // 7. Generazione PDF
        pdfMake.createPdf(docDef).download('report.pdf');
    }
    
    
    
}