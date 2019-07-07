import { WeeklyQualityAuditComponent } from './../weekly-quality-audit/weekly-quality-audit.component';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { OverallQCScoresComponent } from '../overall-qc-scores/overall-qc-scores.component';
import { Trainee } from 'src/app/Batch/type/trainee';
import { ReportService } from '../../Service/report.service';
import { ReportTopChartController } from '../report-top-chart-controller/report-top-chart-controller.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportOutput : ReportOutput;
  @ViewChild(OverallQCScoresComponent) overAllQCReport: OverallQCScoresComponent;
  @ViewChild(ReportTopChartController) cumulativeScoreComponents: ReportTopChartController;
  private weeklyQualityAuditComponent: WeeklyQualityAuditComponent;
  @ViewChild(WeeklyQualityAuditComponent) set setWeeklyQualityAudit(content: WeeklyQualityAuditComponent) {
    this.weeklyQualityAuditComponent = content;

    if (this.isWeekSelected && !this.isTraineeSelected){
      this.weeklyQualityAuditComponent.updateDataPull();
    }
    this.cd.detectChanges();
  }

  public isTraineeSelected: boolean = false;
  public isWeekSelected: boolean = false;
  
  constructor(private reportService: ReportService, private cd: ChangeDetectorRef) { }
  
  ngOnInit() {
  }

  showOverAllQC(){
    return (this.reportService.getWeek() == 0) && this.reportService.getTrainee()['traineeId'] == -1; 
  }

  updateReportOutput(reportOutput: ReportOutput){
    this.isTraineeSelected = this.reportService.trainee.traineeId > 0;
    this.isWeekSelected = this.reportService.week > 0;
    this.reportOutput = reportOutput;
    // console.log("Selected Trainee:"); // Adam needs these values for showing his component
    // console.log(this.reportOutput.selectedTrainee);
    // console.log("Selected Week:");// Let Jimmy know if you need other custom values on the reportOutput object
    // console.log(this.reportOutput.selectedWeek);
    // console.log("The Reports Page has Received an Update Request for Data");
    // //this.cumulativeScoreComponents.updateDataPull();
    // console.log("The Cumulative Score component has been updated!");


    // console.log("Testing Report Service Data");
    // console.log("Get Selected Batch");
    // console.log(this.reportService.getBatch());
    // console.log("Get All Trainees in Batch");
    // console.log(this.reportService.getTraineeDataStore());
    // console.log("Get All Categories in System");
    // console.log(this.reportService.getCategoryDataStore());
    // console.log("Get all QANotes in Batch");
    // console.log(this.reportService.getQANoteDataStore());
    // console.log("Get all Assessments in Batch");
    // console.log(this.reportService.getAssessmentDataStore());
    // console.log("Get all Grades in Batch/week");
    // console.log(this.reportService.getGradeDataStore());
    if (this.overAllQCReport != undefined){
      this.overAllQCReport.update(this.reportService.getQANoteDataStore());
    }
    if (this.cumulativeScoreComponents != undefined){
      this.cumulativeScoreComponents.updateDataPull();
    }
    if (this.weeklyQualityAuditComponent != undefined){
      this.weeklyQualityAuditComponent.updateDataPull();
    }
  }
}