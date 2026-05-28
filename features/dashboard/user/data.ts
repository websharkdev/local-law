import {
  Activity,
  Bookmark,
  Briefcase,
  Car,
  Heart,
  Landmark,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type LegalCategory = {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
};

export type TopLawyer = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatarUrl?: string;
};

export type RecentDocument = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type TrendingQuestion = {
  id: string;
  text: string;
  href: string;
  hasExternalLink?: boolean;
};

export const LEGAL_CATEGORIES: LegalCategory[] = [
  {
    id: 'labor',
    icon: Briefcase,
    name: 'Labor & Employment',
    description: 'Salary, contracts, termination',
    href: '/laws/labor',
  },
  {
    id: 'traffic',
    icon: Car,
    name: 'Traffic & Fines',
    description: 'Violations, appeals, licenses',
    href: '/laws/traffic',
  },
  {
    id: 'family',
    icon: Heart,
    name: 'Family Law',
    description: 'Marriage, custody, inheritance',
    href: '/laws/family',
  },
  {
    id: 'consumer',
    icon: ShieldCheck,
    name: 'Consumer Protection',
    description: 'Returns, warranties, fraud',
    href: '/laws/consumer',
  },
  {
    id: 'banking',
    icon: Landmark,
    name: 'Banking & Finance',
    description: 'Loans, disputes, regulations',
    href: '/laws/banking',
  },
  {
    id: 'healthcare',
    icon: Activity,
    name: 'Healthcare & Medical',
    description: 'Malpractice, insurance, rights',
    href: '/laws/healthcare',
  },
];

export const SAVED_CATEGORY: LegalCategory = {
  id: 'saved',
  icon: Bookmark,
  name: 'Saved',
  description: '',
  href: '/saved',
};

export const TOP_LAWYERS: TopLawyer[] = [
  {
    id: '1',
    name: 'Abdullah Al-Busaeedi',
    role: 'Lawyer / Advocate',
    specialty: 'Civil Law',
  },
  {
    id: '2',
    name: 'Khalid Atiq Al Marri',
    role: 'Lawyer / Advocate',
    specialty: 'Corporate',
  },
  {
    id: '3',
    name: 'Dr. Badereldin Elhadi Suliman',
    role: 'Lawyer / Advocate',
    specialty: 'Civil Law',
  },
  {
    id: '4',
    name: 'Mahmoud Hamdan',
    role: 'Lawyer / Advocate',
    specialty: 'Commercial Law',
  },
  {
    id: '5',
    name: 'Khalid Atiq Al Marri',
    role: 'Lawyer / Advocate',
    specialty: 'Civil Law',
  },
];

export const RECENT_DOCUMENTS: RecentDocument[] = [
  {
    id: '1',
    title: 'Demand Letter - Salary',
    description: 'Official notice used for rental termi...',
    href: '/documents/1',
  },
  {
    id: '2',
    title: 'Rental Notice - Dubai',
    description: 'Formal letter requesting unpaid sal...',
    href: '/documents/2',
  },
];

export const TRENDING_QUESTIONS: TrendingQuestion[] = [
  { id: '1', text: 'Salary delay in UAE', href: '/chat?q=salary-delay' },
  {
    id: '2',
    text: 'Can I leave without notice?',
    href: '/chat?q=leave-without-notice',
    hasExternalLink: true,
  },
  {
    id: '3',
    text: 'Rental deposit disputes',
    href: '/chat?q=rental-deposit',
  },
  {
    id: '4',
    text: 'How to send a legal notice',
    href: '/chat?q=legal-notice',
  },
];

export const AI_CHAT_CHIPS = [
  'Draft a document',
  'Explain my rights',
  'Find relevant laws',
  'Check my situation',
  'Steps to take',
];
