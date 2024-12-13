import { StaticImageData } from 'next/image'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

export type TeamMember = {
  name: string;
  role: string;
  image: StaticImageData;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Chrisse Talaban',
    role: 'TRAVEL PARTNER',
    image: jumpseatIcon,
  },
  {
    name: 'Jim Bernardo',
    role: 'TRAVEL PARTNER',
    image: jumpseatIcon,
  },
  {
    name: 'Chuckie Tandoc',
    role: 'PARTNERSHIPS',
    image: jumpseatIcon,
  },
  {
    name: 'Vince Ramirez',
    role: 'FINANCE',
    image: jumpseatIcon,
  },
  {
    name: 'Leilani Paragas',
    role: 'OPERATIONS',
    image: jumpseatIcon,
  },
  {
    name: 'Darrel Mendoza',
    role: 'INFORMATION TECHNOLOGY',
    image: jumpseatIcon,
  },
  {
    name: 'Jacob Delos Reyes',
    role: 'BRANDING',
    image: jumpseatIcon,
  },
  {
    name: 'Hazel Flores',
    role: 'LEGAL',
    image: jumpseatIcon,
  },
  {
    name: 'Jem Cadiz',
    role: 'LINKAGES',
    image: jumpseatIcon,
  },
  {
    name: 'Mark De Vera',
    role: 'CREATIVES',
    image: jumpseatIcon,
  }
]