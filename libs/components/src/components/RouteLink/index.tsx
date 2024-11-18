import { Button } from 'antd';
import type {
    ComponentProps,
    HTMLAttributeAnchorTarget,
    MouseEvent,
    MouseEventHandler,
} from 'react';
import { memo } from 'react';
import type { NavigateOptions, To } from 'react-router-dom';
import { createPath, useLocation, useNavigate, useResolvedPath } from 'react-router-dom';

import { useFunction } from '../../hooks';
import { shouldProcessLinkClick } from './utils';

export const RouteLink = memo(
    ({
        children,
        relative,
        replace: replaceProp,
        state,
        target,
        to,
        preventScrollReset,
        onClick,
        ...restProps
    }: {
        reloadDocument?: boolean;
        to: To;
        target?: HTMLAttributeAnchorTarget;
        onClick?: MouseEventHandler;
    } & Pick<NavigateOptions, 'state' | 'replace' | 'preventScrollReset' | 'relative'> &
        ComponentProps<typeof Button>) => {
        const navigate = useNavigate();
        const location = useLocation();
        const path = useResolvedPath(to, { relative });

        const internalOnClick = useFunction((event: MouseEvent) => {
            if (!event.defaultPrevented && shouldProcessLinkClick(event, target)) {
                event.preventDefault();

                // If the URL hasn't changed, a regular <a> will do a replace instead of
                // a push, so do the same here unless the replace prop is explicitly set
                const replace =
                    replaceProp !== undefined
                        ? replaceProp
                        : createPath(location) === createPath(path);

                navigate(to, {
                    replace,
                    state,
                    preventScrollReset,
                    relative,
                });

                onClick?.(event);
            }
        });

        return (
            <Button type="link" onClick={internalOnClick} {...restProps}>
                {children}
            </Button>
        );
    },
);
