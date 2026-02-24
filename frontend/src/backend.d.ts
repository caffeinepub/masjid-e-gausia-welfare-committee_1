import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Announcement {
    title: string;
    body: string;
    date: Time;
}
export type Time = bigint;
export interface ContactInquiry {
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
}
export interface backendInterface {
    addAnnouncement(title: string, body: string): Promise<void>;
    getAnnouncements(): Promise<Array<Announcement>>;
    getContactInquiries(): Promise<Array<ContactInquiry>>;
    submitInquiry(name: string, email: string, message: string): Promise<void>;
}
