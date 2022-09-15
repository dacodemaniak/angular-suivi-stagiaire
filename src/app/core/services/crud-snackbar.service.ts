import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CrudSnackbarService {

  private message: string;
  private action?: string;

  private static duration: number = 3;

  constructor(private snackBar: MatSnackBar) {
    this.message = 'message';
    this.action = 'action';
  }


  public config(message: string, action?: string) {
    this.message = message;
    this.action = action;
  }

  public open(): void {
    this.snackBar.open(
      this.message,
      this.action,
      {
        duration: CrudSnackbarService.duration * 1000
      }
    )
  }
}
