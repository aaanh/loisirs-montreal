import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { SearchParams, SortColumn } from '@/types/search';

interface UrlOutputCardProps {
  generatedUrl: string;
  searchParams: SearchParams;
  sortColumns: SortColumn[];
  selectedFacilities: string[];
  selectedBoroughs: string[];
}

export function UrlOutputCard({
  generatedUrl,
  searchParams,
  sortColumns,
  selectedFacilities,
  selectedBoroughs
}: UrlOutputCardProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isNearFooter, setIsNearFooter] = useState<boolean>(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const openInNewTab = () => {
    window.open(generatedUrl, '_blank');
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = windowHeight * 0.5; // 50vh
      const cardHeight = 200; // Approximate card height

      // Check if we're near the footer (accounting for card height)
      const isNear = scrollY + windowHeight >= documentHeight - footerHeight - cardHeight;
      setIsNearFooter(isNear);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isNearFooter ? 'relative' : 'fixed'}
        className="lg:sticky lg:relative lg:z-auto lg:bg-transparent"
        style={{
          position: isNearFooter ? 'relative' : 'fixed',
          bottom: isNearFooter ? 'auto' : 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'white'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          y: { type: "spring", bounce: 0, duration: 0.3 },
          opacity: { duration: 0.2 }
        }}
      >
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-linear-to-r from-gray-800 to-gray-900 text-white rounded-t-lg lg:rounded-t-lg rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <ExternalLink className="w-5 h-5" />
                  Generated URL
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="text-white hover:bg-gray-700"
              >
                {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>

          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  height: { type: "spring", bounce: 0, duration: 0.2 },
                  opacity: { duration: 0.15 }
                }}
              >
                <CardContent className="p-2 lg:p-6">
                  <Button
                    onClick={openInNewTab}
                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    disabled={!generatedUrl}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Loisirs Montreal
                  </Button>
                </CardContent>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  height: { type: "spring", bounce: 0, duration: 0.2 },
                  opacity: { duration: 0.15 }
                }}
              >
                <CardContent className="p-4 lg:p-6 max-h-[50vh] lg:max-h-none overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={copyToClipboard}
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        disabled={!generatedUrl}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copied ? 'Copied!' : 'Copy URL'}
                      </Button>

                      <Button
                        onClick={openInNewTab}
                        variant="outline"
                        className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300"
                        disabled={!generatedUrl}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in Loisirs Montreal
                      </Button>
                    </div>

                    <AnimatePresence>
                      {copied && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{
                            y: { type: "spring", bounce: 0, duration: 0.15 },
                            opacity: { duration: 0.1 }
                          }}
                        >
                          <Alert className="border-green-200 bg-green-50">
                            <AlertDescription className="text-green-800">
                              URL copied to clipboard successfully!
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <Label htmlFor="generatedUrl" className="text-sm font-medium text-gray-700">
                        URL
                      </Label>
                      <Textarea
                        id="generatedUrl"
                        value={generatedUrl}
                        readOnly
                        className="mt-1 text-xs font-mono resize-none"
                        rows={4}
                      />
                    </div>
                  </div>

                  <Separator className="my-4 lg:my-6" />

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 text-sm lg:text-base">Current Settings</h4>
                    <div className="space-y-2 text-xs lg:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Search:</span>
                        <span className="font-medium">{searchParams.search || 'None'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Facilities:</span>
                        <span className="font-medium">{selectedFacilities.length} selected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Boroughs:</span>
                        <span className="font-medium">{selectedBoroughs.length} selected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sort:</span>
                        <span className="font-medium">
                          {sortColumns.find(c => c.value === searchParams.sortable.column)?.label}
                          {searchParams.sortable.isOrderAsc ? ' ↑' : ' ↓'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
} 