import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/modules/services/localStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isData = false;
  user:any=this.localStorageService.getDataLocalStorage('user');

  constructor(private readonly localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.existData();
  }

  existData(): void {
    this.isData = false;
    const storedData =
      this.localStorageService.getDataLocalStorage('reportCovid');
    if (storedData && Object.keys(storedData).length > 0) {
      this.isData = true;
    }
  }

  clearLocalStorage(): void {
    this.user=this.localStorageService.getDataLocalStorage('user');
    this.localStorageService.clearDataLocalStorage();
    window.location.reload();
    this.existData();
    this.localStorageService.setDataLocalStorage('user',this.user);
  }

  clearAllData(): void{
    this.localStorageService.clearAllData();
    window.location.reload()
  }
}
