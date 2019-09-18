// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * @ignore
 */

const serverRoot: string = 'http://localhost:10000';
export const environment = {
  production: false,
  serverRootURL: serverRoot,
  api: {
    category: {
      active: `${serverRoot}/category/?active=true`,
      byBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/qa/category/${batchId}/${week}/all`
      }
    },
    qa: {
      qcTraineeNotesByBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/qa/audit/trainee/notes/${batchId}/${week}`;
      },
      qcBatchNotesByBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/qa/audit/notes/overall/${batchId}/${week}`;
      },
      batchNotes: `${serverRoot}/qa/audit/batch/notes`,
      traineeNotes: `${serverRoot}/qa/audit/trainee/notes`,
      createCategory: `${serverRoot}/qa/category`,
      deleteCategory(categoryId: number): string {
        return `${serverRoot}/qa/category/delete/${categoryId}`;
      }
    },
    user: {
      trainees: {
        inBatch(batchId: number): string {
          return `${serverRoot}/user/all/trainee/?batch=${batchId}`;
        }
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
