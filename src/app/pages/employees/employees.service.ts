import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/shared/models/employee.interface';
import { map } from 'rxjs/operators';
import  Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employees: Observable<Employee[]>;

  private employeesColletion: AngularFirestoreCollection<Employee>;

  constructor(private readonly afs: AngularFirestore) {
    this.employeesColletion = afs.collection<Employee>('employees');
    this.getEmployees();
  }

  onDeleteEmployees(empId: string): Promise<void>{
    return new Promise (async (resolve, reject) => {
      try {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {

            //Delete Employee
            const result = this.employeesColletion.doc(empId).delete();
            resolve(result);

            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      } catch (err) {
        reject(err.message);
      }
    });
  }

  onSaveEmployee(employee: Employee, empId: string): Promise<void>{
    return new Promise( async (resolve, reject) => {
      try {
        const id = empId || this.afs.createId();
        const data = { id, ...employee };
        const result = await this.employeesColletion.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  private getEmployees(): void{
    this.employees = this.employeesColletion.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Employee))
    );
  }

}
