import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Find Doctors', href: '/doctors' },
        { name: 'Book Appointments', href: '/appointments' },
        { name: 'Video Consultation', href: '/video-consultation' },
        { name: 'Homeopathic Medicines', href: '/medicines' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Health Articles', href: '/articles' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">MediConnect</span>
            </Link>
            <p className="mt-4 text-gray-300 max-w-md">
              Connecting patients with qualified healthcare professionals for virtual consultations 
              and providing access to homeopathic medicine information.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {year} MediConnect. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white mr-4 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;