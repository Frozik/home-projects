import type { Observable } from 'rxjs';
import { defer } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export function finalizeOnlyWithoutError(callback: () => void) {
    return (source: Observable<unknown>): ReturnType<typeof defer> =>
        defer(() => {
            let error: undefined | unknown = undefined;
            return source.pipe(
                tap({ error: (err) => (error = err) }),
                finalize(() => error === undefined && callback()),
            );
        });
}
