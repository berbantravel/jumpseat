import Image from 'next/image';
import Link from 'next/link';

interface PackageCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageSrc: string;
  destination: string;
  inclusions: string[];
}

const PackageCard = ({
  id,
  title,
  description,
  price,
  duration,
  imageSrc,
  destination,
  inclusions,
}: PackageCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm font-medium">{duration}</p>
          <p className="text-2xl font-bold">₱{price.toLocaleString()}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Inclusions:</h4>
          <ul className="text-sm text-gray-600">
            {inclusions.map((inclusion, index) => (
              <li key={index} className="flex items-center mb-1">
                <span className="mr-2">•</span>
                {inclusion}
              </li>
            ))}
          </ul>
        </div>
        <Link 
          href={`/destinations/${destination}/package/${id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PackageCard; 