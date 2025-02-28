import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Phone,
  Mail,
  User,
  Upload,
  CreditCard,
  Users
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

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
    university: '',
    captainName: '',
    captainMobile: '',
    coachName: '',
    coachMobile: '',
    sport: '',
    paymentStatus: 'Paid',
    transactionId: '',
    paymentFile: null
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');

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
    if (!formData.transactionId.trim()) {
      newErrors.transactionId = 'Transaction ID is required';
    }
    if (!formData.paymentFile) {
      newErrors.paymentFile = 'Payment screenshot is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
        setFormData({
          name: '',
          university: '',
          captainName: '',
          captainMobile: '',
          coachName: '',
          coachMobile: '',
          sport: '',
          paymentStatus: 'Paid',
          transactionId: '',
          paymentFile: null
        });
        setFileName('');
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        paymentFile: file
      }));
      setFileName(file.name);
      if (errors.paymentFile) {
        setErrors(prev => ({ ...prev, paymentFile: '' }));
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      university: '',
      captainName: '',
      captainMobile: '',
      coachName: '',
      coachMobile: '',
      sport: '',
      paymentStatus: 'Paid',
      transactionId: '',
      paymentFile: null
    });
    setFileName('');
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#f4e4c9] flex flex-col p-4 sm:p-6 md:p-8">
      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-8 md:my-12">
        <div className="relative flex items-center w-full max-w-4xl px-4">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">
            REGISTRATION FORM
          </h1>
          {/* Right Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden border-2 border-[#a58255]">
        <CardContent className="p-4 sm:p-6 md:p-8 bg-[#07534c]">
          {/* Success Alert */}
          {submitStatus === 'success' && (
            <Alert className="mb-6 bg-[#a58255]/20 border border-[#a58255] text-[#e7fefe]">
              <CheckCircle2 className="h-5 w-5 text-[#a58255]" />
              <AlertDescription className="ml-2">
                Thank you! Your registration has been submitted successfully.
              </AlertDescription>
            </Alert>
          )}
          {/* Error Alert */}
          {submitStatus === 'error' && (
            <Alert className="mb-6 bg-red-100/20 border border-red-300 text-[#e7fefe]">
              <AlertCircle className="h-5 w-5 text-red-300" />
              <AlertDescription className="ml-2">
                There was an error submitting your registration. Please try again.
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
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
                  className={`pl-10 pr-10 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                    errors.name ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255]`}
                />
                <User className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-3.5" />
                {errors.name && (
                  <div className="absolute right-3 top-3.5">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {errors.name}
                </p>
              )}
            </div>

            {/* University Field */}
            <div>
              <Label htmlFor="university" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Name of the University / College <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="university"
                  name="university"
                  placeholder="Enter your university or college name"
                  value={formData.university}
                  onChange={handleChange}
                  className={`pl-10 pr-10 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                    errors.university ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255]`}
                />
                <Users className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-3.5" />
                {errors.university && (
                  <div className="absolute right-3 top-3.5">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.university && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {errors.university}
                </p>
              )}
            </div>

            {/* Captain Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Captain Name */}
              <div>
                <Label htmlFor="captainName" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
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
                    className={`pl-10 pr-10 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                      errors.captainName ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255]`}
                  />
                  <User className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-3.5" />
                  {errors.captainName && (
                    <div className="absolute right-3 top-3.5">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                  )}
                </div>
                {errors.captainName && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" /> {errors.captainName}
                  </p>
                )}
              </div>

              {/* Captain Mobile */}
              <div>
                <Label htmlFor="captainMobile" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                  Team Captain Mobile No <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="tel"
                    id="captainMobile"
                    name="captainMobile"
                    placeholder="Enter captain's mobile number"
                    value={formData.captainMobile}
                    onChange={handleChange}
                    className={`pl-10 pr-10 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                      errors.captainMobile ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255]`}
                  />
                  <Phone className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-3.5" />
                  {errors.captainMobile && (
                    <div className="absolute right-3 top-3.5">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                  )}
                </div>
                {errors.captainMobile && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" /> {errors.captainMobile}
                  </p>
                )}
              </div>
            </div>

            {/* Coach Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Coach Name */}
              <div>
                <Label htmlFor="coachName" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                  Name of the Coach <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    id="coachName"
                    name="coachName"
                    placeholder="Enter coach's name"
                    value={formData.coachName}
                    onChange={handleChange}
                    className={`pl-10 pr-10 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                      errors.coachName ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255]`}
                  />
                  <User className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-3.5" />
                  {errors.coachName && (
                    <div className="absolute right-3 top-3.5">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                  )}
                </div>
                {errors.coachName && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" /> {errors.coachName}
                  </p>
                )}
              </div>

              {/* Coach Mobile */}
              <div>
                <Label htmlFor="coachMobile" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                  Coach Mobile No <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="tel"
                    id="coachMobile"
                    name="coachMobile"
                    placeholder="Enter coach's mobile number"
                    value={formData.coachMobile}
                    onChange={handleChange}
                    className={`pl-10 pr-10 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                      errors.coachMobile ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255]`}
                  />
                  <Phone className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-3.5" />
                  {errors.coachMobile && (
                    <div className="absolute right-3 top-3.5">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    </div>
                  )}
                </div>
                {errors.coachMobile && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" /> {errors.coachMobile}
                  </p>
                )}
              </div>
            </div>

            {/* Sport Dropdown */}
            <div>
              <Label htmlFor="sport" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Sport you would like to take part of <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <select
                  id="sport"
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  className={`w-full pl-4 pr-10 py-3 rounded-lg appearance-none bg-[#07534c]/90 border-2 ${
                    errors.sport ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] focus:ring-2 focus:ring-[#a58255]`}
                >
                  <option value="" className="bg-[#07534c]">Select sport</option>
                  {sportOptions.map((sport, index) => (
                    <option key={index} value={sport} className="bg-[#07534c]">{sport}</option>
                  ))}
                </select>
                <ChevronDown className="h-5 w-5 text-[#e7fefe]/60 absolute right-3 top-3.5 pointer-events-none" />
              </div>
              {errors.sport && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {errors.sport}
                </p>
              )}
            </div>

            {/* Payment Link */}
            <div>
              <Label className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Payment link <span className="text-red-400">*</span>
              </Label>
              <div className="flex items-center">
                <a 
                  href="https://gevents.gitam.edu/registration/Mzg4Mw..." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#6c7cf5] underline hover:text-[#c9a574] font-medium"
                >
                  https://gevents.gitam.edu/registration/Mzg4Mw...
                </a>
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <Label htmlFor="transactionId" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Transaction Id of Payment <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  placeholder="Enter transaction ID"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className={`pl-10 pr-10 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                    errors.transactionId ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255]`}
                />
                <CreditCard className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-3.5" />
                {errors.transactionId && (
                  <div className="absolute right-3 top-3.5">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.transactionId && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {errors.transactionId}
                </p>
              )}
            </div>

            {/* Payment Screenshot */}
            <div>
              <Label htmlFor="paymentFile" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Payment Screenshot in pdf format <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <div className={`flex items-center justify-center w-full h-24 border-2 border-dashed rounded-lg ${
                  errors.paymentFile ? 'border-red-400' : 'border-[#a58255]/30'
                } bg-[#07534c]/90 hover:bg-[#07534c] transition-all duration-200 cursor-pointer`}>
                  <input
                    type="file"
                    id="paymentFile"
                    name="paymentFile"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="paymentFile" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <Upload className="w-8 h-8 text-[#e7eafe]" />
                    <span className="mt-2 text-sm text-[#e7fefe]">
                      {fileName ? fileName : "Click to upload (Max 1 GB)"}
                    </span>
                  </label>
                </div>
              </div>
              {errors.paymentFile && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {errors.paymentFile}
                </p>
              )}
            </div>

            {/* WhatsApp Community */}
            <div className="bg-[#a58255]/20 p-4 rounded-lg border border-[#a58255]/30">
              <h3 className="text-[#e7fefe] font-medium mb-2">Join The WhatsApp Community</h3>
              <p className="text-[#e7fefe]/80 text-sm mb-2">
                https://chat.whatsapp.com/BrB8LpD84cz7Aepko7zvmZ
              </p>
              <p className="text-[#e7fefe]/80 text-xs italic">
                <strong>NOTE:</strong> Only For Coaches & Captains. Join only the respective Sport Group's.
              </p>
            </div>

            {/* Submit and Clear Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#a58255] hover:bg-[#9b774a] text-[#e7fefe] font-semibold py-3 sm:py-4 rounded-lg transition-all duration-200 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                } shadow-md hover:shadow-lg`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                className="w-full bg-[#07534c] border-2 border-[#a58255]/50 text-[#e7fefe] font-semibold py-3 sm:py-4 rounded-lg transition-all duration-200 hover:bg-[#06413a] hover:border-[#a58255] shadow-md hover:shadow-lg"
              >
                Clear form
              </Button>
            </div>
          </form>
          {/* Privacy Note */}
          <p className="text-xs font-medium text-[#e7fefe]/60 text-center mt-4 sm:mt-6">
            Your information is secure and will only be used for event registration purposes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;