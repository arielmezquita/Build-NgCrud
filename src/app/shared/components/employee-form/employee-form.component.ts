import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/pages/employees/employees.service';
import { Employee } from '../../models/employee.interface';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee;
  employeeForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(private router: Router, private fb: FormBuilder, private employeeSvc: EmployeesService) {
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {
    if (typeof this.employee === 'undefined'){
      this.router.navigate(['new']);
    } else {
      this.employeeForm.patchValue(this.employee);    }
    }

  onSave(): void {
    //Alert: Do you want to Save
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')

        //Saved the employee
        if (this.employeeForm.valid){
          const employee = this.employeeForm.value;
          const employeeId = this.employee?.id || null;
          this.employeeSvc.onSaveEmployee(employee, employeeId);
          this.employeeForm.reset();
        }

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  isValidField(field: string): string{
    const validatedField = this.employeeForm.get(field);
    return ( !validatedField.valid && validatedField.touched)
    ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      startDate: ['', [Validators.required]]
    });
  }
}
