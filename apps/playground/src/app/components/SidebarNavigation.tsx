import { MenuOutlined } from '@ant-design/icons';
import AntdIcon from '@ant-design/icons/lib/components/AntdIcon';
import { RouteNavLink, useFunction } from '@frozik/components';
import type { UnknownAction } from '@reduxjs/toolkit';
import { Drawer, FloatButton, Tag, Tooltip } from 'antd';
import { isEmpty, isNil } from 'lodash-es';
import { memo } from 'react';
import { useToggle } from 'usehooks-ts';

import type { IAction } from '../commonSlice';
import { selectMenuActions } from '../commonSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import styles from './SidebarNavigation.module.scss';

export const SidebarNavigation = memo(() => {
    const [visible, toggleVisible] = useToggle(false);
    const handleToggleVisible = useFunction(() => toggleVisible());

    const getActiveClassName = useFunction((active) =>
        active ? styles.routeLinkActive : undefined,
    );

    const dispatch = useAppDispatch();
    const menuActions = useAppSelector(selectMenuActions);

    const handleClick = useFunction((action: UnknownAction) => dispatch(action));

    return (
        <>
            <Drawer
                title="Navigation"
                className={styles.sidebar}
                placement="left"
                open={visible}
                onClose={handleToggleVisible}
            >
                <RouteNavLink
                    className={styles.routeLink}
                    to="/"
                    getClassName={getActiveClassName}
                    onClick={handleToggleVisible}
                    size="large"
                >
                    Curriculum Vitae
                </RouteNavLink>
                <RouteNavLink
                    className={styles.routeLink}
                    to="/pendulum"
                    getClassName={getActiveClassName}
                    onClick={handleToggleVisible}
                    size="large"
                    exactMatch={false}
                >
                    Pendulum
                    <Tag className={styles.notForMobileMarker} color="red">
                        Not for Mobile
                    </Tag>
                </RouteNavLink>
                <p className={styles.linkDescription}>
                    The genetic algorithm generates and selects neural networks designed to tackle
                    the task of balancing a pendulum.
                </p>
                <RouteNavLink
                    className={styles.routeLink}
                    to="/sudoku"
                    getClassName={getActiveClassName}
                    onClick={handleToggleVisible}
                    size="large"
                    exactMatch={false}
                >
                    Sudoku
                </RouteNavLink>
                <RouteNavLink
                    className={styles.routeLink}
                    to="/sun"
                    getClassName={getActiveClassName}
                    onClick={handleToggleVisible}
                    size="large"
                    exactMatch={false}
                >
                    Sun
                </RouteNavLink>
                <RouteNavLink
                    className={styles.routeLink}
                    to="/charts"
                    getClassName={getActiveClassName}
                    onClick={handleToggleVisible}
                    size="large"
                    exactMatch={false}
                >
                    Charts
                </RouteNavLink>
                <div className={styles.linkDescription}>
                    Example of plotting charts on the GPU
                    <ul>
                        <li>Varying line thickness at the start and end of segments</li>
                        <li>Gradient coloring</li>
                        <li>Rounded segment endings</li>
                    </ul>
                </div>
                <RouteNavLink
                    className={styles.routeLink}
                    to="/controls"
                    getClassName={getActiveClassName}
                    onClick={handleToggleVisible}
                    size="large"
                >
                    Controls
                </RouteNavLink>
            </Drawer>

            {menuActions.length === 0 ? (
                <FloatButton
                    className={styles.sidebarMenuOpener}
                    icon={<MenuOutlined />}
                    type="primary"
                    onClick={handleToggleVisible}
                />
            ) : (
                <FloatButton.Group
                    className={styles.sidebarMenuOpener}
                    icon={<MenuOutlined />}
                    trigger="hover"
                    type="primary"
                    onClick={handleToggleVisible}
                >
                    {menuActions.map((action) => (
                        <Icon key={action.name} action={action} onClick={handleClick} />
                    ))}
                </FloatButton.Group>
            )}
        </>
    );
});

const Icon = memo(
    ({
        action: { icon, payloadAction, tooltip },
        onClick,
    }: {
        action: IAction;
        onClick: (action: UnknownAction) => void;
    }) => {
        const handleClick = useFunction(() => onClick(payloadAction));

        const button = (
            <FloatButton
                icon={isNil(icon) ? undefined : <AntdIcon icon={icon} />}
                onClick={handleClick}
            />
        );

        return isEmpty(tooltip) ? (
            button
        ) : (
            <Tooltip title={tooltip} placement="right">
                {button}
            </Tooltip>
        );
    },
);
