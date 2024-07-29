import Image from 'next/image';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import southKorea from '@/images/south-korea.jpg';  // Make sure this import path is correct
import {
  CalendarIcon,
  HomeIcon,
  TagIcon
} from '@heroicons/react/24/outline';

// Dynamically import the ProductDetails component with no SSR
const ProductDetails = dynamic(() => import('../../../components/ProductDetails'), { ssr: false });

// Dummy data (you can move this to a separate file later)
const dummyData = {
  'south-korea': {
    name: 'South Korea',
    price: '$109',
    rating: 4,
    description: 'Spend some time exploring trending kpop spots. A thought-provoking location that will give you a mindblowing intimacy towards South Korea\'s history and culture.',
    bestTimeToVisit: 'August - November',
    daysOfStay: '5 Days',
    minimumGuests: 'No Minimum Guests',
    heroImage: 'https://images.pexels.com/photos/2246789/pexels-photo-2246789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      {
        id: 1,
        name: 'Seoul Skyline',
        src: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Seoul city skyline',
      },
      {
        id: 2,
        name: 'Traditional Palace',
        src: 'https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Traditional Korean palace',
      },
      {
        id: 3,
        name: 'Street Food',
        src: 'https://images.pexels.com/photos/2105237/pexels-photo-2105237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Korean street food',
      },
      {
        id: 4,
        name: 'Cherry Blossoms',
        src: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Cherry blossoms in South Korea',
      },
    ],
    details: [
      {
        name: 'Inclusions',
        items: [
          'Hotel accommodation of your choice',
          'Daily breakfast at the hotel',
          'Transfers, guide and driver',
          'Environmental fees and taxes',
          'Local tourist taxes and fees',
        ],
      },
      {
        name: 'Exclusions',
        items: [
          'International flights from your destination',
          'Additional stay in Seoul for flight connections',
          'Tips for the driver and guides',
          'Food and beverage (except breakfast)',
        ],
      },
      {
        name: 'Itinerary Highlights',
        items: [
          'Day 1: Arrival in Seoul, Welcome Dinner',
          'Day 2: Seoul City Tour (Gyeongbokgung Palace, Bukchon Hanok Village)',
          'Day 3: DMZ Tour',
          'Day 4: K-pop and Modern Culture Experience',
          'Day 5: Departure',
        ],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Seoul",
        activities: [
          "Arrive at Incheon International Airport",
          "Transfer to hotel in Seoul",
          "Welcome dinner at a local Korean BBQ restaurant",
          "Evening walk in Myeongdong shopping district"
        ],
        image: "https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg"
      },
      {
        day: 2,
        title: "Seoul City Tour",
        activities: [
          "Visit Gyeongbokgung Palace",
          "Explore Bukchon Hanok Village",
          "Lunch at a traditional Korean restaurant",
          "Afternoon at N Seoul Tower",
          "Evening cruise on Han River"
        ],
        image: "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg"
      },
      {
        day: 3,
        title: "K-pop and Modern Culture",
        activities: [
          "Visit to K-pop entertainment company",
          "K-pop dance class",
          "Lunch at a trendy cafe in Gangnam",
          "Shopping in Apgujeong Rodeo Street",
          "Evening K-pop concert (subject to availability)"
        ],
        image: "https://images.pexels.com/photos/2105237/pexels-photo-2105237.jpeg"
      }
    ],
  },
  'japan': {
    name: 'Japan',
    price: '$129',
    rating: 5,
    description: 'Discover the perfect blend of tradition and modernity in Japan. From ancient temples to futuristic cities, immerse yourself in a unique cultural experience.',
    bestTimeToVisit: 'March - May and September - November',
    daysOfStay: '7 Days',
    minimumGuests: 'No Minimum Guests',
    heroImage: 'https://images.pexels.com/photos/2676642/pexels-photo-2676642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      {
        id: 1,
        name: 'Mount Fuji',
        src: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Mount Fuji with cherry blossoms',
      },
      {
        id: 2,
        name: 'Tokyo Tower',
        src: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Tokyo Tower at night',
      },
      {
        id: 3,
        name: 'Fushimi Inari Shrine',
        src: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Fushimi Inari Shrine in Kyoto',
      },
      {
        id: 4,
        name: 'Japanese Garden',
        src: 'https://images.pexels.com/photos/1198817/pexels-photo-1198817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Traditional Japanese garden',
      },
    ],
    details: [
      {
        name: 'Inclusions',
        items: [
          'Hotel accommodation (3-star or 4-star options)',
          'Daily breakfast and 2 traditional dinners',
          'Japan Rail Pass (7-day ordinary)',
          'Guided tours in Tokyo and Kyoto',
          'Airport transfers',
        ],
      },
      {
        name: 'Exclusions',
        items: [
          'International flights',
          'Travel insurance',
          'Personal expenses',
          'Optional activities not mentioned in the itinerary',
        ],
      },
      {
        name: 'Itinerary Highlights',
        items: [
          'Day 1-3: Tokyo (Sensoji Temple, Meiji Shrine, Shibuya Crossing)',
          'Day 4-5: Kyoto (Golden Pavilion, Arashiyama Bamboo Grove)',
          'Day 6: Day trip to Nara',
          'Day 7: Departure from Osaka',
        ],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Seoul",
        activities: [
          "Arrive at Incheon International Airport",
          "Transfer to hotel in Seoul",
          "Welcome dinner at a local Korean BBQ restaurant",
          "Evening walk in Myeongdong shopping district"
        ],
        image: "https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg"
      },
      {
        day: 2,
        title: "Seoul City Tour",
        activities: [
          "Visit Gyeongbokgung Palace",
          "Explore Bukchon Hanok Village",
          "Lunch at a traditional Korean restaurant",
          "Afternoon at N Seoul Tower",
          "Evening cruise on Han River"
        ],
        image: "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg"
      },
      {
        day: 3,
        title: "K-pop and Modern Culture",
        activities: [
          "Visit to K-pop entertainment company",
          "K-pop dance class",
          "Lunch at a trendy cafe in Gangnam",
          "Shopping in Apgujeong Rodeo Street",
          "Evening K-pop concert (subject to availability)"
        ],
        image: "https://images.pexels.com/photos/2105237/pexels-photo-2105237.jpeg"
      }
    ],
  },
  // Add more destinations here
};

export default function DestinationPage({ params }: { params: { name: string } }) {
  const destinationData = dummyData[params.name as keyof typeof dummyData];

  if (!destinationData) {
    return <div>Destination not found</div>;
  }

  return (
    <>
       <div className="relative isolate -mt-16 overflow-hidden py-28">
        {/* <Image
          src={destinationData.heroImage}
          alt={`Hero image of ${destinationData.name}`}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        /> */}
        <Image
           src={destinationData.heroImage}
           alt={`Hero image of ${destinationData.name}`}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true"></div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="text-center pb-36">
            <h1 className="font-poppinsSemiBold text-4xl tracking-tight text-white sm:text-7xl">
              {destinationData.name}
            </h1>
            <p className="bodyRegular mt-0 text-lg text-white">
              {destinationData.description}
            </p>
          </div>
        </div>
      </div>

      <div className="-mt-14">
        <div className="relative flex h-40 w-full bg-transparent">
          <div className="flex h-full w-1/2 bg-transparent"></div>
          <div className="flex h-full w-1/2 bg-[#565555]"></div>
        </div>
        <div
          className="relative isolate -mt-40 overflow-hidden bg-white pt-28 pb-14"
          style={{
            clipPath: 'polygon(50% 0%, 100% 10%, 100% 100%, 0 100%, 0 10%)',
            backgroundColor: '#ffffff',
          }}
        >
          <div className="mx-auto max-w-full py-32 text-center sm:py-48 lg:py-10">
            <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="mt-6 flex flex-col items-center gap-y-20 lg:flex-row">
                  <div className="lg:w-full lg:max-w-4xl lg:flex-auto">
                    <p className="text-left text-xl leading-8 text-gray-600">
                      {destinationData.description}
                    </p>
                  </div>
                  <div className="lg:flex lg:flex-auto lg:justify-center">
                    <dl className="w-64 space-y-8 xl:w-80">
                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex items-center justify-center px-6 py-3 ring-1 ring-gray-300 rounded-md min-w-60">
                          <div className='mr-2'>
                            <CalendarIcon className="mr-2 h-8 w-auto cursor-pointer text-gray-500" />
                          </div>
                          <div className='min-w-11 w-full text-left'>
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                              Best Time to Visit
                            </dt>
                            <dd className="text-md font-normal tracking-tight text-gray-500">
                              {destinationData.bestTimeToVisit}
                            </dd>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex items-center justify-center px-6 py-3 ring-1 ring-gray-300 rounded-md min-w-60">
                          <div className='mr-2'>
                            <HomeIcon className="mr-2 h-8 w-auto cursor-pointer text-gray-500" />
                          </div>
                          <div className='min-w-11 w-full text-left'>
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                              Days of Stay
                            </dt>
                            <dd className="text-md font-normal tracking-tight text-gray-500">
                              {destinationData.daysOfStay}
                            </dd>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex items-center justify-center px-6 py-3 ring-1 ring-gray-300 rounded-md min-w-60">
                          <div className='mr-2'>
                            <TagIcon className="mr-2 h-8 w-auto cursor-pointer text-gray-500" />
                          </div>
                          <div className='min-w-11 w-full text-left'>
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                              Price per Person
                            </dt>
                            <dd className="text-md font-bold tracking-tight text-gray-950">
                              {destinationData.price}
                            </dd>
                            <dd className="text-sm font-normal tracking-tight text-gray-500">
                              {destinationData.minimumGuests}
                            </dd>
                          </div>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-0">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetails product={destinationData} />
        </Suspense>
      </div>
    </>
  );
}