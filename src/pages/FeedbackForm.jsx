import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Star,
  Phone,
  Mail,
  User,
  MessageSquare
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const FeedbackForm = () => {  
  // Dropdown options
  const collegeOptions = [
    "GITAM School of Technology",
    "GITAM Institute of Management",
    "GITAM School of Science",
    "GITAM School of Architecture",
    "GITAM School of Pharmacy",
    "GITAM School of Law",
    "GITAM School of Humanities"
  ];

  const sportOptions = [
    "Cricket",
    "Football",
    "Basketball",
    "Volleyball",
    "Tennis",
    "Badminton",
    "Table Tennis",
    "Athletics",
    "Chess",
    "Carrom"
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    sport: '',
    rating: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.college) {
      newErrors.college = 'Please select your college';
    }
    if (!formData.sport) {
      newErrors.sport = 'Please select a sport';
    }
    if (!formData.rating) {
      newErrors.rating = 'Please select a rating';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Feedback must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        
        // Create feedback data object with proper data types
        const feedbackData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          college: formData.college,
          sport: formData.sport,
          rating: Number(formData.rating), // Ensure rating is a number
          message: formData.message.trim(),
          timestamp: new Date(), // Firestore Timestamp
          status: 'new' // Add a status field for tracking
        };

        // Add to Firestore
        const docRef = await addDoc(collection(db, 'feedback'), feedbackData);
        console.log('Feedback submitted with ID:', docRef.id);

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          college: '',
          sport: '',
          rating: '',
          message: ''
        });
        
        setSubmitStatus('success');
      } catch (error) {
        console.error('Error submitting feedback:', error);
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

  return (
    <div className="min-h-screen w-full bg-[#f4e4c9] flex flex-col p-4 sm:p-6 md:p-8">
      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-8 md:my-12">
        <div className="relative flex items-center w-full max-w-4xl px-4">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">
            FEEDBACK FORM
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
                Thank you! Your feedback has been submitted successfully.
              </AlertDescription>
            </Alert>
          )}
          {/* Error Alert */}
          {submitStatus === 'error' && (
            <Alert className="mb-6 bg-red-100/20 border border-red-300 text-[#e7fefe]">
              <AlertCircle className="h-5 w-5 text-red-300" />
              <AlertDescription className="ml-2">
                There was an error submitting your feedback. Please try again.
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 ${errors.name ? 'border-red-400' : 'border-[#a58255]/30'}`}
                  placeholder="Enter your full name"
                />
                <User className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-2.5" />
              </div>
              {errors.name && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {errors.name}
                </p>
              )}
            </div>
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Email Address <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 ${errors.email ? 'border-red-400' : 'border-[#a58255]/30'}`}
                  placeholder="Enter your email address"
                />
                <Mail className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-2.5" />
              </div>
              {errors.email && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {errors.email}
                </p>
              )}
            </div>
            {/* Phone Field */}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Phone <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`pl-10 pr-10 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                    errors.phone ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255]`}
                />
                <Phone className="h-5 w-5 text-[#e7fefe]/60 absolute left-3 top-3.5" />
                {errors.phone && (
                  <div className="absolute right-3 top-3.5">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                )}
              </div>
              {errors.phone && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" /> {errors.phone}
                </p>
              )}
            </div>
            {/* College and Sport Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* College Dropdown */}
              <div>
                <Label htmlFor="college" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                  College <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className={`w-full pl-4 pr-10 py-3 rounded-lg appearance-none bg-[#07534c]/90 border-2 ${
                      errors.college ? 'border-red-400' : 'border-[#a58255]/30'
                    } text-[#e7fefe] focus:ring-2 focus:ring-[#a58255]`}
                  >
                    <option value="" className="bg-[#07534c]">Select your college</option>
                    {collegeOptions.map((college, index) => (
                      <option key={index} value={college} className="bg-[#07534c]">{college}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-5 w-5 text-[#e7fefe]/60 absolute right-3 top-3.5 pointer-events-none" />
                </div>
                {errors.college && (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4" /> {errors.college}
                  </p>
                )}
              </div>
              {/* Sport Dropdown */}
              <div>
                <Label htmlFor="sport" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                  Sport <span className="text-red-400">*</span>
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
            </div>
            {/* Rating Field */}
            <div>
              <Label className="text-sm font-medium text-[#e7fefe] mb-3 inline-block">
                Experience Rating <span className="text-red-400">*</span>
              </Label>
              <div className="flex justify-center gap-1 xs:gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="relative group">
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      checked={parseInt(formData.rating) === value}
                      onChange={(e) => handleChange({ target: { name: 'rating', value: value.toString() } })}
                      className="sr-only"
                    />
                    <span
                      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all
                        ${
                          parseInt(formData.rating) === value 
                            ? 'bg-[#a58255] text-[#e7fefe] shadow-lg transform scale-110' 
                            : 'bg-[#a58255]/20 text-[#e7fefe]/60 hover:bg-[#a58255]/40'
                        }`}
                    >
                      <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${parseInt(formData.rating) >= value ? 'fill-current' : ''}`} />
                    </span>
                  </label>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400 justify-center">
                  <AlertCircle className="h-4 w-4" /> {errors.rating}
                </p>
              )}
            </div>
            {/* Message Field */}
            <div>
              <Label htmlFor="message" className="text-sm font-medium text-[#e7fefe] mb-2 inline-block">
                Your Feedback <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Please share your experience, suggestions, or concerns..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`pl-4 pr-4 py-3 rounded-lg bg-[#07534c]/90 border-2 ${
                    errors.message ? 'border-red-400' : 'border-[#a58255]/30'
                  } text-[#e7fefe] placeholder-[#e7fefe]/60 focus:ring-2 focus:ring-[#a58255] resize-none`}
                />
                <MessageSquare className="h-5 w-5 text-[#e7fefe]/60 absolute right-3 top-3.5" />
              </div>
              <div className="flex justify-between items-center mt-2">
                {errors.message && (
                  <p className="flex items-center gap-1 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" /> {errors.message}
                  </p>
                )}
                <span className={`text-xs ${formData.message.length < 10 ? 'text-red-400' : 'text-[#e7fefe]/60'} ml-auto`}>
                  {formData.message.length}/300 characters
                </span>
              </div>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#a58255] hover:bg-[#9b774a] text-[#e7fefe] font-semibold py-3 sm:py-4 rounded-lg transition-all duration-200 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
              } shadow-md hover:shadow-lg`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
          {/* Privacy Note */}
          <p className="text-xs font-medium text-[#e7fefe]/60 text-center mt-4 sm:mt-6">
            Your feedback helps us improve. We value your privacy and will not share your information with third parties.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;
