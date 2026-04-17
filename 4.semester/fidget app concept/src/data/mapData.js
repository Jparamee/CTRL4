export const museums = {
  "natural-history": {
    name: "Natural History Museum",
    lat: 56.1661, 
    lng: 10.2016,
    floors: [
      { id: 'floor3', title: 'Level 3 - Imagine This', user_loc: null, rooms: [
        { id: 'vr_imagine', label: 'Imagine This (VR)', x: 20, y: 20, w: 280, h: 160, shapeClass: 'room-main-shape', busy: 'med', trigger_warnings: ['Flashing lights (VR)', 'Motion sickness'], population: 24, doors: [{id: 'd3_main', x: 150, y: 179, w: 20, h: 2}], 
          themeAudio: 'quiet piano w trippy birds.mp3' } // Trippy birds for VR!
      ]},
      { id: 'floor2', title: 'Level 2 - Future Human', user_loc: null, rooms: [
        { id: 'future_human', label: 'Future Human Exhibit', x: 20, y: 20, w: 280, h: 160, shapeClass: 'room-main-shape', busy: 'high', trigger_warnings: ['Body modification themes', 'Bright screens'], population: 45, doors: [{id: 'd2_main', x: 150, y: 179, w: 20, h: 2}], 
          themeAudio: 'air rush pipes slightly cheesy.mp3' } // Futuristic/sci-fi pipes
      ]},
      { id: 'floor1', title: 'Level 1 - Classic Natural History', user_loc: null, rooms: [
        { id: 'classic_nh', label: 'Classic Natural History', x: 20, y: 20, w: 280, h: 160, shapeClass: 'room-main-shape', busy: 'med', trigger_warnings: ['Animal skeletons/remains'], population: 32, doors: [{id: 'd1_main', x: 150, y: 179, w: 20, h: 2}], 
          themeAudio: 'tomomi_kato peaceful piano.mp3' } // Peaceful classic museum vibe
      ]},
      { id: 'floor0', title: 'Level 0 - Entrance & Cafe', user_loc: {x: 80, y: 160}, rooms: [
        { id: 'entrance_shop', label: 'Main Entrance & Shop', x: 20, y: 20, w: 130, h: 160, shapeClass: 'room-main-shape', busy: 'low', trigger_warnings: [], population: 12, doors: [{id: 'd0_in', x: 70, y: 179, w: 30, h: 2}, {id: 'd0_cafe', x: 149, y: 50, w: 2, h: 20}, {id: 'd0_mind', x: 149, y: 130, w: 2, h: 20}], 
          themeAudio: 'softpop muzak.mp3' }, // Retail/shop music
        { id: 'cafe', label: 'Cafe', x: 150, y: 20, w: 150, h: 75, shapeClass: 'room-alt', busy: 'low', trigger_warnings: [], population: 18, doors: [{id: 'd0_cafe_in', x: 149, y: 50, w: 2, h: 20}], 
          themeAudio: 'softpop muzak.mp3' },
        { id: 'mind_lab', label: 'Mind Lab Auditorium', x: 150, y: 105, w: 150, h: 75, shapeClass: 'room-theatre', busy: 'med', trigger_warnings: ['Dark room', 'Loud audio presentations'], population: 28, doors: [{id: 'd0_mind_in', x: 149, y: 130, w: 2, h: 20}] }
      ]},
      { id: 'floor_minus1', title: 'Level -1 - Basement & Garden', user_loc: null, rooms: [
        { id: 'africa_savannah', label: 'African Savannah', x: 20, y: 20, w: 130, h: 75, shapeClass: 'room-main-shape', busy: 'med', trigger_warnings: ['Animal sounds', 'Low lighting'], population: 35, doors: [{id: 'dm1_as', x: 149, y: 40, w: 2, h: 20}], 
          themeAudio: 'central african theme.mp3' }, // African Theme
        { id: 'our_nature', label: 'Our Nature', x: 20, y: 105, w: 130, h: 75, shapeClass: 'room-alt', busy: 'high', trigger_warnings: [], population: 42, doors: [{id: 'dm1_on', x: 149, y: 120, w: 2, h: 20}], 
          themeAudio: 'tiny xylophone w echoes.mp3' }, // Nature echoes
        { id: 'lunch_play', label: 'Lunch & Play Room', x: 170, y: 20, w: 130, h: 105, shapeClass: 'room-main-shape', busy: 'high', trigger_warnings: ['Noisy (children playing)', 'Food smells'], population: 50, doors: [{id: 'dm1_lp', x: 169, y: 40, w: 2, h: 20}, {id: 'dm1_garden', x: 220, y: 19, w: 30, h: 2}] },
        { id: 'wardrobe_wc', label: 'Wardrobes & Toilets', x: 170, y: 135, w: 130, h: 45, shapeClass: 'room-alt', busy: 'low', trigger_warnings: [], population: 8, doors: [{id: 'dm1_wc', x: 169, y: 145, w: 2, h: 20}] }
      ]}
    ]
  },
  "aros": {
    name: "ARoS Art Museum",
    lat: 56.1539,
    lng: 10.1996,
    floors: [
      { id: 'aros_f1', title: 'Level 10', user_loc: {x: 160, y: 50}, rooms: [
        { id: 'rainbow', label: 'Your rainbow panorama', x: 20, y: 20, w: 280, h: 60, shapeClass: 'room-main-shape', busy: 'high', trigger_warnings: ['Bright colors', 'Sunlight exposure'], population: 85, doors: [{id: 'r_d1', x: 150, y: 79, w: 20, h: 2}], themeAudio: 'softpop muzak.mp3' },
        { id: 'aros_cafe', label: 'Sunset Cafe', x: 100, y: 100, w: 120, h: 80, shapeClass: 'room-alt', busy: 'med', trigger_warnings: [], population: 20, doors: [{id: 'c_d1', x: 150, y: 99, w: 20, h: 2}] }
      ]}
    ]
  }
}