import { cn } from "@/utilities/cn";
import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}
// export default function Paragraph({ children, className }: ParagraphProps) {
//   <p className={cn("text-sm lg:text-base")}>{children}</p>;
// }

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => { 
    return <p className={cn("text-sm text-white lg:text-base", className)}>{children}</p>;
  };

    
    export default Paragraph;
