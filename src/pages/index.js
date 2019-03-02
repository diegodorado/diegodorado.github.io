import React from 'react';

if (typeof window === 'undefined') {
    global.window = {}
}

export default function Home() {
  window.location = '/work';
  return null;
}
