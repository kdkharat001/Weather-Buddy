import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotPanelComponent } from './chatbot-panel.component';

describe('ChatbotPanelComponent', () => {
  let component: ChatbotPanelComponent;
  let fixture: ComponentFixture<ChatbotPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
