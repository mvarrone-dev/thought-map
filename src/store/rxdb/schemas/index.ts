import { RxJsonSchema, RxCollectionCreator } from 'rxdb';
import thought from './thought';
import note from './note';
import tag from './tag';
import connection from './connection';
import plan from './plan';
import template from './template';
import picture from './picture';
import setting from './setting';
import status from './status';

type SchemaTuple = [string, RxJsonSchema, RxCollectionCreator?];

export default [
  plan,
  thought,
  note,
  tag,
  connection,
  template,
  picture,
  setting,
  status,
] as [
  SchemaTuple,
  SchemaTuple,
  SchemaTuple,
  SchemaTuple,
  SchemaTuple,
  SchemaTuple,
  SchemaTuple,
  SchemaTuple,
  SchemaTuple,
];
