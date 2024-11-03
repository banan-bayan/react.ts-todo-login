export enum EStatusType {
  completed = "completed",
  active = "active",
  deleted = 'deleted'
}

export interface TaskType {
  id: number;
  text: string;
  status: EStatusType;
}

 type ButtonsSectionNamesType =
  | "ТЕКУЩИЕ ДЕЛА"
  | "ВСЕ ДЕЛА"
  | "ВЫПОЛНЕННЫЕ ДЕЛА"
  | "КОРЗИНА";

export interface ButtonSectionDataType {
 id: number
 name: ButtonsSectionNamesType
}

