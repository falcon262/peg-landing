# PEG design system

One system for every page of justpegit.online: the customer pages, PEG Partner, How it works, FAQ, About, the trike, and the legal pages. It is built from PEG's own app (`FreshPress/docs`), the previous site and the best ideas of the Figma study in `falcon-solutions/images/FalPeg`. It keeps the rule from that study: **same PEG, every page**.

## Principles

1. **The app is the star.** Show the real app screens in phone frames: shops nearby, tracking, payment, updates and the partner dashboard. Photographs of riders, shops and fresh laundry support them.
2. **Customer yellow, partner green.** Yellow carries the customer pages and green carries PEG Partner. The components and layout do not change between them.
3. **Honest and clear.** No invented prices, reviews, user counts or store downloads; the apps say "coming soon". Example figures in app screens (4.2 kg, GH₵ 42.00) are illustrative.

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `yellow` | `#F2CC44` | Customer heroes, the waitlist band, the in-app "Peg it!" |
| `cream` | `#FBF1CC` | Panels behind phones and tinted cards |
| `ink` | `#131313` | Text, the primary button, the footer |
| `page` | `#F8F8F8` | Page ground |
| `white` | `#FFFFFF` | Cards |
| `navy` | `#16276B` | Inside the customer app; one feature band per page at most |
| `green` | `#0B5C46` | PEG Partner hero, buttons and accents |
| `mint` | `#E6F0EC` | Partner panels |
| `grey` | `#5A5A5A` | Secondary text (6.6:1 on page) |
| `rule` | `#E8E8E8` | Borders |

## Type

Plus Jakarta Sans throughout, sentence case:
- **Display:** 76/80, weight 800 (mobile 44/48).
- **Heading:** 44/50, 800 (mobile 30/36).
- **Card title:** 22/28, 700.
- **Lead:** 20/31 (mobile 18/28).
- **Body:** 17/28 (mobile 16/26).
- **Small:** 14/20.

No uppercase eyebrows. A short pill label ("Coming soon to Accra") is the only label above a heading.

## Layout and shape

- 1280px content with 80px side margins, a 12-column grid and 24px gutters. Phones: 20px margins.
- Sections are 96px top and bottom (64px on phones), and content sets the height.
- **Section header:** the h2 on the left half and the intro on the right, aligned to the top; stacked on phones.
- **Radius:** 24px for cards, images and panels; 12px for buttons and fields; 38px for phone frames.

## Components

- **Header:** the PEG logo; How it works, PEG Partner, FAQ, About and The PEG trike; and "Join the waitlist" (ink). On the partner page the button is "Apply as a shop" (green). On phones a menu button opens a sheet.
- **Hero:** a yellow band (green on Partner). It has a pill label, the h1, a lead, one primary button and the coming-soon line on the left, and on the right a phone with a real app screen plus one floating card.
- **Route card:** a small map where the rider travels the route and settles at the door. This is PEG's signature motion; it holds at the end for reduced motion.
- **Step cards:** five numbered steps (customers) or three (partners), each with a title and one line.
- **Feature split:** text and facts on one side, and a phone on a cream (or mint) panel on the other.
- **Service cards:** Wash & Fold, Dry Clean, Iron Only and Bedding, with PEG's own icons.
- **FAQ:** an accordion grouped by topic.
- **Waitlist band:** yellow, with the form on a white card: name, neighbourhood and email. It opens an email to Falcon.
- **Footer:** ink. The logo, "Laundry, sorted.", the page links, contact details, legal links, and "Operated by Falcon Solutions".
- **Legal pages:** a page header band plus one 720px column of text.

## Motion

- The route card's rider loops slowly.
- Cards lift 2px on hover, and buttons darken on hover and press 1px when clicked.
- Nothing moves on scroll, and everything respects `prefers-reduced-motion`.

## Code

- `src/app/site/Layout.tsx` holds the header, footer and page shell.
- `src/app/site/ui.tsx` holds the shared parts.
- The pages are in `src/app/site/*Page.tsx` and `src/app/pages.tsx`.
- The tokens are in `src/styles/theme.css`, and the app screens are in `public/assets/app`.
