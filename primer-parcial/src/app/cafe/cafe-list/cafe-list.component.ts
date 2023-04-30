import { Component, OnInit } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  templateUrl: './cafe-list.component.html',
  styleUrls: ['./cafe-list.component.css']
})
export class CafeListComponent implements OnInit {
  cafes: Array<Cafe> = [];
  isLoading: boolean = true;
  noConnection: boolean=false;
  totalCantCafeOrigen: number=0;
  totalCantCafeBlend: number=0;
  constructor(private cafeService: CafeService) { }

  ngOnInit() {
    this.getCafes();
  }

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
        this.isLoading = false;
        this.cafes = cafes;
        const cafeOrigen= this.cafes.filter((obj) =>{
          return obj.tipo === 'Café de Origen'
        });
        this.totalCantCafeOrigen=cafeOrigen.length;

        const cafeBlend= this.cafes.filter((obj) =>{
          return obj.tipo === 'Blend'
        });
        this.totalCantCafeBlend=cafeBlend.length;

      },
      (error) =>{
        this.noConnection=true;
      }
    )
  }

}
