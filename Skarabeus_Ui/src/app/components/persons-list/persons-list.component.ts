import { PersonStatus } from './../../models/person.interface';
import { PersonService } from './../../services/person.service';
import { Component, inject, isStandalone } from '@angular/core';
import { PersonCreateModel, PersonDetailModel } from '../../models/person.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { EditService } from '../../services/Edit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persons-list',
  standalone: true,
  imports: [
      CommonModule,
      AsyncPipe,
      FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss'
})
export class PersonsListComponent {
  personService=inject(PersonService);
  editService=inject(EditService)
  router=inject(Router)
  protected persons$;

  search:string = "";
  searchIngredients:string = "";

  editingPersonPage = 1;

  activeEditModal=false
  activeCreateModal=false

  CreatingPerson:PersonCreateModel = {firstName:"",lastName:"",gender:true,active:true,dateOfBirth:new Date().toISOString(),status:PersonStatus.Other,nickname:""}

  editingPerson$:PersonDetailModel;
  editingPersonBase:PersonDetailModel ;

  constructor() {
    this.editingPerson$ = {id:"",firstName:"",lastName:"",gender:false,active:false,status:PersonStatus.Other,deleted:false,nickname:""};
    this.editingPersonBase = JSON.parse(JSON.stringify(this.editingPerson$))
    this.persons$ = this.personService.persons$
  }

  ngOnInit() {
    this.editService.editPersonId$.subscribe(x=>{if(x!=null)this.openEditModal(x!)});
    if(this.editService.openPersonCreate) this.openCreateModal();
    this.editService.openPersonCreate = false
  }

  closeEditModal(){
    this.editingPerson$ = {id:"",firstName:"",lastName:"",gender:false,active:false,status:PersonStatus.Other,deleted:false,nickname:""};
    this.editingPersonBase = JSON.parse(JSON.stringify(this.editingPerson$))
    this.activeEditModal=false;
    this.refresh()
    this.editService.closePersonEdit()
    var url = this.editService.popReturnUrl()
    console.log(url)
    if(url) this.router.navigateByUrl(url);
  }

  openEditModal(id:string){
    this.persons$.subscribe(x => this.editingPerson$ = x.find(y => y.id == id)!)
    this.editingPersonBase = JSON.parse(JSON.stringify(this.editingPerson$))
    this.activeEditModal = true
    this.refresh()
  }

  closeCreateModal(){
    this.CreatingPerson = {firstName:"",lastName:"",gender:true,active:true,dateOfBirth:new Date().toISOString(),status:PersonStatus.Other,nickname:""};
    this.activeCreateModal=false;
    this.refresh()
  }

  checkForm(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.create()
    }
  }

  openCreateModal(){
    this.activeCreateModal = true
    this.refresh()
  }

  refresh(){
    this.personService.updatePersons()
  }

  update() {
    const patch:Partial<PersonCreateModel>={};

    console.log(this.editingPerson$,this.editingPersonBase)

    Object.keys(this.editingPersonBase).forEach(
      x =>
        {
          if(x!="id")
          {
            if((this.editingPersonBase as any)[x] != (this.editingPerson$ as any)[x]){
              (patch as any)[x] = (this.editingPerson$ as any)[x]
            }
          }
        })
    this.personService.Patch(this.editingPerson$.id,patch)
    .subscribe(
      x => this.refresh()
    )
  }

  updateField(field: string) {
    const patch: Partial<PersonCreateModel> = {};

    if ((this.editingPersonBase as any)[field] !== (this.editingPerson$ as any)[field]) {
      (patch as any)[field] = (this.editingPerson$ as any)[field];

      this.personService.Patch(this.editingPerson$.id, patch)
        .subscribe(() => this.refresh());
    }
  }

  onBlur(field: string, isValid?: boolean) {
    if (isValid) {
      this.updateField(field);
    }
  }

  remove(){
    this.personService.Delete(this.editingPerson$.id)
    .subscribe({
      next:() =>
        {
          this.refresh()
          this.closeEditModal()
        },
      error:x => {
        alert(x.error.message)
        this.refresh()
        this.closeEditModal()
      }
      }
    )
  }

  create() {
    this.personService.Create(this.CreatingPerson)
    .subscribe(
      {
        next:x=>{
          var url = this.editService.popReturnUrl()
          if(url) this.router.navigateByUrl(url);
          this.closeCreateModal()
        }
      })
  }

  normalizeString(ob:string){
    return ob.normalize().toUpperCase().replaceAll(' ', "").trim()
  }

}
