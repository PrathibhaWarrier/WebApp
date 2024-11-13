
<div class="add-btn-div">
  <button
    mat-fab
    color="primary"
    [matTooltip]="isSaving ? 'Save event' : 'Add event22'"
    (click)="addSignal('create')"
  >
    <mat-icon>{{ isSaving ? 'save' : 'add' }}</mat-icon>
  </button>&nbsp;&nbsp;
  <!-- <button
  mat-fab
  *ngIf="isSaving"
  matTooltip="close"
  (click)="clearSignalForm()"
> -->
  <mat-icon *ngIf="isSaving"
  color="warn"
  matTooltip="cancel"
  (click)="clearSignalForm()">close</mat-icon>
<!-- </button> -->
</div>
