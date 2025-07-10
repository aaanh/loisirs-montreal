import {
  AlertCircleIcon,
  CheckCircle2Icon,
  MapPin,
  PopcornIcon,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export function PageHeader() {
  return (
    <div className="mb-4">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-gray-900 text-2xl md:text-4xl">
          Loisirs Montreal Helper
        </h1>
      </div>

      <Alert className="shadow border-none" variant={"warning"}>
        <AlertCircleIcon />
        <AlertTitle>
          Project is currently very early alpha and experimental
        </AlertTitle>
        <AlertDescription>
          <p>
            Please report any issues or bugs you encounter at{" "}
            <a
              href="https://github.com/aaanh/loisirs-montreal/issues/new"
              className="underline"
            >
              https://github.com/aaanh/loisirs-montreal/issues/new
            </a>
            .
          </p>

          <p>Please always beware of what URL you copy and paste!</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
