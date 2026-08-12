export interface Ticket {
  id: string;
  location: string;
  barangay: string;
  city: string;
  reporter: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Resolved';
  date: string;
  lat: number;
  lng: number;
  description: string;
}

export const mockTickets: Ticket[] = [
  { id: 'TKT-001', location: 'Osmeña Blvd', barangay: 'Capitol Site', city: 'Cebu City', reporter: 'Juan Cruz', urgency: 'High', status: 'Pending', date: '2023-10-24', lat: 10.3117, lng: 123.8925, description: 'Overflowing garbage bin near the intersection.' },
  { id: 'TKT-002', location: 'IT Park', barangay: 'Apas', city: 'Cebu City', reporter: 'Maria Santos', urgency: 'Low', status: 'Resolved', date: '2023-10-23', lat: 10.3298, lng: 123.9061, description: 'Small litter scattered around the park benches.' },
  { id: 'TKT-003', location: 'Colon St', barangay: 'Parian', city: 'Cebu City', reporter: 'Pedro Reyes', urgency: 'Critical', status: 'In Progress', date: '2023-10-24', lat: 10.2980, lng: 123.9026, description: 'Illegal dumping site blocking the sidewalk.' },
  { id: 'TKT-004', location: 'AS Fortuna', barangay: 'Banilad', city: 'Mandaue City', reporter: 'Ana Lim', urgency: 'Medium', status: 'Pending', date: '2023-10-25', lat: 10.3400, lng: 123.9213, description: 'Uncollected trash bags for 3 days.' },
  { id: 'TKT-005', location: 'Mactan Shrine', barangay: 'Mactan', city: 'Lapu-Lapu City', reporter: 'Carlos Gomez', urgency: 'Medium', status: 'Resolved', date: '2023-10-22', lat: 10.3105, lng: 124.0152, description: 'Plastic bottles on the shore.' },
  { id: 'TKT-006', location: 'Talisay City Hall', barangay: 'Lawaan', city: 'Talisay City', reporter: 'Elena Tan', urgency: 'High', status: 'In Progress', date: '2023-10-25', lat: 10.2520, lng: 123.8399, description: 'Clogged drainage due to solid waste.' },
  { id: 'TKT-007', location: 'Fuente Osmeña Circle', barangay: 'Santa Cruz', city: 'Cebu City', reporter: 'Miguel Castro', urgency: 'Low', status: 'Pending', date: '2023-10-26', lat: 10.3121, lng: 123.8929, description: 'Fallen branches and leaves.' },
  { id: 'TKT-008', location: 'Parkmall', barangay: 'Tipolo', city: 'Mandaue City', reporter: 'Rosa Diaz', urgency: 'Critical', status: 'Pending', date: '2023-10-26', lat: 10.3228, lng: 123.9317, description: 'Biohazard waste improperly disposed.' },
  { id: 'TKT-009', location: 'Opon Mercado', barangay: 'Poblacion', city: 'Lapu-Lapu City', reporter: 'Luisa Perez', urgency: 'High', status: 'Resolved', date: '2023-10-21', lat: 10.3129, lng: 123.9511, description: 'Rotten organic waste accumulation.' },
  { id: 'TKT-010', location: 'SRP', barangay: 'San Roque', city: 'Talisay City', reporter: 'Victor Manuel', urgency: 'Medium', status: 'In Progress', date: '2023-10-25', lat: 10.2647, lng: 123.8568, description: 'Scattered debris along the highway.' },
  { id: 'TKT-011', location: 'Carbon Market', barangay: 'Ermita', city: 'Cebu City', reporter: 'Sofia Fernandez', urgency: 'Critical', status: 'Pending', date: '2023-10-26', lat: 10.2934, lng: 123.8986, description: 'Massive garbage pile blocking market access.' },
  { id: 'TKT-012', location: 'Ayala Center', barangay: 'Luz', city: 'Cebu City', reporter: 'Rafael Garcia', urgency: 'Low', status: 'Resolved', date: '2023-10-20', lat: 10.3185, lng: 123.9056, description: 'Spilled coffee near entrance.' },
];

export const mockDashboardStats = {
  totalReports: 12,
  pending: 5,
  inProgress: 3,
  resolved: 4,
  responseTime: '4.2 hrs'
};
