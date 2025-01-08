import { StaticImageData } from 'next/image'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'
import jimBernardo from '@/images/team/Jim Bernardo - Operations Officer.jpg'
import chrisseTalaban from '@/images/team/Chrisse Talaban - CEO.jpg'
import chuckieTandoc from '@/images/team/Chuckie Tandoc - Linkages.jpg'
import vinceRamirez from '@/images/team/Vince Ramirez - Finance Officer.jpg'
import leilaniParagas from '@/images/team/Leilani Paragas - Linkages.jpg'
import sylvesterRubioIII from '@/images/team/Sylvester G Rubio III - ICT Partner.jpg'
import hazelFlores from '@/images/team/Hazel Flores - Legal Officer.jpg'
import jemCadiz from '@/images/team/Jem Cadiz - Lingkages.jpg'
import aprilFerazol from '@/images/team/April Ferazol - Travel Planner.jpg'
import janaHinagpisan from '@/images/team/Jana Hinagpisan - Sales Team Leader.jpg'
import rodParedes from '@/images/team/Rod Paredes - Business Development Officer.jpg'
import kimberlyMojica from '@/images/team/Kimberly Mojica - Brand and Content Officer.jpg'



export type TeamMember = {
  name: string;
  role: string;
  image: StaticImageData;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Chrisse Talaban',
    role: 'CEO',
    image: chrisseTalaban,
  },
  {
    name: 'Jim Bernardo',
    role: 'OPERATIONS OFFICER',
    image: jimBernardo,
  },
  {
    name: 'Chuckie Tandoc',
    role: 'LINKAGES',
    image: chuckieTandoc,
  },
  {
    name: 'Vince Ramirez',
    role: 'FINANCE OFFICER',
    image: vinceRamirez,
  },
  {
    name: 'Leilani Paragas',
    role: 'LINKAGES',
    image: leilaniParagas,
  },
  {
    name: 'Sylvester Rubio III',
    role: 'ICT PARTNER',
    image: sylvesterRubioIII,
  },
  {
    name: 'Jana Hinagpisan',
    role: 'SALES TEAM LEADER',
    image: janaHinagpisan,
  },
  {
    name: 'Hazel Flores',
    role: 'LEGAL OFFICER',
    image: hazelFlores,
  },
  {
    name: 'Jem Cadiz',
    role: 'LINKAGES',
    image: jemCadiz,
  },
  {
    name: 'April Ferazol',
    role: 'TRAVEL PLANNER',
    image: aprilFerazol,
  },
  {
    name: 'Rod Paredes',
    role: 'BUSINESS DEVELOPMENT OFFICER',
    image: rodParedes,
},
{
  name: 'Kimberly Mojica',
  role: 'BRAND AND CONTENT OFFICER',
  image: kimberlyMojica,
}
]