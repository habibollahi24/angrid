import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  DxDataGridModule,
  DxButtonModule,
  DxPopupModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { User, UserService } from '../../service/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-grid',
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    UserFormComponent,
    DxTemplateModule,
  ],
  templateUrl: './user-grid.component.html',
})
export class UserGridComponent implements OnInit {
  userService = inject(UserService);
  users = this.userService.getUsers();
  showPopup = signal(false);
  selectedUser = signal<User | null>(null);

  actionButtons = [
    {
      hint: 'Edit',
      icon: 'edit',
      onClick: (e: any) => this.onEdit(e),
    },
    {
      hint: 'Delete',
      icon: 'trash',
      onClick: (e: any) => this.onDelete(e),
    },
  ];

  onAdd() {
    this.selectedUser.set(null);
    this.showPopup.set(true);
  }

  onEdit(e: any) {
    const user: User = e.row.data;
    this.selectedUser.set(user);
    this.showPopup.set(true);
  }

  onSave(user: User) {
    if (user.id) this.userService.updateUser(user);
    else this.userService.addUser(user);
    this.showPopup.set(false);
  }

  onDelete(e: any) {
    console.log('on delete');
    const userId = e.row.data.id;
    this.userService.deleteUser(userId);
  }

  onCancel() {
    this.showPopup.set(false);
  }

  ngOnInit() {}
}
