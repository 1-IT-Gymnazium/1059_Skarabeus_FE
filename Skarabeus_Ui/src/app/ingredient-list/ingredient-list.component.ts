import { AsyncPipe, CommonModule, NumberSymbol } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';
import { IngredientDetail } from '../models/ingredient/ingredient-detail.interface';
import { IngredientCreate } from '../models/ingredient/ingredient-create.interface';
import { Drawer } from 'flowbite';


@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})
export class IngredientListComponent {
protected fb:FormBuilder;
protected ingredients$;
$targetEl = document.getElementById('drawer-right-example');
drawer:any;

modalTitle: string = '';
modalName: string = '';
modalPrice: number = 0;
editingIng:IngredientDetail ={id:"",name:"",priceForUnit:0};


//drawerElement = document.getElementById('drawer-right-example');

constructor(formBuilder:FormBuilder,protected is: IngredientService) {
  this.fb = formBuilder;
  this.ingredients$ = this.is.ingredients$;

  this.initDraw()
  /*
  if (this.drawerElement) {
    new Drawer(this.drawerElement);
  }*/
}

ngOnInit(){
  this.initDraw()
}

initDraw(){
  this.drawer =new Drawer(document.getElementById('drawer-right-example'), {
    placement: 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
    onHide: () => {
        console.log('drawer is hidden');
    },
    onShow: () => {
        console.log('drawer is shown');
    },
    onToggle: () => {
        console.log('drawer has been toggled');
    },
  }, {
  id: 'drawer-right-example',
  override: true
  });
}

refreshIngredients(){
  this.is.UpdateIngredients()
}

removeIngredient(id:string):any{
  console.log("aaaa"+id);
  this.is.removeIngredient(id);
}

activeEditDrawer(ingredient:IngredientDetail){
  this.editingIng = ingredient;
  this.openDrawer("Edit",ingredient.name,ingredient.priceForUnit)
}

  openDrawer(title: string, name: string = '',price:number=0): void {
    this.modalTitle = title;
    this.modalName = name;
    this.modalPrice = price;
    this.drawer.show()
  }

  closeDrawer(): void {
    this.drawer.hide()
  }

  saveChanges(): void {
    const ing:IngredientCreate = {name: this.modalName,priceforunit:this.modalPrice}
    this.is.PatchIngredient(this.editingIng.id,ing);
    this.closeDrawer();
  }
}
