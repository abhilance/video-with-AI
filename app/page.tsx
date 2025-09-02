"use client";

import Link from "next/link";
import { Play, Upload, ArrowRight, Brain, Zap, Shield, Check, Star, Users, Video, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className={`relative z-10 text-center max-w-6xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400 font-medium">AI-Powered • Live Now</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block mb-2">Transform Videos with</span>
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Professional-grade video processing, AI-enhanced quality, and intelligent content optimization. 
            Trusted by creators worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/video">
              <button className="group relative bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Explore Videos</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/upload">
              <button className="group relative bg-gray-900 border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center">
                <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Upload Video</span>
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2M+</div>
              <div className="text-gray-500 text-sm">Videos Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">150K+</div>
              <div className="text-gray-500 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-500 text-sm">Uptime</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional tools and AI-powered features designed for modern content creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:bg-gray-900/80 hover:border-gray-700 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Enhancement</h3>
              <p className="text-gray-400 leading-relaxed">
                Advanced machine learning algorithms automatically optimize video quality, enhance clarity, and improve overall visual appeal.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:bg-gray-900/80 hover:border-gray-700 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Speed</h3>
              <p className="text-gray-400 leading-relaxed">
                Ultra-fast processing with global CDN delivery ensures your videos are ready and accessible worldwide in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:bg-gray-900/80 hover:border-gray-700 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Enterprise Security</h3>
              <p className="text-gray-400 leading-relaxed">
                Bank-level encryption, secure storage, and compliance with industry standards keep your content protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Professionals</h2>
            <p className="text-gray-400 text-lg">Join thousands of creators who trust our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">50K+</div>
              <div className="text-gray-500 text-sm">Content Creators</div>
            </div>

            <div className="text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800">
              <Video className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">2M+</div>
              <div className="text-gray-500 text-sm">Videos Hosted</div>
            </div>

            <div className="text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">4.9/5</div>
              <div className="text-gray-500 text-sm">User Rating</div>
            </div>

            <div className="text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <div className="text-2xl font-bold mb-2">98%</div>
              <div className="text-gray-500 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-6 border-t border-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start Creating Today</h2>
          <p className="text-xl text-gray-400 mb-12">
            Choose the plan that works best for your content creation needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Free</h3>
              <div className="text-3xl font-bold mb-6">$0<span className="text-lg font-normal text-gray-400">/month</span></div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">5 videos per month</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Basic AI enhancement</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">720p quality</span>
                </li>
              </ul>
              <Link href="/register">
                <button className="w-full py-3 border border-gray-700 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                  Get Started Free
                </button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-8 bg-gradient-to-b from-purple-900/20 to-blue-900/20 border border-purple-800/50 rounded-2xl relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <div className="text-3xl font-bold mb-6">$19<span className="text-lg font-normal text-gray-400">/month</span></div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Unlimited videos</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Advanced AI features</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">4K quality</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Priority support</span>
                </li>
              </ul>
              <Link href="/register">
                <button className="w-full py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors">
                  Start Pro Trial
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 border-t border-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Videos?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of creators using AI to enhance their content
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
                Start Free Today
              </button>
            </Link>
            <Link href="/video">
              <button className="border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors">
                View Examples
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}