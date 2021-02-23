import { FireModel } from 'types/models';
import type fb from 'firebase';

export type IDocToServerProps<T> = T & {
  uid: string;
  _created: ReturnType<Date['toJSON']>;
  _updated: ReturnType<Date['toJSON']>;
  _deleted?: ReturnType<Date['toJSON']>;
}

export const docToServerProps = function <T>(doc: fb.firestore.QueryDocumentSnapshot<FireModel<T>>) {
  const {
    _created,
    _updated,
    _deleted,
    ...data
  } = doc.data();

  return {
    uid: doc.id,
    ...data,
    _created: _created.toDate().toJSON(),
    _updated: _updated.toDate().toJSON(),
    _deleted: _deleted?.toDate().toJSON() || null,
  } as unknown as IDocToServerProps<T>;
}
