"use client";
import { useLayoutEffect } from "react";
import { clearLandingFreezePaint } from "@/features/landing/landing-freeze";
export function ResetLanding() {
  useLayoutEffect(() => {
    clearLandingFreezePaint();
  }, []);
  return null;
}
