import {
    numericElementSelectionWithValueBuilder,
    numericTextToHtmlBuilder,
    RichEditor,
    useFunction,
} from '@frozik/components';
import cn from 'classnames';
import { memo, useMemo, useState } from 'react';

import styles from './styles.module.scss';

export const NumericEditor = memo(
    ({
        className,
        decimal,
        pipStart,
        pipSize = 2,
        allowNegative = false,
        placeholder,
    }: {
        className?: string;
        decimal?: number;
        pipStart?: number;
        pipSize?: number;
        allowNegative?: boolean;
        placeholder?: string;
    }) => {
        const [value, setValue] = useState('');

        const handleElementSelectionWithValue = useMemo(
            () => numericElementSelectionWithValueBuilder({ allowNegative }),
            [allowNegative],
        );

        const handleTextToHtml = useMemo(
            () =>
                numericTextToHtmlBuilder({
                    decimal,
                    pipStart,
                    pipSize,
                    startGroupClassName: styles.groupStart,
                    endGroupClassName: styles.groupEnd,
                    pipClassName: styles.pip,
                }),
            [decimal, pipStart, pipSize],
        );

        const handleFocusChanges = useFunction((focused: boolean) => {
            if (focused || !value.includes('.') || !/0+$/.test(value)) {
                return;
            }

            setValue(value.replace(/0+$/g, ''));
        });

        return (
            <RichEditor
                className={cn(className)}
                onGetElementSelectionWithValue={handleElementSelectionWithValue}
                onTextToHtml={handleTextToHtml}
                value={value}
                placeholder={`<span class="${styles.placeholder}">${placeholder}</span>`}
                onValueChanged={setValue}
                onFocusChanges={handleFocusChanges}
            />
        );
    },
);
