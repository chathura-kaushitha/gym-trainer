export const INITIAL_REVIEWS = [
  { id: 1, name: "Kasun Perera", text: "Best gym in town! The trainers are amazing.", rating: 5 },
  { id: 2, name: "Amaya De Silva", text: "Lost 10kg in 3 months. The meal plans really work.", rating: 5 },
  { id: 3, name: "Ruwan Jayasooriya", text: "Great equipment and friendly atmosphere.", rating: 4 },
];

export const COACHES = [
  {
    id: 1,
    name: "Coach Asanka",
    role: "Head Coach",
    img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sameera Silva",
    role: "Bodybuilding Expert",
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Nadeesha Perera",
    role: "Yoga Specialist",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Kamal Dias",
    role: "Crossfit Trainer",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
  },
];

export const TERMS_TEXT =
  "I agree to the gym rules. If I cannot attend a session, I must inform in advance. Payments are due on the 10th of every month.";

export const EXERCISE_TYPES = [
  { id: "Bench Press", label: "Bench Press" },
  { id: "Squat", label: "Squat" },
  { id: "Deadlift", label: "Deadlift" },
  { id: "Shoulder Press", label: "Shoulder Press" },
];

export const BODY_MEASUREMENTS = [
  { id: "Weight", label: "Body Weight", unit: "kg" },
  { id: "Chest", label: "Chest Size", unit: "in" },
  { id: "Biceps", label: "Bicep Size", unit: "in" },
  { id: "Waist", label: "Waist Size", unit: "in" },
];

export const INITIAL_SCHEDULE = [
  { day: "Monday", focus: "Chest & Triceps", time: "06:00 PM" },
  { day: "Tuesday", focus: "Back & Biceps", time: "06:00 PM" },
  { day: "Wednesday", focus: "Rest / Cardio", time: "-" },
  { day: "Thursday", focus: "Legs & Shoulders", time: "06:00 PM" },
  { day: "Friday", focus: "Full Body Compound", time: "05:30 PM" },
  { day: "Saturday", focus: "Crossfit / HIIT", time: "09:00 AM" },
  { day: "Sunday", focus: "Rest", time: "-" },
];

export const INITIAL_MEAL_PLAN = [
  { meal: "Breakfast", items: "Oats, 2 Eggs, Black Coffee" },
  { meal: "Lunch", items: "Grilled Chicken (200g), Rice, Broccoli" },
  { meal: "Dinner", items: "Fish, Salad, Avocado" },
];