import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeBenefitCalculator } from '../employee-benefit-calculator';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, public employeeBenefitCalculator: EmployeeBenefitCalculator) { }

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

  delete(employee: Employee) {
    // TODO: implement delete
    console.log('Delete clicked for ', employee.name);
  }

}
