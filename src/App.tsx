import React, { useState, useEffect } from 'react';
import { Copy, Shield, ShieldCheck, ShieldAlert, Lock, RefreshCw } from 'lucide-react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);
  const [strength, setStrength] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSpecial) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setPassword('Please select at least one option');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const calculateStrength = () => {
    let score = 0;
    if (length > 12) score += 2;
    if (length > 16) score += 1;
    if (useUppercase) score += 1;
    if (useLowercase) score += 1;
    if (useNumbers) score += 1;
    if (useSpecial) score += 2;

    if (score <= 2) return 'Very Weak';
    if (score <= 4) return 'Weak';
    if (score <= 6) return 'Strong';
    return 'Very Strong';
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUppercase, useLowercase, useNumbers, useSpecial]);

  useEffect(() => {
    setStrength(calculateStrength());
  }, [password]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthColor = {
    'Very Weak': 'text-red-500',
    'Weak': 'text-orange-500',
    'Strong': 'text-green-500',
    'Very Strong': 'text-emerald-500'
  };

  const strengthBg = {
    'Very Weak': 'bg-red-100',
    'Weak': 'bg-orange-100',
    'Strong': 'bg-green-100',
    'Very Strong': 'bg-emerald-100'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3">
            <Lock className="w-10 h-10" />
            <h1 className="text-3xl font-bold">SecurePass Pro</h1>
          </div>
          <p className="text-center mt-2 text-indigo-100">Generate secure passwords instantly</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Password Generator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="relative">
              <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
                <span className="text-2xl font-mono text-gray-800 flex-1 mr-4">{password}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={generatePassword}
                    className="p-3 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                    title="Generate new password"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                      copied ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <Copy className="w-5 h-5" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Length Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Password Length</label>
                    <span className="text-sm font-medium text-indigo-600">{length} characters</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Character Sets */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useUppercase}
                      onChange={(e) => setUseUppercase(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">Uppercase (A-Z)</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useLowercase}
                      onChange={(e) => setUseLowercase(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">Lowercase (a-z)</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useNumbers}
                      onChange={(e) => setUseNumbers(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">Numbers (0-9)</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useSpecial}
                      onChange={(e) => setUseSpecial(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">Special Characters</span>
                  </label>
                </div>

                {/* Strength Indicator */}
                <div className={`flex items-center justify-between p-4 rounded-lg ${strengthBg[strength]}`}>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700">Password Strength:</span>
                    <span className={`font-bold ${strengthColor[strength]}`}>{strength}</span>
                  </div>
                  <div>
                    {strength === 'Very Strong' && <ShieldCheck className="w-6 h-6 text-emerald-500" />}
                    {strength === 'Strong' && <Shield className="w-6 h-6 text-green-500" />}
                    {(strength === 'Weak' || strength === 'Very Weak') && <ShieldAlert className="w-6 h-6 text-red-500" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Strength Guide */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">What Makes a Strong Password?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">1. Length</h3>
                <p className="text-gray-600">Longer passwords are harder to crack. Aim for at least 12 characters, but 16+ is better.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">2. Complexity</h3>
                <p className="text-gray-600">Mix uppercase, lowercase, numbers, and special characters to increase complexity.</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-pink-800 mb-3">3. Uniqueness</h3>
                <p className="text-gray-600">Avoid common words, patterns, or personal information that could be guessed.</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h2>
            <div className="grid gap-6">
              {[
                {
                  q: "How often should I change my password?",
                  a: "It's recommended to change passwords every 3-6 months, or immediately if there's any suspicion of compromise."
                },
                {
                  q: "Why use special characters?",
                  a: "Special characters significantly increase password complexity, making it much harder for attackers to guess or crack."
                },
                {
                  q: "Is it safe to store passwords in browsers?",
                  a: "While convenient, it's better to use a dedicated password manager for enhanced security and features."
                },
                {
                  q: 'What makes a password "weak"?',
                  a: "Short length, common words, personal information, or using only one type of character makes passwords weak."
                },
                {
                  q: "Should I use the same password for multiple accounts?",
                  a: "No, using unique passwords for each account prevents multiple account compromises if one password is exposed."
                }
              ].map((faq, index) => (
                <div key={index} className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;