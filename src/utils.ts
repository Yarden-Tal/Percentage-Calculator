import { modes } from "./models";

/**
 * Calculates based on the perecentage mode.
 */
export const calculate = (mode: string, n1: string, n2: string): number => {
    const num1: number = parseFloat(n1);
    const num2: number = parseFloat(n2);
    return (mode === modes.PERCENT_OF) ? ((num1 / 100) * num2) : ((num1 / num2) * 100);
  }

  export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, handleFunc: () => void): void => {
    const blockedKeys: string[] = ["-", "+", "e"];
    if (blockedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }
    if (e.key === "Enter") handleFunc();
  };
  