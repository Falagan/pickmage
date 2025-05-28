import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutService } from '../../services/layout.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { THEME } from '../../models/theme';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let layoutService: jasmine.SpyObj<LayoutService>;

  beforeEach(async () => {
    const layoutServiceSpy = jasmine.createSpyObj('LayoutService', [
      'setTheme',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        ThemeToggleComponent,
      ],
      providers: [{ provide: LayoutService, useValue: layoutServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(
      LayoutService
    ) as jasmine.SpyObj<LayoutService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call setTheme on layoutService when onToggleTheme is triggered', () => {
    // Arrange
    const theme: THEME = THEME.DARK;
    // Act
    component.onToggleTheme(theme);
    // Assert
    expect(layoutService.setTheme).toHaveBeenCalledWith(theme);
  });

  it('should pass the correct theme to setTheme: Light', () => {
    // Arrange
    const theme: THEME = THEME.LIGHT;
    // Act
    component.onToggleTheme(theme);
    //Assert
    expect(layoutService.setTheme).toHaveBeenCalledWith(theme);
  });

  it('should pass the correct theme to setTheme: Dark', () => {
    // Arrange
    const theme: THEME = THEME.DARK;
    // Act
    component.onToggleTheme(theme);
    //Assert
    expect(layoutService.setTheme).toHaveBeenCalledWith(theme);
  });
});
