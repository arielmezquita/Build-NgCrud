import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/shared/models/employee.interface';
import { map } from 'rxjs/operators';

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
        const result = this.employeesColletion.doc(empId).delete();
        resolve(result);
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
