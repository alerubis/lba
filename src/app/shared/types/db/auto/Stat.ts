import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Stat implements Table {

    stat_id: string | undefined;
    nome: string | undefined;
    min: number | undefined;
    ave: number | undefined;
    max: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.stat_id = values.stat_id;
            this.nome = values.nome;
            this.min = values.min;
            this.ave = values.ave;
            this.max = values.max;
        }
    }

    getName(): string {
        return 'stat';
    }

    fromDbValues(values: any): Stat {
        const newStat = new Stat();
        newStat.stat_id = values.stat_id;
        newStat.nome = values.nome;
        newStat.min = values.min;
        newStat.ave = values.ave;
        newStat.max = values.max;
        return newStat;
    }

    toDbValues(): any {
        return {
            stat_id: this.stat_id,
            nome: this.nome,
            min: this.min,
            ave: this.ave,
            max: this.max,
        }
    }

    toFormGroup(): any {
        return {
            stat_id: new FormControl(this.stat_id),
            nome: new FormControl(this.nome),
            min: new FormControl(this.min),
            ave: new FormControl(this.ave),
            max: new FormControl(this.max),
        }
    }

}
