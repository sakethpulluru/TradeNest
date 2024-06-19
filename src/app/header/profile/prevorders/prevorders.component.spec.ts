import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevordersComponent } from './prevorders.component';

describe('PrevordersComponent', () => {
  let component: PrevordersComponent;
  let fixture: ComponentFixture<PrevordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
