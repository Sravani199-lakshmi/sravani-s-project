import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {
  employee: Employee = { id: 0, name: '', email: '', department: '', salary: 0 };

  constructor(private empService: EmployeeService, private router: Router) {}

  async addEmployee() {
    console.log('Adding employee:', this.employee);
    const payload={...this.employee};
    payload.id=null;
    try {
      await this.empService.addEmployee(payload);
      alert('Employee added successfully!');
      this.router.navigate(['/']); // go back to list
    } catch (err) {
      console.error('Failed to add employee:', err);
    }
  }
}
