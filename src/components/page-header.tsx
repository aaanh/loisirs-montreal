import { AlertCircleIcon, CheckCircle2Icon, MapPin, PopcornIcon } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

export function PageHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-2">
        Loisirs Montreal Helper
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Visual URL Builder for Activity Search
      </p>


      <Alert className='bg-neutral-900 text-left' variant={'warning'}>
        <AlertCircleIcon />
        <AlertTitle>Project is currently every alpha and experimental</AlertTitle>
        <AlertDescription>
          <p>Please report any issues or bugs you encounter at <a href="https://github.com/aaanh/loisirs-montreal/issues/new" className='underline'>https://github.com/aaanh/loisirs-montreal/issues/new</a>.</p>

          <p>Please always beware of what URL you copy and paste!</p>
        </AlertDescription>
      </Alert>

    </div>
  );
} 