import { TaskFieldsModel } from "./task-fields.model";
import { TaskVacuumCleanModel } from "./tasks-types/task-vacuum-clean.model";
import { TaskWashDishesModel } from "./tasks-types/task-wash-dishes.model";

export class TaskModel {
  public _id?: string;
  public name?: string;
  public type?: string;
  public fields?: TaskFieldsModel;

  static mapFromAPI(data: any): TaskModel {
    const model = new TaskModel();

    model.name = data.name;
    model.type = data.type;
    model._id = data._id;
    model.fields = data.fields;

    return model;
  }
}

export const tasksTypes: any[] = [
  { value: 'wash-dishes', viewValue: 'Wash Dishes' },
  { value: 'vacuum-clean', viewValue: 'Vacuum Clean' }
];

export const taskTypeFields = [
  { 'wash-dishes': TaskWashDishesModel },
  { 'vacuum-clean': TaskVacuumCleanModel }
];
