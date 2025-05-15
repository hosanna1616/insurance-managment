import { useNavigate } from 'react-router-dom';
import { Shield, Clock, FileText, MessageSquare } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Manage Your Insurance Policies Anytime, Anywhere
              </h1>
              <p className="text-lg text-white/90 max-w-xl">
                Get comprehensive coverage tailored to your needs with our easy-to-use platform. Apply, manage, and track your policies seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                >
                  Login to Account
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <img
                src="src/Global Protection Illustration.jpeg"
                alt="Insurance Management"
                className="rounded-lg shadow-2xl max-w-md object-cover h-96 animate-slide-up"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose InsureEase?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our platform offers a seamless insurance experience with powerful features designed to make managing your policies effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-600">
                From auto to health, our wide range of insurance products covers all your protection needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="rounded-full bg-secondary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-gray-600">
                Manage your policies anytime, anywhere with our user-friendly online portal.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="rounded-full bg-accent-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Claims</h3>
              <p className="text-gray-600">
                Submit and track claims with our streamlined digital process for faster resolution.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card text-center hover:shadow-md transition-shadow">
              <div className="rounded-full bg-success-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Get personalized assistance from our team of insurance professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom mx-auto">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-4">
                <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
                <p className="text-white/90">
                  Join thousands of satisfied customers who trust us with their insurance needs. Create an account today and experience seamless policy management.
                </p>
                <div className="pt-4 flex space-x-4">
                  <Button 
                    onClick={() => navigate('/signup')}
                    className="bg-white text-primary-700 hover:bg-gray-100"
                  >
                    Create Account
                  </Button>
                  <Button 
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div className="lg:flex justify-end hidden">
                <img
                  src="src/Global Protection Illustration.jpeg"
                  alt="Get Started"
                  className="rounded-lg max-w-sm object-cover h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What Our Customers Say</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with InsureEase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Daniel walle</h4>
                  <p className="text-sm text-gray-500">Auto Insurance Customer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've been with InsureEase for over 3 years now. Their platform makes it so easy to manage my auto policy, and their customer service is outstanding."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 font-semibold">
                  SM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Estifanos walle</h4>
                  <p className="text-sm text-gray-500">Home Insurance Customer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Filing a claim after a storm damaged my roof was surprisingly easy with InsureEase. Their digital platform guided me through every step of the process."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 font-semibold">
                  RJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">meskerem abebe</h4>
                  <p className="text-sm text-gray-500">Life Insurance Customer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Getting life insurance used to be complicated and time-consuming. InsureEase simplified everything, from application to policy delivery."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <svg key={star} className={`w-5 h-5 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;