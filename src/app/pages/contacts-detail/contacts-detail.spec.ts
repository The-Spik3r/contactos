import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDetail } from './contacts-detail';

describe('ContactsDetail', () => {
  let component: ContactsDetail;
  let fixture: ComponentFixture<ContactsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
