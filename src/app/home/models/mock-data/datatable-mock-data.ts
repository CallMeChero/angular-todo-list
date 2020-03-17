import { IDatatableHeader } from '../datatable-header';

export const HEADER_ITEMS: IDatatableHeader[] = [
    {
        name: 'Naziv', prop: 'name', sortable: true, width: 150
    },
    {
        name: 'Naslov', prop: 'title', sortable: true, width: 150        
    },
    {
        name: 'Opis', prop: 'description', sortable: true, width: 250
    },
    {
        name: 'Datum izrade', prop: 'dateCreated', sortable: true, width: 120
    },
];