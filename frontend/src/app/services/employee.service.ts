import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = 'http://localhost:8081/api/employees';

  constructor(private http: HttpClient) {}

  async getEmployees(): Promise<Employee[]> {
    const res = await lastValueFrom(this.http.get<Employee[]>(this.API_URL));
    return res ?? [];
  }
  async getEmployeeById(id: number): Promise<Employee> {
    const res = await lastValueFrom(this.http.get<Employee>(`${this.API_URL}/${id}`));
    if (!res) throw new Error('Employee not found');
    return res;
  }
  async addEmployee(emp: Employee): Promise<Employee> {
    const res = await lastValueFrom(this.http.post<Employee>(this.API_URL, emp));
    if (!res) throw new Error('Failed to add employee');
    return res;
  }

  async updateEmployee(id: number, emp: Employee): Promise<Employee> {
    const res = await lastValueFrom(this.http.put<Employee>(`${this.API_URL}/${id}/update`, emp));
    if (!res) throw new Error('Failed to update employee');
    return res;
  }

  async deleteEmployee(id: number): Promise<void> {
    await lastValueFrom(this.http.delete<void>(`${this.API_URL}/${id}`));
  }
}
