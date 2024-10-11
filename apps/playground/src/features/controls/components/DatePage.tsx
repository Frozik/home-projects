import { DateSelector, RichEditor } from '@frozik/components';
import type { TenorDate } from '@frozik/types';
import type { TValueDescriptor } from '@frozik/utils';
import { createSyncedValueDescriptor } from '@frozik/utils';
import { Temporal } from '@js-temporal/polyfill';
import { Dropdown } from 'antd';
import cn from 'classnames';
import { isEmpty, isNil } from 'lodash-es';
import { memo, useState } from 'react';

import styles from './styles.module.scss';

export const DatePage = memo(() => {
    return (
        <div className={styles.page}>
            <h3>DatePicker Control</h3>
            <DateEditor
                className={styles.editor}
                startGroupClassName={styles.groupStart}
                endGroupClassName={styles.groupEnd}
                pipClassName={styles.pip}
                placeholderClassName={styles.placeholder}
                placeholder="Enter conversion rate"
            />
            <div className={styles.controls}></div>
        </div>
    );
});

export const DateEditor = memo(
    ({
        className,
        placeholder,
        // timeZone,
        placeholderClassName,
    }: {
        className?: string;
        placeholder?: string;
        startGroupClassName?: string;
        endGroupClassName?: string;
        pipClassName?: string;
        placeholderClassName?: string;
    }) => {
        const [focused, setFocused] = useState(false);

        // Today can change when switching to new date, the best is to get today from server
        // today$: Observable<Temporal.PlainDate>;
        // Tenors can change depending on exchange business hours
        // tenors$: Observable<TValueDescriptor<TenorDate[]>>;
        // Weekend days can change depending on exchange holidays and weekends
        // getWeekendDays$?: (
        //     yearMonth: Temporal.PlainYearMonth,
        // ) => Observable<TValueDescriptor<Temporal.PlainDate[]>>;

        return (
            <>
                <Dropdown
                    open={focused}
                    dropdownRender={() => (
                        <DateSelector
                            today={createSyncedValueDescriptor(
                                Temporal.PlainDate.from('2021-01-29'),
                            )}
                            yearMonth={Temporal.PlainYearMonth.from('2021-01')}
                            tenors={
                                createSyncedValueDescriptor([
                                    { tenor: 'TOD', date: Temporal.PlainDate.from('2021-01-01') },
                                    { tenor: 'TOM', date: Temporal.PlainDate.from('2021-01-04') },
                                    { tenor: 'SPOT', date: Temporal.PlainDate.from('2021-01-05') },
                                    { tenor: '1W', date: Temporal.PlainDate.from('2021-01-08') },
                                ]) as TValueDescriptor<TenorDate[]>
                            }
                            weekendDays={
                                createSyncedValueDescriptor([
                                    Temporal.PlainDate.from('2021-01-02'),
                                    Temporal.PlainDate.from('2021-01-03'),
                                    Temporal.PlainDate.from('2021-01-09'),
                                    Temporal.PlainDate.from('2021-01-10'),
                                    Temporal.PlainDate.from('2021-01-16'),
                                    Temporal.PlainDate.from('2021-01-17'),
                                    Temporal.PlainDate.from('2021-01-23'),
                                    Temporal.PlainDate.from('2021-01-24'),
                                    Temporal.PlainDate.from('2021-01-30'),
                                    Temporal.PlainDate.from('2021-01-31'),
                                ]) as TValueDescriptor<Temporal.PlainDate[]>
                            }
                            calendarClassName={styles.calendar}
                            calendarDayCellClassName={styles.calendarDayCell}
                            calendarDayCellTodayClassName={styles.calendarDayCellToday}
                            calendarDayCellSelectedClassName={styles.calendarDayCellSelected}
                            calendarDayCellWeekendClassName={styles.calendarDayCellWeekend}
                            calendarDayCellTenorClassName={styles.calendarDayCellTenor}
                            calendarDayCellOverflowClassName={styles.calendarDayCellOverflow}
                            calendarHeaderClassName={styles.calendarDayCellHeader}
                            selectedDate={Temporal.PlainDate.from('2021-01-24')}
                            minDate={Temporal.PlainDate.from('2021-01-04')}
                            maxDate={Temporal.PlainDate.from('2021-01-30')}
                        />
                    )}
                >
                    <RichEditor
                        className={cn(className)}
                        placeholder={
                            isNil(placeholderClassName) || isEmpty(placeholderClassName.trim())
                                ? placeholder
                                : `<span class="${placeholderClassName}">${placeholder}</span>`
                        }
                        onFocusChanges={setFocused}
                    />
                </Dropdown>
            </>
        );
    },
);
