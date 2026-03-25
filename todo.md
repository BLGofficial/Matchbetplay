# MatchBet Play - TODO

## App Branding
- [x] Generate custom app logo for MatchBet Play
- [x] Update app.config.ts with app name and logo URL
- [x] Copy logo to all required locations (icon, splash, favicon, android)

## Core UI Structure
- [x] Create bottom tab navigation (Home, Live, Predictions, Leagues, More)
- [x] Add icon mappings for all tabs in icon-symbol.tsx
- [x] Update theme colors to match design (green, purple, blue accents)
- [x] Create reusable card components for matches and predictions

## Home/Dashboard Screen
- [x] Featured live matches section (top 3-4)
- [x] AI prediction highlights
- [x] Quick stats display (win rate, total predictions)
- [x] Quick action buttons
- [x] Pull-to-refresh functionality

## Live Matches Screen
- [x] Real-time match list with scores
- [x] Live match indicators (pulsing animation)
- [x] League filter selector
- [x] Auto-refresh every 60 seconds
- [x] Manual refresh button
- [x] Half-time scores display
- [x] Match status badges (1H, 2H, HT, FT)

## Match Detail Screen
- [ ] Team names, logos, and current score
- [ ] Match timeline and key events
- [ ] Head-to-head statistics
- [ ] AI prediction panel with confidence score
- [ ] Betting odds comparison
- [ ] Team form (last 5 matches)
- [ ] Player statistics
- [ ] Add to favorites functionality
- [ ] Share prediction feature

## AI Predictions Screen
- [x] List of upcoming matches with predictions
- [x] Confidence score display (0-100%)
- [x] Predicted outcome badges
- [x] Key factors influencing prediction
- [x] Historical accuracy display
- [x] Filter by league, date, confidence
- [ ] Sort options
- [ ] Save to watchlist

## Leagues & Standings Screen
- [x] League selector (6 major leagues)
- [x] Current standings table
- [x] Team rank, logo, name display
- [x] Match statistics (P, W, D, L, GF, GA, Pts)
- [ ] Top scorers section
- [ ] Tap team to view profile

## Teams Search Screen
- [x] Search bar with debounced input (500ms)
- [x] Real-time search results
- [x] Team logo, name, country display
- [x] Current form indicator
- [x] Add team to favorites
- [ ] Tap to view team profile

## Team Profile Screen
- [ ] Team header with logo, name, league
- [ ] Current form (last 5 matches)
- [ ] Upcoming fixtures
- [ ] Recent results
- [ ] Squad statistics
- [ ] Venue information
- [ ] Add/remove from favorites

## Betting Hub Screen
- [ ] Active bets tracking
- [ ] Betting recommendations based on AI
- [ ] Odds comparison from multiple bookmakers
- [ ] Betting history and performance
- [ ] Win/loss statistics
- [ ] Responsible gambling tools
- [ ] Export betting history

## Favorites Screen
- [x] Saved teams list
- [ ] Quick access to team profiles
- [ ] Upcoming matches for favorites
- [ ] Recent results for favorites
- [x] Remove from favorites
- [ ] Reorder favorites

## Settings Screen
- [x] Auto-refresh toggle
- [x] Refresh interval selector (30s, 60s, 120s)
- [x] Notification preferences
- [ ] Theme selection (light/dark/auto)
- [x] API status indicator
- [x] About and legal information

## API Integration
- [ ] Football API service setup (API-Sports)
- [ ] Live matches endpoint integration
- [ ] League standings endpoint
- [ ] Team search endpoint
- [ ] Fixture details endpoint
- [ ] Head-to-head statistics endpoint
- [ ] Odds endpoint
- [ ] Top scorers endpoint
- [ ] API caching (1-minute expiry)
- [ ] Fallback to mock data when API unavailable
- [ ] API status indicator in UI

## AI Features
- [ ] AI prediction service integration
- [ ] Confidence score calculation
- [ ] Key factors analysis
- [ ] Historical accuracy tracking
- [ ] Betting recommendations engine

## Data Persistence
- [x] AsyncStorage setup for user preferences
- [x] Save favorite teams
- [ ] Save auto-refresh settings
- [ ] Save notification preferences
- [ ] Cache API responses

## Animations & Interactions
- [ ] Pull-to-refresh animation
- [ ] Card press feedback (scale + haptic)
- [ ] Live indicator pulsing animation
- [ ] Score update fade-in animation
- [ ] Skeleton loading screens
- [ ] Toast notifications

## Testing & Polish
- [ ] Test all user flows end-to-end
- [ ] Verify all buttons and links work
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on web browser
- [ ] Verify haptic feedback on device
- [ ] Check accessibility (VoiceOver, color contrast)
- [ ] Performance optimization (image loading, API calls)
