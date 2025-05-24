import { motion } from 'framer-motion';
import { Video, Calendar, Search, Shield, Clock, Users } from 'lucide-react';
import { Feature } from '../../types';

const Features = () => {
  const features: Feature[] = [
    {
      title: 'Video Consultations',
      description: 'Connect with doctors face-to-face from the comfort of your home using high-quality video calls.',
      icon: <Video className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'Easy Appointment Booking',
      description: 'Book, reschedule, or cancel appointments with just a few clicks at your convenience.',
      icon: <Calendar className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'Homeopathic Medicine Database',
      description: 'Access comprehensive information about homeopathic medicines, symptoms, and dosages.',
      icon: <Search className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'Secure & Private',
      description: 'Your health data is encrypted and securely stored, ensuring complete privacy and confidentiality.',
      icon: <Shield className="h-6 w-6 text-primary-500" />,
    },
    {
      title: '24/7 Availability',
      description: 'Get medical advice anytime with our platform that connects you to available doctors round the clock.',
      icon: <Clock className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'Verified Specialists',
      description: 'All doctors on our platform are verified professionals with proven credentials and experience.',
      icon: <Users className="h-6 w-6 text-primary-500" />,
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Comprehensive Healthcare Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform offers a range of features designed to make healthcare accessible, convenient, and effective.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card hover:shadow-lg transition-shadow duration-300"
              variants={item}
            >
              <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;