import { Component, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import { IPlacemark } from '../../interfaces/placemark.interface';

@Component({
  selector: 'app-placemark-description',
  templateUrl: './placemark-description.component.html',
  styleUrls: ['./placemark-description.component.scss']
})
export class PlacemarkDescriptionComponent {
  @Input() placemark: IPlacemark;
  constructor(public mapService: MapService) {}
}
