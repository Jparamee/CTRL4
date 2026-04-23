export const museums = {
  "natural-history": {
    name: "Natural History Museum",
    lat: 56.167447558753864,
    lng: 10.203131162426935,
    floors: [
      {
        id: 'floor3', title: 'Level 3 - Imagine This',
        rooms: [
          {
            id: 'vr_imagine', label: 'Imagine This (VR)',
            beaconId: 'AudioVerse-Room-VR',
            description: {
              en: 'Step into a fully immersive VR-experience exploring the wild worlds of nature. Put on a headset and get close to everything to the depths of the ocean to prehistorisk giants.',
              da: 'Træd ind i en fuldt fordybende VR-oplevelse, hvor du kan udforske naturens vilde verdener. Tag headsettet på og kom helt tæt på alt, fra havets dyb til forhistoriske kæmper.',
              de: 'Tauchen Sie ein in ein vollständig immersives VR-Erlebnis, in dem Sie die wilden Welten der Natur erkunden. Setzen Sie das Headset auf und kommen Sie allem ganz nah, von den Tiefen des Ozeans bis zu prähistorischen Giganten.'
            },
            x: 20, y: 20, w: 280, h: 160, shapeClass: 'room-main-shape',
            busy: 'med', trigger_warnings: ['Flashing lights (VR)', 'Motion sickness'],
            population: 24, doors: [{id: 'd3_main', x: 150, y: 179, w: 20, h: 2}],
            themeAudio: 'quiet piano w trippy birds.mp3'
          }
        ]
      },
      {
        id: 'floor2', title: 'Level 2 - Future Human',
        rooms: [
          {
            id: 'future_human', label: 'Future Human Exhibit',
            beaconId: 'AudioVerse-Room-FH',
            description: {
              en: 'What will humans look like in 200 years? This exhibition explores the ethics and science of genetic engineering, bionic implants, and possible human enhancement.',
              da: 'Hvordan vil mennesker se ud om 200 år? Denne udstilling udforsker etikken og videnskaben bag genmanipulation, bioniske implantater og mulige menneskelig forbedring.',
              de: 'Wie werden Menschen in 200 Jahren aussehen? Diese Ausstellung beleuchtet Ethik und Wissenschaft der Gentechnik, bionischer Implantate und mögliche menschlicher verbesserung.'
            },
            x: 20, y: 20, w: 280, h: 160, shapeClass: 'room-main-shape',
            busy: 'high', trigger_warnings: ['Body modification themes', 'Bright screens'],
            population: 45, doors: [{id: 'd2_main', x: 150, y: 179, w: 20, h: 2}],
            themeAudio: 'air rush pipes slightly cheesy.mp3'
          }
        ]
      },
      {
        id: 'floor1', title: 'Level 1 - Classic Natural History',
        rooms: [
          {
            id: 'classic_nh', label: 'Classic Natural History',
            beaconId: 'AudioVerse-Room-NH',
            description: {
              en: 'Our original collection spans 300 years of natural history. Explore fossils, mounted specimens, and geological formations from across the globe.',
              da: 'Vores originale samling strækker sig over 300 års naturhistorie. Udforsk fossiler, præparerede eksemplarer og geologiske formationer fra hele verden.',
              de: 'Unsere ursprüngliche Sammlung umspannt 300 Jahre Naturgeschichte. Entdecken Sie Fossilien, präparierte Exemplare und geologische Formationen aus aller Welt.'
            },
            x: 20, y: 20, w: 280, h: 160, shapeClass: 'room-main-shape',
            busy: 'med', trigger_warnings: ['Animal skeletons/remains'],
            population: 32, doors: [{id: 'd1_main', x: 150, y: 179, w: 20, h: 2}],
            themeAudio: 'tomomi_kato peaceful piano.mp3'
          }
        ]
      },
      {
        id: 'floor0', title: 'Level 0 - Entrance & Cafe',
        rooms: [
          {
            id: 'entrance_shop', label: 'Main Entrance & Shop',
            beaconId: 'AudioVerse-Room-ENT',
            description: {
              en: 'Welcome to the Natural History Museum. Pick up your floor plan here and browse our gift shop featuring books, prints, and nature-inspired gifts.',
              da: 'Velkommen til Naturhistorisk Museum. Hent din etageplan her og se vores gavebutik med bøger, tryk og naturen-inspirerede gaver.',
              de: 'Willkommen im Naturkundemuseum. Holen Sie sich hier Ihren Lageplan und stöbern Sie in unserem Museumsshop mit Büchern, Drucken und naturinspirierten Geschenken.'
            },
            x: 20, y: 20, w: 130, h: 160, shapeClass: 'room-main-shape',
            busy: 'low', trigger_warnings: [], population: 12,
            doors: [{id: 'd0_in', x: 70, y: 179, w: 30, h: 2}, {id: 'd0_cafe', x: 149, y: 50, w: 2, h: 20}, {id: 'd0_mind', x: 149, y: 130, w: 2, h: 20}],
            themeAudio: 'softpop muzak.mp3'
          },
          {
            id: 'cafe', label: 'Cafe',
            beaconId: 'AudioVerse-Room-CAFE',
            description: {
              en: 'Refuel with organic coffee, fresh sandwiches, and seasonal specials. All ingredients are locally sourced where possible.',
              da: 'Tank op med økologisk kaffe, friske sandwich og sæsonens specialiteter. Alle ingredienser er lokalt indkøbt, hvor det er muligt.',
              de: 'Stärken Sie sich mit Bio-Kaffee, frischen Sandwiches und saisonalen Spezialitäten. Alle Zutaten stammen, wo möglich, aus der Region.'
            },
            x: 150, y: 20, w: 150, h: 75, shapeClass: 'room-alt',
            busy: 'low', trigger_warnings: [], population: 18,
            doors: [{id: 'd0_cafe_in', x: 149, y: 50, w: 2, h: 20}],
            themeAudio: 'softpop muzak.mp3'
          },
          {
            id: 'mind_lab', label: 'Mind Lab Auditorium',
            beaconId: 'AudioVerse-Room-ML',
            description: {
              en: 'A 70-seat auditorium hosting live science demonstrations, documentary screenings, and family workshops throughout the day. Check the schedule at the entrance.',
              da: 'Et auditorium med 70 pladser med live videnskabsdemonstrationer, dokumentarvisninger og familieworkshops hele dagen. Tjek programmet ved indgangen.',
              de: 'Ein 70-sitziges Auditorium mit Live-Vorführungen aus der Wissenschaft, Dokumentarfilmvorführungen und Familien-Workshops den ganzen Tag. Das Programm finden Sie am Eingang.'
            },
            x: 150, y: 105, w: 150, h: 75, shapeClass: 'room-theatre',
            busy: 'med', trigger_warnings: ['Dark room', 'Loud audio presentations'],
            population: 28, doors: [{id: 'd0_mind_in', x: 149, y: 130, w: 2, h: 20}]
          }
        ]
      },
      {
        id: 'floor_minus1', title: 'Level -1 - Basement & Garden',
        rooms: [
          {
            id: 'africa_savannah', label: 'African Savannah',
            beaconId: 'AudioVerse-Room-A',
            description: {
              en: 'Walk through a life-size recreation of the African savannah, complete with taxidermy wildlife, ambient soundscapes, and interactive habitat information panels.',
              da: 'Gå gennem en livsstørrelse-genskabelse af den afrikanske savanne med naturpræparater, omgivende lydscapes og interaktive informationstavler om levesteder.',
              de: 'Durchwandern Sie eine begehbare, lebensgroße Nachbildung der afrikanischen Savanne mit Tierpräparaten, atmosphärischen Klanglandschaften und interaktiven Infotafeln über Lebensräume.'
            },
            x: 20, y: 20, w: 130, h: 75, shapeClass: 'room-main-shape',
            busy: 'med', trigger_warnings: ['Animal sounds', 'Low lighting'],
            population: 35, doors: [{id: 'dm1_as', x: 149, y: 40, w: 2, h: 20}],
            themeAudio: 'central african theme.mp3'
          },
          {
            id: 'our_nature', label: 'Our Nature',
            beaconId: 'AudioVerse-Room-B',
            description: {
              en: 'A hands-on exhibition celebrating Danish nature - From coastal dunes to ancient forests. Touch real specimens, listen to local birdsong, and explore seasonal ecosystems.',
              da: 'En hands-on udstilling, der fejrer den danske natur - Fra kystklitter til urskov. Rør ved ægte eksemplarer, lyt til lokal fuglesang og udforsk sæsonbestemte økosystemer.',
              de: 'Eine interaktive Ausstellung, die die dänische Natur feiert - Von Küstendünen bis Urwäldern. Berühren Sie echte Exemplare, hören Sie einheimische Vogelstimmen und erkunden Sie saisonale Ökosysteme.'
            },
            x: 20, y: 105, w: 130, h: 75, shapeClass: 'room-alt',
            busy: 'high', trigger_warnings: [],
            population: 42, doors: [{id: 'dm1_on', x: 149, y: 120, w: 2, h: 20}],
            themeAudio: 'tiny xylophone w echoes.mp3'
          },
          {
            id: 'lunch_play', label: 'Lunch & Play Room',
            beaconId: 'AudioVerse-Room-LP',
            description: {
              en: 'A family-friendly space where children can play with nature-themed building-sets and puzzles while adults relax with a packed lunch.',
              da: 'Et familievenligt rum, hvor børn kan lege med naturinspirerede byggesæt og puslespil, mens voksne slapper af med en madpakke.',
              de: 'Ein familienfreundlicher Raum, in dem Kinder mit naturbezogenen Bausätzen und Puzzles spielen können, während Erwachsene sich mit einem mitgebrachte Mahlzeit entspannen.'
            },
            x: 170, y: 20, w: 130, h: 105, shapeClass: 'room-main-shape',
            busy: 'high', trigger_warnings: ['Noisy (children playing)', 'Food smells'],
            population: 50,
            doors: [{id: 'dm1_lp', x: 169, y: 40, w: 2, h: 20}, {id: 'dm1_garden', x: 220, y: 19, w: 30, h: 2}]
          },
          {
            id: 'wardrobe_wc', label: 'Wardrobes & Toilets',
            beaconId: 'AudioVerse-Room-WC',
            description: {
              en: 'Cloakroom storage, accessible toilets, and baby-changing facilities.',
              da: 'Garderobeopbevaring, handicaptoiletter og puslepladser.',
              de: 'Garderobenbereich, barrierefreie Toiletten und Wickelmöglichkeiten.'
            },
            x: 170, y: 135, w: 130, h: 45, shapeClass: 'room-alt',
            busy: 'low', trigger_warnings: [],
            population: 8, doors: [{id: 'dm1_wc', x: 169, y: 145, w: 2, h: 20}]
          }
        ]
      }
    ]
  },

  'aros': {
    name: "ARoS Art Museum",
    lat: 56.15388172532231,
    lng: 10.19962702386314,
    floors: [
      {
        id: "aros-level-10", title: "Level 10 - Roof",
        rooms: [
          {
            id: 'rainbow', label: 'Your rainbow panorama',
            beaconId: 'AudioVerse-ARoS-10',
            description: {
              en: 'Olafur Eliasson\'s iconic circular walkway wraps the entire rooftop in a spectrum of coloured glass, transforming the city of Aarhus into a living painting 360° around you.',
              da: 'Olafur Eliassons ikoniske cirkulære gangbro indhyller hele taget i et spektrum af farvet glas og forvandler Aarhus til et levende maleri 360° rundt om dig.',
              de: 'Olafur Eliassons ikonischer Rundgang umschließt das gesamte Dach mit einem Spektrum farbigen Glases und verwandelt die Stadt Aarhus in ein lebendiges Gemälde 360° um Sie herum.'
            },
            x: 20, y: 60, w: 280, h: 80,
            busy: 'high', population: 85,
            themeAudio: 'softpop muzak.mp3',
            trigger_warnings: ['Bright colors', 'Heights', 'Disorientation'],
            doors: [{id: 'd1', x: 150, y: 140, w: 20, h: 4}]
          }
        ]
      },
      {
        id: "aros-level-1", title: "Level 1 - Main Building",
        rooms: [
          {
            id: 'foyer', label: 'Main Foyer',
            beaconId: 'AudioVerse-ARoS-F',
            description: {
              en: 'The ARoS entrance soars nine stories through the building\'s core. Collect your tickets, audio guides, and floor plans here before ascending through the collection.',
              da: 'ARoS\' indgang strækker sig ni etager gennem bygningens kerne. Hent dine billetter, lydguider og etageplan her, inden du stiger op gennem samlingen.',
              de: 'Der ARoS-Eingang erstreckt sich über neun Stockwerke durch das Herz des Gebäudes. Hier erhalten Sie Ihre Tickets, Audioguides und Lagepläne, bevor Sie durch die Ausstellungen nach oben gehen.'
            },
            x: 80, y: 20, w: 160, h: 60,
            busy: 'med', population: 42,
            themeAudio: 'tomomi_kato peaceful piano.mp3',
            doors: [{id: 'd1', x: 150, y: 80, w: 20, h: 4}]
          },
          {
            id: 'boy', label: 'Installation: Boy',
            beaconId: 'AudioVerse-ARoS-B',
            description: {
              en: 'Ron Mueck\'s hyperrealistic sculpture of a crouching boy stands nearly five metres tall. The deliberate tension between childlike subject and monumental scale is deeply unsettling and unforgettable.',
              da: 'Ron Muecks hyperrealistiske skulptur af en krøbet dreng er næsten fem meter høj. Den bevidste spænding mellem det barnlige emne og monumentale skala er dybt foruroligende og uforglemmelig.',
              de: 'Ron Muecks hyperrealistische Skulptur eines kauernden Jungen steht fast fünf Meter hoch. Die bewusste Spannung zwischen kindlichem Motiv und monumentalem Maßstab ist zutiefst beunruhigend und unvergesslich.'
            },
            x: 80, y: 84, w: 160, h: 96,
            busy: 'high', population: 65,
            themeAudio: 'softpop muzak.mp3',
            trigger_warnings: ['Large scale sculpture', 'Echoing acoustics']
          }
        ]
      },
      {
        id: "aros-level-sub", title: "Level -1 - The Underground",
        rooms: [
          {
            id: 'gallery12', label: 'Gallery 1+2',
            beaconId: 'AudioVerse-ARoS-G',
            description: {
              en: 'These two interconnected galleries house rotating exhibitions from ARoS\'s permanent collection, spanning Danish Golden Age paintings to post-war international modernism.',
              da: 'Disse to forbundne gallerier huser skiftende udstillinger fra ARoS\' permanente samling, der spænder fra dansk guldaldermaleri til efterkrigsinternational modernisme.',
              de: 'Diese beiden miteinander verbundenen Galerien zeigen wechselnde Ausstellungen aus der Dauersammlung von ARoS – von Gemälden des dänischen Goldenen Zeitalters bis zur internationalen Nachkriegsmoderne.'
            },
            x: 130, y: 10, w: 60, h: 90,
            busy: 'low', population: 15,
            themeAudio: 'tomomi_kato peaceful piano.mp3',
            doors: [{id: 'd1', x: 150, y: 100, w: 20, h: 4}]
          },
          {
            id: 'dome', label: 'The Dome',
            beaconId: 'AudioVerse-ARoS-D',
            description: {
              en: 'Descended beneath street level, the Dome is a circular chamber of total darkness. James Turrell\'s light works transform the space — your eyes adjust slowly, revealing forms that seem to breathe.',
              da: 'Under gadeniveau er Kuppelen et cirkulært kammer i totalt mørke. James Turrells lysværker forvandler rummet — dine øjne vænner sig langsomt til det og afslører former, der synes at ånde.',
              de: 'Unterhalb des Straßenniveaus liegt die Kuppel, eine kreisförmige Kammer in völliger Dunkelheit. James Turrells Lichtwerke verwandeln den Raum — Ihre Augen passen sich langsam an und enthüllen Formen, die zu atmen scheinen.'
            },
            x: 90, y: 104, w: 140, h: 86,
            busy: 'low', population: 8,
            themeAudio: 'softpop muzak.mp3',
            trigger_warnings: ['Dark environment', 'Sensory deprivation', 'Spatial distortion']
          }
        ]
      }
    ]
  },

  'nygaard': {
    name: 'Nygaard Bygning',
    lat: 56.17163612448158,
    lng: 10.190204863098735,
    floors: [
      {
        id: 'nygaard-floor-3',
        title: 'Etage 3 — Alexandra & Datalogi',
        viewBox: '0 0 460 490',
        outline: 'M 72,10 H 450 V 480 H 10 V 70 H 72 Z',
        rooms: [
          {
            id: 'n3-alexandra', label: 'Alexandra Instituttet', beaconId: 'AudioVerse-N3-ALEX',
            description: { en: 'Alexandra Institute research labs and offices.' },
            x: 150, y: 70, w: 200, h: 100, busy: 'med', population: 25, 
            doors: [{ id: 'd3-1', x: 240, y: 168, w: 20, h: 4 }], 
            themeAudio: 'softpop muzak.mp3'
          },
          {
            id: 'n3-datalogi-left', label: 'Datalogi (Left Wing)', beaconId: 'AudioVerse-N3-DAT1',
            description: { en: 'Computer Science offices and meeting rooms.' },
            x: 10, y: 70, w: 90, h: 410, busy: 'low', population: 15, 
            doors: [{ id: 'd3-2', x: 98, y: 420, w: 4, h: 30 }]
          },
          {
            id: 'n3-datalogi-right', label: 'Datalogi (Right Wing)', beaconId: 'AudioVerse-N3-DAT2',
            description: { en: 'Computer Science research spaces.' },
            x: 350, y: 170, w: 100, h: 310, busy: 'low', population: 18, 
            doors: [{ id: 'd3-3', x: 348, y: 420, w: 4, h: 30 }]
          },
          {
            id: 'n3-bridge', label: 'Connecting Bridge', beaconId: 'AudioVerse-N3-BR',
            description: { en: 'South connecting corridor.' },
            x: 110, y: 400, w: 230, h: 80, busy: 'low', population: 5, 
            doors: [
              { id: 'd3-4', x: 108, y: 420, w: 4, h: 30 },
              { id: 'd3-5', x: 338, y: 420, w: 4, h: 30 }
            ]
          }
        ]
      },
      {
        id: 'nygaard-floor-2',
        title: 'Etage 2 — IMV & Datalogi',
        viewBox: '0 0 460 490',
        outline: 'M 72,10 H 450 V 480 H 10 V 70 H 72 Z',
        rooms: [
          {
            id: 'n2-imv-left', label: 'IMV Offices', beaconId: 'AudioVerse-N2-IMV',
            description: { en: 'Information and Media Studies department.' },
            x: 10, y: 70, w: 90, h: 410, busy: 'med', population: 30, 
            doors: [{ id: 'd2-1', x: 98, y: 110, w: 4, h: 30 }, { id: 'd2-2', x: 98, y: 420, w: 4, h: 30 }], 
            themeAudio: 'tomomi_kato peaceful piano.mp3'
          },
          {
            id: 'n2-imv-bridge', label: 'IMV Bridge', beaconId: 'AudioVerse-N2-IMVB',
            description: { en: 'North connecting corridor.' },
            x: 110, y: 70, w: 230, h: 80, busy: 'low', population: 8, 
            doors: [{ id: 'd2-3', x: 108, y: 110, w: 4, h: 30 }, { id: 'd2-4', x: 338, y: 110, w: 4, h: 30 }]
          },
          {
            id: 'n2-datalogi-right', label: 'Datalogi Offices', beaconId: 'AudioVerse-N2-DAT',
            description: { en: 'Computer Science department.' },
            x: 350, y: 70, w: 100, h: 410, busy: 'med', population: 35, 
            doors: [{ id: 'd2-5', x: 348, y: 110, w: 4, h: 30 }, { id: 'd2-6', x: 348, y: 420, w: 4, h: 30 }], 
            themeAudio: 'air rush pipes slightly cheesy.mp3'
          },
          {
            id: 'n2-datalogi-bridge', label: 'Datalogi Bridge', beaconId: 'AudioVerse-N2-DATB',
            description: { en: 'South connecting corridor.' },
            x: 110, y: 400, w: 230, h: 80, busy: 'low', population: 6, 
            doors: [{ id: 'd2-7', x: 108, y: 420, w: 4, h: 30 }, { id: 'd2-8', x: 338, y: 420, w: 4, h: 30 }]
          }
        ]
      },
      {
        id: 'nygaard-floor-1',
        title: 'Etage 1 — Bibliotek & Balkoner',
        viewBox: '0 0 460 490',
        outline: 'M 72,10 H 450 V 480 H 10 V 70 H 72 Z',
        rooms: [
          {
            id: 'n1-imv-offices', label: 'IMV Kontorer', beaconId: 'AudioVerse-N1-IMV',
            description: { en: 'Information and Media Studies offices.' },
            // Top left red shaded area
            x: 10, y: 70, w: 70, h: 90, shapeClass: 'room-alt', busy: 'low', population: 5, doors: []
          },
          {
            id: 'n1-laesebalkon', label: 'Læsebalkon', beaconId: 'AudioVerse-N1-BALK',
            description: { en: 'Reading balconies overlooking the ground floor.' },
            // Long left vertical box
            x: 10, y: 170, w: 70, h: 300, shapeClass: 'room-main-shape', busy: 'med', population: 22, doors: []
          },
          {
            id: 'n1-bibliotek', label: 'Bibliotek', beaconId: 'AudioVerse-N1-BIB',
            description: { en: 'Main library and quiet study area.' },
            // Center large box over the auditorium
            x: 90, y: 170, w: 200, h: 250, shapeClass: 'room-alt', busy: 'low', population: 12, 
            themeAudio: 'quiet piano w trippy birds.mp3', doors: []
          },
          {
            id: 'n1-kontorlandskab', label: 'Kontorlandskab', beaconId: 'AudioVerse-N1-KONT',
            description: { en: 'Open plan office and administration.' },
            // Top right large box
            x: 270, y: 10, w: 170, h: 140, shapeClass: 'room-main-shape', busy: 'low', population: 18, doors: []
          },
          {
            id: 'n1-seminar-1', label: 'Seminarlokale 1', beaconId: 'AudioVerse-N1-SEM1',
            description: { en: 'Northern seminar room.' },
            // Middle right box (first seminar)
            x: 300, y: 170, w: 140, h: 80, shapeClass: 'room-alt', busy: 'high', population: 25, doors: []
          },
          {
            id: 'n1-trappe-b', label: 'Trappe B / Lounge', beaconId: 'AudioVerse-N1-TRAP',
            description: { en: 'Spiral staircase and lounge area.' },
            // Middle right box with the spiral staircase
            x: 300, y: 260, w: 140, h: 80, shapeClass: 'room-main-shape', busy: 'low', population: 4, doors: []
          },
          {
            id: 'n1-seminar-2', label: 'Seminarlokale 2', beaconId: 'AudioVerse-N1-SEM2',
            description: { en: 'Southern seminar room.' },
            // Bottom right box (second seminar)
            x: 300, y: 350, w: 140, h: 80, shapeClass: 'room-alt', busy: 'med', population: 15, doors: []
          },
          {
            id: 'n1-stille', label: 'Stille Område', beaconId: 'AudioVerse-N1-STIL',
            description: { en: 'Quiet study area.' },
            // Thin bottom right box
            x: 300, y: 440, w: 140, h: 30, shapeClass: 'room-main-shape', busy: 'low', population: 2, doors: []
          }
        ]
      },
{
        id: 'nygaard-floor-0', 
        title: 'Etage 0 — Ground Floor',
        viewBox: '0 0 460 490',
        outline: 'M 72,10 H 450 V 480 H 10 V 70 H 72 Z',
        rooms: [
          {
            id: 'n0-lounge-left', label: 'Læsepladser (Left)',
            description: { en: 'Student reading and lounge area.' },
            x: 10, y: 70, w: 72, h: 400, shapeClass: 'room-alt', busy: 'med', population: 15, 
            // Nudged slightly to x: 80 so it overlaps the wall perfectly
            doors: [{ id: 'd0-1', x: 80, y: 250, w: 4, h: 20 }]
          },
          {
            id: 'n0-auditorium', label: 'Auditorium',
            description: { en: 'Main auditorium seating.' },
            x: 92, y: 130, w: 200, h: 270, shapeClass: 'room-theatre', busy: 'low', population: 0, 
            // FIXED: Top door snapped to y: 128, Bottom door snapped to y: 398, both centered at x: 182
            doors: [{ id: 'd0-2', x: 182, y: 128, w: 20, h: 4 }, { id: 'd0-3', x: 182, y: 398, w: 20, h: 4 }]
          },
          {
            id: 'n0-lounge-right', label: 'Læsepladser (Right)',
            description: { en: 'Student reading area with the spiral staircase.' },
            x: 305, y: 10, w: 145, h: 300, shapeClass: 'room-alt', busy: 'med', population: 20, 
            doors: [{ id: 'd0-4', x: 303, y: 200, w: 4, h: 20 }]
          },
          {
            id: 'n0-seminar', label: 'Seminarlokale',
            description: { en: 'Ground floor seminar room.' },
            x: 305, y: 320, w: 145, h: 70, shapeClass: 'room-main-shape', busy: 'low', population: 0, 
            doors: [{ id: 'd0-5', x: 303, y: 345, w: 4, h: 20 }]
          },
          {
            id: 'n0-vindfang', label: 'Vindfang (Entrance)',
            description: { en: 'Main entrance vestibule. You are here!' },
            x: 305, y: 400, w: 145, h: 80, shapeClass: 'room-alt', busy: 'high', population: 5, 
            doors: [{ id: 'd0-6', x: 303, y: 430, w: 4, h: 20 }]
          }
        ]
      },
      {
        id: 'nygaard-floor-minus1',
        title: 'Etage -1 — Expo Floor',
        viewBox: '0 0 460 490',
        outline: 'M 72,10 H 450 V 480 H 10 V 70 H 72 Z',
        rooms: [
          {
            id: 'nygaard-foyer', label: 'Entrance & Foyer', beaconId: 'AudioVerse-Expo-Entry',
            description: { en: 'Welcome to the AudioVerse expo! Sign in here, collect your badge and programme.' },
            x: 72, y: 10, w: 210, h: 58, cx: 177, cy: 39, fontSize: 10, busy: 'med', population: 20, 
            doors: [{ id: 'foyer-s', x: 152, y: 66, w: 36, h: 4 }], themeAudio: 'softpop muzak.mp3'
          },
          {
            id: 'nygaard-auditorium', label: 'Auditorium', beaconId: 'AudioVerse-Expo-Stage',
            description: { en: 'The main presentation space.' },
            x: 72, y: 80, w: 210, h: 213, cx: 177, cy: 176, fontSize: 12, busy: 'high', population: 80, 
            doors: [{ id: 'aud-n', x: 152, y: 78, w: 36, h: 4 }, { id: 'aud-s', x: 152, y: 291, w: 36, h: 4 }], themeAudio: 'air rush pipes slightly cheesy.mp3'
          },
          {
            id: 'nygaard-stands-left', label: 'Expo Stands', beaconId: 'AudioVerse-Expo-Stands',
            description: { en: 'Interactive project stands run along the left wing.' },
            x: 10, y: 80, w: 50, h: 213, cx: 40, cy: 176, fontSize: 9, busy: 'high', population: 45, 
            doors: [{ id: 'stands-e', x: 58, y: 150, w: 4, h: 30 }], themeAudio: 'tomomi_kato peaceful piano.mp3'
          },
          {
            id: 'nygaard-demo-floor', label: 'Demo Floor', beaconId: 'AudioVerse-Room-A',
            description: { en: 'The main open demo floor — networking, project displays.' },
            x: 10, y: 310, w: 272, h: 168, cx: 144, cy: 409, fontSize: 11, busy: 'high', population: 55, 
            doors: [{ id: 'df-n', x: 150, y: 308, w: 40, h: 4 }, { id: 'df-e', x: 280, y: 390, w: 4, h: 30 }], themeAudio: 'central african theme.mp3'
          },
          {
            id: 'nygaard-booths', label: 'Demo Booths', beaconId: 'AudioVerse-Expo-Booths',
            description: { en: 'Individual project demo stations in the right wing.' },
            x: 305, y: 10, w: 143, h: 260, cx: 381, cy: 140, fontSize: 9, busy: 'med', population: 30, 
            doors: [{ id: 'booths-w', x: 303, y: 110, w: 4, h: 30 }], themeAudio: 'tiny xylophone w echoes.mp3'
          },
          {
            id: 'nygaard-mediecelle-a', label: 'Media Room A', beaconId: 'AudioVerse-Expo-MediaA',
            description: { en: 'A dedicated AV demo room.' },
            shape: 'polygon', points: '321,313 449,305 449,361 321,369', cx: 385, cy: 337, iconX: 433, iconY: 319, fontSize: 9, busy: 'med', population: 12, themeAudio: 'quiet piano w trippy birds.mp3'
          },
          {
            id: 'nygaard-mediecelle-b', label: 'AudioVerse Demo', beaconId: 'AudioVerse-Room-A',
            description: { en: 'The AudioVerse live demo room.' },
            shape: 'polygon', points: '321,377 449,369 449,415 321,423', cx: 385, cy: 396, iconX: 433, iconY: 382, fontSize: 9, busy: 'high', population: 8, themeAudio: 'central african theme.mp3'
          },
          {
            id: 'nygaard-mediecelle-c', label: 'Beacon Zone B', beaconId: 'AudioVerse-Room-B',
            description: { en: 'The second beacon zone.' },
            shape: 'polygon', points: '321,431 449,423 449,469 321,477', cx: 385, cy: 450, iconX: 433, iconY: 436, fontSize: 9, busy: 'med', population: 8, themeAudio: 'tiny xylophone w echoes.mp3'
          }
        ]
      }
    ]
  }
}