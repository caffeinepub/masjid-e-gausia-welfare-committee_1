import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Announcement {
    id: bigint;
    title: string;
    body: string;
    date: Time;
}
export interface JamaCollection {
    id: bigint;
    date: bigint;
    description: string;
    addedBy: Principal;
    amount: bigint;
}
export interface ContactInquiry {
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAnnouncement(title: string, body: string): Promise<void>;
    addJamaCollection(amount: bigint, description: string, date: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAnnouncement(announcementId: bigint): Promise<void>;
    deleteJamaCollection(collectionId: bigint): Promise<void>;
    getAnnouncements(): Promise<Array<Announcement>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInquiries(): Promise<Array<ContactInquiry>>;
    getJamaCollections(): Promise<Array<JamaCollection>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInquiry(name: string, email: string, message: string): Promise<void>;
}
