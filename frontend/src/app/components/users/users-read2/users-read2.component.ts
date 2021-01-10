import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Users } from '../users.model';
import { UsersRead2DataSource } from './users-read2-datasource';

@Component({
  selector: 'app-users-read2',
  templateUrl: './users-read2.component.html',
  styleUrls: ['./users-read2.component.css']
})
export class UsersRead2Component implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Users>;
  dataSource: UsersRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'username', 'email'];

  ngOnInit() {
    this.dataSource = new UsersRead2DataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
