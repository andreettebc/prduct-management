import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsModalComponent } from './actions-modal.component';

describe('ActionsModalComponent', () => {
  let component: ActionsModalComponent;
  let fixture: ComponentFixture<ActionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isOpen property when showActions() is called', () => {
    expect(component.isOpen).toBe(false);
    component.showActions();
    expect(component.isOpen).toBe(true);
    component.showActions();
    expect(component.isOpen).toBe(false);
  });

  it('should set isOpen to false when clickEdit() is called', () => {
    component.isOpen = true;
    component.clickEdit();
    expect(component.isOpen).toBe(false);
  });

  it('should set isOpen to false when clickDelete() is called', () => {
    component.isOpen = true;
    component.clickDelete();
    expect(component.isOpen).toBe(false);
  });
});
