import { Injectable } from "@angular/core";
import { Contact } from "./contact";
import { Employee } from "./employee";

@Injectable({
    providedIn: 'root'
})
export class EmployeeBenefitCalculator {
    private payPeriodsPerYear = 26;
    // private basePay = 2000; // Unused at the moment
    private annualBenefitCost = 1000;
    private annualBenefitCostPerDependent = 500;
    private discountRate = .10;

    /**
     * Calculates the deduction amount for the employee for entire year
     * @param employee Employee
     * @returns deduction amount for the specified employee and its dependents
     */
    public CalculateEmployeeDeduction(employee: Employee): number {
        // This doesn't account for handling the situation when the amount is not evenly divided by the pay periods
        return Math.round((this.CalculateAnnualEmployeeDeduction(employee) / this.payPeriodsPerYear) * 100) / 100;
    }

    /**
     * Calculates the deduction amount for the employee for entire year
     * @param employee Employee
     * @returns deduction amount for the specified employee and its dependents
     */
    public CalculateAnnualEmployeeDeduction(employee: Employee): number {
        var rate = this.QualifiesForDiscount(employee) ? 1.0 - this.discountRate : 1.0;
        var deduction = Math.round(this.annualBenefitCost * rate * 100) / 100;
        employee.dependents.forEach((dependent) => {
            deduction += this.CalculateDependentDeduction(dependent);
        });
        return deduction;
    }

    /**
     * Calculates the deduction amount for a dependent
     * @param dependent Dependent
     * @returns deduction amount for specified dependent
     */
    private CalculateDependentDeduction(dependent: Contact): number {
        var rate = this.QualifiesForDiscount(dependent) ? 1.0 - this.discountRate : 1.0;
        var deduction = Math.round(this.annualBenefitCostPerDependent * rate * 100) / 100;
        return deduction;
    }

    /**
     * Determines if an employee/dependent qualifies for a discount
     * @param contact Contact
     */
    private QualifiesForDiscount(contact: Contact): boolean {
        // Question - should name check be case inensitive
        return contact.name.startsWith('A');
    }
}
