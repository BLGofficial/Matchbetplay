# MatchBet Play - Mobile App Design

## Design Philosophy

MatchBet Play is a **football match analysis and betting companion** app that provides AI-powered predictions, real-time match data, and intelligent betting recommendations. The design follows **Apple Human Interface Guidelines** with a focus on **one-handed usage** in **portrait orientation (9:16)**.

## Color Palette

**Primary Colors:**
- **Accent Green**: `#22C55E` (success, winning predictions, live indicators)
- **Deep Purple**: `#6D28D9` (primary actions, premium features, AI insights)
- **Electric Blue**: `#2563EB` (interactive elements, links, highlights)

**Background Colors:**
- **Dark Navy**: `#0B1120` (main background)
- **Card Surface**: `#151E32` (elevated cards, panels)
- **Border**: `#334155` (dividers, card borders)

**Semantic Colors:**
- **Success**: `#22C55E` (winning predictions, positive stats)
- **Warning**: `#F59E0B` (caution, medium confidence)
- **Error**: `#EF4444` (losing predictions, high risk)

## Screen List

### 1. Home / Dashboard
**Primary Content:**
- Featured live matches (top 3-4 matches)
- AI prediction highlights (today's top predictions)
- Quick stats: win rate, total predictions, active bets
- Quick action buttons: View All Live, Browse Predictions

**Functionality:**
- Pull-to-refresh for latest data
- Tap match card to view detailed analysis
- Tap prediction card to see AI reasoning

### 2. Live Matches
**Primary Content:**
- Real-time match list with scores and status (1H, 2H, HT, FT)
- League badges and team logos
- Live match indicators (pulsing dot)
- Half-time scores for ongoing matches
- Match time elapsed

**Functionality:**
- Auto-refresh every 60 seconds (configurable)
- Manual refresh button
- Filter by league (Premier League, La Liga, etc.)
- Tap match to view detailed stats and predictions

### 3. Match Detail
**Primary Content:**
- Team names, logos, and current score
- Match timeline and key events
- Head-to-head statistics
- AI prediction panel with confidence score
- Betting odds comparison
- Team form (last 5 matches)
- Player statistics

**Functionality:**
- Add to favorites
- Share prediction
- View historical H2H data
- Access betting recommendations

### 4. AI Predictions
**Primary Content:**
- List of upcoming matches with AI predictions
- Confidence score (0-100%)
- Predicted outcome (Win/Draw/Loss)
- Key factors influencing prediction
- Historical accuracy for similar predictions

**Functionality:**
- Filter by league, date, confidence level
- Sort by confidence, match time, league
- Tap to view detailed analysis
- Save predictions to watchlist

### 5. Leagues & Standings
**Primary Content:**
- League selector (6 major leagues)
- Current standings table with:
  - Rank, team name, logo
  - Played, Won, Drawn, Lost
  - Goals For/Against
  - Points
- Top scorers for selected league

**Functionality:**
- Switch between leagues
- Tap team to view detailed info
- View full fixtures for league

### 6. Teams Search
**Primary Content:**
- Search bar with debounced input (500ms)
- Search results with:
  - Team logo
  - Team name
  - Country/League
  - Current form indicator

**Functionality:**
- Real-time search as user types
- Tap team to view profile
- Add team to favorites
- View team fixtures and results

### 7. Team Profile
**Primary Content:**
- Team header with logo, name, league
- Current form (last 5 matches)
- Upcoming fixtures
- Recent results
- Squad statistics
- Venue information

**Functionality:**
- Add/remove from favorites
- View player details
- Access match predictions for upcoming games

### 8. Betting Hub
**Primary Content:**
- Active bets tracking
- Betting recommendations based on AI predictions
- Odds comparison from multiple bookmakers
- Betting history and performance
- Win/loss statistics

**Functionality:**
- Track bet status
- View odds movements
- Access responsible gambling tools
- Export betting history

### 9. Favorites
**Primary Content:**
- Saved teams list
- Quick access to team profiles
- Upcoming matches for favorite teams
- Recent results for favorites

**Functionality:**
- Remove from favorites
- Reorder favorites
- View team details
- Get notifications for favorite team matches

### 10. Settings
**Primary Content:**
- Auto-refresh toggle (on/off)
- Refresh interval selector (30s, 60s, 120s)
- Notification preferences
- Theme selection (light/dark/auto)
- API status indicator
- About and legal information

**Functionality:**
- Toggle auto-refresh
- Adjust refresh interval
- Manage notification settings
- View API connection status

## Key User Flows

### Flow 1: View Live Match and Get AI Prediction
1. User opens app → lands on **Home/Dashboard**
2. User taps "View All Live" or scrolls to **Live Matches** tab
3. User sees list of live matches with scores
4. User taps on a match card
5. **Match Detail** screen opens with full stats
6. User scrolls to **AI Prediction** panel
7. User views confidence score, predicted outcome, and key factors
8. User can share prediction or add match to favorites

### Flow 2: Search for Team and Add to Favorites
1. User navigates to **Teams Search** tab
2. User types team name in search bar
3. Results appear after 500ms debounce
4. User taps on desired team
5. **Team Profile** screen opens
6. User taps "Add to Favorites" button
7. Confirmation toast appears
8. Team is now accessible in **Favorites** tab

### Flow 3: Browse AI Predictions and View Details
1. User navigates to **AI Predictions** tab
2. User sees list of upcoming matches with predictions
3. User filters by "High Confidence" (>80%)
4. User taps on a prediction card
5. **Match Detail** screen opens with AI analysis
6. User views detailed factors: team form, H2H, injuries, etc.
7. User can save to watchlist or proceed to betting recommendations

### Flow 4: Check League Standings and Top Scorers
1. User navigates to **Leagues & Standings** tab
2. User selects "Premier League" from league selector
3. Standings table loads with current positions
4. User scrolls to view top scorers section
5. User taps on a team in standings
6. **Team Profile** screen opens with full details

### Flow 5: Configure Settings and Auto-Refresh
1. User navigates to **Settings** tab
2. User toggles "Auto-Refresh" to ON
3. User selects refresh interval: 60 seconds
4. User enables notifications for favorite teams
5. Settings are saved automatically
6. User returns to **Live Matches** tab
7. Matches auto-refresh every 60 seconds

## Layout Patterns

### Card Design
- **Rounded corners**: 12-16px for modern feel
- **Elevation**: Subtle shadow for depth
- **Padding**: 16px internal padding for touch targets
- **Spacing**: 12px between cards

### Typography
- **Headers**: Bold, 24-28px for screen titles
- **Body**: Regular, 14-16px for content
- **Captions**: 12px for metadata (time, league, etc.)
- **Numbers/Scores**: Bold, 20-24px for emphasis

### Touch Targets
- **Minimum size**: 44x44px for all tappable elements
- **Button height**: 48-56px for primary actions
- **Card height**: Minimum 80px for list items

### Navigation
- **Bottom Tab Bar**: 4-5 main tabs (Home, Live, Predictions, Leagues, More)
- **Stack Navigation**: For detail screens
- **Modal Sheets**: For filters, settings, quick actions

## Interaction Design

### Animations
- **Pull-to-refresh**: Standard iOS-style refresh indicator
- **Card press**: Scale down to 0.97 with light haptic feedback
- **Live indicator**: Pulsing animation for live matches
- **Score updates**: Subtle fade-in animation for real-time changes

### Feedback
- **Haptics**: Light impact on button press, medium on toggle
- **Toast notifications**: For confirmations and errors
- **Loading states**: Skeleton screens for data loading

## Data Display Priorities

### Live Match Card (Compact)
1. Team names and logos
2. Current score (large, bold)
3. Match status (LIVE, HT, FT) with time
4. League badge

### AI Prediction Card (Compact)
1. Match teams and logos
2. Predicted outcome (Win/Draw/Loss)
3. Confidence score (percentage, color-coded)
4. Match date/time

### Standings Row
1. Rank (bold)
2. Team logo and name
3. Points (bold, right-aligned)
4. Played, W-D-L (compact)

## Accessibility
- **Color contrast**: WCAG AA compliance
- **Text scaling**: Support for dynamic type
- **VoiceOver**: Proper labels for all interactive elements
- **Haptic feedback**: For users with visual impairments

## Performance Considerations
- **Image optimization**: Lazy load team logos and league badges
- **API caching**: 1-minute cache for live data
- **Offline fallback**: Show cached data when API is unavailable
- **Skeleton screens**: Immediate feedback during data loading
