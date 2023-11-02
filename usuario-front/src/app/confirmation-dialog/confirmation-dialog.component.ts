import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() messageTitulo: string = '';
  @Input() acaoExecutar: string = '';
  @Output() showModalConfirmacao = new EventEmitter<boolean>();
  @Output() executarAcao = new EventEmitter<string>();

  constructor() {}

  confirm() {
    this.executarAcao.emit(this.acaoExecutar);
  }

  cancel() {
    this.showModalConfirmacao.emit(false);
  }

  ngOnInit(): void {

  }

}
