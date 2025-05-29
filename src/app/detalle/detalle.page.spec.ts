import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetallePage } from './detalle.page';

describe('DetallePage', () => {
  let component: DetallePage;
  let fixture: ComponentFixture<DetallePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DetallePage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
