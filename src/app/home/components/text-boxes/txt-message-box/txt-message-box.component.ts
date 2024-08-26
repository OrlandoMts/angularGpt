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
import { MessageEventItf, OptionItf } from '@interfaces/*';
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
  @Input({ required: true }) options!: Array<OptionItf>;
  @Output() onMessage = new EventEmitter<MessageEventItf>();
  private _onDestroy$ = new Subject<void>();
  public debouEmit = new Subject<MessageEventItf>();
  private _fb = inject(FormBuilder);
  private _desRef = inject(DestroyRef);
  public form = this._fb.group({
    prompt: ['', Validators.required],
    file: [null as File | null],
    selectedOption: ['', Validators.required],
  });
  public file: File | undefined;

  ngOnInit(): void {
    this._desRef.onDestroy(() => {
      if (this._onDestroy$.closed) {
        this._onDestroy$.next();
        this._onDestroy$.complete();
      }
    });

    this.debouEmit
      .pipe(takeUntil(this._onDestroy$), debounceTime(300))
      .subscribe((data: MessageEventItf) => {
        this.onMessage.emit(data);
        this.form.reset();
      });
  }

  handleSelectedFile(event: any) {
    const file = event.target.files[0] as File;
    this.form.controls.file.setValue(file);
  }

  handleSubmit() {
    if (this.form.invalid) return;
    const { prompt, file, selectedOption } = this.form.value;
    this.debouEmit.next({
      prompt: prompt!,
      file,
      selectedOption: selectedOption!,
    });
  }
}
