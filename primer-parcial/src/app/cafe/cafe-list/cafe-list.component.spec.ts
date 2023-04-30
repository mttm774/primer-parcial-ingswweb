/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CafeListComponent } from './cafe-list.component';
import { CafeService } from '../cafe.service';
import { Cafe } from '../cafe';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let debug: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      declarations: [CafeListComponent],
      providers: [CafeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;


    for(let i=1; i<=3; i++)
    {
      let cafe = new Cafe(
        faker.datatype.number(),
        faker.name.fullName(),
        faker.lorem.text(),
        faker.lorem.text(),
        faker.lorem.text(),
        faker.datatype.number(),
        faker.image.imageUrl()
      );
      component.cafes.push(cafe);
    }

    fixture.detectChanges();
    debug=fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener una tabla de tres cafés', () => {
    expect(debug.queryAll(By.css('tr.cafe-row'))).toHaveSize(3);
  });

  it('debería tener un encabezado de tabla', () => {
    expect(debug.queryAll(By.css('tr.cafe-header'))).toHaveSize(1);
  });

  it('debería tener un título de página', () => {
    const element: HTMLElement = debug.query(By.css('h5.title-cafe')).nativeElement;
    expect(element.textContent).toContain('El aroma mágico');
  });

  it('debería existir una imagen de encabezado', () => {
    debug.queryAll(By.css('img')).forEach((img, i)=>{
      expect(img.nativeElement.src).toContain('image%201.png')
    });
  });

  it('debería tener un footer de página', () => {
    const element: HTMLElement = debug.query(By.css('p.footer-text')).nativeElement;
    expect(element.textContent).toContain('Contact us: +57 3102105253 - info@elaromamagico.com - @elaromamagico');
  });

  it('debería tener totales', () => {
    expect(debug.queryAll(By.css('p.totales'))).toHaveSize(2);
  });
});
