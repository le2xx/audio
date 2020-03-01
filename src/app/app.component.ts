import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public context = new ((window as any).AudioContext || (window as any).webkitAudioContext)();

  @ViewChild('player', { static: true }) audio: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  public play() {
    this.audio.nativeElement.play();
    this.context.resume();
  }
}
