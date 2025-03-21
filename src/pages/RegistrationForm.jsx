const styles = `
@keyframes marquee {
  0% {
      transform: translateX(0%);
  }
  100% {
      transform: translateX(-100%);
  }
}

.animate-marquee {
  display: inline-block;
  white-space: nowrap;
    animation: marquee 20s linear infinite;
}
`;

import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Phone,
  Mail,
  User,
  Users,
  Clock,
  Info,
  X
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const RegistrationForm = () => {  
  // Sports options with fee details
  const sportOptions = [
    "Athletics - 100m - 500/-",
    "Athletics - 200m - 500/-",
    "Basketball Men - 1500/-",
    "Basketball Women - 1500/-",
    "Chess - 500/-",
    "Cricket - 1500/-",
    "Football - 1500/-",
    "Kabaddi - 1500/-",
    "Throwball Men - 1500/-",
    "Throwball Women - 1500/-",
    "Volleyball - 1500/-"
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    captainName: '',
    captainMobile: '',
    coachName: '',
    coachMobile: '',
    sport: '',
    paymentStatus: 'Paid'
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  // Show popup on page load
  useEffect(() => {
    setShowPopup(true);
    
    // Auto-hide popup after 8 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.university.trim()) {
      newErrors.university = 'University/College name is required';
    }
    if (!formData.captainName.trim()) {
      newErrors.captainName = 'Team Captain name is required';
    }
    if (!formData.captainMobile.trim()) {
      newErrors.captainMobile = 'Team Captain mobile number is required';
    } else if (!/^\d{10}$/.test(formData.captainMobile.replace(/\D/g, ''))) {
      newErrors.captainMobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.coachName.trim()) {
      newErrors.coachName = 'Coach name is required';
    }
    if (!formData.coachMobile.trim()) {
      newErrors.coachMobile = 'Coach mobile number is required';
    } else if (!/^\d{10}$/.test(formData.coachMobile.replace(/\D/g, ''))) {
      newErrors.coachMobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.sport) {
      newErrors.sport = 'Please select a sport';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (validateForm()) {
      try {
        const submissionData = {
          name: formData.name,
          email: formData.email,
          university: formData.university,
          captainName: formData.captainName,
          captainMobile: formData.captainMobile,
          coachName: formData.coachName,
          coachMobile: formData.coachMobile,
          sport: formData.sport,
          paymentStatus: formData.paymentStatus,
          timestamp: new Date()
        };

        await addDoc(collection(db, 'registrations'), submissionData);

        setFormData({
          name: '',
          email: '',
          university: '',
          captainName: '',
          captainMobile: '',
          coachName: '',
          coachMobile: '',
          sport: '',
          paymentStatus: 'Paid'
        });
        setSubmitStatus('success');
      } catch (err) {
        console.error('Error during form submission:', err);
        setError('Error submitting form. Please try again.');
        setSubmitStatus('error');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      university: '',
      captainName: '',
      captainMobile: '',
      coachName: '',
      coachMobile: '',
      sport: '',
      paymentStatus: 'Paid'
    });
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#f4e4c9] flex flex-col p-3 sm:p-6 md:p-8 relative">
      <style>{styles}</style>

      {/* Popup for Gitam Students */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-[#e7fefe] rounded-lg shadow-xl max-w-md w-full border-2 border-[#a58255] overflow-hidden transform transition-all animate-fadeIn">
            <div className="bg-[#07534c] p-4 flex justify-between items-center">
              <h3 className="text-[#e7fefe] font-bold text-lg flex items-center">
                <Info className="mr-2 h-5 w-5" /> Important Notice
              </h3>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-[#e7fefe] hover:text-[#a58255] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="text-lg font-bold text-[#07534c] mb-3">
              Registration is free for
             <br /> 
             GITAM STUDENTS
              </div>
              <Button
                onClick={() => setShowPopup(false)}
                className="bg-[#a58255] hover:bg-[#9b774a] text-[#e7fefe] font-semibold px-6 py-2 rounded-lg transition-all duration-200"
              >
                Got it, thanks!
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-4 sm:my-8 md:my-10">
        <div className="relative flex items-center w-full max-w-4xl px-2 sm:px-4">
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          <h1 className="mx-2 sm:mx-8 text-xl sm:text-2xl md:text-4xl font-bold text-[#004740] text-center whitespace-nowrap">
            REGISTRATION FORM
          </h1>
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden border-2 border-[#a58255] transform transition-all hover:shadow-2xl">
        <CardContent className="p-3 sm:p-6 md:p-8 bg-[#07534c]">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Running Marquee Banner */}
            <div className="sticky top-0 z-40 w-full bg-[#07534c] shadow-md border-b-2 border-[#a58255] mb-4">
              <div className="overflow-hidden">
                <div className="animate-marquee whitespace-nowrap py-2">
                  <div className="inline-flex items-center text-[#e7fefe] font-semibold">
                    <Clock className="h-4 w-4 mr-2 text-[#a58255]" />
                    <span>⏱️ LAST DATE TO REGISTER IS 22nd MARCH 2025 ⏱️</span>
                    <span className="mx-8">|</span>
                    <Clock className="h-4 w-4 mr-2 text-[#a58255]" />
                    <span>⏱️ LAST DATE TO REGISTER IS 21st MARCH 2025 ⏱️</span>
                    <span className="mx-8">|</span>
                    <Clock className="h-4 w-4 mr-2 text-[#a58255]" />
                    <span>⏱️ LAST DATE TO REGISTER IS 21st MARCH 2025 ⏱️</span>
                    <span className="mx-8">|</span>
                    <Clock className="h-4 w-4 mr-2 text-[#a58255]" />
                    <span>⏱️ LAST DATE TO REGISTER IS 21st MARCH 2025 ⏱️</span>
                    <span className="mx-8">|</span>
                    <Clock className="h-4 w-4 mr-2 text-[#a58255]" />
                    <span>⏱️ LAST DATE TO REGISTER IS 21st MARCH 2025 ⏱️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                Name <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg bg-[#07534c]/90 border-2 text-sm ${
                    errors.name ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255] transition-all`}
                />
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7fefe]/60 absolute left-2 sm:left-3 top-2.5 sm:top-3.5" />
                {errors.name && (
                  <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-400">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" /> {errors.name}
                </p>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                Email <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg bg-[#07534c]/90 border-2 text-sm ${
                    errors.email ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255] transition-all`}
                />
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7fefe]/60 absolute left-2 sm:left-3 top-2.5 sm:top-3.5" />
                {errors.email && (
                  <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-400">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" /> {errors.email}
                </p>
              )}
            </div>

            {/* University Field */}
            <div>
              <Label htmlFor="university" className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                Name of the University / College <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="university"
                  name="university"
                  placeholder="Enter university or college name"
                  value={formData.university}
                  onChange={handleChange}
                  className={`pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg bg-[#07534c]/90 border-2 text-sm ${
                    errors.university ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255] transition-all`}
                />
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7fefe]/60 absolute left-2 sm:left-3 top-2.5 sm:top-3.5" />
                {errors.university && (
                  <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.university && (
                <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-400">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" /> {errors.university}
                </p>
              )}
            </div>

            {/* Captain Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Captain Name */}
              <div>
                <Label htmlFor="captainName" className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                  Name of the Team Captain <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    id="captainName"
                    name="captainName"
                    placeholder="Enter team captain's name"
                    value={formData.captainName}
                    onChange={handleChange}
                    className={`pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg bg-[#07534c]/90 border-2 text-sm ${
                      errors.captainName ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255] transition-all`}
                  />
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7fefe]/60 absolute left-2 sm:left-3 top-2.5 sm:top-3.5" />
                  {errors.captainName && (
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                    </div>
                  )}
                </div>
                {errors.captainName && (
                  <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-400">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" /> {errors.captainName}
                  </p>
                )}
              </div>

              {/* Captain Mobile */}
              <div>
                <Label htmlFor="captainMobile" className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                  Captain Mobile No. <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="tel"
                    id="captainMobile"
                    name="captainMobile"
                    placeholder="Enter captain's mobile number"
                    value={formData.captainMobile}
                    onChange={handleChange}
                    className={`pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg bg-[#07534c]/90 border-2 text-sm ${
                      errors.captainMobile ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255] transition-all`}
                  />
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7fefe]/60 absolute left-2 sm:left-3 top-2.5 sm:top-3.5" />
                  {errors.captainMobile && (
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                    </div>
                  )}
                </div>
                {errors.captainMobile && (
                  <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-400">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" /> {errors.captainMobile}
                  </p>
                )}
              </div>
            </div>

            {/* Coach Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Coach Name */}
              <div>
                <Label htmlFor="coachName" className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                  Coach Name <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    id="coachName"
                    name="coachName"
                    placeholder="Enter coach's name"
                    value={formData.coachName}
                    onChange={handleChange}
                    className={`pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg bg-[#07534c]/90 border-2 text-sm ${
                      errors.coachName ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255] transition-all`}
                  />
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7fefe]/60 absolute left-2 sm:left-3 top-2.5 sm:top-3.5" />
                  {errors.coachName && (
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                    </div>
                  )}
                </div>
                {errors.coachName && (
                  <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-400">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" /> {errors.coachName}
                  </p>
                )}
              </div>

              {/* Coach Mobile */}
              <div>
                <Label htmlFor="coachMobile" className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                  Coach Mobile No. <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="tel"
                    id="coachMobile"
                    name="coachMobile"
                    placeholder="Enter coach's mobile number"
                    value={formData.coachMobile}
                    onChange={handleChange}
                    className={`pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg bg-[#07534c]/90 border-2 text-sm ${
                      errors.coachMobile ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255] transition-all`}
                  />
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7fefe]/60 absolute left-2 sm:left-3 top-2.5 sm:top-3.5" />
                  {errors.coachMobile && (
                    <div className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                    </div>
                  )}
                </div>
                {errors.coachMobile && (
                  <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-400">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" /> {errors.coachMobile}
                  </p>
                )}
              </div>
            </div>

            {/* Sport Dropdown */}
            <div>
              <Label htmlFor="sport" className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                Sport <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <select
                  id="sport"
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  className={`w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 rounded-lg appearance-none bg-[#07534c]/90 border-2 text-sm ${
                    errors.sport ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] focus:ring-2 focus:ring-[#a58255] transition-all`}
                >
                  <option value="" className="bg-[#07534c]">Select sport</option>
                  {sportOptions.map((sport, index) => (
                    <option key={index} value={sport} className="bg-[#07534c] text-sm">{sport}</option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7fefe]/60 absolute right-2 sm:right-3 top-2.5 sm:top-3.5 pointer-events-none" />
              </div>
              {errors.sport && (
                <p className="mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm text-red-400">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" /> {errors.sport}
                </p>
              )}
            </div>

            {/* Payment Link */}
            <div className="bg-[#a58255]/20 p-3 sm:p-4 rounded-lg border border-[#a58255]/30 transition-all hover:bg-[#a58255]/30">
              <Label className="text-xs sm:text-sm font-medium text-[#e7fefe] mb-1 sm:mb-2 inline-block">
                Payment link <span className="text-red-400">*</span>
              </Label>
              <div className="flex items-center">
                <a 
                  href="https://gevents.gitam.edu/registration/Mzg4Mw..." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-[#6c7cf5] underline hover:text-[#c9a574] font-medium break-all transition-colors"
                >
                  https://gevents.gitam.edu/registration/Mzg4Mw...
                </a>
              </div>
            </div>

            {/* WhatsApp Community */}
            <div className="bg-[#a58255]/20 p-3 sm:p-4 rounded-lg border border-[#a58255]/30 transition-all hover:bg-[#a58255]/30">
              <h3 className="text-[#e7fefe] font-medium text-xs sm:text-sm mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2 text-[#a58255]" />
                Join The WhatsApp Community
              </h3>
              <p className="text-[#e7fefe]/80 text-xs mb-1 sm:mb-2 break-all">
                <a 
                  href="https://chat.whatsapp.com/BrB8LpD84cz7Aepko7zvmZ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-[#6c7cf5] underline hover:text-[#c9a574] font-medium break-all transition-colors"
                >
                  https://chat.whatsapp.com/BrB8LpD84cz7Aepko7zvmZ
                </a>
              </p>
              <p className="text-[#e7fefe]/80 text-xs italic">
                <strong>NOTE:</strong> Only For Coaches & Captains. Join only the respective Sport Group's.
              </p>
            </div>

            {/* Submit and Clear Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button
                type="button"
                onClick={handleReset}
                className="w-full bg-[#07534c] border-2 border-[#a58255]/50 text-[#e7fefe] font-semibold text-sm py-2 sm:py-3 md:py-4 rounded-lg transition-all duration-200 hover:bg-[#06413a] hover:border-[#a58255] shadow-md hover:shadow-lg"
              >
                Clear form
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#a58255] hover:bg-[#9b774a] text-[#e7fefe] font-semibold text-sm py-2 sm:py-3 md:py-4 rounded-lg transition-all duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                } shadow-md hover:shadow-lg`}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
            <Alert className="mb-4 sm:mb-6 bg-[#a58255]/20 border border-[#a58255] text-[#e7fefe]">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#a58255]" />
              <AlertDescription className="ml-2 text-xs sm:text-sm">
                Thank you! Your registration has been submitted successfully.
              </AlertDescription>
            </Alert>
          )}
          {submitStatus === 'error' && (
            <Alert className="mb-4 sm:mb-6 bg-red-100/20 border border-red-300 text-[#e7fefe]">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-300" />
              <AlertDescription className="ml-2 text-xs sm:text-sm">
                There was an error submitting your registration. Please try again.
              </AlertDescription>
            </Alert>
          )}

            {/* Privacy Notice */}
            <p className="text-xs font-medium text-[#e7fefe]/60 text-center mt-3 sm:mt-6">
              Your information is secure and will only be used for event registration purposes.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
