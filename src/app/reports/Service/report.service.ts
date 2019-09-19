import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Trainee} from "../../domain/model/trainee.dto";
import {Category} from "../../domain/model/category.dto";
import {Assessment} from "../../domain/model/assessment.dto";
import {QcNote} from "../../domain/model/qc-note.dto";
import {Batch} from "../../domain/model/batch.dto";
import {Grade} from "../../domain/model/grade.dto";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url = environment.serverRootURL;

  batchesYearURL = '/vp/batch/';
  batchAllURL = 'batchAllURL';
  yearsURL = '/qa/batch/valid-years';
  gradesAllURL = '/assessment/all/grade/batch/';
  gradesTotalAverageURL = '/assessment/all/grade/all';
  gradesByTraineeURL = '/assessment/all/grade/trainee/';
  qaNotesAllURL = '/qa/audit/notes/all/';
  qaNotesURL = '/qa/audit/notes/';
  categoryAllURL = '/category/all?active=true';
  assessmentsAllURL: string = '/assessment/all/assessment/batch/';

  batch: Batch;
  week: number;
  trainee: Trainee;
  averageGradeScore: number;
  gradesDataStore: Grade[];
  qaNoteDataStore: QcNote[];
  traineeDataStore: Trainee[];
  categoryDataStore: Category[];
  assessmentsDataStore: Assessment[];
  batchAssessmentsDataStore: Assessment[];
  gradesOfBatchDataStore: Grade[];
  gradesOfTraineeDataStore: Grade[];

  //for Techn Radar Last Minute Changes
  cacheGradeStore: Grade[];
  cacheCategoryStore: Category[];
  cacheTraineeStore: Trainee[];
  cacheAssessmentStore: Assessment[];

  constructor(private http: HttpClient) { }

  getAllYears(): Observable<number[]> {
    // console.log(environment);
    return this.http.get<number[]>(this.url + this.yearsURL, httpOptions);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + this.categoryAllURL, httpOptions);
  }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + '/batch' + this.batchesYearURL + year, httpOptions);
  }

  getAllGradesForTotalAverage(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesTotalAverageURL, httpOptions);
  }

  getAllAssessments(): Observable<Assessment[]> {
    const weekStr = this.determineWeek(this.week);
    return this.http.get<Assessment[]>(this.url + this.assessmentsAllURL + this.batch.batchId + weekStr, httpOptions);
  }

  getAllBatchAssessments(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.url + this.assessmentsAllURL + this.batch.batchId, httpOptions);
  }

  getAllGrades(): Observable<Grade[]> {
    // if(this.trainee != undefined && this.trainee != null && this.trainee.traineeId == -1){
      const weekStr = this.determineWeek(this.week);
      return this.http.get<Grade[]>(this.url + this.gradesAllURL + this.batch.batchId + weekStr, httpOptions);
    // }else if(this.trainee != undefined && this.trainee != null){
    //   return this.http.get<Grade[]>(this.url + this.gradesByTraineeURL + this.trainee.traineeId, httpOptions)
    // }
  }

  getAllTraineeGrades(): Observable<Grade[]> {
    if (this.trainee !== undefined && this.trainee != null) {
      return this.http.get<Grade[]>(this.url + this.gradesByTraineeURL + this.trainee.traineeId, httpOptions);
    }
  }

  getAllQANotes(): Observable<QcNote[]> {
    let url;
    if (this.week === 0) {
      url = this.url + this.qaNotesAllURL + this.batch.batchId;
      return this.http.get<QcNote[]>(url, httpOptions);
    } else {
      url = this.url + this.qaNotesURL + this.batch.batchId + '/' + this.week;
      return this.http.get<QcNote[]>(url, httpOptions);
    }
  }

  getAllBatchGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesAllURL + this.batch.batchId, httpOptions);
  }

  setGradesOfBatchDataStore(gradesOfBatchDataStore: Grade[]) {
    this.gradesOfBatchDataStore = gradesOfBatchDataStore;
  }

  getGradesOfBatchDataStore(): Grade[] {
    return this.gradesOfBatchDataStore;
  }

  //// add a query for all weeks
  //// http://localhost:10000/qa/audit/notes/2050/1

  setGradeDataStore(gradesDataStore: Grade[]) {
    this.gradesDataStore = gradesDataStore;
  }

  setQANoteDataStore(qaNoteDataStore: QcNote[]) {
    this.qaNoteDataStore = qaNoteDataStore;
  }

  setTraineeDataStore(traineeDataStore: Trainee[]) {
    this.traineeDataStore = traineeDataStore;
  }

  setCategoryDataStore(categoryDataStore: Category[]) {
    this.categoryDataStore = categoryDataStore;
  }

  setAssessmentDataStore(assessmentDataStore: Assessment[]) {
    this.assessmentsDataStore = assessmentDataStore;
  }

  setBatchAssessmentDataStore(batchAssessmentsDataStore: Assessment[]) {
    this.batchAssessmentsDataStore = batchAssessmentsDataStore;
  }

  setGradesOfTraineeDataStore(gradesOfTraineeDataStore: Grade[]) {
    this.gradesOfTraineeDataStore = gradesOfTraineeDataStore;
  }

  determineWeek(week: number): String {
    if (week > 0) {
      return '?week=' + week;
    }
    return '';
  }

  setAverageGradeScore(averageGradeScore: number) {
    this.averageGradeScore = averageGradeScore;
  }

  setBatch(batch: Batch) {
    this.batch = batch;
  }

  setCacheGradeStore(cacheGradeStore : Grade[]){
    this.cacheGradeStore = cacheGradeStore;
  }

  setCacheCategoryStore(cacheCategoryStore: Category[]){
    this.cacheCategoryStore = cacheCategoryStore;
  }

  setCacheTraineeStore(cacheTraineeStore: Trainee[]){
    this.cacheTraineeStore = cacheTraineeStore;
  }

  setCacheAssessmentStore(cacheAssessmentStore: Assessment[]){
    this.cacheAssessmentStore = cacheAssessmentStore;
  }

  getCacheGradeStore(): Grade[]{
    return this.cacheGradeStore;
  }

  getCacheCategoryStore(): Category[]{
    return this.cacheCategoryStore;
  }

  getCacheTraineeStore(): Trainee[]{
    return this.cacheTraineeStore
  }

  getCacheAssessmentStore(): Assessment[]{
    return this.cacheAssessmentStore
  }

  getBatch() {
    return this.batch;
  }

  setWeek(week) {
    this.week = week;
  }

  getWeek(): number {
    return this.week;
  }

  setTrainee(trainee) {
    this.trainee = trainee;
  }

  getTrainee() {
    return this.trainee;
  }

  getGradeDataStore(): Grade[] {
    return this.gradesDataStore;
  }

  getQANoteDataStore(): QcNote[] {
    return this.qaNoteDataStore;
  }

  getTraineeDataStore(): Trainee[] {
    return this.traineeDataStore;
  }

  getCategoryDataStore(): Category[] {
    return this.categoryDataStore;
  }

  getAssessmentDataStore(): Assessment[] {
    return this.assessmentsDataStore;
  }

  getBatchAssessmentDataStore(): Assessment[] {
    return this.batchAssessmentsDataStore;
  }

  getGradesOfTraineeDataStore() {
     return this.gradesOfTraineeDataStore;
  }

  getAverageGradeScore() {
    return this.averageGradeScore;
  }
}
