import { parseDateObj } from './dateUtils';

export const loadDataFromJSON = (jsonData) => {
    const { individuals, families } = jsonData;
    const indiMap = new Map();

    individuals.forEach(ind => {
        const eventsWithDates = (ind.events || []).map(ev => ({
            ...ev,
            dateObj: parseDateObj(ev.date)
        }));

        indiMap.set(ind.id, {
            ...ind,
            name: `${ind.firstName} ${ind.lastName}`,
            events: eventsWithDates,
            familyEvents: [],
            children: [],
            spouses: [],
            father: null,
            mother: null
        });
    });

    families.forEach(fam => {
        const husband = indiMap.get(fam.husbandId);
        const wife = indiMap.get(fam.wifeId);

        if (husband && wife) {
            husband.spouses.push(wife);
            wife.spouses.push(husband);

            if (fam.events) {
                fam.events.forEach(ev => {
                    const familyEvent = {
                        ...ev,
                        dateObj: parseDateObj(ev.date),
                        family: { husband, wife }
                    };
                    husband.familyEvents.push(familyEvent);
                    wife.familyEvents.push(familyEvent);
                });
            }

            if (fam.childrenIds) {
                fam.childrenIds.forEach(childId => {
                    const child = indiMap.get(childId);
                    if (child) {
                        child.father = husband;
                        child.mother = wife;
                        husband.children.push(child);
                        wife.children.push(child);
                    }
                });
            }
        }
    });

    return Array.from(indiMap.values());
};
