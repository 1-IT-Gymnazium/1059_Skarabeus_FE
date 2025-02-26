import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UserCreate, UserDetail } from '../../models/user.interface';
import { PersonService } from '../../services/person.service';
import { PersonEditService } from '../../services/PersonEdit.service';

@Component({
  selector: 'app-user-list',
  standalone:true,
  imports:[AsyncPipe,ReactiveFormsModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent{
  protected users$ = this.userService.users$;
  protected persons$ = this.personService.persons$;

  protected searchUsers = ""
  password2: string = '';
  passwordMismatch: boolean = false;

  activeCreateModal:boolean = false;
  activeEditModal:boolean = false;

  creatingUser:UserCreate = {} as UserCreate;
  editingUser:UserDetail = {} as UserDetail;
  editingUserBase:UserDetail = {} as UserDetail;

  constructor(private userService:UserService, private personService:PersonService, private personEditService:PersonEditService) {
  }

  openPersonEdit(){
    this.personEditService.openEditModal(this.editingUser.person.id)
  }

  refresh(){
    this.userService.updateUsers()
    this.editingUserBase  = JSON.parse(JSON.stringify(this.editingUser))
  }

  refreshPersons(){
    this.personService.updatePersons()
  }

  openCreateModal(){
    this.creatingUser.name = this.searchUsers;
    this.creatingUser.personId = "";
    this.activeCreateModal=true
  }

  closeCreateModal(){
    this.activeCreateModal=false
    this.password2 = ""
    this.creatingUser = {} as UserCreate
  }

  openEditModal(id:string){
    this.users$.subscribe(
      x => {
        this.editingUser = x.find(y => y.id == id)!;
      }
    )
    this.editingUserBase  = JSON.parse(JSON.stringify(this.editingUser))
    this.activeEditModal = true
  }

  closeEditModal(){
    this.activeEditModal=false
    this.creatingUser = {} as UserCreate  
    this.editingUserBase  = JSON.parse(JSON.stringify(this.editingUser))
  }

  validateAndTryCreate(form: NgForm){
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.checkPasswords()
    }
    else{
      this.create()
    }
  }

  create(){
    this.userService.create(this.creatingUser)
    .subscribe(
      x => {
        this.refresh()
        this.closeCreateModal()
      }
    )
  }
  
  updateField(field: string) {
    const patch: Partial<UserCreate> = {};
    
    if ((this.editingUserBase as any)[field] !== (this.editingUser as any)[field]) {
      (patch as any)[field] = (this.editingUser as any)[field];
      this.userService.Patch(this.editingUser.id, patch)
      .subscribe(() => this.refresh());
    }
  }
      
  
    onBlur(field: string, isValid?: boolean) {
      if (isValid) {
        this.updateField(field);
      }
    }

  normalizeString(ob:string){
    return ob.normalize().toUpperCase().replaceAll(' ', "").trim()
  }

  checkPasswords() {
    this.passwordMismatch = (this.creatingUser.password !== this.password2) || (this.creatingUser.password == "");
    console.log(this.passwordMismatch)
  }
}
