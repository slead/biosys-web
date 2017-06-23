import { Component, Input } from '@angular/core';
import { Messages } from 'primeng/primeng';

@Component({
  selector: 'biosys-expandablemessages',
  templateUrl: './expandablemessages.component.html',
  styleUrls: ['./expandablemessages.component.css']
})
export class ExpandableMessagesComponent extends Messages {
    @Input()
    public maxItems: number = 0;

    public expanded: boolean = false;
}
