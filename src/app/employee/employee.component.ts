import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { Employee } from '../employee';
import { EmployeeBenefitCalculator } from '../employee-benefit-calculator';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: Employee | undefined;
  annualBenefitDeduction: number = 0;
  payPeriodBenefitDeduction: number = 0;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private employeeBenefitCalculator: EmployeeBenefitCalculator) {
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    // If employee is not found this will return a new employee object.
    this.employee = this.employeeService.getEmployee(id);

    this.calculateBenefitAmounts();
  }

  addDependent(name: string): void {
    // Fake out an id for now
    var newId = 10 + (this.employee ? this.employee?.dependents.length : 0);
    var contact: Contact = { name: name, id: newId };
    this.employee?.dependents.push(contact);

    // Recalculate benefits
    this.calculateBenefitAmounts();
  }

  onEmployeeNameChange(name: string): void {
    if (!this.employee) {
      return;
    }

    this.employee.name = name;

    // Recalculate benefits since name changed and that affects benefit discounts
    this.calculateBenefitAmounts();
  }

  calculateBenefitAmounts(): void {
    if (!this.employee) {
      return;
    }
    this.annualBenefitDeduction = this.employeeBenefitCalculator.CalculateAnnualEmployeeDeduction(this.employee);
    this.payPeriodBenefitDeduction = this.employeeBenefitCalculator.CalculateEmployeeDeduction(this.employee);
  }

}
