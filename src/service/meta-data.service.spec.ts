import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MetaDataService } from './meta-data.service';

describe('MetaDataService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: MetaDataService = TestBed.get(MetaDataService);
    expect(service).toBeTruthy();
  });
});
