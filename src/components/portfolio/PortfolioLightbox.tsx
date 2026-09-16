"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import {
  roomTypeLabels,
  type PortfolioImageView,
} from "@/content/portfolio";

export function PortfolioLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: PortfolioImageView[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const open = index !== null;
  const image = index !== null ? images[index] : undefined;
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
    onPrevRef.current = onPrev;
    onNextRef.current = onNext;
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
      if (event.key === "ArrowLeft") {
        onPrevRef.current();
      }
      if (event.key === "ArrowRight") {
        onNextRef.current();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open]);

  if (!open || !image) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="fixed inset-0 z-[100] flex flex-col bg-foreground text-white"
    >
      <div className="flex items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <div>
          <p id={titleId} className="font-serif text-2xl font-normal">
            {image.projectName}
          </p>
          <p
            id={descriptionId}
            className="mt-1 text-[0.7rem] tracking-[0.18em] text-white/70 uppercase"
          >
            {roomTypeLabels[image.roomType]}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="text-[0.72rem] tracking-[0.18em] uppercase"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <button
          type="button"
          className="absolute top-1/2 left-3 hidden -translate-y-1/2 text-[0.72rem] tracking-[0.18em] uppercase sm:block"
          onClick={onPrev}
          aria-label="Previous image"
        >
          Prev
        </button>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="100vw"
          className="max-h-[78vh] w-auto max-w-full object-contain"
          priority
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 hidden -translate-y-1/2 text-[0.72rem] tracking-[0.18em] uppercase sm:block"
          onClick={onNext}
          aria-label="Next image"
        >
          Next
        </button>
      </div>

      <div className="flex items-center justify-between px-5 py-5 sm:hidden">
        <button
          type="button"
          className="min-h-11 text-[0.72rem] tracking-[0.18em] uppercase"
          onClick={onPrev}
          aria-label="Previous image"
        >
          Prev
        </button>
        <button
          type="button"
          className="min-h-11 text-[0.72rem] tracking-[0.18em] uppercase"
          onClick={onNext}
          aria-label="Next image"
        >
          Next
        </button>
      </div>
    </div>,
    document.body,
  );
}
