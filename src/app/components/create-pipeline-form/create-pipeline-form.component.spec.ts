import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePipelineFormComponent } from './create-pipeline-form.component';

describe('CreatePipelineFormComponent', () => {
  let component: CreatePipelineFormComponent;
  let fixture: ComponentFixture<CreatePipelineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePipelineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePipelineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
