import { Component, OnInit } from '@angular/core';
import { MetaDataService } from 'src/service/meta-data.service';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css'],
})
export class RoleDetailComponent implements OnInit {
  dataItem = {};

  constructor(private metaDataService: MetaDataService) {}

  ngOnInit(): void {
    this.metaDataService.get().subscribe(({ data }) => {
      console.log(data);
      this.dataItem = data;
    });
  }
}
