import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
  public audioSourceDefault = 'assets/littlebig_gobananas.mp3';

  @ViewChild('player', { static: true }) audio: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  public get audioSource() {
    return this.audioSourceDefault;
  }

  public play() {
    this.audio.nativeElement.play();
    this.context.resume();
  }

  public linkOfFile(e) {
    this.audio.nativeElement.src = URL.createObjectURL(e);
  }
}
