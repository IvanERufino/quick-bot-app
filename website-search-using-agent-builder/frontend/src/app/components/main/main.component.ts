import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { UserService } from 'src/app/services/user/user.service';
import { Message } from 'src/app/models/messegeType.model';
import { SessionService } from 'src/app/services/user/session.service';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
import { SpeechToTextService } from '../../services/speech-to-text';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('scale', [
      state('true', style({ transform: 'translateY(0)', color: '#4285F4' })),
      transition('* => true', [
        sequence([
          style({ transform: 'translateY(0)' }),
          animate("450ms cubic-bezier(0,0,0,1)", style({ transform: 'scale(0.8)', color: '#4285F4' })),
          animate("400ms cubic-bezier(1,0,1,1)", style({ transform: 'scale(1.2)', color: '#4285F4' })),
          animate("350ms cubic-bezier(1,0,1,1)", style({ transform: 'scale(0.8)', color: '#4285F4' })),
          animate("250ms cubic-bezier(0,0,0,1)", style({ transform: 'scale(1)', color: '#4285F4' })),
          animate("200ms cubic-bezier(0,0,0,1)", style({ transform: 'scale(-1,1)', color: '#4285F4' })),
          animate("150ms cubic-bezier(1,0,1,1)", style({ transform: 'scale(-1,1)', color: '#4285F4' })),
        ]),
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  isRecording = false;
  transcribedText = '';
  mediaRecorder: MediaRecorder;
  audioChunks: Blob[] = [];
  chatQuery: string = '';

  savedUser;


  constructor(private router: Router,
    private broadcastService: BroadcastService,
    private sessionService: SessionService,
    public userService: UserService,
    private speechToTextService: SpeechToTextService,
  ) {
    this.savedUser = userService.getUserDetails();
    this.sessionService.createSession();
  }

  navigate() {
    let userMessage: Message = {
      body: this.chatQuery,
      type: 'user',
      shareable: false,
    }
    this.chatQuery && this.broadcastService.nextChatQuery(userMessage);
    this.router.navigateByUrl('/result');
  };


  assignQToChatQuery(question: string) {
    this.chatQuery = question;
    let userMessage: Message = {
      body: this.chatQuery,
      type: 'user',
      shareable: false,
    }
    this.chatQuery && this.broadcastService.nextChatQuery(userMessage);
    this.router.navigateByUrl('/result');
  }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => this.setupMediaRecorder(stream));
  }

  setupMediaRecorder(stream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = event => this.audioChunks.push(event.data);
    this.mediaRecorder.onstop = () => this.sendAudioToGCP();
  }

  startRecording() {
    this.isRecording = true;
    this.audioChunks = [];
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.isRecording = false;
    this.mediaRecorder.stop();
  }

  async sendAudioToGCP() {
    const audioBlob = new Blob(this.audioChunks);
    // console.log(audioBlob);
    (await this.speechToTextService.transcribeAudio(audioBlob)).subscribe(
      (response: any) => {
        // console.log(response)
        this.chatQuery = response[0]
      },
      (error: any) => {
        // Handle errors
      }
    );
  }
}
