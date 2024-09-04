import type { TAnyFail } from '@frozik/utils';
import { Alert } from 'antd';
import { memo } from 'react';

import styles from './styles.module.scss';

export const ValueDescriptorFail = memo(
    ({ className, fail }: { className?: string; fail: TAnyFail }) => (
        <div className={styles.container}>
            <Alert
                className={className}
                message={fail.meta.message}
                description={fail.meta.description}
                type="error"
                showIcon
            />
        </div>
    ),
);
