/**
 * Image asset mapping for R. West & Son
 * All images sourced from discovery/assets/ and copied to public/images/
 */

export const images = {
  // Logos
  logoFull: '/images/logo-full.png',
  logoGlyph: '/images/logo-glyph.png',
  logoWhite: '/images/logo-white.png',

  // Hero / Workshop
  heroWorkshop: '/images/hero-workshop.jpg',
  workshopInterior: '/images/workshop-interior.jpg',
  workshopPallets: '/images/workshop-pallets.jpg',
  workshopLiftingCase: '/images/workshop-lifting-case.jpg',
  workshopPackingCrates: '/images/workshop-packing-crates.jpg',
  workshopMovingCrates: '/images/workshop-moving-crates.jpg',
  workshopPackingCaseLorry: '/images/workshop-packing-case-lorry.jpg',

  // Historical (Our Story timeline)
  historyRichardWest: '/images/history-richard-west.jpg',
  historyRupert: '/images/history-rupert.jpg',
  historyLogging: '/images/history-logging.jpg',
  historyWorkersTruck: '/images/history-workers-truck.jpg',
  historySawmill: '/images/history-sawmill.jpg',
  historyModern: '/images/history-modern.jpg',

  // Case Studies (Our Work)
  casePipex: '/images/case-pipex.jpg',
  caseGamingCrates: '/images/case-gaming-crates.jpg',
  caseXrayMachine: '/images/case-xray-machine.jpg',
  caseVintageTrawler: '/images/case-vintage-trawler.jpg',
  caseFineArt: '/images/case-fine-art.jpg',
  caseCompanyRelocation: '/images/case-company-relocation.jpg',
  caseIndustrialEquipment: '/images/case-industrial-equipment.jpg',

  // Export Packing
  exportWoodenCrate: '/images/export-wooden-crate.jpg',
  exportPackingCases: '/images/export-packing-cases.jpg',
  exportLargeCase: '/images/export-large-case.jpg',

  // Certifications
  ispm15Certification: '/images/ispm15-certification.jpg',
  what3wordsBadge: '/images/what3words-badge.png',

  // Unsplash supplementary (atmospheric/texture)
  timberStacks: '/images/timber-stacks-01.jpg',
  workshopWoodworking: '/images/workshop-woodworking-01.jpg',
  cncMachine: '/images/cnc-machine-01.jpg',
  woodPlankTexture: '/images/wood-plank-texture-01.jpg',
  workshopTools: '/images/workshop-tools-01.jpg',
  craftsmanHands: '/images/craftsman-hands-01.jpg',
  sawdustCloseup: '/images/wood-sawdust-closeup-01.jpg',
  plymouthHarbour: '/images/plymouth-harbour-01.jpg',
  shippingPort: '/images/shipping-port-01.jpg',
  woodGrainCloseup: '/images/wood-grain-closeup-01.jpg',
} as const;

export type ImageKey = keyof typeof images;
