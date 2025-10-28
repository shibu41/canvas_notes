import { A4_HEIGHT, CANVAS_PADDING, ELEMENT_SPACING } from "./constants";

export const calculateCanvasHeight = (elements) => {
  if (elements.length === 0) return A4_HEIGHT;
  const maxY = Math.max(...elements.map((el) => el.y + el.height));
  return Math.max(A4_HEIGHT, maxY + CANVAS_PADDING);
};

export const findNextPosition = (elements, A4_WIDTH) => {
  if (elements.length === 0) return { x: 50, y: 50 };

  const lastElement = elements[elements.length - 1];
  let newY = lastElement.y + lastElement.height + ELEMENT_SPACING;
  let newX = lastElement.x;

  if (newX + 200 > A4_WIDTH) {
    newX = 50;
    newY = 50;
  }

  return { x: newX, y: newY };
};

export const calculateContentDimensions = (content, currentX, A4_WIDTH) => {
  const lines = content.split("\n");
  const lineCount = lines.length;
  const maxLineLength = Math.max(...lines.map((l) => l.length), 20);

  const newHeight = Math.max(150, lineCount * 20 + 40);
  const newWidth = Math.max(
    300,
    Math.min(maxLineLength * 8.5 + 40, A4_WIDTH - currentX - 20)
  );

  return { width: newWidth, height: newHeight };
};