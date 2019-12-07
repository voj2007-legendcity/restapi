import { Table, Column, Model, DataType, Length, IsNumeric, Max, Min } from 'sequelize-typescript';

const MIN = 0;
const MAX = 100;
const LENGTH = {min: 4, max: 255};

export type InputCreate = {
  name: string,
  priority: number
}

export type InputUpdate = {
  id: number,
  name: string,
  priority: number
}

export type InputID = {
  id: number
}

export interface ITask {
  id: number;
  name: string,
  priority: number
}

@Table({
  timestamps: true
})
export class Task extends Model<ITask> {

  @Length(LENGTH)
  @Column(DataType.STRING)
  get name(): string {
    return this.getDataValue('name');
  }
  
  set name(value: string) {
    this.setDataValue('name', value);
  }

  @IsNumeric
  @Min(MIN)
  @Max(MAX)
  @Column(DataType.INTEGER)
  get priority(): number {
    return this.getDataValue('priority');
  }
  
  set priority(value: number) {
    this.setDataValue('priority', value);
  }

}