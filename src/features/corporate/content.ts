export const businessAreas = [
  {
    href: "/residential",
    number: "01",
    name: "For your home",
    title: "Everyday life, considered.",
    description:
      "Furniture sourcing for family homes, personal routines and the space you have.",
    kind: "home",
  },
  {
    href: "/commercial",
    number: "02",
    name: "For your business",
    title: "Space for people to work.",
    description:
      "Furniture selections for workplaces, reception areas and shared spaces.",
    kind: "work",
  },
  {
    href: "/space-planning",
    number: "03",
    name: "Plan your space",
    title: "See the possibilities first.",
    description:
      "Bring a floor plan and a shortlist together in a visual spatial proposal.",
    kind: "plan",
  },
] as const;

export const workflow = [
  {
    title: "Tell us about your space",
    text: "Share your requirements, budget, floor plan and reference styles.",
    output: "A structured project brief",
  },
  {
    title: "Find the right furniture",
    text: "Review options selected around your budget, dimensions and daily needs.",
    output: "A shortlist with specifications and reference quotes",
  },
  {
    title: "See it in your space",
    text: "Explore a 3D planning proposal with furniture placed in context.",
    output: "A visual layout for discussion",
  },
  {
    title: "Refine your project",
    text: "Adjust the selection and layout, then confirm the scope and next steps.",
    output: "A refined selection and project quotation",
  },
];

export const branchContent = {
  residential: {
    eyebrow: "RESIDENTIAL / FURNITURE SOURCING",
    title: "A home shaped around",
    accent: "the way you live.",
    intro:
      "From a first apartment to a room ready for change. We organise furniture choices around your routines, preferred style and budget.",
    kind: "home",
    heading: "A clear brief. A considered selection.",
    cards: [
      [
        "Living & dining",
        "Compare seating, dining furniture and storage around how your family gathers.",
      ],
      [
        "Bedrooms & storage",
        "Discuss bed sizes, storage priorities and the practical details of everyday use.",
      ],
      [
        "Study & working corners",
        "Select desks and supporting furniture for learning, focus and shared rooms.",
      ],
    ],
    deliverables: [
      "Furniture references, dimensions and finish options",
      "Reference quotes organised against your budget",
      "Optional spatial planning to discuss fit and placement",
    ],
    note: "Product availability, final specifications, freight, tax and installation are confirmed in the project quotation.",
    next: "/projects/bto-family",
    nextLabel: "Explore the family BTO case",
  },
  commercial: {
    eyebrow: "COMMERCIAL / WORKPLACES & SHARED SPACES",
    title: "Furniture for the way",
    accent: "your business works.",
    intro:
      "Bring your team requirements, project budget and floor plan. We connect furniture selection with a spatial proposal you can discuss with your stakeholders.",
    kind: "work",
    heading: "Three places to begin.",
    cards: [
      [
        "Reception & lounge",
        "A considered furniture selection for arrivals, informal meetings and waiting areas.",
      ],
      [
        "Collaboration spaces",
        "Explore seating combinations and occasional tables for shared spaces and conversation.",
      ],
      [
        "Workplace furniture",
        "Discuss office furniture requirements, quantities and finishes with supporting supplier references.",
      ],
    ],
    deliverables: [
      "A project furniture schedule with quantities and specifications",
      "Supplier options and reference pricing for comparison",
      "A layout proposal and a clearly defined quotation scope",
    ],
    note: "Delivery, installation, lead times and after-sales responsibilities are agreed for each project. Acoustic pod specifications and availability require separate confirmation.",
    next: "/partners/huagui",
    nextLabel: "Meet our supply partner",
  },
  "space-planning": {
    eyebrow: "SPATIAL PLANNING / VISUALISATION",
    title: "From a floor plan to",
    accent: "a shared vision.",
    intro:
      "See furniture in context before deciding. A spatial proposal helps you discuss room proportions, product placement and alternative arrangements.",
    kind: "plan",
    heading: "Make the choices easier to discuss.",
    cards: [
      [
        "Start with your floor plan",
        "Share room dimensions, openings and the areas you want to furnish. We clarify missing information with you.",
      ],
      [
        "Build a spatial reference",
        "A 3D planning model makes the layout easier to understand and discuss.",
      ],
      [
        "Place & compare furniture",
        "Review furniture placement alongside the shortlist, then refine the arrangement together.",
      ],
    ],
    deliverables: [
      "A visual spatial proposal based on the supplied plan",
      "Furniture placement and alternative arrangements",
      "A linked shortlist to support the next sourcing decision",
    ],
    note: "Planning visuals are not construction drawings. Models may be representative where exact supplier geometry is unavailable; dimensions and product details require confirmation.",
    next: "/examples/family-apartment.html",
    nextLabel: "Open the interactive apartment example",
  },
} as const;
