import {
    numericElementSelectionWithValueBuilder,
    numericTextToHtmlBuilder,
    RichEditor,
    useFunction,
} from '@frozik/components';
import { trim } from '@frozik/utils';
import cn from 'classnames';
import { isEmpty, isNil } from 'lodash-es';
import { memo, useEffect, useMemo, useState } from 'react';

export const NumericEditor = memo(
    ({
        className,
        decimal,
        pipStart,
        pipSize = 2,
        allowNegative = false,
        placeholder,
        startGroupClassName,
        endGroupClassName,
        pipClassName,
        placeholderClassName,
    }: {
        className?: string;
        decimal?: number;
        pipStart?: number;
        pipSize?: number;
        allowNegative?: boolean;
        placeholder?: string;
        startGroupClassName?: string;
        endGroupClassName?: string;
        pipClassName?: string;
        placeholderClassName?: string;
    }) => {
        const allowedDecimals = useMemo(
            () => (isNil(decimal) ? decimal : Math.max(decimal, 0)),
            [decimal],
        );

        const [value, setValue] = useState('');
        const [focused, setFocused] = useState(false);

        const handleElementSelectionWithValue = useMemo(
            () => numericElementSelectionWithValueBuilder({ allowNegative }),
            [allowNegative],
        );

        const handleTextToHtml = useMemo(
            () =>
                numericTextToHtmlBuilder({
                    decimal: allowedDecimals,
                    pipStart,
                    pipSize,
                    startGroupClassName,
                    endGroupClassName,
                    pipClassName,
                }),
            [
                allowedDecimals,
                pipStart,
                pipSize,
                startGroupClassName,
                endGroupClassName,
                pipClassName,
            ],
        );

        const handleFocusChanges = useFunction((focused: boolean) => {
            setFocused(focused);

            if (focused || !value.includes('.')) {
                return;
            }

            if (!isNil(allowedDecimals) || !isNil(pipStart)) {
                const newValue = trim(
                    value,
                    Math.max(allowedDecimals ?? 0, isNil(pipStart) ? 0 : pipStart + pipSize),
                );

                if (newValue !== value) {
                    setValue(newValue);
                }
            } else {
                setValue(value.replace(/0+$/g, ''));
            }
        });

        useEffect(() => {
            handleFocusChanges(focused);
        }, [handleFocusChanges, focused, allowedDecimals, pipStart, pipSize]);

        return (
            <RichEditor
                className={cn(className)}
                onGetElementSelectionWithValue={handleElementSelectionWithValue}
                onTextToHtml={handleTextToHtml}
                value={value}
                placeholder={
                    isNil(placeholderClassName) || isEmpty(placeholderClassName.trim())
                        ? placeholder
                        : `<span class="${placeholderClassName}">${placeholder}</span>`
                }
                onValueChanged={setValue}
                onFocusChanges={handleFocusChanges}
            />
        );
    },
);
