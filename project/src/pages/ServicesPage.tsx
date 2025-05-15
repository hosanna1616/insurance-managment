import {
  Shield,
  Home,
  Heart,
  Plane,
  ArrowRight,
  Phone,
  Calculator,
  Building,
  Umbrella,
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const ServicesPage = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    insuranceType: "",
    message: "",
  });

  const initialServices = [
    {
      icon: Shield,
      title: "Auto Insurance",
      description:
        "Comprehensive coverage for your vehicles with competitive rates and flexible payment options.",
      features: [
        "Collision Coverage",
        "Liability Protection",
        "24/7 Roadside Assistance",
        "Personal Injury Protection",
      ],
      popular: true,
    },
    {
      icon: Home,
      title: "Home Insurance",
      description:
        "Protect your home and belongings with our comprehensive home insurance policies.",
      features: [
        "Property Damage",
        "Theft Protection",
        "Natural Disaster Coverage",
        "Personal Liability",
      ],
      popular: false,
    },
    {
      icon: Heart,
      title: "Life Insurance",
      description:
        "Secure your family's future with our life insurance plans tailored to your needs.",
      features: [
        "Term Life Insurance",
        "Whole Life Insurance",
        "Critical Illness Cover",
        "Disability Benefits",
      ],
      popular: false,
    },
    {
      icon: Plane,
      title: "Travel Insurance",
      description:
        "Travel worry-free with our comprehensive travel insurance coverage.",
      features: [
        "Trip Cancellation",
        "Medical Emergency",
        "Lost Baggage",
        "Travel Assistance",
      ],
      popular: false,
    },
  ];

  const additionalServices = [
    {
      icon: Building,
      title: "Commercial Property Insurance",
      description:
        "Protect your business premises and assets with our comprehensive commercial property coverage.",
      features: [
        "Building Coverage",
        "Contents Protection",
        "Business Interruption",
        "Liability Coverage",
      ],
      popular: false,
    },
    {
      icon: Umbrella,
      title: "Umbrella Insurance",
      description:
        "Additional liability coverage that goes beyond the limits of your existing policies.",
      features: [
        "Extended Liability",
        "Asset Protection",
        "Legal Defense Coverage",
        "Worldwide Coverage",
      ],
      popular: false,
    },
    {
      icon: Briefcase,
      title: "Business Insurance",
      description:
        "Comprehensive protection for your business operations and employees.",
      features: [
        "General Liability",
        "Professional Liability",
        "Workers Compensation",
        "Cyber Insurance",
      ],
      popular: true,
    },
  ];

  const services = showAllServices
    ? [...initialServices, ...additionalServices]
    : initialServices;

  const handleGetQuote = () => {
    setShowQuoteForm(true);
    setShowContactForm(false);
    window.scrollTo({
      top: document.querySelector("form")?.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const handleContactAgent = () => {
    setShowContactForm(true);
    setShowQuoteForm(false);
    window.scrollTo({
      top: document.querySelector("form")?.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your submission! We will contact you shortly.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      insuranceType: "",
      message: "",
    });
    setShowQuoteForm(false);
    setShowContactForm(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-800 py-24">
          <div className="container-custom">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Insurance Services
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Comprehensive insurance solutions tailored to protect what
                matters most to you.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleGetQuote}
                  className="btn bg-white text-primary-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Get a Quote
                </button>
                <button
                  onClick={handleContactAgent}
                  className="btn border-2 border-white text-white hover:bg-white/10 flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Contact an Agent
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${
                    service.popular ? "border-2 border-primary-500" : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <div className="flex items-start p-6">
                    <div className="rounded-full bg-primary-100 p-4 mr-4">
                      <service.icon className="h-6 w-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={handleGetQuote}
                        className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 group"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!showAllServices && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllServices(true)}
                  className="btn btn-primary flex items-center gap-2 mx-auto"
                >
                  Load More Services
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Forms */}
        {showQuoteForm && (
          <section className="py-16 bg-white">
            <div className="container-custom max-w-2xl">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Get Your Free Quote</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <select
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Insurance Type</option>
                    <option value="auto">Auto Insurance</option>
                    <option value="home">Home Insurance</option>
                    <option value="life">Life Insurance</option>
                    <option value="travel">Travel Insurance</option>
                    <option value="commercial">
                      Commercial Property Insurance
                    </option>
                    <option value="umbrella">Umbrella Insurance</option>
                    <option value="business">Business Insurance</option>
                  </select>
                  <button type="submit" className="btn btn-primary w-full">
                    Get Quote
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {showContactForm && (
          <section className="py-16 bg-white">
            <div className="container-custom max-w-2xl">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">
                  Contact an Insurance Agent
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    rows={4}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                  <button type="submit" className="btn btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-10 bg-cover bg-center"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Get Protected?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Our insurance experts are here to help you find the perfect
                  coverage for your needs.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleGetQuote}
                    className="btn bg-white text-primary-700 hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Get a Quote
                  </button>
                  <button
                    onClick={handleContactAgent}
                    className="btn border-2 border-white text-white hover:bg-white/10 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Contact an Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
