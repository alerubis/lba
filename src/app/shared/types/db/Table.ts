export interface Table {

    id?: number | string | undefined;

    getName(): string;

    fromDbValues(values: any): Table;

    toDbValues(): any;
    toFormGroup(): any;

}
