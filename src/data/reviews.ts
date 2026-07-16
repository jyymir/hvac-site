export interface Review {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export const REVIEWS: Review[] = [
  {
    id: "sarah-m",
    name: "Sarah M.",
    location: "Scottsdale, AZ",
    text: "Comfort Zone HVAC had my AC running in under two hours on a 110° day. Absolutely phenomenal service!",
    rating: 5,
  },
  {
    id: "james-t",
    name: "James T.",
    location: "Phoenix, AZ",
    text: "Fast service and great communication from start to finish. The technician was professional and clean.",
    rating: 5,
  },
  {
    id: "linda-r",
    name: "Linda R.",
    location: "Tempe, AZ",
    text: "They installed a new system for us and walked us through every step. Fair pricing, zero surprises.",
    rating: 5,
  },
  {
    id: "carlos-v",
    name: "Carlos V.",
    location: "Mesa, AZ",
    text: "Been using Comfort Zone for three years. They treat your home like their own. Highly recommended!",
    rating: 5,
  },
  {
    id: "patricia-k",
    name: "Patricia K.",
    location: "Chandler, AZ",
    text: "The maintenance plan has saved us money every year. They always show up on time and do the job right.",
    rating: 5,
  },
];

export const AGGREGATE_RATING = {
  score: 4.9,
  reviewCount: 300,
};
