import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlacemark } from '../interfaces/placemark.interface';

let uid = 0;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: ymaps.Map;
  placemarks$ = new BehaviorSubject<IPlacemark[]>([]);
  private get placemarks() {
    return this.placemarks$.value;
  }
  constructor() {}

  init(mapEl: HTMLElement) {
    ymaps.ready(() => {
      this.map = new ymaps.Map(mapEl, {
        center: [55.751574, 37.573856],
        zoom: 7
      }, {});
    });
  }

  addPlacemark(lan: number, lot: number, description: string, color: string) {
    uid++;

    const balloonContent = `<app-balloon uid="${uid}"></app-balloon>`;
    const placemark = new ymaps.Placemark(
      [lot, lan],
      { balloonContent },
      { iconColor: color }
    );
    this.map.geoObjects.add(placemark);
    this.placemarks$.next(this.placemarks$.value.concat({
      placemark,
      description,
      uid
    }));
  }

  removePlacemark(p: IPlacemark) {
    this.map.geoObjects.remove(p.placemark);
    const i = this.placemarks.findIndex(x => x === p);
    this.placemarks$.next(this.placemarks.slice(0, i).concat(this.placemarks.slice(i + 1)));
  }

  centerPlacemark(p: IPlacemark) {
    this.map.setCenter((p.placemark.geometry as any)._coordinates);
  }

  getPlacemarkByUID(uid: number) {
    return this.placemarks.find(x => x.uid === uid);
  }
}
