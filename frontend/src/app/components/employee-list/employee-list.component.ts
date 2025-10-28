import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  public getEmployee=[];
  loading = true;

  constructor(private empService: EmployeeService) {}

  async ngOnInit() {
    try {
      this.employees = await this.empService.getEmployees();
      console.log('Fetched employees:', this.employees);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      this.loading = false;
    }
  }

  async deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await this.empService.deleteEmployee(id);
        this.employees = this.employees.filter(e => e.id !== id);
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  }
}
