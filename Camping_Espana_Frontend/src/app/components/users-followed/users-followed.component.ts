import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Friend } from 'src/app/models/friend';
import { FriendshipsService } from 'src/app/services/friendships.service';

@Component({
  selector: 'app-users-followed',
  templateUrl: './users-followed.component.html',
  styleUrls: ['./users-followed.component.scss']
})
export class UsersFollowedComponent {
  myForm: FormGroup;
  ruta!: string
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;
  usersFollowed: Friend[] = []

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private friendsService: FriendshipsService) {
    this.myForm = new FormGroup({
      groupArray: new FormArray([])
    });

    friendsService.getFriends().subscribe({
      next: (res: Friend[]) => {
        this.usersFollowed = res;
        console.log(this.usersFollowed);
        
        this.fillUsersFollowed()
      }
    })
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }
// TODO: Esto no está probado. QUEDA EL DELETE
  fillUsersFollowed() {    
    if (this.usersFollowed != null)
      {
        this.usersFollowed.forEach(element => {
          const newGroup = new FormGroup({
            username: new FormControl({value: element.name, disabled: true})
          });
          (this.myForm.get('groupArray') as FormArray).push(newGroup);
        });
      }
  }

  deleteUser(i: number) {
    var inputsArray = (this.myForm.get('groupArray') as FormArray);
    this.friendsService.deleteFriend(this.usersFollowed[i].id).subscribe({
      next: (res) => {
        inputsArray.removeAt(i);

      }
    })
  }


}
