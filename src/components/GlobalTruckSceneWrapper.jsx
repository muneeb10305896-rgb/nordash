"use client";
import dynamic from 'next/dynamic';

const GlobalTruckScene = dynamic(() => import('./GlobalTruckScene'), {
  ssr: false,
  loading: () => null,
});

export default function GlobalTruckSceneWrapper() {
  return <GlobalTruckScene />;
}
