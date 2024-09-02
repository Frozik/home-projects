import cn from 'classnames';
import { memo } from 'react';

import styles from '../styles.module.scss';

export const Position = memo(() => (
    <>
        <h2 className={styles.cardTitle}>Desired position and salary</h2>
        <section className={cn(styles.card, styles.cardWithTitle, styles.cardWithRowMode)}>
            <div className={styles.flexStretch}>
                <h3>Senior Frontend Engineer, Team Leader</h3>
                <ul>
                    <li>Specializations: Team Leader, Developer</li>
                    <li>Employment: full time</li>
                    <li>Work schedule: full day</li>
                    <li>Desired travel time to work: less than hour</li>
                </ul>
            </div>
            <div className={styles.flexFixed}>
                <h3>10 000 USD</h3>
            </div>
        </section>
    </>
));
