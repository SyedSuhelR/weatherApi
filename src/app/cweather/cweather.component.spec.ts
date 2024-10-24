import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CweatherComponent } from './cweather.component';

describe('CweatherComponent', () => {
  let component: CweatherComponent;
  let fixture: ComponentFixture<CweatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CweatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
