import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  standalone: true,
  selector: 'add-btn',
  imports: [NzButtonModule, NzIconModule],
  template: `<button
    nz-button
    nzType="primary"
    class="rounded-md dark:bg-gray-900 dark:hover:bg-gray-600 outline-none border-none"
  >
    <span nz-icon nzType="check-circle" nzTheme="outline"></span>
  </button>`,
})
export class AddBtnComponent {}
