import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UserCreate, UserDetail, UserPatch } from '../../models/user.interface';
import { PersonService } from '../../services/person.service';
import { EditService } from '../../services/Edit.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone:true,
  imports:[AsyncPipe,ReactiveFormsModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent{
  private userService=inject(UserService)
  private personService=inject(PersonService)
  private editService=inject(EditService)
  private router=inject(Router)

  roles = ["","Admin","UserManger"]

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

  constructor() {
  }

  openPersonEdit(){
    this.editService.openPersonEditModal(this.editingUser.person.id, this.router.url)
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


  delete(){
    this.userService.delete(this.editingUser.id)
    .subscribe(
      x =>
      {
        this.refresh()
      }
    )
  }

  unDelete(){
    this.userService.unDelete(this.editingUser.id)
    .subscribe(
      x =>
      {
        this.refresh()
      }
    )
  }

  changeRole(){
    console.log(this.editingUser)
    if(this.editingUser.role == "") this.userService.removeRole(this.editingUser.id).subscribe(x=>this.refresh());
    else  this.userService.addRole(this.editingUser.id,this.editingUser.role).subscribe(x=>this.refresh());
  }
  
  updateField(field: string) {
    const patch: Partial<UserPatch> = {};
    
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
