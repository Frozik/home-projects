import type { DBSchema, IDBPDatabase } from 'idb';
import type { MonoTypeOperatorFunction } from 'rxjs';
import { Observable } from 'rxjs';

import { progressiveRetry } from '../value-descriptors';

export enum EDatabaseErrorCallbackType {
    Blocked = 'Blocked',
    Blocking = 'Blocking',
    Terminated = 'Terminated',
}

export type TDatabaseErrorCallback = (type: EDatabaseErrorCallbackType) => void | Promise<void>;

export type TDatabaseCreator<T extends DBSchema> = (
    callback: TDatabaseErrorCallback,
) => Promise<IDBPDatabase<T>>;

export function createDatabase$<T extends DBSchema>(
    creator: TDatabaseCreator<T>,
): Observable<IDBPDatabase<T>> {
    return new Observable<IDBPDatabase<T>>((observer) => {
        creator((type: EDatabaseErrorCallbackType) =>
            observer.error(new Error(`Database is in '${type}' state, reconnecting`)),
        ).then(
            (database) => observer.next(database),
            (error) => observer.error(error),
        );
    });
}

export function databaseReconnect<T extends DBSchema>(): MonoTypeOperatorFunction<IDBPDatabase<T>> {
    return progressiveRetry({ initialInterval: 5_000, jitter: 1_000 });
}
