import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolchestComponent } from './toolchest.component';

describe('ToolchestComponent', () => {
  let component: ToolchestComponent;
  let fixture: ComponentFixture<ToolchestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolchestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolchestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
