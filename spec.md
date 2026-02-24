# Specification

## Summary
**Goal:** Build a single-page website for Masjid-e-Gausia Welfare Committee with an Islamic-themed design, informational sections, and a backend for announcements and contact inquiries.

**Planned changes:**
- Apply a deep green, gold, and cream color palette with Islamic geometric decorative elements and elegant typography throughout
- Hero/header section with organization name, tagline, mosque banner image, logo, and navigation bar linking to all sections
- About Us section with mission, values, and placeholder community description text
- Services & Programs section with four welfare activity cards (Education Support, Food & Ration Distribution, Medical Assistance, Community Events), each with an icon, title, and description in a responsive grid
- Announcements/News section that fetches and displays announcements from the backend, sorted newest first, with an empty state message
- Donate/Support Us section with a prominent call-to-action and placeholder donation/contact details
- Contact Us footer section with address, phone, email placeholders and a contact form (name, email, message, submit)
- Decorative geometric divider images used between major sections
- Backend Motoko actor with stable storage for announcements (title, body, date) with public query and admin add function
- Backend Motoko actor stores contact form submissions (name, email, message) in stable storage
- Display the mosque hero banner as hero background, committee logo in the navigation, and geometric divider between sections

**User-visible outcome:** Visitors can browse an elegant Islamic-themed community website, read announcements pulled from the backend, learn about services, find donation/contact info, and submit contact inquiries that are stored on-chain.
