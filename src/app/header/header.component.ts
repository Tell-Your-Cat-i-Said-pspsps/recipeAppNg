import { Component, OnInit } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';
import { RouterModule } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownDirective, RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  onStoreRecipes = () => {
    this.dataStorageService.storeRecipes();
  };
  onFetchRecipes = () => {
    this.dataStorageService.fetchRecipes().subscribe();
  };
  onLogout = () => {
    this.authService.logout();
  };
}
