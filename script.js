// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.mission-card, .team-member-card, .sponsor-card, .stat-item, .stat-card, .match-card, .event-card, .award-card, .history-item, .gallery-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // EmailJS Integration
        // To set up EmailJS:
        // 1. Go to https://www.emailjs.com/ and create an account
        // 2. Create an email service (Gmail, Outlook, etc.)
        // 3. Create an email template
        // 4. Get your Public Key, Service ID, and Template ID
        // 5. Initialize EmailJS with: emailjs.init("YOUR_PUBLIC_KEY");
        // 6. Uncomment the code below and replace with your credentials
        
        try {
            // Option 1: Use EmailJS (recommended - uncomment when configured)
            /*
            await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm, {
                publicKey: 'YOUR_PUBLIC_KEY'
            });
            */
            
            // Option 2: Fallback to mailto (current implementation)
            const mailtoLink = `mailto:robophantoms@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#10b981';
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }, 500);
            
        } catch (error) {
            console.error('Error sending email:', error);
            alert('There was an error sending your message. Please email us directly at robophantoms@gmail.com');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Add active class to nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// FTCScout API Integration (GraphQL)
const TEAM_NUMBER = 23954;
const GRAPHQL_API_URL = 'https://api.ftcscout.org/graphql';

// Current season (update this as needed)
// For FTC, the season year is typically the year the season starts (e.g., 2024-2025 season = 2024)
// But the API uses the calendar year, so 2025 season data is under season 2025
const CURRENT_SEASON = new Date().getFullYear();

// Fetch data from FTCScout API
async function fetchFTCTeamData() {
    const loadingEl = document.getElementById('stats-loading');
    const errorEl = document.getElementById('stats-error');
    
    console.log('Starting FTC data fetch for team', TEAM_NUMBER);
    console.log('Loading element:', loadingEl);
    console.log('Error element:', errorEl);

    try {
        // Show loading state
        if (loadingEl) {
            loadingEl.style.display = 'block';
            console.log('Loading state shown');
        }
        if (errorEl) {
            errorEl.style.display = 'none';
        }

        // Fetch all data in parallel for better performance
        console.log('Starting parallel data fetch...');
        
        // Track if any data was successfully displayed
        let statsDisplayed = false;
        let eventsDisplayed = false;
        let awardsDisplayed = false;
        
        // Check if containers exist and are visible after a short delay
        const checkDataDisplay = () => {
            const statsContainer = document.getElementById('quick-stats-container');
            const eventsContainer = document.getElementById('events-container');
            const awardsContainer = document.getElementById('awards-container');
            
            statsDisplayed = statsContainer && statsContainer.style.display !== 'none';
            eventsDisplayed = eventsContainer && eventsContainer.style.display !== 'none';
            awardsDisplayed = awardsContainer && awardsContainer.style.display !== 'none';
            
            console.log('Data display check:', {
                statsDisplayed,
                eventsDisplayed,
                awardsDisplayed
            });
        };
        
        const results = await Promise.allSettled([
            fetchQuickStats().then(() => {
                setTimeout(checkDataDisplay, 500);
                return true;
            }).catch(err => {
                console.error('fetchQuickStats error:', err);
                return false;
            }),
            fetchEvents().then(() => {
                setTimeout(checkDataDisplay, 500);
                return true;
            }).catch(err => {
                console.error('fetchEvents error:', err);
                return false;
            }),
            fetchAwards().then(() => {
                setTimeout(checkDataDisplay, 500);
                return true;
            }).catch(err => {
                console.error('fetchAwards error:', err);
                return false;
            })
        ]);

        console.log('All fetch results:', results);

        // Wait a bit for DOM updates
        await new Promise(resolve => setTimeout(resolve, 1000));
        checkDataDisplay();

        // Check if any requests succeeded or data was displayed
        const hasData = results.some(result => result.status === 'fulfilled') || 
                       statsDisplayed || eventsDisplayed || awardsDisplayed;
        
        console.log('Has data:', hasData, {
            resultsSuccess: results.some(r => r.status === 'fulfilled'),
            statsDisplayed,
            eventsDisplayed,
            awardsDisplayed
        });
        
        // Hide loading state
        if (loadingEl) {
            loadingEl.style.display = 'none';
            console.log('Loading state hidden');
        }
        
        if (!hasData) {
            // All requests failed
            console.log('All requests failed, showing error');
            if (errorEl) {
                errorEl.style.display = 'block';
                errorEl.innerHTML = '<p>Competition data is currently unavailable. The FTCScout API may be experiencing issues or the team may not have competition data available yet.</p><p style="font-size: 0.9rem; margin-top: 0.5rem;">You can check <a href="https://ftcscout.org/teams/23954" target="_blank" style="color: var(--red-accent);">FTCScout.org</a> for the latest competition statistics.</p>';
            }
        } else {
            console.log('Data loaded successfully');
        }
        
        console.log('FTC data fetch completed');

    } catch (error) {
        console.error('Error fetching FTC data:', error);
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.innerHTML = `<p>Unable to load competition data at this time. Please check back later.</p><p style="font-size: 0.9rem; margin-top: 0.5rem;">Error: ${error.message}</p><p style="font-size: 0.9rem; margin-top: 0.5rem;">You can check <a href="https://ftcscout.org/teams/23954" target="_blank" style="color: var(--red-accent);">FTCScout.org</a> for the latest competition statistics.</p>`;
        }
    }
}

// GraphQL query helper
async function graphqlQuery(query, variables = {}) {
    try {
        console.log('Making GraphQL request:', { query, variables });
        const response = await fetch(GRAPHQL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        });
        
        console.log('GraphQL response status:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('GraphQL response error:', errorText);
            throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('GraphQL result:', result);
        
        if (result.errors) {
            console.error('GraphQL errors:', result.errors);
            throw new Error(result.errors[0]?.message || 'GraphQL query failed');
        }
        
        return result.data;
    } catch (error) {
        console.error('GraphQL query error:', error);
        throw error;
    }
}

// Fetch quick stats using GraphQL
async function fetchQuickStats() {
    try {
        console.log(`Fetching quick stats for team ${TEAM_NUMBER}, season ${CURRENT_SEASON}...`);
        
        // GraphQL query to get team statistics from events
        // Use inline fragments for different season stat types
        const query = `
            query GetTeamStats($teamNumber: Int!, $season: Int!) {
                teamByNumber(number: $teamNumber) {
                    name
                    number
                    events(season: $season) {
                        event {
                            code
                            name
                        }
                        stats {
                            ... on TeamEventStats2025 {
                                wins
                                losses
                                ties
                                rank
                                rp
                                tb1
                            }
                            ... on TeamEventStats2024 {
                                wins
                                losses
                                ties
                                rank
                                rp
                                tb1
                            }
                            ... on TeamEventStats2023 {
                                wins
                                losses
                                ties
                                rank
                                rp
                                tb1
                            }
                            ... on TeamEventStats2022 {
                                wins
                                losses
                                ties
                                rank
                                rp
                                tb1
                            }
                        }
                    }
                }
            }
        `;
        
        let data;
        try {
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: CURRENT_SEASON
            });
        } catch (error) {
            console.log(`Current season (${CURRENT_SEASON}) not available, trying previous season...`);
            // Try previous season
            const prevSeason = CURRENT_SEASON - 1;
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: prevSeason
            });
        }
        
        if (data && data.teamByNumber && data.teamByNumber.events) {
            const participations = data.teamByNumber.events;
            console.log('Team event participations from GraphQL:', participations);
            
            // Aggregate stats from all event participations
            let totalWins = 0;
            let totalLosses = 0;
            let totalTies = 0;
            let totalMatches = 0;
            
            participations.forEach(participation => {
                if (participation.stats) {
                    const stats = participation.stats;
                    totalWins += stats.wins || 0;
                    totalLosses += stats.losses || 0;
                    totalTies += stats.ties || 0;
                    // Calculate total matches from wins + losses + ties
                    totalMatches += (stats.wins || 0) + (stats.losses || 0) + (stats.ties || 0);
                }
            });
            
            if (totalMatches > 0) {
                console.log(`Aggregated stats: ${totalWins} wins, ${totalLosses} losses, ${totalTies} ties, ${totalMatches} total matches`);
                displayQuickStats({
                    wins: totalWins,
                    losses: totalLosses,
                    ties: totalTies,
                    totalMatches: totalMatches
                });
            } else {
                console.log('No stats available, trying to calculate from events...');
                await calculateStatsFromEvents();
            }
        } else {
            console.log('No stats available, trying to calculate from events...');
            await calculateStatsFromEvents();
        }
    } catch (error) {
        console.error('Error fetching quick stats:', error);
        // Try fetching events to calculate stats manually
        await calculateStatsFromEvents();
    }
}

// Display quick stats
function displayQuickStats(data) {
    console.log('displayQuickStats called with data:', data);
    const quickStatsContainer = document.getElementById('quick-stats-container');
    if (!quickStatsContainer) {
        console.error('quick-stats-container not found!');
        return;
    }
    if (!data) {
        console.error('No data provided to displayQuickStats');
        return;
    }

    const winsEl = document.getElementById('wins');
    const lossesEl = document.getElementById('losses');
    const totalMatchesEl = document.getElementById('total-matches');
    const winRateEl = document.getElementById('win-rate');

    console.log('Stats elements found:', {
        winsEl: !!winsEl,
        lossesEl: !!lossesEl,
        totalMatchesEl: !!totalMatchesEl,
        winRateEl: !!winRateEl
    });

    // Handle different data formats
    // The quick-stats endpoint returns: {count: X, ...} where count is total matches
    // Or from calculated stats: {wins: X, losses: Y, totalMatches: Z}
    
    if (data.wins !== undefined && winsEl) {
        winsEl.textContent = data.wins || 0;
        console.log('Set wins to:', data.wins || 0);
    }
    if (data.losses !== undefined && lossesEl) {
        lossesEl.textContent = data.losses || 0;
        console.log('Set losses to:', data.losses || 0);
    }
    
    // Total matches can come from totalMatches or count field
    const totalMatches = data.totalMatches !== undefined ? data.totalMatches : (data.count !== undefined ? data.count : 0);
    if (totalMatchesEl) {
        totalMatchesEl.textContent = totalMatches > 0 ? totalMatches : '--';
        console.log('Set total matches to:', totalMatches);
    }
    
    // Calculate win rate if we have wins and total matches
    if (data.wins !== undefined && totalMatches > 0 && winRateEl) {
        const winRate = ((data.wins / totalMatches) * 100).toFixed(1);
        winRateEl.textContent = `${winRate}%`;
        console.log('Set win rate to:', winRate + '%');
    } else if (winRateEl) {
        // If we don't have wins/losses but have total matches, show "--"
        winRateEl.textContent = '--';
    }
    
    // If we don't have wins/losses, keep them as "--"
    if (winsEl && data.wins === undefined) {
        winsEl.textContent = '--';
    }
    if (lossesEl && data.losses === undefined) {
        lossesEl.textContent = '--';
    }

    quickStatsContainer.style.display = 'grid';
    console.log('Quick stats container displayed');
}

// Fetch matches using GraphQL
async function fetchMatches() {
    try {
        console.log(`Fetching matches for team ${TEAM_NUMBER}, season ${CURRENT_SEASON}...`);
        
        // GraphQL query to get matches
        const query = `
            query GetTeamMatches($teamNumber: Int!, $season: Int!) {
                teamByNumber(number: $teamNumber) {
                    matches(season: $season) {
                        matchId
                        eventCode
                        alliance
                        station
                        allianceRole
                        onField
                        surrogate
                        dq
                        noShow
                    }
                }
            }
        `;
        
        let data;
        try {
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: CURRENT_SEASON
            });
        } catch (error) {
            console.log(`Current season matches not available, trying previous season...`);
            const prevSeason = CURRENT_SEASON - 1;
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: prevSeason
            });
        }
        
        if (!data || !data.teamByNumber || !data.teamByNumber.matches) {
            console.log('No matches found');
            return;
        }
        
        const matches = data.teamByNumber.matches;
        console.log('Matches data from GraphQL:', matches);
        
        // Fetch match results to determine win/loss
        await fetchMatchResults(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
    }
}

// Fetch match results from events to determine win/loss using GraphQL
async function fetchMatchResults(matches) {
    try {
        console.log('Fetching match results to determine win/loss...');
        
        // Get unique event codes from matches
        const eventCodes = [...new Set(matches.map(m => m.eventCode).filter(Boolean))];
        
        // Fetch match results for each event using GraphQL
        const matchResultsMap = new Map();
        
        for (const eventCode of eventCodes) {
            try {
                const query = `
                    query GetEventMatches($eventCode: String!) {
                        event(code: $eventCode) {
                            matches {
                                matchId
                                redScore
                                blueScore
                                winner
                                startTime
                            }
                        }
                    }
                `;
                
                const data = await graphqlQuery(query, { eventCode: eventCode });
                
                if (data && data.event && data.event.matches) {
                    data.event.matches.forEach(match => {
                        const key = `${eventCode}-${match.matchId}`;
                        matchResultsMap.set(key, match);
                    });
                }
            } catch (error) {
                console.log(`Could not fetch matches for event ${eventCode}:`, error);
            }
        }
        
        console.log(`Fetched match results for ${matchResultsMap.size} matches`);
        
        // Enrich matches with win/loss data
        const enrichedMatches = matches.map(match => {
            const key = `${match.eventCode}-${match.matchId}`;
            const matchResult = matchResultsMap.get(key);
            
            if (matchResult) {
                // Determine if team won based on alliance and winner
                let result = 'Unknown';
                if (matchResult.winner) {
                    result = match.alliance === matchResult.winner ? 'WIN' : 'LOSS';
                } else if (matchResult.redScore !== undefined && matchResult.blueScore !== undefined) {
                    // Determine winner from scores
                    if (matchResult.redScore > matchResult.blueScore) {
                        result = match.alliance === 'Red' ? 'WIN' : 'LOSS';
                    } else if (matchResult.blueScore > matchResult.redScore) {
                        result = match.alliance === 'Blue' ? 'WIN' : 'LOSS';
                    } else {
                        result = 'TIE';
                    }
                }
                
                return {
                    ...match,
                    result: result,
                    matchResult: matchResult
                };
            }
            
            return match;
        });
        
        displayMatches(enrichedMatches);
    } catch (error) {
        console.error('Error fetching match results:', error);
        // Still display matches even if we can't get results
        displayMatches(matches);
    }
}

// Display matches
function displayMatches(matches) {
    const matchesContainer = document.getElementById('matches-container');
    const matchesList = document.getElementById('matches-list');
    
    if (!matchesContainer || !matchesList) return;
    
    if (!matches || matches.length === 0) {
        matchesContainer.style.display = 'none';
        return;
    }

    // Filter to only matches where team actually played (onField: true)
    const actualMatches = matches.filter(match => match.onField !== false && !match.surrogate);
    
    if (actualMatches.length === 0) {
        matchesContainer.style.display = 'none';
        return;
    }

    // Group matches by event and sort by matchId (most recent first)
    const sortedMatches = actualMatches.sort((a, b) => {
        // Sort by eventCode first, then by matchId descending
        if (a.eventCode !== b.eventCode) {
            return b.eventCode.localeCompare(a.eventCode);
        }
        return (b.matchId || 0) - (a.matchId || 0);
    }).slice(0, 10); // Show only 10 most recent

    let html = '';
    sortedMatches.forEach(match => {
        const eventCode = match.eventCode || 'Unknown';
        const matchId = match.matchId || '';
        const alliance = match.alliance || 'Unknown';
        const station = match.station || '';
        const allianceRole = match.allianceRole || '';
        const result = match.result || 'Unknown';
        const matchResult = match.matchResult || null;
        
        // Determine match type based on matchId
        let matchType = 'Qualification';
        if (matchId >= 20000) matchType = 'Elimination';
        else if (matchId >= 10000) matchType = 'Semifinal';
        else if (matchId >= 5000) matchType = 'Quarterfinal';
        
        // Extract score information
        let redScore = matchResult?.redScore ?? null;
        let blueScore = matchResult?.blueScore ?? null;
        let teamScore = alliance === 'Red' ? redScore : blueScore;
        let opponentScore = alliance === 'Red' ? blueScore : redScore;
        
        // Format date if available
        let matchDate = '';
        if (matchResult?.startTime) {
            try {
                const date = new Date(matchResult.startTime);
                matchDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            } catch (e) {
                // Date parsing failed, skip
            }
        }
        
        // Get opponent alliance
        const opponentAlliance = alliance === 'Red' ? 'Blue' : 'Red';
        
        html += `
            <div class="match-card">
                <div class="match-header">
                    <span class="match-type">${matchType} Match ${matchId}</span>
                    <span class="match-event-code">${eventCode}</span>
                </div>
                <div class="match-details">
                    <div class="match-result-row">
                        <div class="match-result ${result.toLowerCase()}">${result}</div>
                        ${matchDate ? `<div class="match-date">${matchDate}</div>` : ''}
                    </div>
                    ${(redScore !== null && blueScore !== null) ? `
                    <div class="match-score-section">
                        <div class="score-display">
                            <div class="score-alliance ${alliance.toLowerCase()}">
                                <span class="score-label">${alliance} Alliance</span>
                                <span class="score-value">${teamScore}</span>
                            </div>
                            <div class="score-separator">vs</div>
                            <div class="score-alliance ${opponentAlliance.toLowerCase()}">
                                <span class="score-label">${opponentAlliance} Alliance</span>
                                <span class="score-value">${opponentScore}</span>
                            </div>
                        </div>
                    </div>
                    ` : `
                    <div class="match-alliance alliance-${alliance.toLowerCase()}">${alliance} Alliance</div>
                    `}
                    <div class="match-info-grid">
                        <div class="match-info-item">
                            <span class="match-info-label">Station:</span>
                            <span class="match-info-value">${station}</span>
                        </div>
                        ${allianceRole ? `
                        <div class="match-info-item">
                            <span class="match-info-label">Role:</span>
                            <span class="match-info-value">${allianceRole}</span>
                        </div>
                        ` : ''}
                    </div>
                    ${match.dq ? '<div class="match-status dq">Disqualified</div>' : ''}
                    ${match.noShow ? '<div class="match-status no-show">No Show</div>' : ''}
                </div>
            </div>
        `;
    });

    matchesList.innerHTML = html;
    matchesContainer.style.display = 'block';
}

// Calculate season-wide stats from events (which have wins/losses per event)
async function calculateStatsFromEvents(quickStatsData = null) {
    try {
        console.log('Calculating season stats from events...');
        
        // Use GraphQL to fetch events
        const query = `
            query GetTeamEvents($teamNumber: Int!, $season: Int!) {
                teamByNumber(number: $teamNumber) {
                    events(season: $season) {
                        stats {
                            ... on TeamEventStats2025 {
                                wins
                                losses
                                ties
                            }
                            ... on TeamEventStats2024 {
                                wins
                                losses
                                ties
                            }
                            ... on TeamEventStats2023 {
                                wins
                                losses
                                ties
                            }
                            ... on TeamEventStats2022 {
                                wins
                                losses
                                ties
                            }
                        }
                    }
                }
            }
        `;
        
        let data;
        try {
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: CURRENT_SEASON
            });
        } catch (error) {
            const prevSeason = CURRENT_SEASON - 1;
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: prevSeason
            });
        }
        
        if (!data || !data.teamByNumber || !data.teamByNumber.events) {
            console.log('Cannot fetch events for stats calculation');
            return;
        }
        
        const participations = data.teamByNumber.events;
        
        if (!participations || participations.length === 0) {
            console.log('No events found');
            return;
        }
        
        // Calculate totals from all event participations
        let totalWins = 0;
        let totalLosses = 0;
        let totalTies = 0;
        let totalMatches = 0;
        
        participations.forEach(participation => {
            if (participation.stats) {
                const stats = participation.stats;
                totalWins += stats.wins || 0;
                totalLosses += stats.losses || 0;
                totalTies += stats.ties || 0;
                totalMatches += (stats.wins || 0) + (stats.losses || 0) + (stats.ties || 0);
            }
        });
        
        if (totalMatches > 0) {
            console.log(`Season stats calculated from events: ${totalWins} wins, ${totalLosses} losses, ${totalTies} ties, ${totalMatches} total matches`);
            displayQuickStats({
                wins: totalWins,
                losses: totalLosses,
                ties: totalTies,
                totalMatches: totalMatches
            });
        } else {
            console.log('No completed matches found in events');
        }
    } catch (error) {
        console.error('Error calculating stats from events:', error);
    }
}

// Calculate stats from matches using GraphQL (fallback)
async function calculateStatsFromMatches(quickStatsData = null) {
    try {
        console.log('Calculating stats from matches...');
        
        // GraphQL query to get matches
        const query = `
            query GetTeamMatches($teamNumber: Int!, $season: Int!) {
                teamByNumber(number: $teamNumber) {
                    matches(season: $season) {
                        matchId
                        eventCode
                        onField
                        surrogate
                    }
                }
            }
        `;
        
        let data;
        try {
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: CURRENT_SEASON
            });
        } catch (error) {
            const prevSeason = CURRENT_SEASON - 1;
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: prevSeason
            });
        }
        
        if (!data || !data.teamByNumber || !data.teamByNumber.matches) {
            console.log('Cannot fetch matches for stats calculation');
            return;
        }
        
        const matches = data.teamByNumber.matches;
        
        if (!matches || matches.length === 0) {
            console.log('No matches found to calculate stats');
            return;
        }
        
        // Filter to only matches the team actually played (onField: true)
        // Exclude surrogate matches or matches where the team didn't play
        const actualMatches = matches.filter(match => match.onField !== false && !match.surrogate);
        
        console.log(`Found ${matches.length} total match participations, ${actualMatches.length} actual matches played`);
        
        // Count unique matches (same matchId/eventCode combination)
        const uniqueMatches = new Set();
        actualMatches.forEach(match => {
            const matchKey = `${match.eventCode}-${match.matchId}`;
            uniqueMatches.add(matchKey);
        });
        
        const totalMatches = uniqueMatches.size || actualMatches.length;
        
        console.log(`Team played ${totalMatches} unique matches this season`);
        
        // Show total matches
        displayQuickStats({
            totalMatches: totalMatches
        });
        
    } catch (error) {
        console.error('Error calculating stats from matches:', error);
    }
}

// Fetch events using GraphQL
async function fetchEvents() {
    try {
        console.log(`Fetching events for team ${TEAM_NUMBER}, season ${CURRENT_SEASON}...`);
        
        // GraphQL query to get team events
        const query = `
            query GetTeamEvents($teamNumber: Int!, $season: Int!) {
                teamByNumber(number: $teamNumber) {
                    events(season: $season) {
                        event {
                            code
                            name
                        }
                        stats {
                            ... on TeamEventStats2025 {
                                wins
                                losses
                                ties
                                rank
                                rp
                                tb1
                            }
                            ... on TeamEventStats2024 {
                                wins
                                losses
                                ties
                                rank
                                rp
                                tb1
                            }
                            ... on TeamEventStats2023 {
                                wins
                                losses
                                ties
                                rank
                                rp
                                tb1
                            }
                            ... on TeamEventStats2022 {
                                wins
                                losses
                                ties
                                rank
                                rp
                                tb1
                            }
                        }
                    }
                }
            }
        `;
        
        let data;
        try {
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: CURRENT_SEASON
            });
        } catch (error) {
            console.log('Trying previous season...');
            const prevSeason = CURRENT_SEASON - 1;
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: prevSeason
            });
        }
        
        if (data && data.teamByNumber && data.teamByNumber.events) {
            const participations = data.teamByNumber.events;
            console.log('Events data from GraphQL:', participations);
            
            // Transform GraphQL response to match expected format
            const formattedEvents = participations.map(participation => {
                const event = participation.event;
                const stats = participation.stats;
                const qualMatchesPlayed = stats ? ((stats.wins || 0) + (stats.losses || 0) + (stats.ties || 0)) : 0;
                
                return {
                    eventCode: event?.code || '',
                    eventName: event?.name || 'Unknown Event',
                    eventDate: null, // Event date not available in this query
                    stats: stats ? {
                        wins: stats.wins || 0,
                        losses: stats.losses || 0,
                        ties: stats.ties || 0,
                        qualMatchesPlayed: qualMatchesPlayed,
                        rank: stats.rank,
                        rp: stats.rp ?? null, // Ranking Points
                        tb1: stats.tb1 ?? null, // Tie Breaker 1
                        tot: null,
                        avg: null,
                        opr: null,
                        min: null,
                        max: null
                    } : null
                };
            });
            
            // Store events data for charts
            storedEventsData = formattedEvents;
            displayEvents(formattedEvents);
        } else {
            console.log('No events found');
            storedEventsData = [];
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Display events
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    const eventsList = document.getElementById('events-list');
    
    if (!eventsContainer || !eventsList) return;
    
    if (!events || events.length === 0) {
        eventsContainer.style.display = 'none';
        return;
    }

    // Sort events by eventCode (most recent first typically has higher numbers)
    const sortedEvents = events.sort((a, b) => {
        // Sort by eventCode descending (assuming newer events have higher codes)
        if (a.eventCode && b.eventCode) {
            return b.eventCode.localeCompare(a.eventCode);
        }
        return 0;
    });

    let html = '';
    sortedEvents.forEach(event => {
        const stats = event.stats;
        const hasStats = stats && stats.qualMatchesPlayed > 0;
        
        // Calculate win rate if we have stats
        let winRate = '--';
        if (hasStats && stats.qualMatchesPlayed > 0) {
            winRate = ((stats.wins / stats.qualMatchesPlayed) * 100).toFixed(1) + '%';
        }
        
        // Format record
        const record = hasStats ? `${stats.wins}-${stats.losses}-${stats.ties}` : '--';
        
        html += `
            <div class="event-card">
                <div class="event-header">
                    <h4>${event.eventCode || 'Unknown Event'}</h4>
                    ${hasStats ? `<span class="event-rank">Rank: ${stats.rank}</span>` : ''}
                </div>
                ${hasStats ? `
                <div class="event-performance">
                    <div class="performance-row">
                        <div class="performance-item">
                            <span class="performance-label">Matches Played:</span>
                            <span class="performance-value">${stats.qualMatchesPlayed}</span>
                        </div>
                        <div class="performance-item">
                            <span class="performance-label">Wins:</span>
                            <span class="performance-value">${stats.wins}</span>
                        </div>
                        <div class="performance-item">
                            <span class="performance-label">Losses:</span>
                            <span class="performance-value">${stats.losses}</span>
                        </div>
                        <div class="performance-item">
                            <span class="performance-label">Ties:</span>
                            <span class="performance-value">${stats.ties}</span>
                        </div>
                    </div>
                    <div class="performance-row">
                        <div class="performance-item">
                            <span class="performance-label">Record:</span>
                            <span class="performance-value">${record}</span>
                        </div>
                        <div class="performance-item">
                            <span class="performance-label">Win Rate:</span>
                            <span class="performance-value">${winRate}</span>
                        </div>
                        <div class="performance-item">
                            <span class="performance-label">Ranking Points:</span>
                            <span class="performance-value">${stats.rp !== null && stats.rp !== undefined ? stats.rp : '--'}</span>
                        </div>
                        <div class="performance-item">
                            <span class="performance-label">Tie Breaker 1:</span>
                            <span class="performance-value">${stats.tb1 !== null && stats.tb1 !== undefined ? stats.tb1 : '--'}</span>
                        </div>
                    </div>
                    ${stats.tot ? `
                    <div class="match-scores-section">
                        <h5>Match Scores</h5>
                        <div class="match-scores-grid">
                            <div class="score-row">
                                <div class="score-label">Total Points (TOT):</div>
                                <div class="score-value">${stats.tot.totalPointsNp || stats.tot.totalPoints || '--'}</div>
                            </div>
                            <div class="score-row">
                                <div class="score-label">Average Points (AVG):</div>
                                <div class="score-value">${stats.avg.totalPointsNp || stats.avg.totalPoints || '--'}</div>
                            </div>
                            <div class="score-row">
                                <div class="score-label">OPR:</div>
                                <div class="score-value">${stats.opr.totalPointsNp ? stats.opr.totalPointsNp.toFixed(2) : (stats.opr.totalPoints ? stats.opr.totalPoints.toFixed(2) : '--')}</div>
                            </div>
                            <div class="score-row">
                                <div class="score-label">Min:</div>
                                <div class="score-value">${stats.min.totalPointsNp || stats.min.totalPoints || '--'}</div>
                            </div>
                            <div class="score-row">
                                <div class="score-label">Max:</div>
                                <div class="score-value">${stats.max.totalPointsNp || stats.max.totalPoints || '--'}</div>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                </div>
                ` : '<div class="event-details">No statistics available for this event yet.</div>'}
            </div>
        `;
    });

    eventsList.innerHTML = html;
    eventsContainer.style.display = 'block';
}

// Fetch awards using GraphQL
async function fetchAwards() {
    try {
        console.log(`Fetching awards for team ${TEAM_NUMBER}, season ${CURRENT_SEASON}...`);
        
        // GraphQL query to get team awards
        const query = `
            query GetTeamAwards($teamNumber: Int!, $season: Int!) {
                teamByNumber(number: $teamNumber) {
                    awards(season: $season) {
                        name
                        event {
                            code
                            name
                            date
                        }
                    }
                }
            }
        `;
        
        let data;
        try {
            data = await graphqlQuery(query, {
                teamNumber: TEAM_NUMBER,
                season: CURRENT_SEASON
            });
        } catch (error) {
            console.log('Trying previous season for awards...');
            const prevSeason = CURRENT_SEASON - 1;
            try {
                data = await graphqlQuery(query, {
                    teamNumber: TEAM_NUMBER,
                    season: prevSeason
                });
            } catch (prevError) {
                console.log('Awards fetch failed:', prevError);
                return;
            }
        }
        
        if (data && data.teamByNumber && data.teamByNumber.awards) {
            const awards = data.teamByNumber.awards;
            console.log('Awards data from GraphQL:', awards);
            
            // Transform GraphQL response to match expected format
            const formattedAwards = awards.map(award => ({
                name: award.name,
                awardName: award.name,
                eventName: award.event?.name || 'Unknown Event',
                event: award.event?.name || 'Unknown Event',
                eventCode: award.event?.code || '',
                eventDate: award.event?.date || null,
                date: award.event?.date || null,
                awardedDate: award.event?.date || null
            }));
            
            displayAwards(formattedAwards);
        } else {
            console.log('No awards found');
        }
    } catch (error) {
        console.error('Error fetching awards:', error);
    }
}

// Display awards
function displayAwards(awards) {
    const awardsContainer = document.getElementById('awards-container');
    const awardsList = document.getElementById('awards-list');
    
    if (!awardsContainer || !awardsList) return;
    
    if (!awards || awards.length === 0) {
        awardsContainer.style.display = 'none';
        return;
    }

    // Sort awards by date (most recent first)
    const sortedAwards = awards.sort((a, b) => {
        const dateA = a.eventDate || a.date || a.awardedDate;
        const dateB = b.eventDate || b.date || b.awardedDate;
        if (dateA && dateB) {
            return new Date(dateB) - new Date(dateA);
        }
        return 0;
    });

    let html = '';
    sortedAwards.forEach(award => {
        const eventDate = (award.eventDate || award.date || award.awardedDate) 
            ? new Date(award.eventDate || award.date || award.awardedDate).toLocaleDateString() 
            : 'TBD';
        
        html += `
            <div class="award-card">
                <div class="award-icon">🏆</div>
                <div class="award-details">
                    <h4>${award.name || award.awardName || 'Award'}</h4>
                    <div class="award-event">${award.eventName || award.event || 'Unknown Event'}</div>
                    <div class="award-date">${eventDate}</div>
                </div>
            </div>
        `;
    });

    awardsList.innerHTML = html;
    awardsContainer.style.display = 'block';
}

// Load FTC data when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if statistics section exists before fetching
    const statsSection = document.getElementById('statistics');
    if (statsSection) {
        // Add timeout to hide loading if API takes too long
        const loadingTimeout = setTimeout(() => {
            const loadingEl = document.getElementById('stats-loading');
            const errorEl = document.getElementById('stats-error');
            if (loadingEl && loadingEl.style.display !== 'none') {
                loadingEl.style.display = 'none';
                if (errorEl) {
                    errorEl.style.display = 'block';
                    errorEl.innerHTML = '<p>Competition data is currently unavailable. The FTCScout API may be experiencing issues or the team may not have competition data available yet.</p><p style="font-size: 0.9rem; margin-top: 0.5rem;">You can check <a href="https://ftcscout.org/teams/23954" target="_blank" style="color: var(--red-accent);">FTCScout.org</a> for the latest competition statistics.</p>';
                }
            }
        }, 10000); // 10 second timeout
        
        fetchFTCTeamData().finally(() => {
            clearTimeout(loadingTimeout);
        });
    }
    
    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Add lazy loading to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        // Skip if already in viewport or if it's a critical image
        if (img.src.includes('RoboPhantomLogo') || img.src.includes('hero')) {
            return;
        }
        img.setAttribute('loading', 'lazy');
    });
});

// ===== Interactive Statistics Charts =====
let winLossChart = null;
let eventPerformanceChart = null;
let seasonProgressChart = null;
let storedEventsData = []; // Store events data for charts

function createCharts(statsData, eventsData) {
    // Win/Loss Distribution Chart
    const winLossCtx = document.getElementById('winLossChart');
    if (winLossCtx && statsData.wins !== '--' && statsData.losses !== '--') {
        const wins = parseInt(statsData.wins) || 0;
        const losses = parseInt(statsData.losses) || 0;
        const ties = parseInt(statsData.ties) || 0;
        
        if (winLossChart) winLossChart.destroy();
        winLossChart = new Chart(winLossCtx, {
            type: 'doughnut',
            data: {
                labels: ['Wins', 'Losses', 'Ties'],
                datasets: [{
                    data: [wins, losses, ties],
                    backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Event Performance Chart
    const eventCtx = document.getElementById('eventPerformanceChart');
    // Use stored events data if available, otherwise try to extract from eventsData parameter
    const eventsForChart = storedEventsData.length > 0 ? storedEventsData : (eventsData || []);
    
    if (eventCtx && eventsForChart && eventsForChart.length > 0) {
        // Sort events and take up to 5 most recent
        const sortedEvents = [...eventsForChart].sort((a, b) => {
            if (a.eventCode && b.eventCode) {
                return b.eventCode.localeCompare(a.eventCode);
            }
            return 0;
        }).slice(0, 5);
        
        const eventNames = sortedEvents.map(e => {
            // Try to get event name, fallback to code
            if (e.eventName && e.eventName !== 'Unknown Event') {
                return e.eventName.length > 20 ? e.eventName.substring(0, 20) + '...' : e.eventName;
            }
            return e.eventCode || 'Event';
        });
        
        const winRates = sortedEvents.map(e => {
            if (e.stats && e.stats.qualMatchesPlayed > 0) {
                const winRate = (e.stats.wins / e.stats.qualMatchesPlayed) * 100;
                return parseFloat(winRate.toFixed(1));
            }
            return 0;
        });
        
        if (eventPerformanceChart) eventPerformanceChart.destroy();
        eventPerformanceChart = new Chart(eventCtx, {
            type: 'bar',
            data: {
                labels: eventNames,
                datasets: [{
                    label: 'Win Rate (%)',
                    data: winRates,
                    backgroundColor: '#dc2626',
                    borderColor: '#b91c1c',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Win Rate: ' + context.parsed.y.toFixed(1) + '%';
                            }
                        }
                    }
                }
            }
        });
    } else if (eventCtx) {
        // Show empty state message
        eventCtx.parentElement.innerHTML = '<p style="text-align: center; color: var(--gray-dark); padding: 2rem;">No event performance data available yet.</p>';
    }

    // Season Progress Chart - Cumulative Wins across events
    const progressCtx = document.getElementById('seasonProgressChart');
    const eventsForProgress = storedEventsData.length > 0 ? storedEventsData : (eventsData || []);
    
    if (progressCtx && eventsForProgress && eventsForProgress.length > 0) {
        // Sort events chronologically (by event code or name)
        const sortedEvents = [...eventsForProgress].sort((a, b) => {
            if (a.eventCode && b.eventCode) {
                return a.eventCode.localeCompare(b.eventCode);
            }
            return 0;
        });
        
        // Calculate cumulative wins
        let cumulativeWins = 0;
        const cumulativeData = sortedEvents.map((event, index) => {
            if (event.stats && event.stats.wins) {
                cumulativeWins += event.stats.wins;
            }
            return cumulativeWins;
        });
        
        // Create event labels
        const eventLabels = sortedEvents.map((event, index) => {
            if (event.eventName && event.eventName !== 'Unknown Event') {
                const shortName = event.eventName.length > 15 ? event.eventName.substring(0, 15) + '...' : event.eventName;
                return `E${index + 1}: ${shortName}`;
            }
            return `Event ${index + 1}`;
        });
        
        if (seasonProgressChart) seasonProgressChart.destroy();
        seasonProgressChart = new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: eventLabels,
                datasets: [{
                    label: 'Cumulative Wins',
                    data: cumulativeData,
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#dc2626',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Cumulative Wins: ' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    } else if (progressCtx) {
        // Show empty state message
        progressCtx.parentElement.innerHTML = '<p style="text-align: center; color: var(--gray-dark); padding: 2rem;">No season progress data available yet.</p>';
    }
}

// Store original displayQuickStats
const originalDisplayQuickStats = displayQuickStats;

// Override displayQuickStats to also create charts
window.displayQuickStats = function(data) {
    originalDisplayQuickStats(data);
    
    // Show charts container
    const chartsContainer = document.getElementById('charts-container');
    if (chartsContainer) {
        chartsContainer.style.display = 'block';
        
        // Create charts using stored events data
        // Wait a bit to ensure events data is stored
        setTimeout(() => {
            createCharts(data, storedEventsData);
        }, 500);
    }
};

// ===== Multi-Language Support =====
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.robot': 'Meet the Robot',
        'nav.mission': 'Mission',
        'nav.team': 'Our Team',
        'nav.outreach': 'Outreach',
        'nav.statistics': 'Statistics',
        'nav.history': 'History',
        'nav.gallery': 'Gallery',
        'nav.blog': 'News',
        'nav.sponsors': 'Sponsors',
        'nav.join': 'Join Us',
        'nav.contact': 'Contact'
    },
    es: {
        'nav.home': 'Inicio',
        'nav.robot': 'Conoce el Robot',
        'nav.mission': 'Misión',
        'nav.team': 'Nuestro Equipo',
        'nav.outreach': 'Alcance',
        'nav.statistics': 'Estadísticas',
        'nav.history': 'Historia',
        'nav.gallery': 'Galería',
        'nav.blog': 'Noticias',
        'nav.sponsors': 'Patrocinadores',
        'nav.join': 'Únete',
        'nav.contact': 'Contacto'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update navigation
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const langBtn = document.getElementById(`lang-${lang}`);
    if (langBtn) langBtn.classList.add('active');
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);
});

// ===== 3D Robot Viewer Toggle =====
function toggle3DViewer() {
    const viewer = document.getElementById('robot-3d-viewer');
    const image = document.querySelector('.robot-image');
    const toggleBtn = document.querySelector('.btn-3d-toggle');
    
    if (viewer && image) {
        if (viewer.style.display === 'none' || !viewer.style.display) {
            image.style.display = 'none';
            viewer.style.display = 'flex';
            if (toggleBtn) toggleBtn.textContent = 'View 2D Image';
        } else {
            viewer.style.display = 'none';
            image.style.display = 'block';
            if (toggleBtn) toggleBtn.textContent = 'View 3D Model';
        }
    }
}

// ===== Advanced Scroll Animations =====
// Reuse observerOptions from above (already defined at line 52)
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            scrollObserver.observe(el);
        });
        
        // Add animate-on-scroll to new sections
        const sectionsToAnimate = [
            '.evolution-item',
            '.blog-card',
            '.alumni-card',
            '.process-step',
            '.chart-card'
        ];
        
        sectionsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-on-scroll');
                scrollObserver.observe(el);
            });
        });
    }, 100);
});

// ===== Newsletter Form Handler =====
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(newsletterForm);
            const email = formData.get('email');
            const name = formData.get('name');
            
            // Here you would integrate with your email service (EmailJS, Mailchimp, etc.)
            // For now, we'll use a simple mailto fallback
            const mailtoLink = `mailto:robophantoms@gmail.com?subject=Newsletter Subscription&body=Name: ${name}%0AEmail: ${email}`;
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for subscribing! We\'ll be in touch soon.');
            newsletterForm.reset();
        });
    }

    // ===== Application Form Handler =====
    const applicationForm = document.getElementById('application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(applicationForm);
            const data = Object.fromEntries(formData);
            
            // Get selected interests
            const interests = Array.from(applicationForm.querySelectorAll('input[name="interests"]:checked'))
                .map(cb => cb.value);
            
            // Here you would integrate with your backend or email service
            // For now, we'll use a mailto fallback
            const subject = 'New Team Application';
            const body = `
Name: ${data.name}
Email: ${data.email}
Grade: ${data.grade}
School: ${data.school}
Interests: ${interests.join(', ')}
Experience: ${data.experience || 'None'}
Why Join: ${data.why}
            `.trim();
            
            const mailtoLink = `mailto:robophantoms@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your application! We\'ll review it and get back to you soon.');
            applicationForm.reset();
        });
    }
});


