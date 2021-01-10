import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Users } from '../users.model';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: Users[] = [
  {id: 1, name: 'Hydrogen', username: '', email: ''},
  {id: 2, name: 'Hydrogen', username: '', email: ''},
  {id: 3, name: 'Hydrogen', username: '', email: ''},
  {id: 4, name: 'Hydrogen', username: '', email: ''},
  {id: 5, name: 'Hydrogen', username: '', email: ''},
  {id: 6, name: 'Hydrogen', username: '', email: ''},
  {id: 7, name: 'Hydrogen', username: '', email: ''},
  {id: 8, name: 'Hydrogen', username: '', email: ''},
  {id: 9, name: 'Hydrogen', username: '', email: ''},
  {id: 10, name: 'Hydrogen', username: '', email: ''},
  {id: 11, name: 'Hydrogen', username: '', email: ''},
  {id: 12, name: 'Hydrogen', username: '', email: ''},
  {id: 12, name: 'Hydrogen', username: '', email: ''},
  {id: 14, name: 'Hydrogen', username: '', email: ''},
  {id: 15, name: 'Hydrogen', username: '', email: ''},
];

/**
 * Data source for the UsersRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersRead2DataSource extends DataSource<Users> {
  data: Users[] = EXAMPLE_DATA;
  paginator!: MatPaginator;
  sort!: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Users[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Users[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Users[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'username': return compare(a.username, b.username, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
