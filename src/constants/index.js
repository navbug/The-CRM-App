import { BsFillDiagram3Fill } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdSettingsInputComponent } from "react-icons/md";

export const navItems = [
    { name: 'Clients', path: '/clients', icon: IoPeople },
    { name: 'Content', path: '/content/messages', icon: FaFile },
    { name: 'Team', path: '/team/dashboard', icon: BsFillDiagram3Fill },
    { name: 'Integrations', path: '/integrations', icon: MdSettingsInputComponent },
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
    { name: 'Lead Sources', path: '/integrations' },
    { name: 'Import/Export Clients', path: '/integrations/other' },
];

export const navigationTabs = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Users', path: '/admin/dashboard/users' },
    { name: 'Content', path: '/admin/dashboard/content' },
    { name: 'Teams', path: '/admin/dashboard/teams' },
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