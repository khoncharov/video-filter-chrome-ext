import SaveDataService from '../../services/data';
import InputFormComponent from './input-form';
import ListComponent from './list';

export default class SaveStateComponent {
  private inputForm: InputFormComponent;

  public list: ListComponent;

  constructor(data: SaveDataService) {
    this.inputForm = new InputFormComponent(data);
    this.list = new ListComponent(data);
  }
}
