import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './messages-management.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./messages-management.component.css']
})
export class MessagesManagementComponent {
  chats = [
    {
      name: 'Doctor Watson',
      lastMessage: 'The appointment is tomor...',
      avatar: 'assets/avatars/watson.png'
    },
    {
      name: 'Medic Thompson',
      lastMessage: 'I’ll make sure he take medi...',
      avatar: 'assets/avatars/thompson.png'
    },
    {
      name: 'Family Chat',
      lastMessage: 'Dad: Can someone go to th...',
      avatar: 'assets/avatars/family.png'
    },
    {
      name: 'Hospital',
      lastMessage: 'We can book an appointment...',
      avatar: 'assets/avatars/hospital.png'
    },
    {
      name: 'Psichologist',
      lastMessage: 'You can download the results in...',
      avatar: 'assets/avatars/psychologist.png'
    },
    {
      name: 'Therapy',
      lastMessage: '',
      avatar: 'assets/avatars/therapy.png'
    }
  ];
}
