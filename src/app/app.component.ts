import { Component, OnInit } from '@angular/core';
import { MetaDataService } from 'src/service/meta-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataSource = [];

  constructor(private metaDataService: MetaDataService) {}

  ngOnInit(): void {
    this.metaDataService.getMapping().subscribe(mapping => {
      this.metaDataService
        .getData(mapping)
        .subscribe(data => (this.dataSource = data));
    });
  }
}
