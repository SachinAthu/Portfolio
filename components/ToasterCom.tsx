'use client';

import { Renderable, Toast, ToastBar, Toaster, toast } from 'react-hot-toast';

function ToastBarInner({ t, icon, message }: { t: Toast; icon: Renderable; message: Renderable }) {
  return (
    <div
      className="toast-bar-inner | flex items-center gap-1 text-pretty text-base"
      onClick={() => toast.dismiss(t.id)}>
      {icon}

      <span className="select-none">{message}</span>

      <div className="flair absolute inset-0 bg-gray-400 opacity-10 transition-all duration-300"></div>
    </div>
  );
}

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
          duration: 1000000,
          iconTheme: {
            primary: '#E91E63',
            secondary: '#F5F5F5',
          },
        },
        blank: {
          duration: 10000,
        },
        custom: {
          duration: 10000,
        },
      }}
      containerStyle={{
        top: 20,
        left: 20,
        bottom: 35,
        right: 20,
      }}>
      {(t) => (
        <ToastBar
          toast={t}
          style={{ ...t.style, animation: t.visible ? 'toast-anim-enter 0.5s ease' : 'toast-anim-leave 1s ease' }}>
          {({ icon, message }) => <ToastBarInner t={t} icon={icon} message={message} />}
        </ToastBar>
      )}
    </Toaster>
  );
}
