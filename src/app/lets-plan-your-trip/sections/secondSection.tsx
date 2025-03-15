'use client'
import React, { useState } from 'react'
import GettingReady from '../components/getting-ready'
import MyTrip from '../components/my-trip'
import Season from '../components/season';
import Interest from '../components/interest';
import Accommodation from '../components/accommodation';
import Transport from '../components/transport';
import MyDetails from '../components/my-details';
import LetsGo from '../components/lets-go';

// Remove the dependency on GettingReadyProps
// Define your own interface for SecondSection if needed
interface SecondSectionProps {
  // Make any props optional with the ? symbol
  onNext?: (data: any) => void;
}

interface Step {
  number: number
  label: string
  isActive?: boolean
  isCompleted?: boolean
}

const steps: Step[] = [
  { number: 1, label: 'Getting Ready', isActive: true },
  { number: 2, label: 'My Trip' },
  { number: 3, label: 'Season' },
  { number: 4, label: 'Interest' },
  { number: 5, label: 'Accomodation' },
  { number: 6, label: 'Transport' },
  { number: 7, label: 'My Details' },
  { number: 8, label: "Let's Go" },
]

// Update the component to use the new props interface
export default function SecondSection({ onNext }: SecondSectionProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '',
    selectedTrips: [],
    // Add more fields for other steps as needed
  })

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleStepData = (data: any) => {
    setFormData({
      ...formData,
      ...data
    })
    
    // If we're on the last step and onNext was provided, call it
    if (currentStep === steps.length && onNext) {
      onNext(formData);
    } else {
      nextStep();
    }
  }

  // Rest of your component remains the same
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GettingReady 
            onNext={handleStepData}
          />
        )
      case 2:
        return (
          <MyTrip 
            onNext={handleStepData}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <Season
            onNext={handleStepData}
            onPrev={prevStep}
          />
        )

      case 4:
        return (
          <Interest
            onNext={handleStepData}
            onPrev={prevStep}
          />
        )
        case 5:
          return (
            <Accommodation
              onNext={handleStepData}
              onPrev={prevStep}
            />
          )
          case 6:
            return (
              <Transport
                onNext={handleStepData}
                onPrev={prevStep}
              />
            )
            case 7:
            return (
              <MyDetails
                onNext={handleStepData}
                onPrev={prevStep}
                formData={formData} 
              />
            )
            case 8:
      return (
        <LetsGo
          formData={formData}
        />
      )
        
      // Add more cases for additional steps
      default:
        return <div>Step not found</div>
    }
  }
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    step.number < currentStep
                      ? 'border-none bg-[#ff9e39] text-white'
                      : step.number === currentStep
                        ? 'border-[#ff9e39] bg-white text-[#ff9e39]'
                        : 'border-gray-400 bg-white text-gray-400'
                  }`}
                >
                  {step.number < currentStep ? '✓' : step.number}
                </div>
                {/* Label */}
                <span className="mt-2 text-sm text-gray-600">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        {renderStepContent()}
      </div>
    </>
  )
}