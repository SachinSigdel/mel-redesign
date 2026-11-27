import { Building2, HeartPulse, Truck, Utensils, ShieldCheck, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  lead: string;
  icon: LucideIcon;
  roles: { name: string; description: string }[];
};

export const SERVICES: Service[] = [
  {
    title: "Facilities management & commercial cleaning",
    lead: "Maintaining safe, spotless and operational environments",
    icon: Building2,
    roles: [
      { name: "Commercial & deep cleaners", description: "Office, clinical, retail and post-construction cleaning" },
      { name: "General assistants", description: "Day-to-day facilities tasks, light maintenance and estate upkeep" },
      { name: "Premises & caretaker staff", description: "Keeping your sites secure, open and functional" },
    ],
  },
  {
    title: "Healthcare & nursing support",
    lead: "Compassionate, fully compliant care when your rota falls short",
    icon: HeartPulse,
    roles: [
      { name: "Registered nurses (RGN / RMN)", description: "Qualified, pinned professionals for high-pressure environments" },
      { name: "Healthcare assistants (HCAs)", description: "Patient care, comfort and daily living support" },
      { name: "Support workers", description: "Trained for mental health, learning disability and elderly care" },
    ],
  },
  {
    title: "Logistics & warehouse operations",
    lead: "Keeping your supply chain moving at peak efficiency",
    icon: Truck,
    roles: [
      { name: "Warehouse operatives", description: "Inventory, loading, unloading and stock control" },
      { name: "Pickers & packers", description: "Fast, accurate workers for high-volume fulfilment" },
      { name: "Professional drivers", description: "From van and multi-drop drivers to HGV operators" },
    ],
  },
  {
    title: "Hospitality, catering & food production",
    lead: "Support for kitchens, events, front-of-house and manufacturing",
    icon: Utensils,
    roles: [
      { name: "Chefs (all levels)", description: "Head, sous and commis chefs ready to run hot lines" },
      { name: "Food production assistants", description: "Food-hygiene-compliant staff for factory and prep lines" },
      { name: "Front-of-house teams", description: "Waiting staff, bartenders and F&B assistants" },
    ],
  },
  {
    title: "Security services",
    lead: "Protecting your assets, premises and people",
    icon: ShieldCheck,
    roles: [
      {
        name: "SIA-licensed security officers",
        description:
          "Fully vetted professionals trained in access control, asset protection and crowd management for corporate buildings, retail spaces and events",
      },
    ],
  },
];
