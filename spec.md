# Specification

## Summary
**Goal:** Add an "Admin Panel" link inside the hamburger (mobile) menu in the Header component, visible only to authenticated admin users.

**Planned changes:**
- Add an "Admin Panel" button/link inside the mobile hamburger menu in `Header.tsx`
- Show the button only when the user is authenticated as admin, using the same role/auth check as the existing desktop admin button
- Clicking the button navigates to the admin panel and closes the mobile menu
- Style the button consistently with other hamburger menu items

**User-visible outcome:** Admin users opening the hamburger menu on mobile will see an "Admin Panel" option that takes them to the admin panel, while non-admin and unauthenticated users see no change.
