import { motion } from 'framer-motion';
import { Testimonial } from '../../types';

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Emma Thompson',
      role: 'Patient',
      content: 'The video consultation was so convenient. I got the medical advice I needed without having to travel or wait in a clinic. The doctor was thorough and professional.',
      imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      name: 'Robert Chen',
      role: 'Patient',
      content: 'I was able to find the perfect homeopathic remedy for my chronic condition through this platform. The medicine database is comprehensive and the doctor guided me through everything.',
      imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '3',
      name: 'Dr. Lisa Patel',
      role: 'Homeopathic Doctor',
      content: 'As a doctor, I appreciate how easy it is to manage my appointments and connect with patients. The platform is intuitive and helps me provide better care to more people.',
      imageUrl: 'https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-primary-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Read about experiences from patients and doctors using our platform
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="card bg-white shadow-md border border-gray-100"
              variants={item}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;