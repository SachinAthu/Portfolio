'use client';

import { useMobile, useTouch } from '@/lib/hooks';
import ContactSocialsNoDrag from './ContactSocialsNoDrag';
import ContactSocialsDrag from './ContactSocialsDrag';

export default function ContactSocialsWrapper() {
  const isMobile = useMobile();
  const isTouch = useTouch();

  // return <ContactSocialsNoDrag />;

  if (isMobile && !isTouch) {
    return <ContactSocialsNoDrag />;
  }

  return <ContactSocialsDrag />;
}
