export const navItems = [
    { name: 'Clients', path: '/clients', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Content', path: '/content/messages', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Team', path: '/team/dashboard', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Integrations', path: '/integrations', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

export const clientTabs = [
    { name: 'All Clients', path: '/clients' },
    { name: 'Uncontacted', path: '/clients/uncontacted' },
    { name: 'Follow Ups', path: '/clients/follow-ups' },
    { name: 'Recently Viewed Content', path: '/clients/recently-viewed' }
];

export const contentTabs = [
    { name: 'Messages', path: '/content/messages' },
    { name: 'Files', path: '/content/files' },
    { name: 'Pages', path: '/content/pages' }
];

export const teamTabs = [
    { name: 'Dashboard', path: '/team/dashboard' },
    { name: 'Team Members', path: '/team/manage' },
    { name: 'Lead Assignment', path: '/team/lead-assignment' }
];

export const integrationsTabs = [
    { name: 'Lead Sources', path: '/integrations/' },
    { name: 'Import/Export Clients', path: '/integrations/other' },
];

export const integrations = [
    {
        icon: 'https://example.com/facebook-icon.png',
        name: 'Facebook',
        description: 'Receive new leads from Facebook & Instagram Lead Ads in your Privyr account',
        status: 'Not Connected',
        action: 'Connect',
    },
    {
        icon: 'https://example.com/linkedin-icon.png',
        name: 'LinkedIn',
        description: 'Receive new leads from LinkedIn Lead Generation ads in your Privyr account',
        status: 'Not Connected',
        action: 'Connect',
    },
    {
        icon: 'https://example.com/wordpress-icon.png',
        name: 'WordPress Websites',
        description: 'Receive new leads from your WordPress website contact forms in your Privyr account',
        status: 'Not Connected',
        action: 'Connect',
    },
    {
        icon: 'https://example.com/google-forms-icon.png',
        name: 'Google Forms',
        description: 'Receive new leads from Google Forms in your Privyr account',
        status: 'Not Connected',
        action: 'Configure',
    },
];