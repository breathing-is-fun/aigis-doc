import { Component, Input, OnInit } from '@angular/core';
import { MetaDataService } from 'src/service/meta-data.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css'],
})
export class RoleDetailComponent implements OnInit {
  @Input() dataItem;

  ngOnInit(): void {
    console.log(this.dataItem);
  }
}
