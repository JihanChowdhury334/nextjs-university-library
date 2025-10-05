export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-gray-900">Features</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900">Documentation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-gray-900">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social - With your actual links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Social</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="https://github.com/JihanChowdhury334" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/jihan-chowdhury-aa6506292/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2025 Issue Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}