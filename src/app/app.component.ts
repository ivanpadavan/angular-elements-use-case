import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from './services/map.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './services/my-validators';
import { markFormDirty, markFormPristine } from './services/form-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapEl: ElementRef;
  form: FormGroup;
  constructor(public mapService: MapService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      lat: ['', Validators.compose([MyValidators.handleNumber, MyValidators.lat])],
      lon: ['', Validators.compose([MyValidators.handleNumber, MyValidators.lon])],
      description: [''],
      color: ['#', Validators.compose([
        MyValidators.handleColor,
        MyValidators.max(7),
        MyValidators.color
      ])],
    });
  }

  ngAfterViewInit() {
    this.mapService.init(this.mapEl.nativeElement);
  }

  addPlacemark() {
    if (this.form.invalid) {
      markFormDirty(this.form);
    } else {
      const payload = this.form.getRawValue();
      this.mapService.addPlacemark(
        +payload.lon,
        +payload.lat,
        payload.description,
        payload.color
      );
      this.form.reset();
      markFormPristine(this.form);
    }
  }
}
