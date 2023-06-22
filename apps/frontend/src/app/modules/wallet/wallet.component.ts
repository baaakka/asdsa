import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetWalletResponseBody, UserProfile } from '@cake/lib-api-interface';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ModalsService } from '../../services/modals.service';
import { Watcher } from '../../shared/classes/watcher';

@Component({
  selector: 'cake-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent extends Watcher implements OnInit, OnDestroy {

  editForm!: FormGroup;

  wallets!: GetWalletResponseBody['data']['wallets'];

  copied!: string;

  language = 'en'

  public get authUser() : BehaviorSubject<UserProfile | null> {
    return this.authService.userProfile;
  }

  constructor(private apiService: ApiService, private authService: AuthService, private modalService: ModalsService, private fb: FormBuilder) {
    super();
  };

  ngOnInit(): void {
    this.getWallets()
    this.getLanguage() 
  }


  getLanguage() {
		this.language = localStorage.getItem("lang") || "en";
	}

  getWallets(): void {
    this.apiService.getWallets().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.wallets = res.data.wallets;
      this.editForm = this.fb.group(Object.fromEntries(new Map(this.wallets.map(el => [el.address, ['']]))))
    })
  }

  copyAddress(address: string): void {
    this.copied = address;
    setTimeout(() => {
      this.copied = '';
    }, 1000);
  }

  removeWallet(address: string, id: string) {
    this.modalService.openDeleteWallet(address, id);
    this.modalService.handleDeleteWallet.pipe(takeUntil(this.unsubscribe), tap(()=> {
      this.getWallets();
    })).subscribe();
  }

  editWallet(address: string, name: string): void {
    this.editForm.get(address)?.patchValue(name);
  }

  saveEditionWallet(wallet: GetWalletResponseBody['data']['wallets'][0]): void {
    this.apiService.editWallet({...wallet, name: this.editForm.get(wallet.address)?.value || wallet.name, }).pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.getWallets();
    })
  }

  openAddingWallet() {
    this.modalService.openAddingWalletPopup();
    this.modalService.handleAddWallet.pipe(takeUntil(this.unsubscribe), tap(()=> {
      this.getWallets();
    })).subscribe();
  }

  override ngOnDestroy(): void {
      super.ngOnDestroy();
  }
}
