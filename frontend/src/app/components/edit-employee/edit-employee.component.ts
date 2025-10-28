import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
   constructor( private route: ActivatedRoute,private router: Router,private empService: EmployeeService) {}
     emp: Employee | null = null; 
     id!: number;
     async ngOnInit(){
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      try {
        this.emp = await this.empService.getEmployeeById(this.id);
        console.log('Fetched employee for edit:', this.emp);
      } catch (err) {
        console.error('Failed to fetch employee for edit:', err);
      }
     }
 
   async updateEmployee(id: number, emp: Employee) {
    try {
      await this.empService.updateEmployee(id, emp);
      alert('Employee updated successfully!');
      this.router.navigate(['/']); // go back to list
    } catch (err) {
      console.error('Update failed:', err);
    }
  }
}
