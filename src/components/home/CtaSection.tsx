import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <motion.div 
            className="max-w-2xl lg:max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Ready to take control of your health journey?
            </h2>
            <p className="mt-6 text-lg text-primary-100">
              Join thousands of satisfied users who have transformed their healthcare experience. 
              Register today to connect with specialists, access homeopathic remedies, and manage 
              your health effectively.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn bg-white text-primary-600 hover:bg-primary-50 shadow-md">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="btn border border-white text-white hover:bg-primary-700">
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Doctor with patient"
              className="rounded-xl shadow-2xl max-w-full h-auto"
              style={{ maxHeight: '400px' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;