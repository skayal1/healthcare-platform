import { motion } from 'framer-motion';
import { Star, Video, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PopularDoctors = () => {
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Homeopathy Specialist',
      rating: 4.9,
      experience: 12,
      imageUrl: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Ayurveda Expert',
      rating: 4.8,
      experience: 8,
      imageUrl: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '3',
      name: 'Dr. Aisha Patel',
      specialization: 'Naturopathy Specialist',
      rating: 4.7,
      experience: 10,
      imageUrl: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Homeopathic Physician',
      rating: 4.9,
      experience: 15,
      imageUrl: 'https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Popular Doctors
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Consult with our highly-rated homeopathic doctors with years of experience in treating patients.
            </p>
          </div>
          <Link to="/doctors" className="mt-6 md:mt-0 flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
            View all doctors <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {doctors.map((doctor) => (
            <motion.div 
              key={doctor.id}
              className="card group hover:shadow-lg transition-all duration-300"
              variants={item}
            >
              <div className="relative mb-5 rounded-lg overflow-hidden">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-full h-56 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow-md flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-1 text-gray-900">{doctor.name}</h3>
              <p className="text-gray-600 mb-3">{doctor.specialization}</p>
              <p className="text-sm text-gray-500 mb-4">{doctor.experience} years experience</p>

              <div className="flex space-x-3">
                <Link
                  to={`/book-appointment/${doctor.id}`}
                  className="flex-1 btn bg-white border border-primary-500 text-primary-600 hover:bg-primary-50 py-2"
                >
                  <Calendar className="h-4 w-4 mr-2" /> Book
                </Link>
                <Link
                  to={`/video-consultation/${doctor.id}`}
                  className="flex-1 btn bg-primary-500 text-white hover:bg-primary-600 py-2"
                >
                  <Video className="h-4 w-4 mr-2" /> Consult
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularDoctors;