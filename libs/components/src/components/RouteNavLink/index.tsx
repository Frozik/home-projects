import cn from 'classnames';
import { isNil } from 'lodash-es';
import type { ComponentProps, MouseEventHandler } from 'react';
import { memo, useMemo } from 'react';
import { useMatch, useResolvedPath } from 'react-router-dom';

import { RouteLink } from '../RouteLink';

export const RouteNavLink = memo(
    ({
        children,
        to,
        className,
        getClassName,
        exactMatch = true,
        ...props
    }: ComponentProps<typeof RouteLink> & {
        getClassName?: (active: boolean) => string | undefined;
        exactMatch?: boolean;
        onClick?: MouseEventHandler;
    }) => {
        const resolved = useResolvedPath(to);
        const active = !isNil(useMatch({ path: resolved.pathname, end: exactMatch }));

        const exClassname = useMemo(() => getClassName?.(active), [active, getClassName]);

        return (
            <RouteLink to={to} className={cn(className, exClassname)} {...props}>
                {children}
            </RouteLink>
        );
    },
);
