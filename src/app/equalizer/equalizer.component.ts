import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface EquSettings {
  title: string;
  value: string;
}

interface FilterItem {
  title: string;
  frequency: number;
  value: number;
}

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.scss']
})
export class EqualizerComponent implements AfterViewInit {
  @Input() player: ElementRef;
  @Input() context: AudioContext;
  public filters;
  public filterList;
  public currentEquSettings;
  public equSettings: EquSettings[] = [
    { title: 'Без эквалайзера', value: 'default' },
    { title: 'Рок', value: 'rock' },
    { title: 'Поп', value: 'pop' },
    { title: 'Своя настройка', value: 'my' },
  ];

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.http.get('assets/filterList.json')
      .subscribe(data => {
        this.filterList = data;
        this.currentEquSettings = this.filterList.default;
        this.equalize(this.player.nativeElement);
      });
  }

  public changeValue(e: Event, index: number) {
    this.filters[index].gain.value = e.target['value'];
  }

  public updateAllFilters() {
    this.filters.map((filter, index) => {
      filter.gain.value = this.currentEquSettings[index].value;
    });
  }

  public createFilter(frequency: number) {
    const filter = this.context.createBiquadFilter();

    filter.type = 'peaking'; // тип фильтра
    filter.frequency.value = frequency; // частота
    filter.Q.value = 1; // Q-factor
    filter.gain.value = 0;

    return filter;
  }

  public createFilters() {
    const filters = this.currentEquSettings.map(item => this.createFilter(item.frequency));

    filters.reduce((prev, curr) => {
      prev.connect(curr);
      return curr;
    });

    this.filters = filters;
  }

  public equalize(player: HTMLMediaElement) {
    const source = this.context.createMediaElementSource(player);
    this.createFilters();

    source.connect(this.filters[0]);
    this.filters[this.filters.length - 1].connect(this.context.destination);
  }

  public setEquSettings(e: Event) {
    const key = e.target['value'];
    if (key === 'my') {
      this.currentEquSettings = JSON.parse(JSON.stringify(this.filterList.default));
      this.updateAllFilters();
      return;
    }
    this.currentEquSettings = JSON.parse(JSON.stringify(this.filterList[key]));
    this.updateAllFilters();
  }
}
