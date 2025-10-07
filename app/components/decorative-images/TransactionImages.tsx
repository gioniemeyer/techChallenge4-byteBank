"use client";
import { useResponsive } from "@/app/contexts/ResponsiveContext";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { Box } from "@mui/material";
import Image from "next/image";

/** Componente que exibe as imagens decorativas do formulário de transação. */
export default function TransactionImages() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { selectedItem } = useSidebar();

  // Configurações das imagens
  const images = [
    // Pixel superior (tablet e desktop)
    (isTablet || isDesktop) && {
      key: "pixel-top-tablet-desktop",
      src: "/images/Pixels3.png",
      alt: "pixels",
      width: isTablet || isDesktop ? 180 : 146,
      height: isTablet || isDesktop ? 177 : 144,
      sx: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "180px",
        height: "177px",
      },
    },
    // Pixel superior (mobile)
    isMobile && {
      key: "pixel-top-mobile",
      src: "/images/Pixels3.png",
      alt: "pixels",
      width: 146,
      height: 144,
      sx: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "146px",
        height: "144px",
      },
    },
    // Pixel inferior (mobile)
    isMobile && {
      key: "pixel-bottom-mobile",
      src: "/images/Pixels2.png",
      alt: "pixels",
      width: 146,
      height: 144,
      sx: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "146px",
        height: "144px",
      },
    },
    // Pixel inferior (tablet e desktop)
    (isTablet || isDesktop) && {
      key: "pixel-bottom-tablet-desktop",
      src: "/images/Pixels2.png",
      alt: "pixels",
      width: 180,
      height: 177,
      sx: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "180px",
        height: "177px",
      },
    },
    // Ilustração (mobile e tablet)
    !isDesktop && selectedItem === "Início" || selectedItem === "Transferências" && {
      key: "illustration",
      src: "/images/Ilustração2.png",
      alt: "ilustração",
      width: isTablet ? 327 : 280,
      height: 231,
      sx: {
        position: "absolute",
        bottom: "28px",
        right: "16px",
        width: isTablet ? "327px" : "280px",
        height: "231px",
      },
    },
  ].filter(Boolean) as {
    key: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    sx: object;
  }[];

  return (
    <>
      {images.map((img) => (
        <Box key={img.key} sx={img.sx}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            style={{ objectFit: "contain" }}
          />
        </Box>
      ))}
    </>
  );
}
