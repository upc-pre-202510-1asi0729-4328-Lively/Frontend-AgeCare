export interface Appointment {
    id: number;
    date: string;
    time: string;
    residentId: number;
    doctorId: number;
    status: 'Pending' | 'Completed';
    residentName?: string;
    doctorName?: string;
}
