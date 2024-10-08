import { Spin } from 'antd';
import { memo } from 'react';

import styles from './styles.module.scss';

export const OverlayLoader = memo(() => (
    <div className={styles.container}>
        <Spin tip="Loading" size="large">
            Loading...
        </Spin>
    </div>
));
