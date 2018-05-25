import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrecordtableComponent } from './editrecordtable.component';

describe('EditrecordtableComponent', () => {
  let component: EditrecordtableComponent;
  let fixture: ComponentFixture<EditrecordtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrecordtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrecordtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
