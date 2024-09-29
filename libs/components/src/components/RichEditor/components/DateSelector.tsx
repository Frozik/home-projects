import { EDayOfWeek, type ISO, type TenorDate } from '@frozik/types';
import type { TValueDescriptor } from '@frozik/utils';
import {
    createSyncedValueDescriptor,
    DAYS_IN_WEEK,
    EMPTY_VD,
    getEndOfMonth,
    getStartOfMonth,
    getStartOfWeek,
    matchValueDescriptor,
} from '@frozik/utils';
import { Temporal } from '@js-temporal/polyfill';
import { isNil } from 'lodash-es';
import { memo, useMemo } from 'react';

import { DayCell } from './DayCell';

export const DateSelector = memo(
    ({
        yearMonth,
        today = EMPTY_VD,
        tenors = EMPTY_VD,
        weekendDays = EMPTY_VD,
        startOfWeek = EDayOfWeek.Sunday,
        selectedDate,
        minDate,
        maxDate,
        calendarClassName,
        calendarDayCellClassName,
        calendarDayCellTodayClassName,
        calendarDayCellSelectedClassName,
        calendarDayCellWeekendClassName,
        calendarDayCellTenorClassName,
        calendarDayCellOverflowClassName,
        onSelectCalendarDate,
    }: {
        yearMonth: Temporal.PlainYearMonth;
        selectedDate?: Temporal.PlainDate;
        today?: TValueDescriptor<Temporal.PlainDate>;
        tenors?: TValueDescriptor<TenorDate[]>;
        weekendDays?: TValueDescriptor<Temporal.PlainDate[]>;
        startOfWeek?: EDayOfWeek;
        minDate?: Temporal.PlainDate;
        maxDate?: Temporal.PlainDate;
        calendarClassName: string;
        calendarDayCellClassName: string;
        calendarDayCellTodayClassName: string;
        calendarDayCellSelectedClassName: string;
        calendarDayCellWeekendClassName: string;
        calendarDayCellTenorClassName: string;
        calendarDayCellOverflowClassName: string;
        onSelectCalendarDate?: (date: Temporal.PlainDate) => void;
    }) => {
        const tenorsMap = useMemo<TValueDescriptor<ReadonlyMap<ISO, TenorDate[]>>>(
            () =>
                matchValueDescriptor(tenors, ({ value }) =>
                    createSyncedValueDescriptor(
                        value.reduce((acc, tenorDate) => {
                            const isoDate = tenorDate.date.toString() as ISO;

                            const tenors = acc.get(isoDate);

                            if (isNil(tenors)) {
                                acc.set(isoDate, [tenorDate]);
                            } else {
                                tenors.push(tenorDate);
                            }

                            return acc;
                        }, new Map<ISO, TenorDate[]>()),
                    ),
                ),
            [tenors],
        );
        const weekendsSet: TValueDescriptor<ReadonlySet<ISO>> = useMemo(
            () =>
                matchValueDescriptor(weekendDays, ({ value }) =>
                    createSyncedValueDescriptor(
                        new Set(value.map((value) => value.toString() as ISO)),
                    ),
                ),
            [weekendDays],
        );
        const todayISO = useMemo(() => today?.toString() as ISO | undefined, [today]);
        const selectedISO = useMemo(
            () => selectedDate?.toString() as ISO | undefined,
            [selectedDate],
        );

        const dateGrid = useMemo(() => {
            const startOfMonth = getStartOfMonth(yearMonth);
            const endOfMonth = getEndOfMonth(yearMonth);
            const startOfViewPort = getStartOfWeek(startOfMonth, startOfWeek);

            const dateGrid: {
                date: Temporal.PlainDate;
                tenors: TenorDate[];
                weekend: boolean;
                today: boolean;
                selected: boolean;
                overflow: boolean;
            }[][] = [];

            let currentDate = startOfViewPort;

            while (Temporal.PlainDate.compare(currentDate, endOfMonth) <= 0) {
                const dateGridRow: Temporal.PlainDate[] = [];

                for (let index = 0; index < DAYS_IN_WEEK; index++) {
                    dateGridRow.push(currentDate.add({ days: index }));
                }

                currentDate = currentDate.add({ days: DAYS_IN_WEEK });

                dateGrid.push(
                    dateGridRow.map((date) => {
                        const dateISO = date.toString() as ISO;

                        return {
                            date,
                            tenors: tenorsMap.value?.get(dateISO) ?? [],
                            weekend: weekendsSet.value?.has(dateISO) ?? false,
                            today: dateISO === todayISO,
                            selected: dateISO === selectedISO,
                            overflow:
                                Temporal.PlainYearMonth.compare(date, yearMonth) !== 0 ||
                                (!isNil(minDate) &&
                                    Temporal.PlainYearMonth.compare(date, minDate) < 0) ||
                                (!isNil(maxDate) &&
                                    Temporal.PlainYearMonth.compare(date, maxDate) > 0),
                        };
                    }),
                );
            }

            return dateGrid;
        }, [
            yearMonth,
            startOfWeek,
            tenorsMap.value,
            weekendsSet.value,
            todayISO,
            selectedISO,
            minDate,
            maxDate,
        ]);

        return (
            <div className={calendarClassName}>
                {dateGrid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <DayCell
                            key={cell.date.toString()}
                            cell={cell}
                            gridColumn={colIndex + 1}
                            gridRow={rowIndex + 1}
                            calendarDayCellClassName={calendarDayCellClassName}
                            calendarDayCellTodayClassName={calendarDayCellTodayClassName}
                            calendarDayCellSelectedClassName={calendarDayCellSelectedClassName}
                            calendarDayCellWeekendClassName={calendarDayCellWeekendClassName}
                            calendarDayCellTenorClassName={calendarDayCellTenorClassName}
                            calendarDayCellOverflowClassName={calendarDayCellOverflowClassName}
                            onSelectCalendarDate={onSelectCalendarDate}
                        />
                    )),
                )}
            </div>
        );
    },
);
