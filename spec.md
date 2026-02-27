# Specification

## Summary
**Goal:** Add a "जमा कलेक्शन" (Jama Collection) navigation tab with a dedicated section, and create an admin panel for managing announcements, Jama Collection entries, and contact inquiries.

**Planned changes:**
- Add a "जमा कलेक्शन" link to both desktop and mobile navigation menus that smooth-scrolls to a new Jama Collection section on the main page
- Create a Jama Collection section (`id="jama-collection"`) that displays collection records (amount, date, description) with loading, error, and empty states using Hindi messages, styled with the existing color palette
- Extend the backend (`main.mo`) with a `JamaCollection` record type (id, amount, description, date, addedBy) and expose `addJamaCollection` (admin-only), `getJamaCollections` (public), and `deleteJamaCollection` (admin-only) endpoints with stable storage persistence
- Add React Query hooks: `useGetJamaCollections`, `useAddJamaCollection`, and `useDeleteJamaCollection` in `useQueries.ts` following existing hook patterns
- Create an Admin Panel page/section (accessible only to admin users) with three tabs: Announcements (add/delete), Jama Collection (add/delete), and Contact Inquiries (view)
- Show an "Admin Panel" button in the header only when the logged-in user is an admin; show "Access Denied" to non-admins
- All admin mutations provide Hindi success/error feedback

**User-visible outcome:** Visitors can view Jama Collection records from a new navigation tab and section. Admin users gain access to a dedicated panel where they can manage announcements, add or remove Jama Collection entries, and review contact inquiries.
