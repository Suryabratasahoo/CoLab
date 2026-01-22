import { SignInForm } from "@/components/sign-in-form"
import { OnboardingVisual } from "@/components/onboarding-visual"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-10" />

      <div className="relative z-10 w-full max-w-7xl h-[90vh] flex flex-col md:flex-row gap-0 overflow-hidden rounded-3xl shadow-2xl bg-white">
        {/* Left Section - Visual Area (45%) */}
        <div className="hidden md:block md:w-[45%] h-full">
          <OnboardingVisual />
        </div>

        {/* Right Section - Form Area (55%) */}
        <div className="w-full md:w-[55%] h-full flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
          <div className="w-full max-w-lg space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground text-sm">Sign in to continue your collaboration journey</p>
            </div>

            <SignInForm />
          </div>
        </div>
      </div>
    </main>
  )
}
