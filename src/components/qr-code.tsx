import QRCode from "react-qr-code";

interface QRCodeProps {
  url: string;
}

export default function QRCodeContainer({ url }: QRCodeProps) {
  return (
    <QRCode
      size={256}
      className="w-full max-w-full h-auto"
      value={url}
      viewBox="0 0 256 256"
    />
  );
}
