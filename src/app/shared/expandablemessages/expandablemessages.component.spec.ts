import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableMessagesComponent } from './expandablemessages.component';

describe('ExpandablemessagesComponent', () => {
  let component: ExpandableMessagesComponent;
  let fixture: ComponentFixture<ExpandableMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandableMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
