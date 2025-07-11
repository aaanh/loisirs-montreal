"use client";

import { ExternalLink, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export function PageFooter() {
  const [fullUrl, setFullUrl] = useState<string | null>(null);

  useEffect(() => {
    setFullUrl(window.location.origin);
  }, []);

  if (!fullUrl) return null; // or loading placeholder

  return (
    <footer className="flex flex-col bg-foreground mt-16 py-8 min-h-[50vh] text-white">
      <div className="flex-1 mx-auto p-4 max-w-6xl container">
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Project Info */}
          <div>
            <h3 className="mb-4 font-semibold text-lg">About This Tool</h3>
            <p className="mb-4 text-gray-300 text-sm leading-relaxed">
              This tool is not affiliated with, endorsed by, or associated with
              Loisirs Montreal, the City of Montreal, or any government entity.
              It is an independent, open-source project created to help users
              build search URLs for the Loisirs Montreal website.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              This is an open-source project. Feel free to contribute or report
              issues on GitHub.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-semibold text-lg">Links</h3>
            <div className="space-y-2">
              <p className="w-2/3 overflow-ellipsis overflow-hidden text-gray-300 text-sm break-after-all break-words whitespace-nowrap">
                <span className="font-medium">Site URL:</span>
                <br />
                <a
                  className="text-blue-500 hover:text-blue-400 underline"
                  href={fullUrl}
                >
                  {fullUrl}
                </a>
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-medium">GitHub:</span>
                <br />
                <a
                  className="text-blue-500 hover:text-blue-400 underline"
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
            <h3 className="mb-4 font-semibold text-lg">Creator</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-1 text-gray-300 text-sm leading-relaxed">
                <span>Built with ❤️ by</span>
                <a
                  href="https://aaanh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline"
                >
                  Anh <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p className="text-gray-300 text-sm">
                <a
                  href="https://linkedin.com/in/aaanh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline"
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
      <div className="pt-6 border-gray-700 border-t text-center">
        <p className="text-gray-400 text-sm">
          Copyright (C) 2025 Anh Hoang Nguyen anhnguyen@aaanh.com This program
          is free software: you can redistribute it and/or modify it under the
          terms of the GNU General Public License as published by the Free
          Software Foundation, either version 3 of the License, or (at your
          option) any later version.
        </p>
      </div>
    </footer>
  );
}
