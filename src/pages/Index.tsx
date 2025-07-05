
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TrackDataTable from '@/components/TrackDataTable';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFontSize } from '@/contexts/FontSizeContext';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [language, setLanguage] = useState('en');
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize, getFontSizeClass } = useFontSize();
  const navigate = useNavigate();
  const location = useLocation();

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
    setShowDashboard(true);
    // Small delay to ensure state is updated before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const getText = (enText: string, hiText: string) => {
    return language === 'en' ? enText : hiText;
  };

  if (showDashboard) {
    return (
      <div className={`min-h-screen bg-white ${getFontSizeClass()}`}>
        <nav className="sticky top-0 z-50 bg-gov-navy text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gov-saffron rounded-full flex items-center justify-center font-bold text-white">
                  ISRO
                </div>
                <div>
                  <h1 className="text-lg font-govt font-semibold">
                    {getText('Indian Space Research Organisation', 'भारतीय अंतरिक्ष अनुसंधान संगठन')}
                  </h1>
                  <p className="text-sm text-blue-200">
                    {getText('भारतीय अंतरिक्ष अनुसंधान संगठन', 'Indian Space Research Organisation')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button 
                    onClick={decreaseFontSize}
                    size="sm"
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                  >
                    A-
                  </Button>
                  <Button 
                    onClick={resetFontSize}
                    size="sm"
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                  >
                    A
                  </Button>
                  <Button 
                    onClick={increaseFontSize}
                    size="sm"
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                  >
                    A+
                  </Button>
                  <Button 
                    onClick={toggleLanguage}
                    size="sm"
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    {language === 'en' ? 'हिं' : 'EN'}
                  </Button>
                </div>
                <Button 
                  onClick={() => setShowDashboard(false)}
                  className="bg-gov-saffron hover:bg-orange-600 text-white"
                >
                  {getText('Back to Home', 'होम पर वापस')}
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-govt font-bold text-gov-navy mb-4">
              {getText('Tropical Cyclone Data Dashboard', 'उष्णकटिबंधीय चक्रवात डेटा डैशबोर्ड')}
            </h1>
            <p className="text-xl text-gov-grey max-w-3xl mx-auto font-formal">
              {getText(
                'Explore comprehensive tracking data for tropical cyclone systems with detailed meteorological observations and track point analysis.',
                'विस्तृत मौसम विज्ञान अवलोकन और ट्रैक पॉइंट विश्लेषण के साथ उष्णकटिबंधीय चक्रवात प्रणालियों के लिए व्यापक ट्रैकिंग डेटा का अन्वेषण करें।'
              )}
            </p>
          </div>
          <TrackDataTable />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white font-formal ${getFontSizeClass()}`}>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gov-navy text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gov-saffron rounded-full flex items-center justify-center font-bold text-white">
                ISRO
              </div>
              <div>
                <h1 className="text-lg font-govt font-semibold">
                  {getText('Indian Space Research Organisation', 'भारतीय अंतरिक्ष अनुसंधान संगठन')}
                </h1>
                <p className="text-sm text-blue-200">
                  {getText('भारतीय अंतरिक्ष अनुसंधान संगठन', 'Indian Space Research Organisation')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={decreaseFontSize}
                  size="sm"
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                >
                  A-
                </Button>
                <Button 
                  onClick={resetFontSize}
                  size="sm"
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                >
                  A
                </Button>
                <Button 
                  onClick={increaseFontSize}
                  size="sm"
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                >
                  A+
                </Button>
                <Button 
                  onClick={toggleLanguage}
                  size="sm"
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  {language === 'en' ? 'हिं' : 'EN'}
                </Button>
              </div>
              <div className="hidden md:flex space-x-8">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-gov-saffron transition-colors border-b-2 border-transparent hover:border-gov-saffron pb-1"
                >
                  {getText('Home', 'होम')}
                </button>
                <button 
                  onClick={() => scrollToSection('team')}
                  className="hover:text-gov-saffron transition-colors border-b-2 border-transparent hover:border-gov-saffron pb-1"
                >
                  {getText('About Team', 'टीम के बारे में')}
                </button>
                <button 
                  onClick={() => scrollToSection('problem')}
                  className="hover:text-gov-saffron transition-colors border-b-2 border-transparent hover:border-gov-saffron pb-1"
                >
                  {getText('Problem Statement', 'समस्या कथन')}
                </button>
                <button 
                  onClick={() => scrollToSection('dashboard')}
                  className="hover:text-gov-saffron transition-colors border-b-2 border-transparent hover:border-gov-saffron pb-1"
                >
                  {getText('Dashboard', 'डैशबोर्ड')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Landing Section */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-5xl md:text-6xl font-govt font-bold text-gov-navy mb-6 ${getFontSizeClass()}`}>
              {getText('Team Antariksh', 'टीम अंतरिक्ष')}
            </h1>
            <h2 className={`text-2xl md:text-3xl font-formal text-gov-grey mb-8 ${getFontSizeClass()}`}>
              {getText('Bharatiya Antariksh Hackathon 2025', 'भारतीय अंतरिक्ष हैकाथॉन 2025')}
            </h2>
            <p className={`text-lg text-gov-grey mb-10 max-w-2xl mx-auto ${getFontSizeClass()}`}>
              {getText(
                'Advancing tropical cyclone prediction through innovative satellite data analysis and machine learning solutions',
                'नवाचार उपग्रह डेटा विश्लेषण और मशीन लर्निंग समाधानों के माध्यम से उष्णकटिबंधीय चक्रवात पूर्वानुमान को आगे बढ़ाना'
              )}
            </p>
            <Button 
              onClick={goToDashboard}
              className={`bg-gov-saffron hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-md shadow-lg ${getFontSizeClass()}`}
            >
              {getText('View Project Dashboard', 'प्रोजेक्ट डैशबोर्ड देखें')}
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="problem" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-govt font-bold text-gov-navy mb-8 text-center ${getFontSizeClass()}`}>
              {getText('Problem Statement – Tropical Cloud Cluster (TCC)', 'समस्या कथन - उष्णकटिबंधीय बादल समूह (TCC)')}
            </h2>
            <Card className="border-2 border-gov-navy/10 shadow-lg">
              <CardContent className="p-8">
                <p className={`text-lg text-gov-grey leading-relaxed font-formal ${getFontSizeClass()}`}>
                  {getText(
                    'Tropical Cloud Cluster (TCC) is a key element of the weather and climate by transporting mass, momentum and heat vertically into the Earth\'s atmosphere. Identifying the TCC is paramount important to the identification of cyclogenesis and its evolution is of great significance in weather and climate system. To study the initiation and development of TCCs over the Indian Oceanic region, a dataset called "Indian Tropical Cloud Cluster (ITCC)" is to be generated using INSAT-3D Infrared Brightness Temperature (IRBRT) data. In order to generate the ITCC data, an automatic algorithm is to be developed based on deep learning/machine learning. Thus, the current proposal describes methodology for identifying the TCCs using INSAT-3D IRBRT data. Identified TCCs will be tracked as they move around their Indian Ocean basin and variables such as TCC size, location, convective intensity, cloud-top height. The algorithm can be adapted to near-real-time tracking of TCCs, which could be of great benefit to the tropical cyclone forecast community.',
                    'उष्णकटिबंधीय बादल समूह (TCC) पृथ्वी के वायुमंडल में द्रव्यमान, संवेग और ऊष्मा को लंबवत रूप से परिवहन करके मौसम और जलवायु का एक प्रमुख तत्व है। TCC की पहचान चक्रवातजनन की पहचान के लिए अत्यंत महत्वपूर्ण है और इसका विकास मौसम और जलवायु प्रणाली में बहुत महत्वपूर्ण है।'
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl font-govt font-bold text-gov-navy mb-8 ${getFontSizeClass()}`}>
              {getText('Watch Our Project Overview', 'हमारा प्रोजेक्ट अवलोकन देखें')}
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gov-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                  <p className={`text-gov-grey font-formal ${getFontSizeClass()}`}>
                    {getText('Project Demo Video', 'प्रोजेक्ट डेमो वीडियो')}
                  </p>
                  <p className={`text-sm text-gray-500 mt-2 ${getFontSizeClass()}`}>
                    {getText('Coming Soon', 'जल्द आ रहा है')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Team Section */}
      <section id="team" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl font-govt font-bold text-gov-navy mb-12 text-center ${getFontSizeClass()}`}>
              {getText('Meet Our Team', 'हमारी टीम से मिलें')}
            </h2>
            <div className="grid grid-cols-3 gap-8 items-start">
              {/* Team Leader - Center positioned */}
              <div className="col-start-2">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gov-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      SP
                    </div>
                    <CardTitle className={`text-gov-navy font-govt ${getFontSizeClass()}`}>SARATH P</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-gov-grey font-formal font-semibold ${getFontSizeClass()}`}>
                      {getText('TEAM LEADER', 'टीम लीडर')}
                    </p>
                    <p className={`text-gov-grey font-formal text-sm mt-1 ${getFontSizeClass()}`}>
                      {getText('AI Developer', 'AI डेवलपर')}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Team Members - Second Row */}
              <div className="col-span-3 grid grid-cols-3 gap-8 mt-8">
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gov-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      SV
                    </div>
                    <CardTitle className={`text-gov-navy font-govt ${getFontSizeClass()}`}>Satheshwaran V</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-gov-grey font-formal ${getFontSizeClass()}`}>
                      {getText('App and Web Developer', 'ऐप और वेब डेवलपर')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gov-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      V
                    </div>
                    <CardTitle className={`text-gov-navy font-govt ${getFontSizeClass()}`}>Vikaas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-gov-grey font-formal ${getFontSizeClass()}`}>
                      {getText('AI/ML Developer', 'AI/ML डेवलपर')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gov-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      M
                    </div>
                    <CardTitle className={`text-gov-navy font-govt ${getFontSizeClass()}`}>Mathivathani</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-gov-grey font-formal ${getFontSizeClass()}`}>
                      {getText('Research and Documentation', 'अनुसंधान और प्रलेखन')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-govt font-bold text-gov-navy mb-8 ${getFontSizeClass()}`}>
              {getText('Tropical Cyclone Data Dashboard', 'उष्णकटिबंधीय चक्रवात डेटा डैशबोर्ड')}
            </h2>
            <p className={`text-lg text-gov-grey mb-10 font-formal ${getFontSizeClass()}`}>
              {getText(
                'Explore comprehensive tracking data for tropical cyclone systems with detailed meteorological observations and track point analysis.',
                'विस्तृत मौसम विज्ञान अवलोकन और ट्रैक पॉइंट विश्लेषण के साथ उष्णकटिबंधीय चक्रवात प्रणालियों के लिए व्यापक ट्रैकिंग डेटा का अन्वेषण करें।'
              )}
            </p>
            <Button 
              onClick={goToDashboard}
              className={`bg-gov-saffron hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-md shadow-lg ${getFontSizeClass()}`}
            >
              {getText('Go to Dashboard', 'डैशबोर्ड पर जाएं')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gov-navy text-white py-8">
        <div className="container mx-auto px-4">
          <Separator className="mb-8 bg-blue-400" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className={`font-formal ${getFontSizeClass()}`}>
                {getText('© 2025 ISRO Hackathon | Powered by Team Antariksh', '© 2025 ISRO हैकाथॉन | टीम अंतरिक्ष द्वारा संचालित')}
              </p>
            </div>
            <div className="flex space-x-8 text-sm">
              <button className={`hover:text-gov-saffron transition-colors ${getFontSizeClass()}`}>
                {getText('Privacy Policy', 'गोपनीयता नीति')}
              </button>
              <button className={`hover:text-gov-saffron transition-colors ${getFontSizeClass()}`}>
                {getText('Terms & Conditions', 'नियम और शर्तें')}
              </button>
            </div>
          </div>
          <div className={`text-center mt-4 text-blue-200 text-sm font-formal ${getFontSizeClass()}`}>
            {getText('भारतीय अंतरिक्ष अनुसंधान संगठन | Indian Space Research Organisation', 'Indian Space Research Organisation | भारतीय अंतरिक्ष अनुसंधान संगठन')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
