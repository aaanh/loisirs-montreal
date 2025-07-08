import { BadgeInfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Card, CardContent } from "./ui/card";

export default function NotesCard() {
  return (
    <>
      <Alert>
        <AlertTitle className="flex items-center gap-2">
          <BadgeInfoIcon className="w-4 h-4" />
          <p>
            You can also copy the URL of <strong>this site</strong> and share
            it!
          </p>
        </AlertTitle>
        <AlertDescription>
          Which means that the current options are also retained when refreshed.
        </AlertDescription>
      </Alert>
    </>
  );
}
