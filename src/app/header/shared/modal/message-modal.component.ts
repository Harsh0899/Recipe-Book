import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-modal',
    templateUrl: './message-modal.component.html',
    styleUrls: ['./message-modal.component.css']
})
export class MessageModal {
    @Input() message!: string;
    @Output() close = new EventEmitter<void>();

    handleClose() {
        this.close.emit();
    }
}