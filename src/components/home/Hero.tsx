import { motion } from 'framer-motion';
import { ArrowRight, Video, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your Health, Our Priority
              <span className="text-primary-600 block mt-2">
                Anytime, Anywhere
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Connect with verified doctors via video consultation, book appointments, 
              and access a comprehensive homeopathic medicine database all in one place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn-primary">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/doctors" className="btn-outline">
                Find Doctors
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="rounded-full bg-primary-100 p-2 mr-3">
                  <Video className="h-5 w-5 text-primary-600" />
                </div>
                <p className="font-medium">Video Consultations</p>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-secondary-100 p-2 mr-3">
                  <Calendar className="h-5 w-5 text-secondary-600" />
                </div>
                <p className="font-medium">Easy Scheduling</p>
              </div>
              <div className="flex items-center">
                <div className="rounded-full bg-accent-100 p-2 mr-3">
                  <Search className="h-5 w-5 text-accent-600" />
                </div>
                <p className="font-medium">Medicine Database</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg"
                alt="Doctor with digital tablet"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-100 rounded-full opacity-70 z-0"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-100 rounded-full opacity-70 z-0"></div>
          </motion.div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;