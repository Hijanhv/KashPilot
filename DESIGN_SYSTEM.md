# KashPilot Design System & Figma Guide

## Brand Identity

### Logo
- **Primary Logo**: Animated voice wave circle (logo.svg)
- **Style**: Siri-inspired, modern, gradient orange (#FF6B35 → #FFA552)
- **Animation**: Pulsing voice wave bars for active state
- **Usage**: App icon, splash screen, voice button

### Color Palette

#### Primary Colors
- **Orange Gradient**: `#FF6B35` → `#FF8C42` → `#FFA552`
- **Black**: `#000000` (backgrounds)
- **White**: `#FFFFFF` (text, UI elements)

#### Semantic Colors
- **Success**: `#10B981` (green)
- **Warning**: `#F59E0B` (amber)
- **Error**: `#EF4444` (red)
- **Info**: `#3B82F6` (blue)

#### Neutral Palette
- **Gray 50**: `#FAFAFA`
- **Gray 100**: `#F5F5F5`
- **Gray 200**: `#E5E5E5`
- **Gray 700**: `#374151`
- **Gray 800**: `#1F2937`
- **Gray 900**: `#111827`

### Typography

#### Fonts
- **Logo**: Satisfy (cursive, hand-written style)
- **Headings**: Crimson Text (serif, elegant)
- **Body**: Inter (sans-serif, clean)

#### Scale
- **Hero**: 56px / 3.5rem (mobile), 72px / 4.5rem (desktop)
- **H1**: 48px / 3rem
- **H2**: 36px / 2.25rem
- **H3**: 28px / 1.75rem
- **Body Large**: 20px / 1.25rem
- **Body**: 16px / 1rem
- **Small**: 14px / 0.875rem
- **Caption**: 12px / 0.75rem

### Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### Border Radius
- **sm**: 8px (buttons, small cards)
- **md**: 16px (cards)
- **lg**: 24px (modals)
- **xl**: 32px (phone mockup)
- **full**: 9999px (voice button, pills)

## Mobile App Screens

### 1. Splash Screen
- **Background**: Black with gradient radial glow
- **Logo**: Centered, animated voice wave
- **Tagline**: "Your Money. On Autopilot."
- **Duration**: 2 seconds

### 2. Home/Split Screen
- **Header**: 
  - Time display (top right)
  - Settings icon (top right)
  - Logo icon (top left, 32px)
- **Greeting**: Dynamic based on time
- **Voice Button**: 
  - Size: 120px diameter
  - Center of screen
  - Orange gradient with glow
  - Pulsing animation when listening
  - Voice wave bars when active
- **Recent Activity**: Scrollable list below
- **Bottom Nav**: 4 items (Home, Activity, Contacts, Profile)

### 3. Voice Active State
- **Full Screen Overlay**: Semi-transparent black
- **Voice Button**: Enlarged to 200px, pulsing
- **Waveform**: Dynamic audio visualization
- **Transcript**: Real-time text below button
- **Cancel Button**: Bottom of screen

### 4. Split Result Screen
- **Header**: "Split Complete" with checkmark
- **Amount Card**: 
  - Total at top
  - Per-person breakdown
  - Status indicators (paid/pending)
- **Action Buttons**: 
  - "Request Payment" (primary)
  - "Share Details" (secondary)
- **Transaction Details**: Timestamp, blockchain link

### 5. Activity Feed
- **List View**: Chronological transactions
- **Card Design**:
  - Amount (large, bold)
  - People involved (avatars)
  - Status badge
  - Timestamp
  - Swipe actions (left: delete, right: share)

## UI Components

### Voice Button
```
Size: 120px × 120px
Border Radius: 50%
Background: Gradient (FF6B35 → FFA552)
Shadow: 0 20px 40px rgba(255, 107, 53, 0.3)
Icon: Voice wave bars (white)
Animation: Scale 1.0 → 1.05 (hover), pulse (active)
```

### Transaction Card
```
Padding: 20px
Border Radius: 16px
Background: Gray-900 (#111827)
Border: 1px solid Gray-800
Shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
```

### Button Primary
```
Height: 56px
Padding: 0 32px
Border Radius: 12px
Background: Gradient (FF6B35 → FFA552)
Text: White, 16px, font-weight 600
Shadow: 0 4px 16px rgba(255, 107, 53, 0.2)
```

### Button Secondary
```
Height: 56px
Padding: 0 32px
Border Radius: 12px
Background: Transparent
Border: 2px solid Gray-700
Text: White, 16px, font-weight 600
```

## Figma Setup Guide

### 1. Create Frames
- **Mobile**: 390 × 844 (iPhone 14 Pro)
- **Desktop**: 1440 × 900

### 2. Import Assets
- Logo.svg
- Icon set (Lucide icons)
- Gradient swatches

### 3. Create Components
- Voice Button (with variants: idle, listening, processing)
- Transaction Card
- Bottom Navigation
- Status Badges
- Avatar Circles

### 4. Build Styles
- **Text Styles**: Define all typography scales
- **Color Styles**: All brand colors
- **Effect Styles**: Shadows, glows, blurs

### 5. Create Auto-Layout
- Use auto-layout for all cards and lists
- Set constraints for responsive behavior
- Add spacing tokens

### 6. Prototype
- Link screens with smart animate
- Add voice button interactions
- Create bottom nav transitions
- Add loading states

## Animation Guidelines

### Micro-interactions
- **Duration**: 200-300ms
- **Easing**: Ease-out for entries, ease-in for exits
- **Voice Button**: Scale on press, pulse when listening
- **Cards**: Slide up on load (stagger by 50ms)
- **Status Change**: Color fade + checkmark scale

### Voice Animations
- **Idle**: Gentle pulse (1s cycle)
- **Listening**: Rapid pulse + wave bars
- **Processing**: Spinner overlay
- **Success**: Scale up + checkmark
- **Error**: Shake + red flash

## Accessibility

- **Minimum Touch Target**: 44×44px
- **Contrast Ratio**: 4.5:1 for body text, 3:1 for large text
- **Voice Feedback**: Audio confirmation for actions
- **Haptics**: Vibration on button press, success/error feedback
- **Screen Reader**: All buttons labeled, status announcements

## Export Guidelines

### Icons
- **192×192**: PWA icon (Android)
- **512×512**: PWA icon (high-res)
- **180×180**: Apple Touch Icon (iOS)
- **32×32**: Favicon

### Splash Screens
- **iOS**: 1125×2436 (iPhone X/11/12/13/14 Pro)
- **Android**: 1080×1920 (common resolution)

### Assets
- **SVG**: Logo, icons (vector)
- **PNG**: Screenshots, mockups (2x, 3x for retina)
- **WebP**: Web images (optimized)

## Development Handoff

### CSS Variables
```css
:root {
  --color-primary: #FF6B35;
  --color-gradient: linear-gradient(135deg, #FF6B35 0%, #FFA552 100%);
  --font-display: 'Satisfy', cursive;
  --font-heading: 'Crimson Text', serif;
  --font-body: 'Inter', sans-serif;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --shadow-voice: 0 20px 40px rgba(255, 107, 53, 0.3);
}
```

### Key Measurements
- **Safe Area**: 16px padding on mobile
- **Max Width**: 440px for mobile app
- **Grid**: 4px base unit
- **Line Height**: 1.5 for body, 1.2 for headings

---

**Next Steps for Figma:**
1. Import this design system
2. Create component library
3. Design all 5 core screens
4. Add interactive prototype
5. Export developer assets
6. Create design specifications document
