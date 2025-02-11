import { RichEditor } from '@frozik/components';
import type { TenorDate } from '@frozik/types';
import { createSyncedValueDescriptor, type TValueDescriptor } from '@frozik/utils';
import { Temporal } from '@js-temporal/polyfill';
import { Dropdown } from 'antd';
import cn from 'classnames';
import { memo, useState } from 'react';

import { DateSelector } from './components/DateSelector';
import styles from './styles.module.scss';

export const DateEditor = memo(
    ({ className, placeholder }: { className?: string; placeholder?: string }) => {
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
            <Dropdown
                open={focused}
                dropdownRender={() => (
                    <DateSelector
                        today={createSyncedValueDescriptor(Temporal.PlainDate.from('2021-01-29'))}
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
                    className={cn(styles.editor, className)}
                    onFocusChanges={setFocused}
                    placeholder={`<span class="${styles.placeholder}">${placeholder}</span>`}
                />
            </Dropdown>
        );
    },
);
