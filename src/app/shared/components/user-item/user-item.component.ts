import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user.interface';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {

  @Input() user: IUser;

  constructor() { }

  ngOnInit() {}

}
