import { Component, Input } from '@angular/core';
import {Messages} from 'primeng/messages';

@Component({
  selector: 'biosys-expandablemessages',
  templateUrl: './expandablemessages.component.html',
  styleUrls: ['./expandablemessages.component.css']
})
export class ExpandableMessagesComponent extends Messages {
    @Input()
    public maxItems = 0;

    public expanded = false;
}
