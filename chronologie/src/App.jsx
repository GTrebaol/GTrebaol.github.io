import React, { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import Map from './components/Map';
import { loadDataFromJSON } from './utils/dataLoader';
import events from './data/externalEvents';
import familyData from '../output.json';
import placesData from './data/places.json';

function App() {
  const [personalEvents, setPersonalEvents] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [selectedIndiId, setSelectedIndiId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data on mount
    const loadedIndis = loadDataFromJSON(familyData);
    // Sort individuals by birth date (oldest first)
    const sortedIndis = loadedIndis.sort((a, b) => {
      const dateA = getBirthDate(a);
      const dateB = getBirthDate(b);
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateA - dateB;
    });

    setIndividuals(sortedIndis);
    setLoading(false);

    // Default to the first one (oldest)
    if (sortedIndis.length > 0) {
      selectIndividual(sortedIndis[0].id, sortedIndis);
    }
  }, []);

  const getBirthDate = (ind) => {
    const birt = ind.events.find(e => e.type === 'Epers_Birth');
    if (birt && birt.dateObj) {
      return birt.dateObj;
    }
    return null;
  };

  const selectIndividual = (id, list = individuals) => {
    const ind = list.find(i => i.id === id);
    if (ind) {
      setSelectedIndiId(id);

      let allEvents = [];

      // 1. Personal Events
      allEvents.push(...ind.events.map(ev => {
        let newType = ev.type;
        if (ev.type === 'Epers_Birth') newType = 'BIRT';
        if (ev.type === 'Epers_Death') newType = 'DEAT';

        return {
          ...ev,
          type: newType,
          // dateObj is already parsed by dataLoader
          isPersonal: true
        };
      }));

      // 2. Marriage Events
      if (ind.familyEvents) {
        ind.familyEvents.forEach(ev => {
          // Determine spouse name
          const spouse = ev.family.husband.id === ind.id ? ev.family.wife : ev.family.husband;
          allEvents.push({
            ...ev,
            type: 'MARR',
            // dateObj is already parsed by dataLoader
            isPersonal: true,
            name: `Mariage avec ${spouse.firstName} ${spouse.lastName}`
          });
        });
      }

      // 3. Children's Births
      if (ind.children) {
        ind.children.forEach(child => {
          const birth = child.events.find(e => e.type === 'Epers_Birth');
          if (birth && birth.dateObj) {
            const genderLabel = child.sex === 'f' ? 'sa fille' : 'son fils';
            allEvents.push({
              type: 'BIRT_CHILD',
              date: birth.date,
              dateObj: birth.dateObj,
              place: birth.place,
              name: `Naissance de ${genderLabel} ${child.firstName} ${child.lastName}`,
              isPersonal: true
            });
          }

          // 3b. Grandchildren's Births
          if (child.children) {
            child.children.forEach(grandchild => {
              const gcBirth = grandchild.events.find(e => e.type === 'Epers_Birth');
              if (gcBirth && gcBirth.dateObj) {
                const gcGenderLabel = grandchild.sex === 'f' ? 'sa petite-fille' : 'son petit-fils';
                allEvents.push({
                  type: 'BIRT_GRANDCHILD',
                  date: gcBirth.date,
                  dateObj: gcBirth.dateObj,
                  place: gcBirth.place,
                  name: `Naissance de ${gcGenderLabel} ${grandchild.firstName} ${grandchild.lastName}`,
                  isPersonal: true
                });
              }

              // 3c. Great-Grandchildren's Births
              if (grandchild.children) {
                grandchild.children.forEach(greatGrandchild => {
                  const ggcBirth = greatGrandchild.events.find(e => e.type === 'Epers_Birth');
                  if (ggcBirth && ggcBirth.dateObj) {
                    const ggcGenderLabel = greatGrandchild.sex === 'f' ? 'son arrière-petite-fille' : 'son arrière-petit-fils';
                    allEvents.push({
                      type: 'BIRT_GREAT_GRANDCHILD',
                      date: ggcBirth.date,
                      dateObj: ggcBirth.dateObj,
                      place: ggcBirth.place,
                      name: `Naissance de ${ggcGenderLabel} ${greatGrandchild.firstName} ${greatGrandchild.lastName}`,
                      isPersonal: true
                    });
                  }
                });
              }
            });
          }
        });
      }

      // 3c. Siblings' Births
      const siblings = new Set();
      const addSibling = (parent) => {
        if (parent && parent.children) {
          parent.children.forEach(child => {
            if (child.id !== ind.id) {
              siblings.add(child);
            }
          });
        }
      };
      addSibling(ind.father);
      addSibling(ind.mother);

      siblings.forEach(sibling => {
        const birth = sibling.events.find(e => e.type === 'Epers_Birth');
        if (birth && birth.dateObj) {
          const genderLabel = sibling.sex === 'f' ? 'sa soeur' : 'son frère';
          allEvents.push({
            type: 'BIRT_SIBLING',
            date: birth.date,
            dateObj: birth.dateObj,
            place: birth.place,
            name: `Naissance de ${genderLabel} ${sibling.firstName} ${sibling.lastName}`,
            isPersonal: true
          });
        }
      });

      // 4. Parents' Events (Death)
      const myBirth = ind.events.find(e => e.type === 'Epers_Birth');
      const myDeath = ind.events.find(e => e.type === 'Epers_Death');
      const myBirthDate = myBirth ? myBirth.dateObj : null;
      const myDeathDate = myDeath ? myDeath.dateObj : new Date(); // Assume alive if no death date

      const addParentEvent = (parent, label) => {
        if (!parent) return;
        const death = parent.events.find(e => e.type === 'Epers_Death');
        if (death && death.dateObj) {
          const deathDate = death.dateObj;
          if (deathDate && myBirthDate && deathDate > myBirthDate && deathDate <= myDeathDate) {
            allEvents.push({
              type: 'DEAT_PARENT',
              date: death.date,
              dateObj: deathDate,
              name: `Décès de ${label} (${parent.firstName} ${parent.lastName})`,
              isPersonal: true
            });
          }
        }
      };

      addParentEvent(ind.father, 'son père');
      addParentEvent(ind.mother, 'sa mère');

      // 5. Grandparents' Deaths
      const addGrandparentEvent = (grandparent, label) => {
        if (!grandparent) return;
        const death = grandparent.events.find(e => e.type === 'Epers_Death');
        if (death && death.dateObj) {
          const deathDate = death.dateObj;
          // A voir si on garde la mort des grands parents?
          // Actuellement affiché que si morts pendant la vie de l'individu
          if (deathDate && myBirthDate && deathDate > myBirthDate && deathDate <= myDeathDate) {
            allEvents.push({
              type: 'DEAT_GRANDPARENT',
              date: death.date,
              dateObj: deathDate,
              name: `Décès de ${label} (${grandparent.firstName} ${grandparent.lastName})`,
              isPersonal: true
            });
          }
        }
      };

      if (ind.father) {
        addGrandparentEvent(ind.father.father, 'son grand-père paternel');
        addGrandparentEvent(ind.father.mother, 'sa grand-mère paternelle');
      }
      if (ind.mother) {
        addGrandparentEvent(ind.mother.father, 'son grand-père maternel');
        addGrandparentEvent(ind.mother.mother, 'sa grand-mère maternelle');
      }

      // Ajout des coordonnées
      const eventsWithCoords = allEvents.map(ev => {
        if (ev.place && placesData[ev.place] && placesData[ev.place].lat) {
          return {
            ...ev,
            lat: placesData[ev.place].lat,
            lon: placesData[ev.place].lon
          };
        }
        return ev;
      });

      setPersonalEvents(eventsWithCoords);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-900">Chronologie</h1>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {individuals.length > 0 ? (
              <select
                value={selectedIndiId}
                onChange={(e) => selectIndividual(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[300px]"
              >
                {individuals.map(ind => (
                  <option key={ind.id} value={ind.id}>
                    {ind.firstName} {ind.lastName}
                    {getBirthDate(ind) ? ` (${getBirthDate(ind).getFullYear()})` : ''}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm text-gray-500">Chargement...</div>
            )}
          </div>
        </div>
      </header>

      <main className="py-8">
        {personalEvents.length > 0 && (
          <>
            <div className="max-w-3xl mx-auto mb-8 px-4">
              <Map events={personalEvents} />
            </div>
            <Timeline
              personalEvents={personalEvents}
              externalEvents={events}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
