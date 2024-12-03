import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Friend } from 'src/app/models/friend';
import { FriendshipsService } from 'src/app/services/friendships.service';

@Component({
  selector: 'app-number-requests',
  templateUrl: './number-requests.component.html',
  styleUrls: ['./number-requests.component.scss'],
})
export class NumberRequestsComponent {
  myForm: FormGroup;
  ruta!: string;
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;
  requests = 0;
  usersPending: Friend[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private friendsService: FriendshipsService
  ) {
    this.myForm = new FormGroup({
      groupArray: new FormArray([]),
    });

    friendsService.getPendingFriends().subscribe({
      next: (res: Friend[]) => {
        console.log(res);

        this.usersPending = res;
        this.fillUsersPending();
      },
    });
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }
  // TODO: Esto no está probado. QUEDA EL UPDATE

  fillUsersPending() {
    if (this.usersPending != null) {
      this.usersPending.forEach((element) => {
        this.requests++;
        const newGroup = new FormGroup({
          username: new FormControl({ value: element.name, disabled: true }),
        });
        (this.myForm.get('groupArray') as FormArray).push(newGroup);
      });
    }
  }

  acceptRequest(index: number) {
    this.friendsService
      .acceptFriendRequest({ user_id: this.usersPending[index].id })
      .subscribe({ next: (res) => {
        this.deleteRequestFromForm(index)
      } });
  }

  declineRequest(index: number) {
    this.friendsService
      .deleteFriend(this.usersPending[index].id)
      .subscribe({ next: (res) => {
        this.deleteRequestFromForm(index)
      } });
  }

  deleteRequestFromForm(index: number) {
    var inputsArray = this.myForm.get('groupArray') as FormArray;
    inputsArray.removeAt(index);
  }

  onInput(index: number) {
    const textarea = this.inputs.toArray()[index].nativeElement;
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
