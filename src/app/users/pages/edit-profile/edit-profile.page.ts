import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user = {
    name: '',
    nick: '',
    email: '',
    biography: '',
    interests: [ 'jamon', 'arroz', 'correr' ]
  };

  skills = '';

  skillList: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  submitEditProfileForm() {

  }

  deleteSkill( skill: string ) {
    this.user.interests = this.user.interests.filter( i => i !== skill);
  }

  addSkill() {
    this.user.interests.push( this.skills );
    this.skills = '';
  }

}
