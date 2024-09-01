import type { Observable } from 'rxjs';
import { defer } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export function finalizeOnlyWithError<Err extends Error>(callback: (value: Err) => void) {
    return (source: Observable<unknown>): ReturnType<typeof defer> =>
        defer(() => {
            let error: Err;
            return source.pipe(
                tap({ error: (err) => (error = err) }),
                finalize(() => error && callback(error)),
            );
        });
}
