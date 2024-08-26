import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-txt-message-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './txt-message-box.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxtMessageBoxComponent implements OnInit {
  @Input() placeholder: string = 'Escribir...';
  @Input() disableCorrections: boolean = false;
  @Output() onMessage = new EventEmitter<string>();
  private _onDestroy$ = new Subject<void>();
  public debouEmit = new Subject<string>();
  private _fb = inject(FormBuilder);
  private _desRef = inject(DestroyRef);
  public form = this._fb.group({
    prompt: ['', Validators.required],
  });

  ngOnInit(): void {
    this._desRef.onDestroy(() => {
      if (this._onDestroy$.closed) {
        this._onDestroy$.next();
        this._onDestroy$.complete();
      }
    });

    this.debouEmit
      .pipe(takeUntil(this._onDestroy$), debounceTime(300))
      .subscribe((data: string) => {
        this.onMessage.emit(data);
        this.form.reset();
      });
  }

  handleSubmit() {
    if (this.form.invalid) return;
    const { prompt } = this.form.value;
    this.debouEmit.next(prompt ?? '');
  }
}
