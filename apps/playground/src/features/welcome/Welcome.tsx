import { useHasOverflow } from '@frozik/components';
import { Avatar } from 'antd';
import cn from 'classnames';
import { memo, useRef } from 'react';

import avatarUrl from '../../assets/avatar.png';
import { Contacts } from './components/Contacts';
import { Education } from './components/Education';
import { Position } from './components/Position';
import { Skills } from './components/Skills';
import { WorkExperience } from './components/WorkExperience';
import styles from './Welcome.module.scss';

export const Welcome = memo(() => {
    const cvRef = useRef<HTMLDivElement>(null);

    const { canScrollTop, canScrollBottom } = useHasOverflow(cvRef);

    return (
        <div className={styles.container}>
            <section
                ref={cvRef}
                className={cn(styles.cv, {
                    [styles.cvScrollTop]: canScrollTop,
                    [styles.cvScrollBottom]: canScrollBottom,
                })}
            >
                <div className={cn(styles.card, styles.cardWithAvatar)}>
                    <Avatar className={styles.avatar} size={200} src={avatarUrl} />
                    <Contacts />
                </div>

                <Position />

                <WorkExperience />

                <Education />

                <Skills />
            </section>
        </div>
    );
});
