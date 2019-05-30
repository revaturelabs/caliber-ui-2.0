import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AuditService } from '../../Services/audit.service';
import { QcNote } from '../../types/note';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit, OnDestroy {
	batchId: number;
	week: number;
	note: QcNote;
	noteSubscription: Subscription;
	//Smiley face status
	smile: string; meh: string; frown: string;

	constructor(private auditService: AuditService, private errorService: ErrorService) { }

	ngOnInit() {
		this.noteSubscription = this.auditService.overallBatchNoteChanged.subscribe(data => {
			this.note = data;
		});

		this.auditService.invokeAssosciateFunction.subscribe(() => {
			this.week = this.auditService.selectedWeek;
			this.batchId = this.auditService.selectedBatch['batchId'];
			this.auditService.getOverallBatchNoteByWeek(this.batchId, this.week);

		});
	}

	noteOnBlur(noteId: number, secondRound: boolean) {

		this.auditService.sendNote(this.note).subscribe(
			data => {
			},
			issue => {
				if (issue instanceof HttpErrorResponse) {
					const err = issue as HttpErrorResponse;
					this.errorService.setError('AuditService',
						`Issue updating QcNote with noteId ${noteId}. Please contact system administrator: \n
					Status Code: ${err.status} \n
					Status Text: ${err.statusText} \n
					Error: ${err.message}`);
				}
			}
		)
	}

	setScore(qcStatus: string, noteId: number) {
		this.note.qcStatus = qcStatus;
		this.auditService.sendNote(this.note).subscribe(
			data => {
				this.auditService.getOverallBatchNoteByWeek(this.auditService.selectedBatch['batchId'], this.auditService.selectedWeek);
			},
			issue => {
				if (issue instanceof HttpErrorResponse) {
					const err = issue as HttpErrorResponse;
					this.errorService.setError('AuditService',
						`Issue updating QcNote with noteId ${this.note.noteId}. Please contact system administrator: \n
				  Status Code: ${err.status} \n
				  Status Text: ${err.statusText} \n
				  Error: ${err.message}`);
				}
			});
	}

	ngOnDestroy() {
		if (this.noteSubscription) {
			this.noteSubscription.unsubscribe();
		}
	}
}
