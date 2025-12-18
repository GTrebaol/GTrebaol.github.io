import React from 'react';
import { MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import iconLove from '../assets/love.png';
import iconCake from '../assets/cake.png';
import iconTombstone from '../assets/tombstone.png';
import iconCalendar from '../assets/calendar.png';

const EventCard = ({ event, isPersonal, ageLabel, showYear }) => {
    const isBirth = ['BIRT', 'BIRT_CHILD', 'BIRT_GRANDCHILD', 'BIRT_GREAT_GRANDCHILD', 'BIRT_SIBLING'].includes(event.type);
    const isDeath = ['DEAT', 'DEAT_PARENT', 'DEAT_GRANDPARENT'].includes(event.type);
    const isMarriage = event.type === 'MARR';

    const formatDate = (dateObj) => {
        if (!dateObj) return '';
        return format(dateObj, 'd MMM yyyy', { locale: fr });
    };

    const displayDate = event.dateObj ? formatDate(event.dateObj) : event.date;

    const getIcon = () => {
        if (isBirth) return iconCake;
        if (isDeath) return iconTombstone;
        if (isMarriage) return iconLove;
        return iconCalendar;
    };

    return (
        <div className="relative flex items-start mb-8 group">
            <div className="w-24 text-right pr-4 pt-1 flex flex-col items-end">
                {showYear && <span className="text-xl font-bold text-gray-900">{event.dateObj?.getFullYear()}</span>}
                {showYear && event.dateObj && (
                    <span className="text-xs text-gray-600">{format(event.dateObj, 'd MMMM', { locale: fr })}</span>
                )}
                <span className="text-sm text-gray-500 font-medium">{ageLabel}</span>
            </div>

            <div className="absolute left-[6.5rem] top-0 bottom-0 flex flex-col items-center -translate-x-1/2">
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-sm z-10 flex items-center justify-center bg-white overflow-hidden`}>
                    <img src={getIcon()} alt="Event Icon" className="w-full h-full object-cover p-1" />
                </div>
            </div>

            <div className="flex-1 pl-8 pt-0">
                {isPersonal ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
                        <div className="absolute top-4 -left-1.5 w-3 h-3 bg-white border-l border-b border-gray-200 transform rotate-45"></div>

                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {event.type === 'BIRT' && 'Naissance'}
                            {event.type === 'DEAT' && 'Décès'}
                            {event.type === 'MARR' && 'Mariage'}
                            {event.type === 'BIRT_CHILD' && event.name}
                            {event.type === 'BIRT_GRANDCHILD' && event.name}
                            {event.type === 'BIRT_GREAT_GRANDCHILD' && event.name}
                            {event.type === 'BIRT_SIBLING' && event.name}
                            {event.type === 'DEAT_PARENT' && event.name}
                            {event.type === 'DEAT_GRANDPARENT' && event.name}
                            {!['BIRT', 'DEAT', 'MARR', 'BIRT_CHILD', 'BIRT_GRANDCHILD', 'BIRT_GREAT_GRANDCHILD', 'BIRT_SIBLING', 'DEAT_PARENT', 'DEAT_GRANDPARENT'].includes(event.type) && event.type}
                        </h3>

                        {event.name && !['BIRT_CHILD', 'BIRT_GRANDCHILD', 'BIRT_GREAT_GRANDCHILD', 'BIRT_SIBLING', 'DEAT_PARENT', 'DEAT_GRANDPARENT', 'MARR'].includes(event.type) && (
                            <div className="text-md font-medium text-gray-900 underline mb-2">{event.name}</div>
                        )}

                        {event.type === 'MARR' && (
                            <div className="text-md font-medium text-gray-900 underline mb-2">{event.name}</div>
                        )}

                        {event.place && (
                            <div className="flex items-start text-gray-600 text-sm">
                                <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                                <span>{event.place}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="pb-4">
                        <h3 className="text-md font-bold text-gray-900 leading-tight mb-1">
                            {event.title}
                        </h3>
                        <div className="text-sm text-gray-800 font-bold mb-1">
                            {displayDate}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {event.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard;
