import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../service/meta-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataSource: any = {};
  title = '';

  constructor(private metaDataService: MetaDataService) {}

  ngOnInit(): void {
    this.metaDataService.get().subscribe(data => {
      console.log(data);
    });
  }
}
