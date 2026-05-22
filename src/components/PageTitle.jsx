"use client";

import { useEffect, useRef } from "react";

export default function PageTitle({ title }) {
  const myRef = useRef(null)

  useEffect(() => {
    document.title = title ? `${title} | IdeaVault` : "IdeaVault – Startup Idea Sharing";
  }, [title]);

  return null;
}
