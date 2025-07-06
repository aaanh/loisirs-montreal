"use client"

import { ExternalLink, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PageFooter() {
  const [fullUrl, setFullUrl] = useState<string | null>(null);

  useEffect(() => {
    setFullUrl(window.location.href);
  }, []);

  if (!fullUrl) return null; // or loading placeholder

  return (
    <footer className="bg-foreground text-white py-8 mt-16 min-h-[50vh] flex flex-col">
      <div className="container mx-auto px-4 max-w-6xl flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About This Tool</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              This tool is not affiliated with, endorsed by, or associated with Loisirs Montreal,
              the City of Montreal, or any government entity. It is an independent, open-source
              project created to help users build search URLs for the Loisirs Montreal website.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              This is an open-source project. Feel free to contribute or report issues on GitHub.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">
                <span className="font-medium">Site URL:</span>
                <br />
                <a className="underline text-blue-500 hover:text-blue-400" href={fullUrl}>
                  {fullUrl}
                </a>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-medium">GitHub:</span>
                <br />
                <a
                  className="underline text-blue-500 hover:text-blue-400"
                  href="https://github.com/aaanh/loisirs-montreal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/aaanh/loisirs-montreal
                </a>
              </p>
            </div>
          </div>

          {/* Creator Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Creator</h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm leading-relaxed flex items-center gap-1">
                <span>Built with ❤️ by</span>
                <a
                  href="https://aaanh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
                >
                  Anh <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p className="text-gray-300 text-sm">
                <a
                  href="https://linkedin.com/in/aaanh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyleft */}
      <div className="border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 - Copyleft - This work is free. You can redistribute it and/or modify it under
          the terms of the GNU General Public License as published by the Free Software Foundation.
        </p>
      </div>
    </footer>
  );
} 