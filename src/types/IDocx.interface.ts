import DocumentType from "./DocumentType.type";

export default interface IDocx {
  id?: number;
  file_key?: string;
  file_type?: DocumentType;
  fields?: IDocxFieldsField[];
  pdfFileKey?: string
}

export interface IDocxFieldsField {
  field: string;
  fieldRu: string;
}
