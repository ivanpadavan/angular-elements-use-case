import { Component, Input, NgZone, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { IPlacemark } from '../../interfaces/placemark.interface';

@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.scss']
})
export class BalloonComponent implements OnInit {
  @Input() uid: string;
  placemark: IPlacemark;
  constructor(private mapService: MapService, private zone: NgZone) { }

  ngOnInit() {
    this.placemark = this.mapService.getPlacemarkByUID(+this.uid);
  }

  removePlacemark() {
    this.zone.run(() => {
      this.mapService.removePlacemark(this.placemark);
    });
  }
}
