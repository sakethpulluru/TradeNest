import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABoutUsComponent } from './about-us.component';

describe('ABoutUsComponent', () => {
  let component: ABoutUsComponent;
  let fixture: ComponentFixture<ABoutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ABoutUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABoutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
