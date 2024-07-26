import React from 'react';

interface SocialLink {
  url: string;
  icon: React.ReactNode;
}

interface CardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  socialLinks: SocialLink[];
}

const Card: React.FC<CardProps> = ({ name, role, description, imageUrl, socialLinks }) => {
  return (
    <div className="text-center text-gray-500 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <img className="mx-auto mb-4 w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full object-cover" src={imageUrl} alt={`${name} Avatar`} />
      <h3 className="mb-1 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
        <a href="#" className="">{name}</a>
      </h3>
      <p className='text-sm font-bold text-gray-600'>{role}</p>
      <p className="mt-3 mb-4 text-sm sm:text-base font-light text-gray-500">{description}</p>
      <ul className="flex flex-wrap justify-center mt-4 space-x-2 sm:space-x-4">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="text-gray-600 hover:text-gray-900 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card; 