import {
  Component,
  ElementRef,
  Inject,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { FriendshipsService } from 'src/app/services/friendships.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-search-popup',
  templateUrl: './users-search-popup.component.html',
  styleUrls: ['./users-search-popup.component.scss'],
})
export class UsersSearchPopupComponent implements OnInit {
  myForm: FormGroup;
  ruta!: string;
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;
  readonly dialogRef = inject(MatDialogRef<UsersSearchPopupComponent>);
  usersFollowed:any 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private friendService: FriendshipsService
  ) {
    this.myForm = new FormGroup({
      groupArray: new FormArray([]),
    });
  }
  ngOnInit(): void {
    if (this.data.user_email != undefined) {
      this.userService.getUserByEmail(this.data.user_email).subscribe({
        next: (res: User[]) => {
          console.log(res);

          this.usersFollowed = res;
          this.fillUsersSearched();
        },
      });
    }
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }

  fillUsersSearched() {
    if (this.usersFollowed != null) {
      if (Array.isArray(this.usersFollowed)) {
        this.usersFollowed.forEach((element) => {
          const newGroup = new FormGroup({
            username: new FormControl({ value: element.name, disabled: true }),
          });
          (this.myForm.get('groupArray') as FormArray).push(newGroup);
        })
      } else {
        console.log(this.usersFollowed);
        
        const newGroup = new FormGroup({
          username: new FormControl({ value: this.usersFollowed[1].name, disabled: true }),
        });
        (this.myForm.get('groupArray') as FormArray).push(newGroup);
      
      }
    }
  }

  addUser() {
      var data = { friend_id: -1}
      if (Array.isArray(this.usersFollowed)) {
        data = {
          friend_id: this.usersFollowed[0].id,
        };
      } else {
        data = {
          friend_id: this.usersFollowed[1].id,
        };
      }
    

    this.friendService.sendFriendshipRequest(data).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
