import type {
    DBSchema,
    IDBPDatabase,
    IDBPTransaction,
    OpenDBCallbacks,
    StoreKey,
    StoreNames,
    StoreValue,
} from 'idb';
import { openDB } from 'idb';

export function createDB<Schema extends DBSchema>(
    dbName: string,
    version: number,
    { upgrade, blocked, blocking, terminated }: OpenDBCallbacks<Schema> = {},
): Promise<IDBPDatabase<Schema>> {
    return openDB<Schema>(dbName, version, {
        upgrade,
        blocking(
            currentVersion: number,
            blockedVersion: number | null,
            event: IDBVersionChangeEvent,
        ) {
            blocking?.(currentVersion, blockedVersion, event);
            console.error(new Error(`IndexedDB ${dbName}: blocking`));
        },
        blocked(
            currentVersion: number,
            blockedVersion: number | null,
            event: IDBVersionChangeEvent,
        ) {
            blocked?.(currentVersion, blockedVersion, event);
            console.error(new Error(`IndexedDB ${dbName}: blocked`));
        },
        terminated() {
            terminated?.();
            console.error(new Error(`IndexedDB ${dbName}: abnormally terminated the connection`));
        },
    }).then((db) => {
        db.onversionchange = (e) => {
            // Triggered when the database is modified (e.g. adding an objectStore) or
            // deleted (even when initiated by other sessions in different tabs).
            // Closing the connection here prevents those operations from being blocked.
            // If the database is accessed again later by this instance, the connection
            // will be reopened or the database recreated as needed.
            // @ts-ignore
            e.target.close();
        };

        return db;
    });
}

export async function getDatabaseVersion(databaseName: string): Promise<undefined | number> {
    try {
        const databases = await self.indexedDB.databases();
        const panelsDatabase = databases.find(({ name }) => name === databaseName);
        return panelsDatabase?.version;
    } catch (error) {
        return undefined;
    }
}

export function readDatabaseItem<TSchema extends DBSchema>(
    transaction: IDBPTransaction<TSchema, [StoreNames<TSchema>], 'readonly'>,
    key: StoreKey<TSchema, StoreNames<TSchema>>,
): Promise<StoreValue<TSchema, StoreNames<TSchema>> | undefined> {
    return transaction.store.get(key);
}

export function readDatabaseItems<TSchema extends DBSchema>(
    transaction: IDBPTransaction<TSchema, [StoreNames<TSchema>], 'readonly'>,
    keys: StoreKey<TSchema, StoreNames<TSchema>>[],
): Promise<StoreValue<TSchema, StoreNames<TSchema>> | undefined>[] {
    return keys.map((key) => transaction.store.get(key));
}

export function updateDatabaseItem<TSchema extends DBSchema>(
    transaction: IDBPTransaction<TSchema, [StoreNames<TSchema>], 'readwrite'>,
    key: StoreKey<TSchema, StoreNames<TSchema>>,
    item: StoreValue<TSchema, StoreNames<TSchema>>,
): Promise<StoreKey<TSchema, StoreNames<TSchema>>> {
    return transaction.store.put(item, key);
}

export function updateDatabaseItems<TSchema extends DBSchema>(
    transaction: IDBPTransaction<TSchema, [StoreNames<TSchema>], 'readwrite'>,
    entities: [StoreKey<TSchema, StoreNames<TSchema>>, StoreValue<TSchema, StoreNames<TSchema>>][],
): Promise<StoreKey<TSchema, StoreNames<TSchema>>>[] {
    return entities.map(([key, item]) => updateDatabaseItem(transaction, key, item));
}

export function deleteDatabaseItem<TSchema extends DBSchema>(
    transaction: IDBPTransaction<TSchema, [StoreNames<TSchema>], 'readwrite'>,
    key: StoreKey<TSchema, StoreNames<TSchema>>,
): Promise<void> {
    return transaction.store.delete(key);
}

export function deleteDatabaseItems<TSchema extends DBSchema>(
    transaction: IDBPTransaction<TSchema, [StoreNames<TSchema>], 'readwrite'>,
    keys: StoreKey<TSchema, StoreNames<TSchema>>[],
): Promise<void>[] {
    return keys.map((key) => transaction.store.delete(key));
}
