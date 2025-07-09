export interface Appointment {
    id: number;
    date: string;
    time: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
    };
    residentId: number;
    doctorId: number;
    status: 'Pending' | 'Completed';
    residentName?: string;
    doctorName?: string;
}
