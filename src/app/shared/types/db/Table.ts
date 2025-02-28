export interface Table {

    id: number | undefined;

    getName(): string;

    fromDbValues(values: any): Table;

    toDbValues(): any;
    toFormGroup(): any;

}
