import { Component, ViewEncapsulation } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import {
  process,
  State,
  SortDescriptor,
  orderBy,
} from '@progress/kendo-data-query';
import { HttpService } from '../appSerice';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="toggleColumn('first_name')">Toggle First Name</button>
    <button (click)="toggleColumn('last_name')">Toggle Last Name</button>
    <button (click)="toggleColumn('email')">Toggle Email</button>
    <button (click)="toggleColumn('phone')">Toggle Phone</button>
    <button (click)="toggleColumn('gender')">Toggle Gender</button>
    <button (click)="toggleColumn('age')">Toggle Age</button>
    <button (click)="toggleColumn('job_title')">Toggle Job Title</button>
    <button (click)="toggleColumn('years_of_experience')">Toggle Years of Experience</button>
    <button (click)="toggleColumn('salary')">Toggle Salary</button>
    <button (click)="toggleColumn('department')">Toggle Department</button>
    <!-- Add more buttons for other columns as needed -->

    <kendo-grid
      [data]="gridView"
      [pageSize]="state.take"
      [skip]="state.skip"
      [pageable]="true"
      [sortable]="true"
      (dataStateChange)="onChange($event)"
    >
      <kendo-grid-column
        field="id"
        title="ID"
        [width]="70"
        [filterable]="false"
        [hidden]="hideColumns['id']"
      ></kendo-grid-column>
      <kendo-grid-column
        field="first_name"
        title="First Name"
        [width]="150"
        [hidden]="hideColumns['first_name']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="last_name"
        title="Last Name"
        [width]="150"
        [hidden]="hideColumns['last_name']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="email"
        title="Email"
        [width]="200"
        [hidden]="hideColumns['email']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="phone"
        title="Phone"
        [width]="150"
        [hidden]="hideColumns['phone']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="gender"
        title="Gender"
        [width]="100"
        [hidden]="hideColumns['gender']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="age"
        title="Age"
        [width]="70"
        [hidden]="hideColumns['age']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="job_title"
        title="Job Title"
        [width]="150"
        [hidden]="hideColumns['job_title']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="years_of_experience"
        title="Years of Experience"
        [width]="150"
        [hidden]="hideColumns['years_of_experience']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="salary"
        title="Salary"
        [width]="150"
        [hidden]="hideColumns['salary']"
      >
      </kendo-grid-column>
      <kendo-grid-column
        field="department"
        title="Department"
        [width]="150"
        [hidden]="hideColumns['department']"
      >
      </kendo-grid-column>
    </kendo-grid>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .k-grid .k-grid-content {
        margin-right: -17px;
      }

      .k-grid .k-grid-header {
        padding-right: 0 !important;
      }

      .k-grid .k-grid-header-wrap {
        border-right: 0;
      }
    `,
  ],
})
export class EmployeesComponent {
  public gridView!: GridDataResult;
  public state: State = {
    skip: 0,
    take: 5,
    sort: [], // Initial empty sort descriptor
  };

  private gridData: any;

  public hideColumns: { [key: string]: boolean } = {
    id: false, // Set initial visibility state for each column
    first_name: false,
    last_name: false,
    // Add more properties for other columns as needed
  };

  constructor(private httpService: HttpService) {}
  ngOnInit() {
    this.httpService.getPosts().subscribe(
      (response) => {
        this.gridData = response;
        this.loadItems(); // Move loadGridData() inside the subscription
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onChange(state: State): void {
    this.state = state;
    this.loadItems();
  }

  private loadItems(): void {
    // Process the data with sorting
    this.gridView = process(this.gridData, this.state);
  }

  public toggleColumn(field: string): void {
    // Toggle the visibility state of the specified column
    this.hideColumns[field] = !this.hideColumns[field];
  }
}
