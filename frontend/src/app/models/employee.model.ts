// employee.model.ts
export interface Employee {
   id?: number | null;        // <--- this is important
  name: string;
  email: string;
  department: string;
  salary: number;
}
