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
  constructor(private cafeService: CafeService) { }

  ngOnInit() {
    this.getCafes();
  }

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
        this.isLoading = false;
        this.cafes = cafes;
        console.log(this.cafes);
      },
      (error) =>{
        this.noConnection=true;
      }
    )
  }

}
