import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNew } from './contact-new';

describe('ContactNew', () => {
  let component: ContactNew;
  let fixture: ComponentFixture<ContactNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
