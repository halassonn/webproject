import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavMenuServices } from '../core/shared/navmenu.service';
import { HalamanService } from '../core/shared/halaman.service';





@Component({
  templateUrl: './backendlayout.component.html',
  styleUrls: ['./backendlayout.component.scss']
})



export class BackendLayoutComponent {
  _opened: boolean = false;
  _modeNum: number = 0;
  _positionNum: number = 0;
  _dock: boolean = false;
  _closeOnClickOutside: boolean = false;
  _closeOnClickBackdrop: boolean = false;
  _showBackdrop: boolean = false;
  _animate: boolean = true;
  _trapFocus: boolean = true;
  _autoFocus: boolean = true;
  _keyClose: boolean = false;
  _autoCollapseHeight: number = 0;
  _autoCollapseWidth: number = 0;

  _MODES: Array<string> = ['over', 'push', 'slide'];
  _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];

  navItems: any;

  constructor(
    private toastr: ToastrService,
    private halamanService: HalamanService
  ) {


  }


  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  _toggleOpened(): void {
    this._opened = !this._opened;
  }

  _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  _toggleDock(): void {
    this._dock = !this._dock;
  }

  _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  _onOpenStart(): void {
    // tslint:disable-next-line:no-console
    console.info('Sidebar opening');
  }

  _onOpened(): void {
    // tslint:disable-next-line:no-console
    console.info('Sidebar opened');
  }

  _onCloseStart(): void {
    console.log('Sidebar closing');
  }

  _onClosed(): void {
    console.log('Sidebar closed');
  }

  _onTransitionEnd(): void {
    console.log('Transition ended');
  }
}
