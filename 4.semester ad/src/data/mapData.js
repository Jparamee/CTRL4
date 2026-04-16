export const mapFloors = [
  { id: 'floor1', title: 'Floor 1', user_loc: {x: 70, y: 50}, rooms: [
    { id: 'hall_a', label: 'Hall A', x: 20, y: 20, w: 100, h: 60, shapeClass: 'hallway-main', busy: 'med', trigger_warnings: ['Loud noises (from machinery)'], population: 15, doors: [{id: 'd1_hA_in', x: 20, y: 35, w: 2, h: 30}] },
    { id: 'hall_b', label: 'Hall B', x: 20, y: 120, w: 100, h: 60, shapeClass: 'hallway-alt', busy: 'low', trigger_warnings: [], population: 4, doors: [{id: 'd1_hB_out', x: 118, y: 135, w: 2, h: 30}] },
    { id: 'gallery_main', label: 'Main Gallery', x: 140, y: 20, w: 160, h: 160, shapeClass: 'room-main-shape', busy: 'high', trigger_warnings: ['Flashing light (exhibition display)', 'Strong smells (industrial exhibit)'], population: 35, doors: [{id: 'd1_mg_in', x: 140, y: 80, w: 2, h: 40}] }
  ]},
  { id: 'floor2', title: 'Floor 2', rooms: [
    { id: 'theatre_1', label: 'Theatre 1', x: 20, y: 20, w: 140, h: 160, shapeClass: 'room-theatre', busy: 'high', trigger_warnings: ['Flashing lights (performance)', 'Loud music'], population: 120, doors: [{id: 'd2_t1_main', x: 158, y: 80, w: 2, h: 40}] },
    { id: 'cafe', label: 'Cafe', x: 180, y: 20, w: 120, h: 80, shapeClass: 'room-main-shape', busy: 'low', trigger_warnings: [], population: 5, doors: [{id: 'd2_cafe_side', x: 240, y: 98, w: 30, h: 2}] },
    { id: 'exhibition_b', label: 'Hall B (Upstairs)', x: 180, y: 120, w: 120, h: 60, shapeClass: 'hallway-alt', busy: 'med', trigger_warnings: [], population: 10, doors: [{id: 'd2_hb_up', x: 180, y: 135, w: 2, h: 30}] }
  ]},
  { id: 'floor3', title: 'Floor 3', rooms: [
    { id: 'rooftop', label: 'Rooftop Garden', x: 20, y: 20, w: 280, h: 100, shapeClass: 'room-main-shape', busy: 'low', trigger_warnings: ['Open air (heights)', 'Sunlight exposure'], population: 8, doors: [{id: 'd3_roof', x: 140, y: 118, w: 40, h: 2}] },
    { id: 'lounge', label: 'VIP Lounge', x: 60, y: 140, w: 200, h: 40, shapeClass: 'room-alt', busy: 'med', trigger_warnings: [], population: 12, doors: [{id: 'd3_lounge', x: 140, y: 138, w: 40, h: 2}] }
  ]}
];export const mapFloors = [
  { id: 'floor1', title: 'Floor 1', user_loc: {x: 70, y: 50}, rooms: [
    { id: 'hall_a', label: 'Hall A', x: 20, y: 20, w: 100, h: 60, shapeClass: 'hallway-main', busy: 'med', trigger_warnings: ['Loud noises (from machinery)'], population: 15, doors: [{id: 'd1_hA_in', x: 20, y: 35, w: 2, h: 30}] },
    { id: 'hall_b', label: 'Hall B', x: 20, y: 120, w: 100, h: 60, shapeClass: 'hallway-alt', busy: 'low', trigger_warnings: [], population: 4, doors: [{id: 'd1_hB_out', x: 118, y: 135, w: 2, h: 30}] },
    { id: 'gallery_main', label: 'Main Gallery', x: 140, y: 20, w: 160, h: 160, shapeClass: 'room-main-shape', busy: 'high', trigger_warnings: ['Flashing light (exhibition display)', 'Strong smells (industrial exhibit)'], population: 35, doors: [{id: 'd1_mg_in', x: 140, y: 80, w: 2, h: 40}] }
  ]},
  { id: 'floor2', title: 'Floor 2', rooms: [
    { id: 'theatre_1', label: 'Theatre 1', x: 20, y: 20, w: 140, h: 160, shapeClass: 'room-theatre', busy: 'high', trigger_warnings: ['Flashing lights (performance)', 'Loud music'], population: 120, doors: [{id: 'd2_t1_main', x: 158, y: 80, w: 2, h: 40}] },
    { id: 'cafe', label: 'Cafe', x: 180, y: 20, w: 120, h: 80, shapeClass: 'room-main-shape', busy: 'low', trigger_warnings: [], population: 5, doors: [{id: 'd2_cafe_side', x: 240, y: 98, w: 30, h: 2}] },
    { id: 'exhibition_b', label: 'Hall B (Upstairs)', x: 180, y: 120, w: 120, h: 60, shapeClass: 'hallway-alt', busy: 'med', trigger_warnings: [], population: 10, doors: [{id: 'd2_hb_up', x: 180, y: 135, w: 2, h: 30}] }
  ]},
  { id: 'floor3', title: 'Floor 3', rooms: [
    { id: 'rooftop', label: 'Rooftop Garden', x: 20, y: 20, w: 280, h: 100, shapeClass: 'room-main-shape', busy: 'low', trigger_warnings: ['Open air (heights)', 'Sunlight exposure'], population: 8, doors: [{id: 'd3_roof', x: 140, y: 118, w: 40, h: 2}] },
    { id: 'lounge', label: 'VIP Lounge', x: 60, y: 140, w: 200, h: 40, shapeClass: 'room-alt', busy: 'med', trigger_warnings: [], population: 12, doors: [{id: 'd3_lounge', x: 140, y: 138, w: 40, h: 2}] }
  ]}
];