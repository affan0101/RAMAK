// DEMO CONTENT: AI-generated illustrations, not actual RAMAK staff or projects.
const photo = (name) => ({ large: `/images/${name}.webp`, small: `/images/${name}-640.webp` })
export const imagery = {
  hero: photo('hero'), residential: photo('residential'), commercial: photo('commercial'),
  ac: photo('ac'), distribution: photo('distribution'), diagnosis: photo('diagnosis'),
  ups: photo('ups'), maintenance: photo('maintenance'), contact: photo('contact'),
}
export const serviceImagery = {
  electricalInstallation: imagery.commercial, acElectricalConnection: imagery.ac,
  inverterUps: imagery.ups, wiringRewiring: imagery.diagnosis, lightingPower: imagery.residential,
  distributionBoards: imagery.distribution, troubleshootingRepairs: imagery.diagnosis,
  preventiveMaintenance: imagery.maintenance,
}
