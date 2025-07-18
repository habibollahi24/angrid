import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../service/user.service';

import {
  DxFormModule,
  DxButtonModule,
  DxTextBoxModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxFormComponent,
  DxHtmlEditorComponent,
} from 'devextreme-angular';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    FormsModule,
    DxFormModule,
    DxButtonModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxNumberBoxModule,
  ],
  template: `
    <form (ngSubmit)="submit()" #form="ngForm" class="dx-form">
      <!-- Upload -->
      <div class="flex mb-2 items-center gap-x-3">
        <label
          for="File"
          class="flex-1 block rounded border border-gray-300 p-4 text-gray-900 shadow-sm sm:p-6"
        >
          <div class="flex items-center justify-center gap-4">
            <span class="font-medium"> Upload your file(s) </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
          </div>

          <input
            (change)="onPhotoChange($event)"
            type="file"
            id="File"
            class="sr-only"
          />
        </label>
        <img
          *ngIf="user.profilePhoto"
          [src]="user.profilePhoto"
          class="size-18 object-cover rounded-lg "
        />
      </div>

      <dx-form [formData]="user" [colCount]="1" #devForm>
        <!-- First Name -->
        <dxi-item
          dataField="firstName"
          [isRequired]="true"
          editorType="dxTextBox"
          [editorOptions]="{ placeholder: 'First Name' }"
        >
          <dxi-validation-rule
            type="required"
            message="First name is required"
          ></dxi-validation-rule>
        </dxi-item>

        <!-- Last Name -->
        <dxi-item
          dataField="lastName"
          [isRequired]="true"
          editorType="dxTextBox"
          [editorOptions]="{ placeholder: 'Last Name' }"
          ><dxi-validation-rule
            type="required"
            message="Last name is required"
          ></dxi-validation-rule>
        </dxi-item>

        <!-- Age -->
        <dxi-item
          dataField="age"
          [isRequired]="true"
          editorType="dxNumberBox"
          [editorOptions]="{ placeholder: 'Age' }"
          ><dxi-validation-rule
            type="required"
            message="age is required"
          ></dxi-validation-rule>
        </dxi-item>

        <!-- Education -->
        <dxi-item
          dataField="education"
          [isRequired]="true"
          editorType="dxTextBox"
          [editorOptions]="{ placeholder: 'Education' }"
        >
          <dxi-validation-rule
            type="required"
            message="education is required"
          ></dxi-validation-rule>
        </dxi-item>

        <!-- Birth Date -->

        <dxi-item
          dataField="birthDate"
          [isRequired]="true"
          editorType="dxDateBox"
          [editorOptions]="{
            type: 'date',
            displayFormat: 'yyyy-MM-dd',
            showClearButton: true
          }"
        >
          <!-- <dxi-validation-rule
            type="required"
            message="Birth date is required"
          ></dxi-validation-rule> -->
        </dxi-item>

        <!-- National ID -->
        <dxi-item
          dataField="nationalId"
          [isRequired]="true"
          editorType="dxTextBox"
          [editorOptions]="{ placeholder: 'National ID' }"
        >
          <dxi-validation-rule
            type="required"
            message="nationalId is required"
          ></dxi-validation-rule
        ></dxi-item>
      </dx-form>
      <div class="flex justify-end gap-2 mt-4">
        <dx-button
          text="Cancel"
          type="normal"
          stylingMode="outlined"
          (onClick)="cancel.emit()"
        ></dx-button>
        <dx-button
          text="Save"
          type="default"
          stylingMode="contained"
          [useSubmitBehavior]="true"
        ></dx-button>
      </div>
    </form>
  `,
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @ViewChild('devForm', { static: false }) devForm!: DxFormComponent;
  @Input() editData: User | null = null;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
  user: User = {
    id: 0,
    profilePhoto: '',
    firstName: '',
    lastName: '',
    age: 0,
    education: '',
    nationalId: '',
    birthDate: '',
  };
  ngOnInit() {
    if (this.editData) this.user = { ...this.editData };
  }
  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.user.profilePhoto = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  submit() {
    const result = this.devForm.instance.validate();

    if (!result.isValid) return;

    this.save.emit(this.user);
  }
}
