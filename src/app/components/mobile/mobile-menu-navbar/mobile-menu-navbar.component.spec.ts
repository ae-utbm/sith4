import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenuNavbarComponent } from './mobile-menu-navbar.component';

describe('MobileMenuNavbarComponent', () => {
  let component: MobileMenuNavbarComponent;
  let fixture: ComponentFixture<MobileMenuNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileMenuNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileMenuNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
