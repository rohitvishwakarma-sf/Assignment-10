import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Role, User } from 'src/app/user.model';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: '[app-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css'],
})
export class RowComponent implements OnInit {
  @Input() user!: User;
  private oldUser!: User;
  @Output() onUserDelete = new EventEmitter<number>();
  editMode = false;
  deleting = false;
  saving = false;
  constructor(private usersService: UsersService) {
    this.roleKeys();
  }

  roleKeys(): string[] {
    return Object.keys(Role);
  }
  ngOnInit(): void {}

  btnEditClick() {
    this.editMode = true;
    this.oldUser = JSON.parse(JSON.stringify(this.user));
  }
  btnDeleteClick() {
    this.deleting = true;
    this.usersService.deleteUser(this.user).subscribe(
      null,
      (error) => {
        console.log(error);
      },
      () => {
        this.deleting = false;
        console.log('deleted user ' + this.user.firstname);
      }
    );
  }
  btnSaveClick() {
    this.editMode = false;
    this.saving = true;
    this.usersService.saveUser(this.user).subscribe(() => {
      console.log('changes saved');
      this.saving = false;
    });
  }
  btnCancelClick() {
    this.editMode = false;
    this.user = JSON.parse(JSON.stringify(this.oldUser));
  }
}
