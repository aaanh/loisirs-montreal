import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { SearchParams, SortColumn } from "@/types/search";

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
  selectedBoroughs,
}: UrlOutputCardProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isNearFooter, setIsNearFooter] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const openInNewTab = () => {
    window.open(generatedUrl, "_blank");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsNearFooter(false);
      }
    };

    const handleScroll = () => {
      if (!isMobile) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = windowHeight * 0.5; // 50vh
      const cardHeight = 200; // Approximate card height

      // Check if we're near the footer (accounting for card height)
      const isNear =
        scrollY + windowHeight >= documentHeight - footerHeight - cardHeight;
      setIsNearFooter(isNear);
    };

    checkScreenSize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <motion.div
          className="right-0 left-0 z-50 bg-white shadow-lg border-0"
          style={{ position: isNearFooter ? "relative" : "fixed" }}
          animate={{
            bottom: isNearFooter ? 0 : 0,
          }}
          initial={false}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-linear-to-r from-gray-800 to-gray-900 rounded-t-lg rounded-t-xl lg:rounded-t-lg text-white">
              <div className="flex justify-between items-center">
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
                  className="hover:bg-gray-700 text-white"
                >
                  {isCollapsed ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {isCollapsed ? (
              <CardContent className="p-2 lg:p-6">
                <Button
                  onClick={openInNewTab}
                  className="bg-linear-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 w-full transition-all duration-300"
                  disabled={!generatedUrl}
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Open in Loisirs Montreal
                </Button>
              </CardContent>
            ) : (
              <AnimatePresence initial={false}>
                <motion.div
                  key="expanded-content"
                  initial={{ maxHeight: 0, opacity: 0 }}
                  animate={{ maxHeight: "60vh", opacity: 1 }}
                  exit={{ maxHeight: 0, opacity: 0 }}
                  transition={{
                    maxHeight: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.2 },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <CardContent className="p-4 lg:p-6">
                    <div className="h-[60vh] overflow-y-auto">
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={copyToClipboard}
                            className="bg-linear-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 w-full transition-all duration-300"
                            disabled={!generatedUrl}
                          >
                            <Copy className="mr-2 w-4 h-4" />
                            {copied ? "Copied!" : "Copy URL"}
                          </Button>

                          <Button
                            onClick={openInNewTab}
                            variant="outline"
                            className="hover:bg-gray-50 border-gray-300 w-full transition-all duration-300"
                            disabled={!generatedUrl}
                          >
                            <ExternalLink className="mr-2 w-4 h-4" />
                            Open in Loisirs Montreal
                          </Button>
                        </div>

                        {copied && (
                          <Alert className="bg-green-50 border-green-200">
                            <AlertDescription className="text-green-800">
                              URL copied to clipboard successfully!
                            </AlertDescription>
                          </Alert>
                        )}
                        <div>
                          <Label
                            htmlFor="generatedUrl"
                            className="font-medium text-gray-700 text-sm"
                          >
                            URL
                          </Label>
                          <Textarea
                            id="generatedUrl"
                            value={generatedUrl}
                            readOnly
                            className="mt-1 font-mono text-xs resize-none"
                            rows={4}
                          />
                        </div>
                      </div>

                      <Separator className="my-4 lg:my-6" />

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 text-sm lg:text-base">
                          Current Settings
                        </h4>
                        <div className="space-y-2 text-xs lg:text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Search:</span>
                            <span className="font-medium">
                              {searchParams.search || "None"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Facilities:</span>
                            <span className="font-medium">
                              {selectedFacilities.length} selected
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Boroughs:</span>
                            <span className="font-medium">
                              {selectedBoroughs.length} selected
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sort:</span>
                            <span className="font-medium">
                              {
                                sortColumns.find(
                                  (c) =>
                                    c.value === searchParams.sortable.column
                                )?.label
                              }
                              {searchParams.sortable.isOrderAsc ? " ↑" : " ↓"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              </AnimatePresence>
            )}
          </Card>
        </motion.div>
      ) : (
        <Card className="lg:top-8 lg:sticky shadow-lg border-0">
          <CardHeader className="bg-linear-to-r from-gray-800 to-gray-900 rounded-t-lg rounded-t-xl lg:rounded-t-lg text-white">
            <div className="flex justify-between items-center">
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
                className="hover:bg-gray-700 text-white"
              >
                {isCollapsed ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardHeader>

          {isCollapsed ? (
            <CardContent className="p-2 lg:p-6">
              <Button
                onClick={openInNewTab}
                className="bg-linear-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 w-full transition-all duration-300"
                disabled={!generatedUrl}
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                Open in Loisirs Montreal
              </Button>
            </CardContent>
          ) : (
            <CardContent className="p-4 lg:p-6 max-h-[60vh] lg:max-h-none overflow-y-auto">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={copyToClipboard}
                    className="bg-linear-to-r from-blue-600 hover:from-blue-700 to-purple-600 hover:to-purple-700 w-full transition-all duration-300"
                    disabled={!generatedUrl}
                  >
                    <Copy className="mr-2 w-4 h-4" />
                    {copied ? "Copied!" : "Copy URL"}
                  </Button>

                  <Button
                    onClick={openInNewTab}
                    variant="outline"
                    className="hover:bg-gray-50 border-gray-300 w-full transition-all duration-300"
                    disabled={!generatedUrl}
                  >
                    <ExternalLink className="mr-2 w-4 h-4" />
                    Open in Loisirs Montreal
                  </Button>
                </div>

                {copied && (
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                      URL copied to clipboard successfully!
                    </AlertDescription>
                  </Alert>
                )}
                <div>
                  <Label
                    htmlFor="generatedUrl"
                    className="font-medium text-gray-700 text-sm"
                  >
                    URL
                  </Label>
                  <Textarea
                    id="generatedUrl"
                    value={generatedUrl}
                    readOnly
                    className="mt-1 font-mono text-xs resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <Separator className="my-4 lg:my-6" />

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 text-sm lg:text-base">
                  Current Settings
                </h4>
                <div className="space-y-2 text-xs lg:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Search:</span>
                    <span className="font-medium">
                      {searchParams.search || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Facilities:</span>
                    <span className="font-medium">
                      {selectedFacilities.length} selected
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Boroughs:</span>
                    <span className="font-medium">
                      {selectedBoroughs.length} selected
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sort:</span>
                    <span className="font-medium">
                      {
                        sortColumns.find(
                          (c) => c.value === searchParams.sortable.column
                        )?.label
                      }
                      {searchParams.sortable.isOrderAsc ? " ↑" : " ↓"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
}
