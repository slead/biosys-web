import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecordsTableComponent } from './edit-records-table.component';

describe('EditrecordtableComponent', () => {
  let component: EditRecordsTableComponent;
  let fixture: ComponentFixture<EditRecordsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecordsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecordsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
