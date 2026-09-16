export const site = {
  name: "Stage House",
  tagline: "Rooms that sell the story of home.",
  description:
    "Professional home staging that helps listings show at their best — calm, considered, and ready for buyers.",
  primaryCta: {
    label: "Request a Consultation",
    href: "/contact",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ],
  contact: {
    email: "hello@example.com",
    phone: "",
    serviceArea: "Service area coming soon",
  },
  services: [
    {
      title: "Full-home staging",
      body: "Furniture, art, and accessories styled room by room so buyers can picture living there.",
    },
    {
      title: "Occupied staging",
      body: "Edit, rearrange, and refresh a lived-in home without starting from empty.",
    },
    {
      title: "Vacant staging",
      body: "Complete furnishings for empty listings that need warmth, scale, and a clear lifestyle story.",
    },
    {
      title: "Design consultation",
      body: "A walkthrough with prioritized recommendations when you need direction, not a full install.",
    },
  ],
  portfolio: [
    {
      slug: "light-filled-living",
      title: "Light-filled living room",
      location: "Sample listing",
      summary: "Replace this with a real project once photos are ready.",
    },
    {
      slug: "quiet-primary-suite",
      title: "Quiet primary suite",
      location: "Sample listing",
      summary: "Placeholder project for layout and copy structure.",
    },
    {
      slug: "gathering-kitchen",
      title: "Gathering kitchen",
      location: "Sample listing",
      summary: "Placeholder project for layout and copy structure.",
    },
  ],
  testimonials: [
    {
      quote:
        "The house photographed beautifully and felt like a home people wanted to walk into.",
      name: "Client name",
      role: "Listing agent",
    },
    {
      quote:
        "Clear process, thoughtful styling, and a space that finally matched the price.",
      name: "Client name",
      role: "Homeowner",
    },
  ],
} as const;
