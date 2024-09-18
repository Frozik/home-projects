import { Carousel } from 'antd';
import { memo } from 'react';

import { NumberPage } from './components/NumberPage';
import styles from './styles.module.scss';

export const Controls = memo(() => {
    return (
        <div className={styles.container}>
            <Carousel dotPosition="top" dots={false} arrows>
                <NumberPage />
            </Carousel>
        </div>
    );
});
