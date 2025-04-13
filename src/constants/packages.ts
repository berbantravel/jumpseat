import SouthKorea from '../assets/images/south-korea.jpg';

interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageSrc: string;
  destination: string;
  inclusions: string[];
}

export const packages: { [key: string]: Package[] } = {
  "japan": [
    {
      id: "japan-classic",
      title: "Japan Classic Tour",
      description: "Experience the best of Japan with this comprehensive tour package",
      price: 89999,
      duration: "7 Days / 6 Nights",
      imageSrc: "https://images.pexels.com/photos/5220024/pexels-photo-5220024.jpeg",
      destination: "japan",
      inclusions: [
        "Round-trip flights",
        "Hotel accommodation",
        "Daily breakfast",
        "Airport transfers",
        "Guided tours"
      ]
    },
    {
      id: "japan-sakura",
      title: "Cherry Blossom Special",
      description: "Experience Japan's most beautiful season with cherry blossoms in full bloom",
      price: 99999,
      duration: "8 Days / 7 Nights",
      imageSrc: "https://images.pexels.com/photos/5738588/pexels-photo-5738588.jpeg",
      destination: "japan",
      inclusions: [
        "Round-trip flights",
        "4-star hotel accommodation",
        "All meals included",
        "Private transfers",
        "Cherry blossom viewing tours"
      ]
    },
    {
      id: "japan-winter",
      title: "Winter Wonderland",
      description: "Discover Japan's winter magic with snow festivals and hot springs",
      price: 94999,
      duration: "6 Days / 5 Nights",
      imageSrc: "https://images.pexels.com/photos/3800117/pexels-photo-3800117.jpeg",
      destination: "japan",
      inclusions: [
        "Round-trip flights",
        "Onsen resort stay",
        "Winter activity gear",
        "Hot spring passes",
        "Snow festival tour"
      ]
    }
  ],
  "south-korea": [
    {
      id: "korea-highlights",
      title: "Korea Highlights Tour",
      description: "Experience the best of South Korea's culture and modernity",
      price: 75999,
      duration: "5 Days / 4 Nights",
      imageSrc: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg",
      destination: "south-korea",
      inclusions: [
        "Round-trip flights",
        "Hotel accommodation",
        "K-pop experience",
        "Temple stay",
        "Street food tour"
      ]
    },
    {
      id: "korea-jeju",
      title: "Jeju Island Escape",
      description: "Explore the natural wonders of Jeju Island",
      price: 82999,
      duration: "6 Days / 5 Nights",
      imageSrc: "https://images.pexels.com/photos/4937193/pexels-photo-4937193.jpeg",
      destination: "south-korea",
      inclusions: [
        "Round-trip flights",
        "Resort accommodation",
        "Island tours",
        "Water activities",
        "Local cuisine experience"
      ]
    }
  ],
  "thailand": [
    {
      id: "thailand-bangkok",
      title: "Bangkok City Break",
      description: "Experience the vibrant culture and nightlife of Bangkok",
      price: 45999,
      duration: "4 Days / 3 Nights",
      imageSrc: "https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg",
      destination: "thailand",
      inclusions: [
        "Round-trip flights",
        "City hotel stay",
        "Temple tours",
        "Night market visit",
        "Thai massage"
      ]
    },
    {
      id: "thailand-phuket",
      title: "Phuket Paradise",
      description: "Relax on Thailand's most famous beaches",
      price: 52999,
      duration: "5 Days / 4 Nights",
      imageSrc: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
      destination: "thailand",
      inclusions: [
        "Round-trip flights",
        "Beach resort stay",
        "Island hopping",
        "Snorkeling trip",
        "Sunset dinner cruise"
      ]
    }
  ]
};