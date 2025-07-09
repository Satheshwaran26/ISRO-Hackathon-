import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TrackDataTable from '@/components/TrackDataTable';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFontSize } from '@/contexts/FontSizeContext';
import { motion } from 'framer-motion';
// Import the hero image
import heroImage from '@/assets/img/3DIMG_01NOV2015_0000_L1C_ASIA_MER_V01R00.jpg';

interface IndexProps {
  showDashboard?: boolean;
}

const Index = ({ showDashboard: initialShowDashboard = false }: IndexProps) => {
  const [showDashboard, setShowDashboard] = useState(initialShowDashboard);
  const [language, setLanguage] = useState('en');
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = useFontSize();
  const navigate = useNavigate();
  const location = useLocation();

  // Update showDashboard when prop changes
  useEffect(() => {
    setShowDashboard(initialShowDashboard);
  }, [initialShowDashboard]);

  // Check if we should show dashboard based on navigation state
  useEffect(() => {
    if (location.state?.showDashboard) {
      setShowDashboard(true);
      // Clear the state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToHome = () => {
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const getText = (enText: string, hiText: string) => {
    return language === 'en' ? enText : hiText;
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const NavBar = () => (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-blue-100">
      <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
            <button 
              onClick={goToHome}
              className="text-2xl font-poppins font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Team Lava
            </button>
                </div>
          <div className="flex items-center space-x-8">
            {/* Font Size Controls */}
            <div className="flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2">
                  <Button 
                    onClick={decreaseFontSize}
                variant="ghost"
                className="hover:bg-blue-100 text-blue-600 font-medium w-8 h-8 rounded-full p-0"
                disabled={fontSize === "xs"}
                  >
                    A-
                  </Button>
              <span className="text-blue-600 font-medium px-2">A</span>
                  <Button 
                    onClick={increaseFontSize}
                variant="ghost"
                className="hover:bg-blue-100 text-blue-600 font-medium w-8 h-8 rounded-full p-0"
                disabled={fontSize === "2xl"}
                  >
                    A+
                  </Button>
            </div>

            {/* Language Toggle */}
                  <Button 
                    onClick={toggleLanguage}
              variant="outline"
              className="border-blue-200 hover:bg-blue-50 text-blue-600 font-medium px-6"
                  >
              {language === 'en' ? 'हिंदी' : 'English'}
                  </Button>

            {/* Navigation Links */}
            {!showDashboard && (
              <div className="flex space-x-6">
                <button 
                  onClick={goToHome}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {getText('Home', 'होम')}
                </button>
                <button 
                  onClick={goToDashboard}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {getText('Project Demo', 'प्रोजेक्ट डेमो')}
                </button>
              </div>
            )}

            {showDashboard && (
              <Button 
                onClick={goToHome}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition-all duration-300"
              >
                {getText('Back to Home', 'होम पर वापस')}
              </Button>
            )}
          </div>
            </div>
          </div>
        </nav>
  );

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-white font-poppins">
        <NavBar />
        <div className="container mx-auto py-24 px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">
              {getText('Tropical Cyclone Data Dashboard', 'उष्णकटिबंधीय चक्रवात डेटा डैशबोर्ड')}
            </h1>
            <p className="text-lg text-blue-600/80 max-w-3xl mx-auto">
              {getText(
                'Explore comprehensive tracking data for tropical cyclone systems with detailed meteorological observations.',
                'विस्तृत मौसम विज्ञान अवलोकन के साथ उष्णकटिबंधीय चक्रवात प्रणालियों के लिए व्यापक ट्रैकिंग डेटा का अन्वेषण करें।'
              )}
            </p>
          </div>
          <TrackDataTable />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${fontSize}`}>
      <NavBar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight">
              {getText('Tropical Cyclone Prediction System', 'उष्णकटिबंधीय चक्रवात पूर्वानुमान प्रणाली')}
            </h1>
            <p className="text-xl text-blue-600/70 leading-relaxed">
              {getText(
                'Advanced satellite data analysis and machine learning solutions for accurate cyclone prediction',
                'सटीक चक्रवात भविष्यवाणी के लिए उन्नत उपग्रह डेटा विश्लेषण और मशीन लर्निंग समाधान'
              )}
            </p>
            <Button 
              onClick={goToDashboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {getText('View Project', 'प्रोजेक्ट देखें')}
            </Button>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="/src/assets/img/3DIMG_01NOV2015_0000_L1C_ASIA_MER_V01R00.jpg"
                alt="Tropical Cyclone Visualization"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-semibold">
                  {getText('Real-time Satellite Imagery', 'रीयल-टाइम सैटेलाइट इमेजरी')}
                </p>
                <p className="text-white/80 text-sm">
                  {getText('INSAT-3DR/3DS Data', 'INSAT-3DR/3DS डेटा')}
                </p>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -right-4 top-4 bg-white rounded-2xl p-4 shadow-lg border border-blue-100"
            >
              <p className="text-sm text-blue-600 font-medium">Resolution</p>
              <p className="text-lg font-semibold text-blue-900">4km/pixel</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -left-4 bottom-4 bg-white rounded-2xl p-4 shadow-lg border border-blue-100"
            >
              <p className="text-sm text-blue-600 font-medium">Data Coverage</p>
              <p className="text-lg font-semibold text-blue-900">November 2015</p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Problem Statement Section */}
      <section id="problem" className="py-20 bg-white border-t border-b border-blue-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-govt font-bold text-blue-600 mb-10 text-center">
              {getText('Problem Statement – Tropical Cloud Cluster (TCC)', 'समस्या कथन - उष्णकटिबंधीय बादल समूह (TCC)')}
            </h2>
            <Card className="border-2 border-blue-100 shadow-lg rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg text-blue-600/80 leading-relaxed">
                  {getText(
                    'Tropical Cloud Cluster (TCC) is a key element of the weather and climate by transporting mass, momentum and heat vertically into the Earth\'s atmosphere. Identifying the TCC is paramount important to the identification of cyclogenesis and its evolution is of great significance in weather and climate system. To study the initiation and development of TCCs over the Indian Oceanic region, a dataset called "Indian Tropical Cloud Cluster (ITCC)" is to be generated using INSAT-3D Infrared Brightness Temperature (IRBRT) data. In order to generate the ITCC data, an automatic algorithm is to be developed based on deep learning/machine learning. Thus, the current proposal describes methodology for identifying the TCCs using INSAT-3D IRBRT data. Identified TCCs will be tracked as they move around their Indian Ocean basin and variables such as TCC size, location, convective intensity, cloud-top height. The algorithm can be adapted to near-real-time tracking of TCCs, which could be of great benefit to the tropical cyclone forecast community.',
                    'उष्णकटिबंधीय बादल समूह (Tropical Cloud Cluster - TCC) मौसम और जलवायु प्रणाली का एक प्रमुख घटक है, जो पृथ्वी के वायुमंडल में द्रव्यमान, संवेग और ऊष्मा को ऊर्ध्वाधर रूप से स्थानांतरित करता है। TCC की पहचान करना चक्रवात-जनन (cyclogenesis) की पहचान के लिए अत्यंत महत्वपूर्ण है, और इसका विकास मौसम और जलवायु प्रणाली में महत्वपूर्ण भूमिका निभाता है। भारतीय महासागर क्षेत्र में TCC के आरंभ और विकास का अध्ययन करने के लिए, "इंडियन ट्रॉपिकल क्लाउड क्लस्टर (ITCC)" नामक एक डेटासेट INSAT-3D के इन्फ्रारेड ब्राइटनेस टेम्परेचर (IRBRT) डेटा का उपयोग करके तैयार किया जाएगा। ITCC डेटा उत्पन्न करने के लिए एक स्वचालित एल्गोरिदम विकसित किया जाना है, जो डीप लर्निंग/मशीन लर्निंग पर आधारित होगा। इस प्रस्ताव में INSAT-3D IRBRT डेटा का उपयोग करके TCC की पहचान की कार्यप्रणाली का वर्णन किया गया है। पहचाने गए TCCs को उनके भारतीय महासागर क्षेत्र में गतिशील होने के दौरान ट्रैक किया जाएगा और उनके आकार, स्थान, संवहन तीव्रता, और क्लाउड-टॉप ऊँचाई जैसे चर को मापा जाएगा। यह एल्गोरिदम TCCs को लगभग वास्तविक समय (near-real-time) में ट्रैक करने के लिए अनुकूलित किया जा सकता है, जो उष्णकटिबंधीय चक्रवात पूर्वानुमान समुदाय के लिए अत्यंत लाभकारी हो सकता है।'
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold mb-4 uppercase tracking-wider">Project Demo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
              {getText('Watch Our Project Overview', 'हमारा प्रोजेक्ट अवलोकन देखें')}
            </h2>
            <p className="text-lg text-blue-600/70 max-w-2xl mx-auto">
              {getText(
                'Explore our innovative approach to cloud motion prediction through these comprehensive video demonstrations.',
                'इन व्यापक वीडियो प्रदर्शनों के माध्यम से बादल गति भविष्यवाणी के लिए हमारे नवीन दृष्टिकोण का अन्वेषण करें।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* English Video */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-100 group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-blue-50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-4xl">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">English Demonstration</h3>
                  <p className="text-white/80">Comprehensive project walkthrough</p>
                </div>
              </div>
            </div>

            {/* Hindi Video */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-100 group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-blue-50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-4xl">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">हिंदी प्रदर्शन</h3>
                  <p className="text-white/80">विस्तृत परियोजना प्रदर्शन</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold mb-4 uppercase tracking-wider">Our Team</p>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">Meet Team LAVA</h2>
            <p className="text-lg text-blue-600/70 max-w-2xl mx-auto">
              {getText(
                'A dedicated team of professionals working together to revolutionize weather forecasting through innovative cloud motion prediction technology.',
                'नवीन क्लाउड मोशन प्रेडिक्शन टेक्नॉलॉजी के माध्यम से मौसम पूर्वानुमान को क्रांतिकारी बनाने के लिए काम करने वाली समर्पित पेशेवरों की टीम।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Leader */}
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100 transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                  SP
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-2 text-center">Sarath P</h3>
                <p className="text-orange-500 font-semibold text-center mb-2">Team Lead & AI/ML Engineer</p>
                <p className="text-blue-600/70 text-sm text-center">
                  Leads the team and specializes in deep learning and computer vision, with a strong focus on satellite imagery analysis and model deployment.
                </p>
              </div>
            </div>

            {/* Other Team Members */}
            {[
              {
                initials: 'V',
                name: 'Vikass',
                role: 'AI/ML Engineer',
                description: 'Works on developing and training AI models, contributing to robust backend pipelines and scalable ML systems.'
              },
              {
                initials: 'SV',
                name: 'Satheshwaran V',
                role: 'Web & App Developer',
                description: 'Designs and develops responsive and user-friendly web and mobile interfaces, ensuring smooth user experience and frontend performance.'
              },
              {
                initials: 'M',
                name: 'Mathivathani',
                role: 'Research & Documentation',
                description: 'Responsible for data validation, research writing, and comprehensive documentation, aiding scientific interpretation and project clarity.'
              }
            ].map((member, index) => (
              <div key={member.initials} className="group">
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100 transform group-hover:-translate-y-2 transition-all duration-300">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2 text-center">{member.name}</h3>
                  <p className="text-orange-500 font-semibold text-center mb-2">{member.role}</p>
                  <p className="text-blue-600/70 text-sm text-center">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Dashboard Preview */}
      <section id="dashboard" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-govt font-bold text-blue-600 mb-8">
              {getText('Tropical Cyclone Data Dashboard', 'उष्णकटिबंधीय चक्रवात डेटा डैशबोर्ड')}
            </h2>
            <p className="text-lg text-blue-600/80 mb-12 leading-relaxed">
              {getText(
                'Explore comprehensive tracking data for tropical cyclone systems with detailed meteorological observations and track point analysis.',
                'विस्तृत मौसम विज्ञान अवलोकन और ट्रैक पॉइंट विश्लेषण के साथ उष्णकटिबंधीय चक्रवात प्रणालियों के लिए व्यापक ट्रैकिंग डेटा का अन्वेषण करें।'
              )}
            </p>
            <Button 
              onClick={goToDashboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {getText('Go to Dashboard', 'डैशबोर्ड पर जाएं')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-blue-600">Team LAVA</h3>
            <p className="text-blue-600/70 max-w-2xl mx-auto">
              Advancing weather forecasting technology through innovative cloud motion prediction using INSAT-3DR/3DS satellite imagery.
            </p>
            <p className="text-sm text-blue-600/60">
              © 2025 Team LAVA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
