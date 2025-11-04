# NewtonBotics Lab Store - E-Commerce Frontend Development Prompt

## Overview
Build a modern, fully-functional e-commerce website for NewtonBotics Robotics Lab to sell 3D printed items, laser engraved products, and basic electronics. The website must match the existing robotics lab website's color theme and design aesthetic.

## Design Theme & Color Scheme

### Color Palette (Matching Existing Robotics Website)
- **Primary Background**: Black (`#000000` / `bg-black`)
- **Accent Colors**: 
  - Primary Red: `#ef4444` (red-500)
  - Hover Red: `#dc2626` (red-600)
  - Active Red: `#b91c1c` (red-700)
- **Text Colors**: 
  - Primary: White (`text-white`)
  - Secondary: White with opacity (`text-white/80`, `text-white/60`)
  - Accent Text: Red (`text-red-500`)
- **Border Colors**: White with opacity (`border-white/10`, `border-white/20`)
- **Card Backgrounds**: Black with opacity variations (`bg-black/95`, `bg-black/40`)
- **Success**: `#10b981` (green-500)
- **Warning**: `#f59e0b` (amber-500)
- **Error**: `#ef4444` (red-500)

### Typography
- **Display Font**: Poppins (for headings)
- **Body Font**: Open Sans (for body text)
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Design Aesthetics
- Dark theme with black background
- Red accent colors for CTAs, hover states, and highlights
- Smooth transitions and hover effects
- Modern, tech-focused aesthetic
- Glassmorphism effects with backdrop blur
- Rounded corners (`rounded-lg`, `rounded-xl`, `rounded-2xl`)
- Subtle shadows and borders

## Technology Stack

### Required Technologies
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components using Tailwind (can use shadcn/ui compatible components)
- **Icons**: React Icons (Feather Icons - `react-icons/fi`) or Lucide React
- **Animations**: Framer Motion (optional, for smooth animations)
- **State Management**: React Context API or Zustand (for cart, wishlist)
- **Forms**: React Hook Form with Zod validation

## Required Pages & Features

### 1. Homepage (`/`)
**Hero Section**
- Large hero banner with compelling headline
- Subheading describing the lab store
- CTA buttons: "Shop Now" and "Browse Categories"
- Product category showcase (3D Prints, Laser Engraving, Electronics)

**Featured Products Section**
- Grid of 6-8 featured products
- Product cards with image, name, price, category badge
- "View Product" button on each card
- Smooth hover effects with scale/transform

**Categories Section**
- Three main categories displayed prominently:
  - 3D Printed Items
  - Laser Engraved Items
  - Basic Electronics
- Each category card links to category page
- Category icons/illustrations

**Why Shop With Us Section**
- Benefits: Quality products, lab-made, fast shipping, support robotics research
- Icons and short descriptions

**Newsletter Signup**
- Email subscription form
- Matches existing newsletter design

### 2. Products Listing Page (`/products`)
**Filters Sidebar** (Left side, collapsible on mobile)
- Category filter (dropdown or checkboxes)
- Price range slider
- Sort by: Price (Low to High, High to Low), Newest, Most Popular
- Clear filters button

**Products Grid**
- Responsive grid (4 columns desktop, 2 tablet, 1 mobile)
- Product cards showing:
  - Product image with hover effect
  - Product name
  - Category badge (color-coded: 3D Print = blue, Laser = red, Electronics = green)
  - Price (with currency symbol)
  - "Add to Cart" button
  - "Quick View" button
  - Stock status badge
- Loading states (skeleton loaders)
- Empty state when no products match filters

**Pagination**
- Page numbers or "Load More" button
- Shows current page and total pages

### 3. Product Detail Page (`/products/[id]`)
**Product Images**
- Main large image
- Thumbnail gallery below
- Image zoom on hover (optional)
- Badge overlays (New, Best Seller, Limited Stock)

**Product Information**
- Product title
- Category with icon
- Price (large, prominent)
- Product description (multi-paragraph)
- Specifications table:
  - For 3D Prints: Material, Dimensions, Color, Print Time
  - For Laser Items: Material, Size, Engraving Depth, Customization Options
  - For Electronics: Specifications, Voltage, Current, Compatibility

**Add to Cart Section**
- Quantity selector (with + and - buttons)
- "Add to Cart" button (red accent)
- "Buy Now" button (optional)
- Stock availability message
- Estimated delivery time

**Related Products**
- Grid of 4 related products
- Same category or similar items

### 4. Shopping Cart Page (`/cart`)
**Cart Items Table**
- Each item shows:
  - Product image (thumbnail)
  - Product name (linked to detail page)
  - Category
  - Quantity controls (+ and - buttons)
  - Price per unit
  - Total price for that item
  - Remove button (trash icon)
- Empty cart state with illustration and "Continue Shopping" button

**Order Summary Sidebar**
- Subtotal
- Shipping (calculated or fixed)
- Tax (if applicable)
- Total amount (prominent)
- "Proceed to Checkout" button (full width, red)

**Coupon Code Input** (optional)
- Input field with "Apply" button

### 5. Checkout Page (`/checkout`)
**Two-Column Layout**

**Left Column - Checkout Form**
- Shipping Information:
  - Full Name
  - Email
  - Phone Number
  - Address Line 1
  - Address Line 2
  - City
  - State/Province
  - Postal Code
  - Country
- Payment Method Selection:
  - Radio buttons for: Credit Card, PayPal, Bank Transfer
  - If Credit Card: Card number, Expiry, CVV, Name on card
- Order Notes (textarea, optional)
- Form validation with error messages

**Right Column - Order Review**
- List of items being purchased
- Quantities and prices
- Shipping method
- Final total
- "Place Order" button

**Security Badges**
- SSL badge, secure payment icons

### 6. Order Confirmation Page (`/order-confirmed/[orderId]`)
- Success message with checkmark icon
- Order number (copyable)
- Order summary
- Estimated delivery date
- "Continue Shopping" button
- "Track Order" button (optional, if tracking implemented)

### 7. My Account / Dashboard (`/account`)
**Tabs or Sections:**
- My Orders (list of past orders)
- Order Details (when clicking an order)
- Shipping Addresses (save multiple addresses)
- Payment Methods (save cards)
- Account Settings (name, email, password)

### 8. Search Page (`/search?q=query`)
- Search bar at top
- Search results with filters
- "No results found" state

### 9. Category Pages (`/category/[category]`)
- Category-specific product listings
- Category description/banner at top
- Same filtering and sorting as main products page

## Component Requirements

### Navbar Component
- **Logo**: "NewtonBotics Store" or similar
- **Navigation Links**: Home, Products, Categories, About, Contact
- **Cart Icon**: With item count badge (red circle with white number)
- **User Account Icon**: Dropdown with Orders, Account Settings, Logout
- **Search Bar**: In navbar (optional) or dedicated search page
- **Sticky Navigation**: Sticks to top on scroll
- **Mobile Menu**: Hamburger menu with slide-out drawer

### Footer Component
- **Company Info**: About NewtonBotics Lab
- **Quick Links**: Products, Categories, About Us, Contact
- **Customer Service**: Shipping Info, Returns, FAQ
- **Newsletter**: Email signup form
- **Social Media Icons**: Links to lab's social media
- **Copyright**: NewtonBotics Robotics Lab © 2024

### Product Card Component
- Image with hover zoom effect
- Product name (truncated if too long)
- Category badge
- Price (large, bold)
- Stock status (In Stock / Low Stock / Out of Stock)
- Add to Cart button (full width on mobile, inline on desktop)
- Hover effects: slight scale, shadow enhancement

### Cart Icon Badge
- Red circle with white number
- Animates when item added
- Shows total count of items in cart

### Loading Components
- Skeleton loaders for product cards
- Spinner for buttons
- Full-page loader for initial page load

### Toast Notifications
- Success: Green background, checkmark icon ("Product added to cart")
- Error: Red background, X icon ("Failed to add product")
- Info: Blue background, info icon
- Auto-dismiss after 3-5 seconds

## Dummy Data Structure

### Products Data (JSON)
```json
{
  "products": [
    {
      "id": "1",
      "name": "Custom 3D Printed Robot Arm Bracket",
      "category": "3d-printed",
      "subcategory": "Robot Parts",
      "price": 45.99,
      "originalPrice": 59.99,
      "currency": "USD",
      "description": "High-quality 3D printed bracket for robot arm assembly. Made with premium PLA material, designed for durability and precision. Perfect for robotics projects and prototypes.",
      "longDescription": "Our 3D printed robot arm bracket is meticulously designed for robotics enthusiasts and professionals. This bracket is manufactured using advanced FDM printing technology with premium PLA material, ensuring exceptional strength and dimensional accuracy. Features include precise mounting holes, reinforced joints, and smooth surface finish. Compatible with standard servo motors and mounting hardware. Ideal for educational projects, prototyping, and custom robot builds.",
      "images": [
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"
      ],
      "thumbnail": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      "stock": 25,
      "isInStock": true,
      "isFeatured": true,
      "isNew": true,
      "rating": 4.5,
      "reviewCount": 12,
      "specifications": {
        "material": "PLA",
        "color": "Black",
        "dimensions": "50mm x 40mm x 20mm",
        "weight": "15g",
        "printTime": "2.5 hours",
        "compatibility": "Standard servo motors"
      },
      "tags": ["robot", "bracket", "3d-print", "hardware"],
      "relatedProducts": ["2", "5", "8"]
    },
    {
      "id": "2",
      "name": "Personalized Laser Engraved Nameplate",
      "category": "laser-engraved",
      "subcategory": "Personalized Items",
      "price": 29.99,
      "currency": "USD",
      "description": "Custom laser engraved nameplate made from premium wood. Perfect for desks, offices, or as a gift. Multiple sizes available.",
      "longDescription": "Create a personalized touch with our laser engraved nameplates. Each nameplate is crafted from high-quality hardwood and engraved using precision laser technology. The result is a professional, elegant finish that will last for years. Customize with any name or text up to 25 characters. Available in multiple wood types: Oak, Walnut, and Maple. Comes with pre-drilled mounting holes for easy installation.",
      "images": [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800"
      ],
      "thumbnail": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
      "stock": 50,
      "isInStock": true,
      "isFeatured": true,
      "isNew": false,
      "rating": 4.8,
      "reviewCount": 28,
      "specifications": {
        "material": "Premium Hardwood",
        "sizes": "Small (4x1 inch), Medium (6x1.5 inch), Large (8x2 inch)",
        "engravingDepth": "0.5mm",
        "customization": "Text up to 25 characters",
        "finish": "Natural wood with clear coat",
        "mounting": "Pre-drilled holes included"
      },
      "tags": ["personalized", "gift", "office", "laser"],
      "relatedProducts": ["3", "6", "9"]
    },
    {
      "id": "3",
      "name": "Arduino Starter Kit - Robotics Edition",
      "category": "electronics",
      "subcategory": "Microcontrollers",
      "price": 79.99,
      "originalPrice": 99.99,
      "currency": "USD",
      "description": "Complete Arduino starter kit perfect for robotics projects. Includes Arduino Uno, breadboard, sensors, motors, and detailed project guide.",
      "longDescription": "Jumpstart your robotics journey with our comprehensive Arduino Starter Kit. This kit includes everything you need to build exciting robotics projects. Contents: Arduino Uno R3 board, breadboard, jumper wires, LEDs, resistors, potentiometer, servos, DC motors, ultrasonic sensor, IR sensor, temperature sensor, and a 50+ page project guide. Perfect for beginners and intermediate makers. All components are tested and ready to use. Start building your first robot in under 30 minutes!",
      "images": [
        "https://images.unsplash.com/photo-1526374965328-7f61d4f18f48?w=800"
      ],
      "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4f18f48?w=400",
      "stock": 15,
      "isInStock": true,
      "isFeatured": true,
      "isNew": false,
      "rating": 4.7,
      "reviewCount": 45,
      "specifications": {
        "board": "Arduino Uno R3",
        "voltage": "5V",
        "current": "40mA (standby), 50mA (active)",
        "microcontroller": "ATmega328P",
        "digitalPins": 14,
        "analogPins": 6,
        "includedComponents": "Breadboard, sensors, motors, LEDs, resistors, wires",
        "compatibility": "Arduino IDE, Scratch for Arduino"
      },
      "tags": ["arduino", "starter-kit", "robotics", "electronics"],
      "relatedProducts": ["4", "7", "10"]
    }
  ],
  "categories": [
    {
      "id": "3d-printed",
      "name": "3D Printed Items",
      "slug": "3d-printed",
      "description": "Custom 3D printed products made in our lab",
      "icon": "FiPrinter",
      "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
      "productCount": 25
    },
    {
      "id": "laser-engraved",
      "name": "Laser Engraved Items",
      "slug": "laser-engraved",
      "description": "Personalized laser engraved products",
      "icon": "FiZap",
      "image": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600",
      "productCount": 18
    },
    {
      "id": "electronics",
      "name": "Basic Electronics",
      "slug": "electronics",
      "description": "Essential electronics components for robotics",
      "icon": "FiCpu",
      "image": "https://images.unsplash.com/photo-1526374965328-7f61d4f18f48?w=600",
      "productCount": 32
    }
  ]
}
```

### Additional Dummy Products Needed
Create at least 20-30 products total across all three categories:
- **3D Printed**: Robot parts, brackets, enclosures, custom designs, phone stands, organizers
- **Laser Engraved**: Nameplates, keychains, coasters, signs, wooden boxes, phone cases
- **Electronics**: Arduino kits, sensors, motors, breadboards, resistors, LEDs, batteries, wiring kits

## State Management Requirements

### Cart Context/Store
- Add to cart
- Remove from cart
- Update quantity
- Clear cart
- Calculate totals (subtotal, shipping, tax, grand total)
- Persist cart to localStorage

### Wishlist (Optional)
- Add/remove items
- Persist to localStorage or user account

### User Authentication (Optional for MVP)
- Sign up / Sign in
- Guest checkout (allow purchase without account)
- Saved addresses
- Order history

## Responsive Design Requirements

### Breakpoints
- **Mobile**: < 768px (single column, stacked layouts)
- **Tablet**: 768px - 1024px (2 columns, adjusted spacing)
- **Desktop**: > 1024px (full layout, 3-4 columns)

### Mobile-Specific Features
- Bottom navigation bar (optional) with Home, Categories, Cart, Account
- Hamburger menu for main navigation
- Full-width buttons on mobile
- Touch-friendly tap targets (min 44x44px)
- Swipe gestures for product galleries
- Collapsible filters sidebar

## Animations & Interactions

### Required Animations
- Smooth page transitions
- Product card hover effects (scale up 1.05, shadow increase)
- Add to cart button pulse/ripple effect
- Cart icon bounce when item added
- Loading spinner animations
- Toast notification slide-in from top/bottom
- Filter sidebar slide-in on mobile
- Image zoom on product detail page

### Interaction Patterns
- Click outside to close modals/dropdowns
- Debounced search input
- Smooth scrolling to sections
- Lazy loading for product images
- Infinite scroll or pagination for product lists

## Performance Requirements

### Optimization
- Image optimization (Next.js Image component)
- Code splitting
- Lazy loading for below-the-fold content
- Minimal bundle size
- Fast page load times (< 3 seconds)

### SEO
- Meta tags for all pages
- Open Graph tags for social sharing
- Structured data (JSON-LD) for products
- Semantic HTML
- Accessible URLs (slugs)

## Accessibility Requirements

- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Proper heading hierarchy (h1, h2, h3)
- Color contrast ratios meet WCAG AA standards
- Focus indicators visible
- Alt text for all images

## Testing Considerations (Optional for MVP)

- Form validation (client-side)
- Error handling for API calls
- Empty states (no products, empty cart, no search results)
- Loading states
- Error boundaries

## File Structure

```
/ecommerce-store/
  /src/
    /app/
      /page.jsx                    # Homepage
      /products/
        /page.jsx                  # Products listing
        /[id]/
          /page.jsx                # Product detail
      /cart/
        /page.jsx                  # Shopping cart
      /checkout/
        /page.jsx                  # Checkout page
      /order-confirmed/
        /[orderId]/
          /page.jsx                # Order confirmation
      /account/
        /page.jsx                  # Account dashboard
        /orders/
          /page.jsx                # Order history
      /category/
        /[category]/
          /page.jsx                # Category page
      /search/
        /page.jsx                  # Search results
      /layout.js                   # Root layout with navbar/footer
    /components/
      /Navbar.jsx                  # Navigation component
      /Footer.jsx                  # Footer component
      /ProductCard.jsx             # Product card component
      /CartIcon.jsx                # Cart icon with badge
      /Filters.jsx                 # Product filters sidebar
      /ProductGallery.jsx         # Product image gallery
      /AddToCartButton.jsx         # Add to cart button
      /Toast.jsx                   # Toast notifications
      /LoadingSpinner.jsx          # Loading components
    /contexts/
      /CartContext.jsx             # Cart state management
      /AuthContext.jsx             # User authentication (optional)
    /lib/
      /data.js                     # Dummy data
      /utils.js                    # Utility functions
    /styles/
      /globals.css                 # Global styles
```

## Implementation Notes

### Color Usage Examples
- **Buttons (Primary)**: `bg-red-600 hover:bg-red-700 text-white`
- **Buttons (Secondary)**: `bg-white/10 hover:bg-white/20 text-white border border-white/20`
- **Cards**: `bg-black/95 backdrop-blur-lg border border-white/10`
- **Text (Primary)**: `text-white`
- **Text (Secondary)**: `text-white/80`
- **Accents**: `text-red-500`, `border-red-500`

### Code Style
- Use functional components with hooks
- Follow React best practices
- Consistent naming conventions (camelCase for variables, PascalCase for components)
- Comment complex logic
- Extract reusable logic into custom hooks

## Delivery Requirements

### Must Have (MVP)
- ✅ All pages listed above functional
- ✅ Product listing with filters and search
- ✅ Shopping cart functionality
- ✅ Checkout page (with dummy payment)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dummy data populated
- ✅ Matches color theme
- ✅ Smooth animations and interactions

### Nice to Have (Future Enhancements)
- User authentication
- Order tracking
- Product reviews and ratings
- Wishlist functionality
- Multiple payment gateways integration
- Admin dashboard for managing products
- Email notifications
- Real payment processing (Stripe, PayPal)

## Success Criteria

The e-commerce store should:
1. Look and feel cohesive with the existing NewtonBotics robotics website
2. Be fully functional with dummy data
3. Provide smooth user experience across all devices
4. Have intuitive navigation and clear CTAs
5. Load quickly and perform well
6. Be accessible and user-friendly

---

**Use this prompt to generate the complete e-commerce frontend codebase. Start with the homepage and progressively build out each page and component. Ensure all styling matches the black/red/white color scheme and maintains the tech-focused aesthetic of the robotics lab website.**



