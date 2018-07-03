import {AfterViewInit, Component, ElementRef, forwardRef, Injector, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AbstractControl, DefaultValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true}
  ],
})
export class InputComponent extends DefaultValueAccessor implements AfterViewInit {
  @Input() placeholder;
  errors$: Observable<string[]>;
  control: AbstractControl;
  @ViewChild('input') private inputEl: ElementRef;

  constructor(private renderer: Renderer2, elementRef: ElementRef, private injector: Injector) {
    super(renderer, elementRef, false);
  }
  ngAfterViewInit() {
    this['_elementRef'] = this.inputEl;
    this.control = this.injector.get(NgControl).control;
    this.errors$ = this.control.valueChanges.pipe(
      tap((v) => this.renderer.setProperty(this.inputEl.nativeElement, 'value', v)),
      map((v) => this.control.errors ? Object.values(this.control.errors) : [])
    );
  }
}
