import {
  ArrowTrendingUpIcon,
  HomeIcon,
  UserGroupIcon,
  RectangleStackIcon,
  
} from '@heroicons/react/24/outline'

import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'

import { 
  Link,
  Facebook,
  Instagram,
  Youtube,
  Archive
} from 'react-feather';

export const userData = {
  user_id: 0,
  first_name: "Darrel",
  middle_name: "Mendoza",
  last_name: "",
  display_name: "Darrel Mendoza",
  headline: "Full Stack Engineer",
  description: "Talks about #startup, #business, #motivation, and #self-improvement",
  image_url: "",
  total_followers: 135,
  total_posts: 25
};

export const myProfile = [
  {
    id: '1',
    imageUrl:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Darrel Mendoza',
    href: '#',
    handle: '@darrelmendoza',
  },
]

export const settings = [
  { id: '1', name: 'Manage Account', href: '#' },
  { id: '2', name: 'Help', href: '#' },
]

export const navigation = [
  { id: '1', name: 'Home', href: '/', icon: HomeIcon, current: false },
  { id: '2', name: 'My Library', href: '/my-library', icon: RectangleStackIcon, current: false },
  { id: '3', name: 'Discover', href: '/discover', icon: UserGroupIcon, current: false },
  // { id: '4', name: 'Trending', href: '#', icon: ArrowTrendingUpIcon, current: false },
]

export const categories = [
  { id: '1', name: 'Motivation', href: '#', icon: HomeIcon, current: false },
  { id: '2', name: 'Inspiration', href: '#', icon: RectangleStackIcon, current: false },
  { id: '3', name: 'Web Development', href: '#', icon: UserGroupIcon, current: false },
  { id: '4', name: 'Memes', href: '#', icon: ArrowTrendingUpIcon, current: false },
]

export const filters = [
  { id: '1', name: 'Resources', href: '#', icon: Link, current: false },
  { id: '2', name: 'Facebook', href: '#', icon: Facebook, current: false },
  { id: '3', name: 'Instagram', href: '#', icon: Instagram, current: false },
  { id: '4', name: 'Youtube', href: '#', icon: Youtube, current: false },
  { id: '4', name: 'Archive', href: '#', icon: Archive, current: false },
]

export const recentlySaved = [
  {
    id: '1',
    description: 'The Underdog: From His Parent’s Basement to $25M',
    platform: 'Youtube',
    href: '#',
    imageUrl: 'https://i.ytimg.com/vi/Gv2fzC96Z40/maxresdefault.jpg',
  },
  {
    id: '2',
    description: 'I Make $1M/Year With One Website',
    platform: 'Youtube',
    href: '#',
    imageUrl: 'https://i.ytimg.com/vi/7pCgbhUWW54/sddefault.jpg',
  },
  {
    id: '3',
    description: 'The Underdog: He Turned His Last $4,000 Into $48M',
    platform: 'Youtube',
    href: '#',
    imageUrl:
      'https://i.ytimg.com/vi/IuoscQiQQLg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC7KBFKBszmI0lutPhm7Glv5-u5QA',
  },
]

export const posts = [
  {
    id: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Sam Ovens',
    handle: '@samovens',
    href: '#',
    date: 'Sept 9, 1999',
    title: 'The Underdog: From His Parent’s Basement to $25M',
    description:
      "This is the story of how David Park went from a broke kid in his parent's basement to building a company now worth over $25M.",
    embedImageUrl: 'https://i.ytimg.com/vi/Gv2fzC96Z40/maxresdefault.jpg',
    embedAuthor: 'Starter Story',
    embedLink: 'https://www.youtube.com/watch?v=Gv2fzC96Z40&pp=ygUyVGhlIFVuZGVyZG9nOiBGcm9tIEhpcyBQYXJlbnTigJlzIEJhc2VtZW50IHRvICQyNU0%3D',
    platform: 'Youtube',
    total_likes: 20,
    total_comments: 24,
    notes: 'Yessirskii',
    category: 'Motivation',
    comments: [
      {
        id: 1,
        imageUrl:
          'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=600',
        author: 'Lexa Lory',
        timestamp: '7 Days Ago',
        content_text: 'A very inspiring story indeed!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/2122276/pexels-photo-2122276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Marianne Rolls',
            timestamp: '3 Days Ago',
            content_text: 'I\'ve been waiting for this!',
            likes: 34,
          },
        ]
      },
      {
        id: 2,
        imageUrl:
          'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=600',
        author: 'Lexa Lory',
        timestamp: '7 Days Ago',
        content_text: 'A very inspiring story indeed!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/2122276/pexels-photo-2122276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Marianne Rolls',
            timestamp: '3 Days Ago',
            content_text: 'I\'ve been waiting for this!',
            likes: 34,
          },
        ]
      },
    ]
  },
  {
    id: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1441786485319-5e0f0c092803?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Charlie Morgan',
    handle: '@charliemorgan',
    href: '#',
    date: 'Feb 3, 2001',
    title: 'I Make $1M/Year With One Website',
    description:
      'This is the breakdown of how Matt Giovanisci makes over $1M/year with just one website (in one of the most boring niches).',
    embedImageUrl: 'https://i.ytimg.com/vi/7pCgbhUWW54/sddefault.jpg',
    embedAuthor: 'Starter Story',
    embedLink: 'https://www.youtube.com/watch?v=7LZ0MTkNr34&t=319s&pp=ygUgSSBNYWtlICQxTS9ZZWFyIFdpdGggT25lIFdlYnNpdGU%3D',
    platform: 'Youtube',
    total_likes: 20,
    total_comments: 24,
    notes: 'This is a really noteable section!',
    category: 'Inspiration',
    comments: [
      {
        id: 1,
        imageUrl:
          'https://images.pexels.com/photos/734478/pexels-photo-734478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'Remmy Monroe',
        timestamp: '7 Days Ago',
        content_text: 'That is so inspiring!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/1081188/pexels-photo-1081188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Rick Robs',
            timestamp: '3 Days Ago',
            content_text: 'I am so motivated right now!',
            likes: 34,
          },
        ]
      },
      {
        id: 2,
        imageUrl:
          'https://images.pexels.com/photos/732425/pexels-photo-732425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'Lany Modes',
        timestamp: '7 Days Ago',
        content_text: 'That is so extravagant!',
        likes: 20,
        replies: [
          {
            id: 1412225343,
            imageUrl:
              'https://images.pexels.com/photos/1153312/pexels-photo-1153312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Alex Wake',
            timestamp: '3 Days Ago',
            content_text: 'I am so motivated right now!',
            likes: 34,
          },
        ]
      },
    ]
  },
  {
    id: 3,
    imageUrl:
      'https://images.pexels.com/photos/3006904/pexels-photo-3006904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Dustin Walsh',
    handle: '@dustinwalsh',
    href: '#',
    date: 'Mar 2, 2002',
    title: 'The Solopreneur: He Makes $1.7M With 0 Employees',
    description:
      "In this episode, Justin Welsh meets me in downtown New York city to show me exactly how he's built a one person business to over $1.7M/year. He shares his content strategy, tools he uses, daily routine, and some A1 advice for beginner entrepreneurs looking to start a solo business. Enjoy!",
    embedImageUrl: 'https://i.ytimg.com/vi/v6IF-lVuvbs/maxresdefault.jpg',
    embedAuthor: 'Starter Story',
    embedLink: 'https://www.youtube.com/watch?v=7pCgbhUWW54',
    platform: 'Youtube',
    total_likes: 13,
    total_comments: 4,
    notes: 'This is my notes!',
    category: 'Web Development',
    comments: [
      {
        id: 1,
        imageUrl:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'Anna Hezzi',
        timestamp: '7 Days Ago',
        content_text: 'Looks really exciting I am pumped!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/3342003/pexels-photo-3342003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Chance Manson',
            timestamp: '3 Days Ago',
            content_text: 'I know right!?',
            likes: 34,
          },
          {
            id: 25312335,
            imageUrl:
              'https://images.pexels.com/photos/1010115/pexels-photo-1010115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Kemmy Lany',
            timestamp: '4 Days Ago',
            content_text: '@Chance Manson Sheeeesh',
            likes: 32,
          },
        ]
      },
    ]
  },
  {
    id: 4,
    imageUrl:
      'https://images.pexels.com/photos/3006904/pexels-photo-3006904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Dustin Walsh',
    handle: '@dustinwalsh',
    href: '#',
    date: 'Mar 2, 2002',
    title: 'The Underdog: From Dead Broke to $30,000,000',
    description:
      "This is the story of how KC Holiday went from being a waiter in a restaurant to emptying his entire savings account and building a $30M company.",
    embedImageUrl: 'https://i.ytimg.com/vi/GGxUH6EXF9I/maxresdefault.jpg',
    embedAuthor: 'Starter Story',
    embedLink: 'https://www.youtube.com/watch?v=GGxUH6EXF9I',
    platform: 'Youtube',
    total_likes: 13,
    total_comments: 4,
    notes: 'This is my notes!',
    category: 'Memes',
    comments: [
      {
        id: 1,
        imageUrl:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'Anna Hezzi',
        timestamp: '7 Days Ago',
        content_text: 'Looks really exciting I am pumped!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/3342003/pexels-photo-3342003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Chance Manson',
            timestamp: '3 Days Ago',
            content_text: 'I know right!?',
            likes: 34,
          },
          {
            id: 25312335,
            imageUrl:
              'https://images.pexels.com/photos/1010115/pexels-photo-1010115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Kemmy Lany',
            timestamp: '4 Days Ago',
            content_text: '@Chance Manson Sheeeesh',
            likes: 32,
          },
        ]
      },
    ]
  },
]

export const categorieslist = [
  {
    id: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Sam Ovens',
    handle: '@samovens',
    href: '#',
    date: 'Sept 9, 1999',
    title: 'Motivation',
    description:
      "Boost your drive with inspiring quotes, success stories, and tips to stay focused and achieve your goals.",
    embedImageUrl: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg',
    embedAuthor: 'Starter Story',
    embedLink: 'https://www.youtube.com/watch?v=Gv2fzC96Z40&pp=ygUyVGhlIFVuZGVyZG9nOiBGcm9tIEhpcyBQYXJlbnTigJlzIEJhc2VtZW50IHRvICQyNU0%3D',
    platform: 'Youtube',
    total_likes: 20,
    total_comments: 24,
    notes: 'Yessirskii',
    comments: [
      {
        id: 1,
        imageUrl:
          'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=600',
        author: 'Lexa Lory',
        timestamp: '7 Days Ago',
        content_text: 'A very inspiring story indeed!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/2122276/pexels-photo-2122276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Marianne Rolls',
            timestamp: '3 Days Ago',
            content_text: 'I\'ve been waiting for this!',
            likes: 34,
          },
        ]
      },
      {
        id: 2,
        imageUrl:
          'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=600',
        author: 'Lexa Lory',
        timestamp: '7 Days Ago',
        content_text: 'A very inspiring story indeed!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/2122276/pexels-photo-2122276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Marianne Rolls',
            timestamp: '3 Days Ago',
            content_text: 'I\'ve been waiting for this!',
            likes: 34,
          },
        ]
      },
    ]
  },
  {
    id: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1441786485319-5e0f0c092803?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Charlie Morgan',
    handle: '@charliemorgan',
    href: '#',
    date: 'Feb 3, 2001',
    title: 'Inspirations',
    description:
      'Spark your creativity with stories, art, and moments of beauty that ignite passion and fuel your imagination.',
    embedImageUrl: 'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    embedAuthor: 'Starter Story',
    embedLink: 'https://www.youtube.com/watch?v=7LZ0MTkNr34&t=319s&pp=ygUgSSBNYWtlICQxTS9ZZWFyIFdpdGggT25lIFdlYnNpdGU%3D',
    platform: 'Youtube',
    total_likes: 20,
    total_comments: 24,
    notes: 'This is a really noteable section!',
    comments: [
      {
        id: 1,
        imageUrl:
          'https://images.pexels.com/photos/734478/pexels-photo-734478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'Remmy Monroe',
        timestamp: '7 Days Ago',
        content_text: 'That is so inspiring!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/1081188/pexels-photo-1081188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Rick Robs',
            timestamp: '3 Days Ago',
            content_text: 'I am so motivated right now!',
            likes: 34,
          },
        ]
      },
      {
        id: 2,
        imageUrl:
          'https://images.pexels.com/photos/732425/pexels-photo-732425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'Lany Modes',
        timestamp: '7 Days Ago',
        content_text: 'That is so extravagant!',
        likes: 20,
        replies: [
          {
            id: 1412225343,
            imageUrl:
              'https://images.pexels.com/photos/1153312/pexels-photo-1153312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Alex Wake',
            timestamp: '3 Days Ago',
            content_text: 'I am so motivated right now!',
            likes: 34,
          },
        ]
      },
    ]
  },
  {
    id: 3,
    imageUrl:
      'https://images.pexels.com/photos/3006904/pexels-photo-3006904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Dustin Walsh',
    handle: '@dustinwalsh',
    href: '#',
    date: 'Mar 2, 2002',
    title: 'Memes',
    description:
      "Enjoy a fun mix of viral images, videos, and text that capture the humor and trends of today's culture.",
    embedImageUrl: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    embedAuthor: 'Starter Story',
    embedLink: 'https://www.youtube.com/watch?v=7pCgbhUWW54',
    platform: 'Youtube',
    total_likes: 13,
    total_comments: 4,
    notes: 'This is my notes!',
    comments: [
      {
        id: 1,
        imageUrl:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'Anna Hezzi',
        timestamp: '7 Days Ago',
        content_text: 'Looks really exciting I am pumped!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/3342003/pexels-photo-3342003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Chance Manson',
            timestamp: '3 Days Ago',
            content_text: 'I know right!?',
            likes: 34,
          },
          {
            id: 25312335,
            imageUrl:
              'https://images.pexels.com/photos/1010115/pexels-photo-1010115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Kemmy Lany',
            timestamp: '4 Days Ago',
            content_text: '@Chance Manson Sheeeesh',
            likes: 32,
          },
        ]
      },
    ]
  },
  {
    id: 4,
    imageUrl:
      'https://images.pexels.com/photos/3006904/pexels-photo-3006904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Dustin Walsh',
    handle: '@dustinwalsh',
    href: '#',
    date: 'Mar 2, 2002',
    title: 'Mindfulness',
    description:
      "Find peace and presence with guided meditations, exercises, and quotes to reduce stress and enhance well-being.",
    embedImageUrl: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    embedAuthor: 'Starter Story',
    embedLink: 'https://www.youtube.com/watch?v=GGxUH6EXF9I',
    platform: 'Youtube',
    total_likes: 13,
    total_comments: 4,
    notes: 'This is my notes!',
    comments: [
      {
        id: 1,
        imageUrl:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        author: 'Anna Hezzi',
        timestamp: '7 Days Ago',
        content_text: 'Looks really exciting I am pumped!',
        likes: 20,
        replies: [
          {
            id: 14125343,
            imageUrl:
              'https://images.pexels.com/photos/3342003/pexels-photo-3342003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Chance Manson',
            timestamp: '3 Days Ago',
            content_text: 'I know right!?',
            likes: 34,
          },
          {
            id: 25312335,
            imageUrl:
              'https://images.pexels.com/photos/1010115/pexels-photo-1010115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            author: 'Kemmy Lany',
            timestamp: '4 Days Ago',
            content_text: '@Chance Manson Sheeeesh',
            likes: 32,
          },
        ]
      },
    ]
  },
]

export const topics = [
  { id: '1', name: 'Business', href: '#' },
  { id: '2', name: 'Career', href: '#' },
  { id: '3', name: 'Education', href: '#' },
  { id: '4', name: 'Entertainment', href: '#' },
  { id: '5', name: 'Food', href: '#' },
  { id: '6', name: 'Gaming', href: '#' },
  { id: '7', name: 'Health & Fitness', href: '#' },
  { id: '8', name: 'Parenting', href: '#' },
  { id: '9', name: 'Personal Finance', href: '#' },
  { id: '10', name: 'Politics', href: '#' },
  { id: '11', name: 'Science', href: '#' },
  { id: '12', name: 'Self Improvement', href: '#' },
  { id: '13', name: 'Sports', href: '#' },
  { id: '14', name: 'Technology', href: '#' },
  { id: '15', name: 'Travel', href: '#' },
]

export const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIconMini, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]