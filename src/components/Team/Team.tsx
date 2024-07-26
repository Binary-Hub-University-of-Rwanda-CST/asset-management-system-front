import React from 'react';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';  

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  socialLinks: { url: string; icon: React.ReactNode }[];
}

interface TeamProps {
  title: string;
  description: string;
  members: TeamMember[];
}

const Team: React.FC<TeamProps> = ({ title, description, members }) => {
  const navigate = useNavigate();
  return (
    <section className="bg-white">   
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-12 lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">         
          <h2 className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold text-gray-900">{title}</h2>
          <p className="font-light text-gray-500 sm:text-lg lg:text-xl">{description}</p>
        </div> 
        <div className="grid gap-8 mb-6 lg:mb-16 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Card key={index} {...member} />
          ))}
        </div>  
      </div>
    </section>
  );
};

export default Team; 