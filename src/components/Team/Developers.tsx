import React from 'react';
import Team from './Team'; 
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaTwitter, FaWhatsapp, FaFacebookF, FaTiktok, FaTelegramPlane, FaSnapchatGhost } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { TbWorldWww } from 'react-icons/tb';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { BsTelephoneFill } from 'react-icons/bs';
import edison from '../../assets/images/team/edsn.jpg'; 
import emyy from '../../assets/images/team/emmanuel.png';
import david from '../../assets/images/team/datch.png';
import celestin from '../../assets/images/team/cordinator.jpg';
import joseph from '../../assets/images/team/joseph.jpg';
import habibu from '../../assets/images/team/Habibu.png' 

const Developers: React.FC = () => {
  const teamMembers = [
    {
      name: "Mr. Celestin MBONABUCYA",
      role: "Academic Staff, Coordinator of Binary HUB & Senior Systems Analyst.",
      description: "Celestin oversees project execution, conducts advanced data analysis, and ensures our team delivers high-quality solutions that meet client needs.",
      imageUrl: celestin,
      socialLinks: [
        { url: "#", icon: <FaLinkedin className="w-5 h-5" /> },
        { url: "#", icon: <FaTwitter className="w-5 h-5" /> },
        { url: "#", icon: <FaGithub className="w-5 h-5" /> },
      ],
    },
    {
        name: "Emmanuel",
        role: "Senior Frontend Developer & UI/UX Designer",
        description: "Emmanuel combines his expertise in frontend development with strong UI/UX design skills. He creates visually appealing and user-friendly interfaces while ensuring optimal performance and accessibility.",
        imageUrl: emyy,
        socialLinks: [
          { url: "#", icon: <FaGithub className="w-5 h-5" /> },
          { url: "#", icon: <FaLinkedin className="w-5 h-5" /> },
          { url: "#", icon: <FaTwitter className="w-5 h-5" /> },
        ],
      }, 
    {
        name: "Joseph",
        role: "Senior Backend Developer",
        description: "Joseph leads our backend development efforts, architecting scalable and secure server-side solutions. He specializes in optimizing database performance and implementing complex business logic.",
        imageUrl: joseph,
        socialLinks: [
          { url: "#", icon: <FaLinkedin className="w-5 h-5" /> },
          { url: "#", icon: <FaTwitter className="w-5 h-5" /> },
        ],
      },
    
   
    {
        name: "Edison UWIHANGANYE",
        role: "Frontend Developer",
        description: "Edison specializes in creating responsive and intuitive user interfaces. He leverages modern frameworks to build engaging web applications that provide excellent user experiences.",
        imageUrl: edison,
        socialLinks: [
          { url: "https://github.com/codeWithEdison", icon: <FaGithub className="w-5 h-5" /> },
          { url: "https://www.linkedin.com/in/uwihanganye-edison-7b2970236/", icon: <FaLinkedin className="w-5 h-5" /> },
          { url: "https://www.instagram.com/codewith_edison/", icon: <FaInstagram className="w-5 h-5" /> }, 
          { url: "mailto:edsnkvn@gmail.com/", icon: <SiGmail className="w-5 h-5" /> }, 
          { url: "https://codewithedison.github.io/codeWithEdison-portifolio/", icon: <TbWorldWww className="w-5 h-5" /> },   
          { url: "https://wa.me/+25078824303?text=Greetings%20Edison %2C%0A%0AI%20discovered%20your%20portfolio%20and%20I%27m%20interested%20in%20offering%20you%20a%20coding%20opportunity%20for%20my%20project",
              icon: <FaWhatsapp className="w-5 h-5" /> },   
              { url: "tel:+250788240303", icon: <BsTelephoneFill className="w-5 h-5" /> }, 
        ],
      }, 
    {
      name: "David",
      role: "Backend Developer",
      description: "David focuses on server-side logic and database management. He designs and implements robust APIs, ensures data integrity, and optimizes backend performance to support our applications.",
      imageUrl: david,
      socialLinks : [
        { url: "https://programmerdatch.netlify.app/", icon: <TbWorldWww className="w-5 h-5" /> },
        { url: "https://www.instagram.com/programmerdatch/", icon: <FaInstagram className="w-5 h-5" /> },
        { url: "https://www.linkedin.com/in/programmerdatch/", icon: <FaLinkedin className="w-5 h-5" /> },
        { url: "https://github.com/ProgrammerDATCH", icon: <FaGithub className="w-5 h-5" /> },
        // { url: "https://www.youtube.com/@ProgrammerDATCH", icon: <FaYoutube className="w-5 h-5" /> },
        // { url: "https://twitter.com/ProgrammerDATCH", icon: <FaTwitter className="w-5 h-5" /> },
        { url: "https://wa.me/+250735177666", icon: <FaWhatsapp className="w-5 h-5" /> },
        // { url: "https://wa.me/+250735177666?text=Greetings%20Programmer%20DATCH%2C%0A%0AI%20discovered%20your%20portfolio%20and%20I%27m%20interested%20in%20offering%20you%20a%20coding%20opportunity%20for%20my%20project.", icon: <FaWhatsapp className="w-5 h-5" /> },
        // { url: "https://www.facebook.com/profile.php?id=100068532707087", icon: <FaFacebookF className="w-5 h-5" /> },
        { url: "mailto:programmerdatch@gmail.com", icon: <SiGmail className="w-5 h-5" /> },
        // { url: "https://tiktok.com/@programmerdatch", icon: <FaTiktok className="w-5 h-5" /> },
        { url: "https://play.google.com/store/apps/dev?id=7881383766588193746", icon: <IoLogoGooglePlaystore className="w-5 h-5" /> },
        { url: "https://t.me/programmerdatch", icon: <FaTelegramPlane className="w-5 h-5" /> },
        // { url: "https://www.snapchat.com/add/datch1502?share_id=NZq-VlCB6p4&locale=en-US", icon: <FaSnapchatGhost className="w-5 h-5" /> },
        { url: "tel:+250735177666", icon: <BsTelephoneFill className="w-5 h-5" /> },
      ]
    },
    
    {
      name: "Habibu",
      role: "Analysit",
      description: "Habibu  leads our Project efforts, architecting scalable and secure communication solutions. He ensures our team delivers high-quality solutions that meet client needs.",
      imageUrl: habibu,  
      socialLinks: [
        { url: "#", icon: <FaLinkedin className="w-5 h-5" /> },
        { url: "#", icon: <FaTwitter className="w-5 h-5" /> },
      ],
    },
  ];

  return (
    <Team
      title="Meet Our Talented Team "
      organisation=' BINARY HUB / SCHOOL OF ICT / COLLEGE OF SCIENCE AND TECHNOLOGY / UNIVERSITY OF RWANDA'
      description="We are a diverse group of professionals dedicated to delivering innovative solutions across the Technology." 
      members={teamMembers}
    />
  );
};

export default Developers; 