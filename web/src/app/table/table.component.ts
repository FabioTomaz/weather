import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { City } from '../model/city';
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.css' ]
})
export class TableComponent implements AfterViewInit {

  citiesList = new BehaviorSubject<City[]>([]);
  dataSource = new ReplaySubject<MatTableDataSource<City>>(1);

  @Input() set cities(cities: City[]) {
    this.citiesList.next(cities);
    this.dataSource.next(new MatTableDataSource(cities));
  }

  displayedColumns: string[] = [ 'name', 'temp', 'sunset', 'sunrise' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

  }

  ngAfterViewInit() {
    // Assign the data to the data source for the table to render
    this.dataSource.subscribe((dataSource) => {
      dataSource.sort = this.sort;
      dataSource.paginator = this.paginator;
    });
  }

}
