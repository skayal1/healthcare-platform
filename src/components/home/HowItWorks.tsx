import { motion } from 'framer-motion';
import { UserPlus, Calendar, VideoIcon, ClipboardCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-10 w-10 text-white" />,
      title: 'Create an Account',
      description: 'Sign up as a patient or doctor with your basic information and medical credentials.',
      bgColor: 'bg-primary-500',
    },
    {
      icon: <Calendar className="h-10 w-10 text-white" />,
      title: 'Book an Appointment',
      description: 'Browse through specialists, check availability, and book a slot that works for you.',
      bgColor: 'bg-secondary-500',
    },
    {
      icon: <VideoIcon className="h-10 w-10 text-white" />,
      title: 'Start Video Consultation',
      description: 'Connect with your doctor through our secure, high-quality video platform.',
      bgColor: 'bg-primary-600',
    },
    {
      icon: <ClipboardCheck className="h-10 w-10 text-white" />,
      title: 'Get Treatment Plan',
      description: 'Receive a digital prescription and detailed treatment plan after your consultation.',
      bgColor: 'bg-secondary-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Get started with MediConnect in just a few simple steps
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="card text-center h-full flex flex-col items-center">
                <div className={`${step.bgColor} w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 left-full w-8 border-t-2 border-dashed border-gray-300 z-0" style={{ width: 'calc(100% - 2rem)' }}>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;