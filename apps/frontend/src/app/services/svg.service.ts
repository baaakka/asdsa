import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';



export const SVG_ICONS: { [key: string]: string } = {
    'tooltip-cross-close': 'assets/icons/close-cross-dark.svg',
    'arrow-left': 'assets/icons/arrow-left.svg',
    'arrow-left-blue': 'assets/icons/arrow-right-blue-grad.svg',
    'arrow-right': 'assets/icons/arrow-right.svg',
    'arrow-down': 'assets/icons/arrow-down.svg',
    'arrow-top': 'assets/icons/arrow-top.svg',
    'EXOTIC-cakebox': 'assets/icons/Exotic-cakebox.svg',
    'LEGENDARY-cakebox': 'assets/icons/Legendary-cakebox.svg',
    'EPIC-cakebox': 'assets/icons/Epic-cakebox.svg',
    'SUPERIOR-cakebox': 'assets/icons/Superior-cakebox.svg',
    'BASIC-cakebox': 'assets/icons/Basic-cakebox.svg',
    'STARTER-cakebox': 'assets/icons/Starter-cakebox.svg',
    'edit': 'assets/icons/edit.svg',
    'gear':'assets/icons/settings.svg',
    'heart-eye-emoji': 'assets/icons/heart-eye-emoji.svg',
    'cool-emoji': 'assets/icons/cool-emoji.svg',
    'party-emoji': 'assets/icons/party-emoji.svg',
    'reward': 'assets/icons/rewards.svg',
    'back': 'assets/icons/back.svg',
    'wallet': 'assets/icons/wallet.svg',
    'confectionery': 'assets/icons/confectionery.svg',
    'confectionary': 'assets/icons/confectionery.svg',
    'close-dark': 'assets/icons/close-dark.svg',
    'close-light': 'assets/icons/close-light.svg',
    'close-icon': 'assets/icons/close-icon.svg',
    'search': 'assets/icons/search.svg',
    'search-outline': 'assets/icons/search-outline.svg',
    'cake-wallet': 'assets/icons/cake-wallet.svg',
    'arrow-up-green': 'assets/icons/arrow-up-outline-green.svg',
    'party-popper': 'assets/icons/party-popper.svg',
    'plus-light': 'assets/icons/plus-light.svg',
    'plus-dark': 'assets/icons/plus-dark.svg',
    'edit-dark': 'assets/icons/edit-dark.svg',
    'edit-light': 'assets/icons/edit-light.svg',
    'double-left': 'assets/icons/double-left.svg',
    'double-right': 'assets/icons/double-right.svg',
    'copy': 'assets/icons/copy.svg',
    'remove': 'assets/icons/remove.svg',
    'circle-plus': 'assets/icons/circle-plus.svg',
    'webclip-logo': 'assets/webclip/logo.svg',
    'safari-webclip': 'assets/webclip/safari-webclip.svg',
    'chrome-webclip': 'assets/webclip/chrome-webclip.svg',
    'samsung-webclip': 'assets/webclip/samsung-webclip.svg',
    'edge-webclip': 'assets/webclip/edge-webclip.svg',
    'close-tooltip': 'assets/icons/close-tooltip.svg',
    'eye-closed': 'assets/icons/eye-closed.svg',
    'eye': 'assets/icons/eye.svg',
    'close': 'assets/icons/close.svg',
    'details': 'assets/icons/details.svg',
    'header-bg-1': 'assets/icons/header-bg-1.svg',
    'header-bg-2': 'assets/icons/header-bg-2.svg',
    'sun': 'assets/icons/sun.svg',
    'moon': 'assets/icons/moon.svg',
    'credit-card': 'assets/wallets/Credit card.svg',
  };

  @Injectable({
    providedIn: 'root',
  })
  export class SvgService {
    constructor(private readonly iconRegistry: MatIconRegistry, private readonly sanitizer: DomSanitizer) {}

    public registerSvg(): void {
      Object.keys(SVG_ICONS).forEach((key) => {
        this.iconRegistry.addSvgIcon(key, this.sanitizer.bypassSecurityTrustResourceUrl(SVG_ICONS[key]));
      });
    }
  }
