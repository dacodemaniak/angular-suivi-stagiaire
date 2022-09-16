import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public internsNumber: number = 0;
  @Input() public title: string = '';

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
