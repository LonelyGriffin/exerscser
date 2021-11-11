export interface Draft<T> {
  toClean(): T;
  saveToRealm(realm: Realm): Promise<void>;
}
