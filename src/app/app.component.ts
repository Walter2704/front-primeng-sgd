import { Component, OnInit  } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from './model/product';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DocumentoService } from './services/documento.service';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { CardModule } from 'primeng/card';
import { CascadeSelectModule } from 'primeng/cascadeselect';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableModule, InputTextModule, DropdownModule, CommonModule, FormsModule, ButtonModule, CardModule, InputMaskModule,
    InputTextModule, RatingModule, TagModule, FieldsetModule, CascadeSelectModule],
  templateUrl: './app.component.html',
  providers: [ProductService, DocumentoService],

})
export class AppComponent implements OnInit {
    products!: Product[];
    columns!: Column[];
    loading: boolean = true;
    first = 0;

    rows = 10;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;
    countries: any[] | undefined;

    selectedCountry: string | null = null;

    dropdownAbierto(): void {
        console.log('Dropdown abierto correctamente');
    }

    dropdownCambio(event: any): void {
        console.log('Opción seleccionada:', event.value);
    }

    constructor(private productService: ProductService, private documentoService:DocumentoService) {}

    ngOnInit() {
      // this.columns = [
      //       { field: 'id', header: 'ID' },
      //       { field: 'periodoNombre', header: 'Periodo' },
      //       { field: 'Clase', header: 'Clase' }
      //   ];



        this.countries = [
            {
                name: 'Australia',
                code: 'AU',
                states: [
                    {
                        name: 'New South Wales',
                        cities: [
                            { cname: 'Sydney', code: 'A-SY' },
                            { cname: 'Newcastle', code: 'A-NE' },
                            { cname: 'Wollongong', code: 'A-WO' }
                        ]
                    },
                    {
                        name: 'Queensland',
                        cities: [
                            { cname: 'Brisbane', code: 'A-BR' },
                            { cname: 'Townsville', code: 'A-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'Canada',
                code: 'CA',
                states: [
                    {
                        name: 'Quebec',
                        cities: [
                            { cname: 'Montreal', code: 'C-MO' },
                            { cname: 'Quebec City', code: 'C-QU' }
                        ]
                    },
                    {
                        name: 'Ontario',
                        cities: [
                            { cname: 'Ottawa', code: 'C-OT' },
                            { cname: 'Toronto', code: 'C-TO' }
                        ]
                    }
                ]
            },
            {
                name: 'United States',
                code: 'US',
                states: [
                    {
                        name: 'California',
                        cities: [
                            { cname: 'Los Angeles', code: 'US-LA' },
                            { cname: 'San Diego', code: 'US-SD' },
                            { cname: 'San Francisco', code: 'US-SF' }
                        ]
                    },
                    {
                        name: 'Florida',
                        cities: [
                            { cname: 'Jacksonville', code: 'US-JA' },
                            { cname: 'Miami', code: 'US-MI' },
                            { cname: 'Tampa', code: 'US-TA' },
                            { cname: 'Orlando', code: 'US-OR' }
                        ]
                    },
                    {
                        name: 'Texas',
                        cities: [
                            { cname: 'Austin', code: 'US-AU' },
                            { cname: 'Dallas', code: 'US-DA' },
                            { cname: 'Houston', code: 'US-HO' }
                        ]
                    }
                ]
            }
        ];
        this.documentoService.findByDocumentoOficinaDestino(2).subscribe((response:any) => {
            this.products = response.data;
        });


    }

    pageChange(event:any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    onEdit(event:any) {
        if (!this.isPositiveInteger(event.target.value)) {
            event.stopPropagation();
        }
    }

    isPositiveInteger(val:any) {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        var n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'Normal':
                return 'success';
            case 'Urgente':
                return 'warning';
            case 'Muy Urgente':
                return 'danger';
            default: return 'warning';
        }
    }
}
