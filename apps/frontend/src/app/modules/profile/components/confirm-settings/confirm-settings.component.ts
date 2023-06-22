import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../services/theme.service';
import { ApiService } from '../../../../services/api.service';
import { LightTheme } from '../../../../core/types/Themes';

@Component({
  selector: 'cake-confirm-settings',
  templateUrl: './confirm-settings.component.html',
  styleUrls: ['./confirm-settings.component.scss']
})
export class ConfirmSettingsComponent {
  errorEmmitter = new EventEmitter<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string, userName: string },
    public dialogRef: MatDialogRef<ConfirmSettingsComponent>,
    private apiService: ApiService,
    private router: Router,
    private themeService: ThemeService
  ) { }

  onCloseClick() {
    this.dialogRef.close()
  }

  get closeCircle() {
    return this.themeService.active === LightTheme ? 'close-light' : 'close-dark';
}

  onSaveClick() {
    this.apiService.updateUser({ username: this.data.userName }, this.data.id).subscribe({
      next: () => {
        this.apiService.getUserProfileInfo().subscribe();
        this.router.navigateByUrl('/profile');
        this.dialogRef.close();
      },
      error: (err) => {
        if (err.status === HttpStatusCode.BadRequest && err.error.error.code === "P2002") {
          this.dialogRef.close({ P2002: true });
        }
      }
    });
  }
}
