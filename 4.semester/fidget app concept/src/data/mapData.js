export const museums = {
  "natural-history": {
    name: "Natural History Museum",
    lat: 56.17395785833253,
    lng: 10.125566502640382,
    floors: [
      {
        id: 'floor3', title: 'Level 3 - Imagine This', user_loc: null,
        rooms: [
          {
            id: 'vr_imagine', label: 'Imagine This (VR)',
            beaconId: 'AudioVerse-Room-VR',
            description: {
              en: 'Step into a fully immersive virtual reality experience exploring the origins of the universe. Put on a headset and travel back 13.8 billion years.',
              da: 'Træd ind i en fuldt fordybende VR-oplevelse om universets oprindelse. Sæt headsettet på og rejs 13,8 milliarder år tilbage i tiden.',
              de: 'Tauchen Sie in ein vollständig immersives VR-Erlebnis ein, das die Entstehung des Universums erforscht. Setzen Sie ein Headset auf und reisen Sie 13,8 Milliarden Jahre zurück.'
            },
            x: 20, y: 20, w: 280, h: 160, shapeClass: 'room-main-shape',
            busy: 'med', trigger_warnings: ['Flashing lights (VR)', 'Motion sickness'],
            population: 24, doors: [{id: 'd3_main', x: 150, y: 179, w: 20, h: 2}],
            themeAudio: 'quiet piano w trippy birds.mp3'
          }
        ]
      },
      {
        id: 'floor2', title: 'Level 2 - Future Human', user_loc: null,
        rooms: [
          {
            id: 'future_human', label: 'Future Human Exhibit',
            beaconId: 'AudioVerse-Room-FH',
            description: {
              en: 'What will humans look like in 200 years? This exhibition explores the ethics and science of genetic engineering, bionic implants, and human enhancement.',
              da: 'Hvordan vil mennesker se ud om 200 år? Denne udstilling udforsker etikken og videnskaben bag genmanipulation, bioniske implantater og menneskelig forbedring.',
              de: 'Wie werden Menschen in 200 Jahren aussehen? Diese Ausstellung beleuchtet Ethik und Wissenschaft der Gentechnik, bionischer Implantate und menschlicher Verbesserung.'
            },
            x: 20, y: 20, w: 280, h: 160, shapeClass: 'room-main-shape',
            busy: 'high', trigger_warnings: ['Body modification themes', 'Bright screens'],
            population: 45, doors: [{id: 'd2_main', x: 150, y: 179, w: 20, h: 2}],
            themeAudio: 'air rush pipes slightly cheesy.mp3'
          }
        ]
      },
      {
        id: 'floor1', title: 'Level 1 - Classic Natural History', user_loc: null,
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
        id: 'floor0', title: 'Level 0 - Entrance & Cafe', user_loc: {x: 80, y: 160},
        rooms: [
          {
            id: 'entrance_shop', label: 'Main Entrance & Shop',
            beaconId: 'AudioVerse-Room-ENT',
            description: {
              en: 'Welcome to the Natural History Museum. Pick up your floor plan here and browse our gift shop featuring books, prints, and nature-inspired gifts.',
              da: 'Velkommen til Naturhistorisk Museum. Hent din etageplan her og se vores gavebutik med bøger, tryk og naturen-inspirerede gaver.',
              de: 'Willkommen im Naturkundemuseum. Holen Sie sich hier Ihren Grundriss und stöbern Sie in unserem Museumsshop mit Büchern, Drucken und naturinspirierten Geschenken.'
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
              da: 'Tank op med økologisk kaffe, friske sandwich og sæsonbetonede specialiteter. Alle ingredienser er lokalt indkøbt, hvor det er muligt.',
              de: 'Stärken Sie sich mit Bio-Kaffee, frischen Sandwiches und saisonalen Spezialitäten. Alle Zutaten stammen, wo möglich, aus lokalem Anbau.'
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
              de: 'Ein Auditorium mit 70 Plätzen mit Live-Wissenschaftsvorführungen, Dokumentarfilmvorführungen und Familien-Workshops den ganzen Tag. Programm am Eingang.'
            },
            x: 150, y: 105, w: 150, h: 75, shapeClass: 'room-theatre',
            busy: 'med', trigger_warnings: ['Dark room', 'Loud audio presentations'],
            population: 28, doors: [{id: 'd0_mind_in', x: 149, y: 130, w: 2, h: 20}]
          }
        ]
      },
      {
        id: 'floor_minus1', title: 'Level -1 - Basement & Garden', user_loc: null,
        rooms: [
          {
            id: 'africa_savannah', label: 'African Savannah',
            beaconId: 'AudioVerse-Room-A',    // ← your real beacon
            description: {
              en: 'Walk through a life-size recreation of the African savannah, complete with taxidermy wildlife, ambient soundscapes, and interactive habitat information panels.',
              da: 'Gå gennem en livsstørrelse-genskabelse af den afrikanske savanne med naturpræparater, omgivende lydscapes og interaktive informationstavler om levesteder.',
              de: 'Durchwandern Sie eine lebensgroße Nachbildung der afrikanischen Savanne mit Tierpräparaten, Umgebungsgeräuschen und interaktiven Infotafeln zu Lebensräumen.'
            },
            x: 20, y: 20, w: 130, h: 75, shapeClass: 'room-main-shape',
            busy: 'med', trigger_warnings: ['Animal sounds', 'Low lighting'],
            population: 35, doors: [{id: 'dm1_as', x: 149, y: 40, w: 2, h: 20}],
            themeAudio: 'central african theme.mp3'
          },
          {
            id: 'our_nature', label: 'Our Nature',
            beaconId: 'AudioVerse-Room-B',    // ← your real beacon
            description: {
              en: 'A hands-on exhibition celebrating Danish nature — from coastal dunes to ancient forests. Touch real specimens, listen to local birdsong, and explore seasonal ecosystems.',
              da: 'En hands-on udstilling, der fejrer den danske natur — fra kystklitter til urskov. Rør ved ægte eksemplarer, lyt til lokal fuglesang og udforsk sæsonbestemte økosystemer.',
              de: 'Eine interaktive Ausstellung über die dänische Natur — von Küstendünen bis zu Urwäldern. Berühren Sie echte Exemplare, hören Sie einheimische Vogelstimmen und erkunden Sie saisonale Ökosysteme.'
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
              en: 'A family-friendly space where children can play with nature-themed building sets and puzzles while adults relax with a packed lunch or snack from the vending area.',
              da: 'Et familievenligt rum, hvor børn kan lege med naturinspirerede byggesæt og puslespil, mens voksne slapper af med en madpakke eller en snack fra automaten.',
              de: 'Ein familienfreundlicher Raum, in dem Kinder mit naturthematischen Bausätzen und Puzzles spielen können, während Erwachsene mit einem Lunchpaket oder Snack entspannen.'
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
              en: 'Cloakroom storage, accessible toilets, and baby-changing facilities. Locker hire available at the front desk.',
              da: 'Garderobeopbevaring, handicaptoiletter og puslepladser. Skabsleje tilgængelig ved receptionen.',
              de: 'Garderobenaufbewahrung, barrierefreie Toiletten und Wickelmöglichkeiten. Schließfachmiete an der Rezeption erhältlich.'
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
    lat: 56.175694675257645,
    lng: 10.1364725182567,
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
              de: 'Olafur Eliassons ikonischer kreisförmiger Gehweg umhüllt das gesamte Dach mit einem Spektrum farbiger Glasscheiben und verwandelt die Stadt Aarhus in ein lebendiges Gemälde rund um Sie herum.'
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
              de: 'Der ARoS-Eingang erstreckt sich neun Stockwerke durch den Kern des Gebäudes. Holen Sie hier Ihre Tickets, Audioguides und Grundrisse, bevor Sie durch die Sammlung aufsteigen.'
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
              de: 'Diese zwei miteinander verbundenen Galerien beherbergen wechselnde Ausstellungen aus der Dauersammlung von ARoS, von dänischen Goldenen Zeitalter-Gemälden bis zur internationalen Nachkriegsmoderne.'
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
              de: 'Unterhalb des Straßenniveaus ist die Kuppel eine kreisförmige Kammer in völliger Dunkelheit. James Turrells Lichtwerke verwandeln den Raum — Ihre Augen passen sich langsam an und enthüllen Formen, die zu atmen scheinen.'
            },
            x: 90, y: 104, w: 140, h: 86,
            busy: 'low', population: 8,
            themeAudio: 'softpop muzak.mp3',
            trigger_warnings: ['Dark environment', 'Sensory deprivation', 'Spatial distortion']
          }
        ]
      }
    ]
  }
}