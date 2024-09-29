import { isEmpty, isNil } from 'lodash-es';
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { IOptions } from 'sanitize-html';
import sanitizeHtml from 'sanitize-html';

import { useFunction } from '../../hooks';
import type { ISelection } from './defs';
import {
    findNextTabStop,
    getElementSelection,
    inputElementSelectionWithValue,
    inputTextToHtml,
    isParentOf,
    setElementSelection,
} from './utils';

const SANITIZE_CONFIG: IOptions = {
    allowedTags: [],
    allowedAttributes: false,
};

export const RichEditor = memo(
    ({
        className,
        disabled = false,
        value = '',
        placeholder,
        onValueChanged,
        onGetElementSelectionWithValue = inputElementSelectionWithValue,
        onTextToHtml = inputTextToHtml,
        onFocusChanges,
    }: {
        className?: string;
        disabled?: boolean;
        value?: string;
        placeholder?: string;
        onValueChanged?: (value: string) => void;
        onGetElementSelectionWithValue?: (props: {
            oldValue: string;
            newValue: string;
            oldSelection: ISelection;
            newSelection: ISelection;
        }) => { value: string; selection: ISelection } | false;
        onTextToHtml?: (text: string, editing: boolean) => string;
        onFocusChanges?: (focused: boolean) => void;
    }) => {
        const contentEditableRef = useRef<HTMLDivElement>(null);
        const selectionRangeRef = useRef<ISelection>(
            useMemo(() => ({ start: value.length, end: value.length }), [value]),
        );

        const [focused, setFocused] = useState(false);

        const html = useMemo(() => onTextToHtml(value, focused), [onTextToHtml, value, focused]);

        const handleContentChange = useFunction((evt) => {
            const oldValue = value;
            const newValue = sanitizeHtml(evt.currentTarget.innerHTML, SANITIZE_CONFIG);

            const oldSelection = selectionRangeRef.current;
            const newSelection = getElementSelection(evt.currentTarget) ?? {
                start: value.length,
                end: value.length,
            };

            const result = onGetElementSelectionWithValue({
                oldValue,
                newValue,
                oldSelection,
                newSelection,
            });

            if (result === false) {
                evt.currentTarget.innerHTML = html;
                setElementSelection(evt.currentTarget, oldSelection);
            } else {
                selectionRangeRef.current = result.selection;
                onValueChanged?.(result.value);
            }
        });

        useLayoutEffect(() => {
            if (isNil(contentEditableRef.current)) {
                return;
            }

            setElementSelection(contentEditableRef.current, selectionRangeRef.current);
        });

        useEffect(() => {
            if (isNil(contentEditableRef.current)) {
                return;
            }

            setFocused(isParentOf(document.activeElement, contentEditableRef.current));
        }, [setFocused]);

        const handleFocused = useFunction(() => {
            setFocused(true);
            onFocusChanges?.(true);
        });
        const handleBlur = useFunction(() => {
            setFocused(false);
            onFocusChanges?.(false);
        });

        const handleKeyDown = useFunction((event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const element = findNextTabStop(event.currentTarget);
                if (isNil(element)) {
                    event.currentTarget.blur();
                } else {
                    element.focus();
                }
            }
        });

        const handleSelectionChange = useFunction(() => {
            if (isNil(contentEditableRef.current)) {
                return;
            }

            selectionRangeRef.current =
                getElementSelection(contentEditableRef.current) ?? selectionRangeRef.current;
        });

        useEffect(() => {
            if (isNil(contentEditableRef.current) || !focused) {
                return;
            }

            document.addEventListener('selectionchange', handleSelectionChange);

            return () => document.removeEventListener('selectionchange', handleSelectionChange);
        }, [handleSelectionChange, focused]);

        const updateFocused = useFunction((newFocused: boolean) => {
            if (newFocused === focused) {
                return;
            }

            setFocused(newFocused);
            onFocusChanges?.(newFocused);
        });

        useEffect(() => {
            if (isNil(contentEditableRef.current)) {
                return;
            }

            updateFocused(isParentOf(document.activeElement, contentEditableRef.current));
        }, [onFocusChanges, updateFocused]);

        return (
            <div
                ref={contentEditableRef}
                className={className}
                style={{
                    textOverflow: 'clip',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'inline-block',
                }}
                contentEditable={!disabled}
                dangerouslySetInnerHTML={{
                    __html: focused || !isEmpty(value) || isNil(placeholder) ? html : placeholder,
                }}
                onInput={handleContentChange}
                onFocus={handleFocused}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        );
    },
);
