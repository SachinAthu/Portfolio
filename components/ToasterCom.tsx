import { Toaster } from 'react-hot-toast';

export default function ToasterCom() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        className: 'app-toast-component',
        success: {
          duration: 10000,
        },
        error: {
          duration: 8000,
          icon: '🔴',
        },
        blank: {
          duration: 8000,
        },
        custom: {
          duration: 10000,
        },
      }}
    />
  );
}
