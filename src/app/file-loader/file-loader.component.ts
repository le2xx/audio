import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss']
})
export class FileLoaderComponent implements OnInit {
  @Output() linkOfFile = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public fileUpload(e) {
    this.linkOfFile.emit(e.target.files[0]);
  }

}
