import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
          <div className="container-custom">
            <div className="max-w-lg mx-auto text-center card">
              <div className="rounded-full bg-success-100 p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-success-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Contacting Us!</h2>
              <p className="text-gray-600 mb-6">
                We've received your message and will get back to you within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-800 py-20">
          <div className="container-custom">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Have questions? We're here to help. Reach out to our team for assistance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="card text-center">
                <div className="rounded-full bg-primary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+251964672947</p>
                <p className="text-gray-600">Mon-Fri: 9AM-6PM </p>
              </div>
              
              <div className="card text-center">
                <div className="rounded-full bg-primary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">hosannawalle@gmail.com</p>
                <p className="text-gray-600">sales@insureease.com</p>
              </div>
              
              <div className="card text-center">
                <div className="rounded-full bg-primary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <p className="text-gray-600">kebele 16</p>
                <p className="text-gray-600">Amhara, Bahir Dar</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      className="input"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;