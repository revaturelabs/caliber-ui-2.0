import { Pipe, PipeTransform } from '@angular/core';
import { Trainee } from '../types/trainee';
import { TrainingStatus } from '../types/training-status';

 /**
   * Checks to see if 'show' is true or false
   * true will show all trainees that are not dropped
   * false will show all trainees that are drpoped
   */
@Pipe({
  name: 'traineeToggle'
})
export class TraineeTogglePipe implements PipeTransform {
  transform(trainees: Trainee[], show: boolean): Array<Trainee> {
    if (!trainees) {return []; }
    if (show === false) {
      return trainees.filter(trainee => {
          if (trainee.trainingStatus !== (TrainingStatus.DROPPED)) {
            return true;
          }
      });
    } else {
      return trainees.filter(trainee => {
        if (trainee.trainingStatus === TrainingStatus.DROPPED) {
          return true;
        }
      });
    }
  }
}

