import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private context;
  private filters;

  @ViewChild('player', { static: true }) player: ElementRef;

  spectrumList = [
    { title: '40 Гц', frequency: 40, value: 0 },
    { title: '60 Гц', frequency: 60, value: 0 },
    { title: '170 Гц', frequency: 170, value: 0 },
    { title: '310 Гц', frequency: 310, value: 0 },
    { title: '600 Гц', frequency: 600, value: 0 },
    { title: '1 кГц', frequency: 1000, value: 0 },
    { title: '3 кГц', frequency: 3000, value: 0 },
    { title: '6 кГц', frequency: 6000, value: 0 },
    { title: '12 кГц', frequency: 12000, value: 0 },
    { title: '14 кГц', frequency: 14000, value: 0 },
    { title: '16 кГц', frequency: 16000, value: 0 },
  ];

  ngOnInit() {
  }


  ngAfterViewInit() {
    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.equalize(this.player.nativeElement);
  }

  public changeValue(e: Event, index: number) {
    this.filters[index].gain.value = e.target['value'];
  }

  private createFilter(frequency: number) {
    const filter = this.context.createBiquadFilter();

    filter.type = 'peaking'; // тип фильтра
    filter.frequency.value = frequency; // частота
    filter.Q.value = 1; // Q-factor
    filter.gain.value = 0;

    return filter;
  }

  private createFilters() {
    const filters = this.spectrumList.map(item => this.createFilter(item.frequency));

    filters.reduce((prev, curr) => {
      prev.connect(curr);
      return curr;
    });

    this.filters = filters;
  }

  private equalize(player: HTMLMediaElement) {
    const source = this.context.createMediaElementSource(player);
    this.createFilters();

    source.connect(this.filters[0]);
    this.filters[this.filters.length - 1].connect(this.context.destination);
  }
}
