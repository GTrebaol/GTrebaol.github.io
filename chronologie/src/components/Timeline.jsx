import React, { useMemo } from 'react';
import EventCard from './EventCard';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

const Timeline = ({ personalEvents, externalEvents }) => {
    const sortedEvents = useMemo(() => {
        const all = [
            ...personalEvents.map(e => ({ ...e, isPersonal: true })),
            ...externalEvents.map(e => ({ ...e, isPersonal: false, dateObj: new Date(e.date) }))
        ];

        const validEvents = all.filter(e => e.dateObj && !isNaN(e.dateObj));

        return validEvents.sort((a, b) => a.dateObj - b.dateObj);
    }, [personalEvents, externalEvents]);

    const birthEvent = sortedEvents.find(e => e.type === 'BIRT');
    const birthDate = birthEvent ? birthEvent.dateObj : null;

    const getAgeLabel = (date) => {
        if (!birthDate) return '';
        if (date < birthDate) {
            const years = differenceInYears(date, birthDate);
            return `${years} ans`;
        }
        const years = differenceInYears(date, birthDate);
        if (years > 0) return `${years} ans`;
        const months = differenceInMonths(date, birthDate);
        if (months > 0) return `${months} mois`;
        const days = differenceInDays(date, birthDate);
        return `${days} jours`;
    };

    let lastYear = null;

    return (
        <div className="max-w-3xl mx-auto py-8 relative">
            <div className="absolute left-[6.5rem] top-8 bottom-8 w-0.5 bg-gray-300 -translate-x-1/2"></div>

            {sortedEvents.map((event, index) => {
                const currentYear = event.dateObj.getFullYear();
                const showYear = currentYear !== lastYear;
                lastYear = currentYear;

                return (
                    <EventCard
                        key={index}
                        event={event}
                        isPersonal={event.isPersonal}
                        ageLabel={getAgeLabel(event.dateObj)}
                        showYear={showYear}
                    />
                );
            })}
        </div>
    );
};

export default Timeline;
