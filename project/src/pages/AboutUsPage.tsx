import React from "react";
import { Users, Award, Clock, Globe, Shield } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const AboutUsPage = () => {
  const stats = [
    { icon: Users, value: "50,000+", label: "Satisfied Customers" },
    { icon: Award, value: "25+", label: "Years of Experience" },
    { icon: Clock, value: "24/7", label: "Customer Support" },
    { icon: Globe, value: "100+", label: "Cities Covered" },
  ];

  const team = [
    {
      name: "Hosanna Walle",
      role: "CEO",
      image:
        "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "WALLE TSEGANEH",
      role: "Chief Operations Officer",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      name: "MESKEREM ABEBE",
      role: "Head of Claims",
      image:
        "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-700 to-primary-800 py-20">
          <div className="container-custom">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About InsureEase
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Your trusted partner in protection since 2010. We're committed
                to providing reliable insurance solutions with exceptional
                service.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At InsureEase, we believe everyone deserves access to reliable
                  insurance coverage. Our mission is to simplify insurance
                  through technology while maintaining the personal touch that
                  our customers value.
                </p>
                <p className="text-gray-600">
                  We're committed to providing transparent, affordable, and
                  comprehensive insurance solutions that give our customers
                  peace of mind, knowing they're protected when it matters most.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Team Meeting"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="rounded-full bg-primary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary-700" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Leadership Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="card text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center hover:shadow-lg transition-shadow duration-300">
                <div className="rounded-full bg-primary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Trust</h3>
                <p className="text-gray-600">
                  We build lasting relationships through transparency and
                  reliability.
                </p>
              </div>
              <div className="card text-center hover:shadow-lg transition-shadow duration-300">
                <div className="rounded-full bg-primary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Every decision we make starts with our customers' needs.
                </p>
              </div>
              <div className="card text-center hover:shadow-lg transition-shadow duration-300">
                <div className="rounded-full bg-primary-100 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
