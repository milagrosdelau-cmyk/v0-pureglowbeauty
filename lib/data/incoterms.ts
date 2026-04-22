export const incoterms = {
  DAP: {
    name: 'Delivered at Place',
    description: 'The seller delivers goods at the agreed place (usually your door). The buyer pays for import duties and taxes.',
    when: 'Most common for B2C international sales',
    riskTransfer: 'Transferred when goods are delivered'
  },
  DDP: {
    name: 'Delivered Duty Paid',
    description: 'The seller delivers goods and pays all duties, taxes, and customs clearance costs. No additional fees for buyer.',
    when: 'Premium service, perfect for peace of mind',
    riskTransfer: 'Transferred when goods reach your location'
  },
  CIF: {
    name: 'Cost, Insurance and Freight',
    description: 'The seller pays for shipping and insurance but buyer handles customs. Common for B2B.',
    when: 'For bulk or B2B orders',
    riskTransfer: 'Transferred when goods leave seller\'s country'
  },
  FOB: {
    name: 'Free on Board',
    description: 'The seller pays for shipping to the port. Buyer takes responsibility after that point.',
    when: 'Less common for retail, mostly B2B',
    riskTransfer: 'Transferred when goods leave the port of origin'
  }
}

export const countryRegions: Record<string, string> = {
  ES: 'Europe',
  FR: 'Europe',
  DE: 'Europe',
  IT: 'Europe',
  GB: 'Europe',
  US: 'North America',
  CA: 'North America',
  MX: 'Latin America',
  BR: 'Latin America',
  AR: 'Latin America',
  CN: 'Asia-Pacific',
  JP: 'Asia-Pacific',
  KR: 'Asia-Pacific',
  AU: 'Asia-Pacific',
  IN: 'Asia-Pacific',
  AE: 'Middle East',
  SA: 'Middle East',
  TR: 'Middle East'
}

export const regionShippingInfo: Record<string, {
  standard: string
  express: string
  incoterm: string
  note: string
}> = {
  Europe: {
    standard: '5-7 business days',
    express: '2-3 business days',
    incoterm: 'DAP',
    note: 'Free shipping on orders over 75€. No customs for EU destinations.'
  },
  'North America': {
    standard: '7-10 business days',
    express: '3-5 business days',
    incoterm: 'DDP',
    note: 'All duties and taxes included. Free shipping on orders over $85.'
  },
  'Latin America': {
    standard: '12-15 business days',
    express: '7-10 business days',
    incoterm: 'DDP',
    note: 'Door-to-door delivery with full customs handling included.'
  },
  'Asia-Pacific': {
    standard: '10-14 business days',
    express: '5-7 business days',
    incoterm: 'DDP',
    note: 'All import duties prepaid. Tracking available for all shipments.'
  },
  'Middle East': {
    standard: '12-18 business days',
    express: '7-10 business days',
    incoterm: 'DAP',
    note: 'Buyer responsible for import duties. Free shipping over 100€.'
  }
}
