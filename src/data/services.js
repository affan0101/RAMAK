export const serviceGroups = [
  { id: 'electricalInstallation', icon: 'Cable' },
  { id: 'acElectricalConnection', icon: 'AirVent' },
  { id: 'inverterUps', icon: 'BatteryCharging' },
  { id: 'wiringRewiring', icon: 'CircuitBoard' },
  { id: 'lightingPower', icon: 'Lightbulb' },
  { id: 'distributionBoards', icon: 'Boxes' },
  { id: 'troubleshootingRepairs', icon: 'Wrench' },
  { id: 'preventiveMaintenance', icon: 'ShieldCheck' },
]

export const serviceItems = [
  { id: 'wiring', group: 'wiringRewiring' },
  { id: 'acConnection', group: 'acElectricalConnection' },
  { id: 'inverter', group: 'inverterUps' },
  { id: 'lighting', group: 'lightingPower' },
  { id: 'switches', group: 'lightingPower' },
  { id: 'distributionBoard', group: 'distributionBoards' },
  { id: 'appliances', group: 'electricalInstallation' },
  { id: 'faultDetection', group: 'troubleshootingRepairs' },
  { id: 'repairReplacement', group: 'troubleshootingRepairs' },
  { id: 'preventiveMaintenance', group: 'preventiveMaintenance' },
  { id: 'residential', group: 'electricalInstallation' },
  { id: 'commercial', group: 'electricalInstallation' },
  { id: 'emergency', group: 'troubleshootingRepairs' },
]
