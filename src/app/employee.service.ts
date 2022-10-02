import { Injectable } from '@angular/core';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // TEST DATA - since no backend to retrieve employee data
  employees: Employee[] = [
    {
      name: 'Amy Racoon',
      id: 1,
      dependents: []
    },
    {
      name: 'Brandon Beowolf',
      id: 2,
      dependents:
        [
          {
            name: 'Margaret Beowolf',
            id: 11
          },
          {
            name: 'Billy Beowolf',
            id: 12
          }
        ]
    }
  ];

  constructor() { }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployee(id: number): Employee {
    var employee = this.employees.find((employee) => employee.id === id );

    // TODO: Handle if the id is invalid, for now return a new blank employee 
    // Be better to surface an missing employee message to the user.
    return employee ? employee : this.getNewEmployee();
  }

  getNewEmployee(): Employee {
    return { id: 0, name: '', dependents: [] };
  }

}
