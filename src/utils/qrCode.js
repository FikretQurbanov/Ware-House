// Compact QR code matrix generator for demo booking verification
// Generates standard 21x21 or 25x25 QR matrix representation with finder patterns and data hash

export function generateQRCodeSVG(text, size = 180) {
  // Hash text to generate deterministic pseudo-random module pattern
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  const matrixSize = 25;
  const grid = Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(false));

  // Finder pattern drawer (7x7)
  const drawFinder = (startX, startY) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          grid[startY + r][startX + c] = true;
        } else {
          grid[startY + r][startX + c] = false;
        }
      }
    }
  };

  // 3 Finder patterns
  drawFinder(0, 0); // Top-left
  drawFinder(matrixSize - 7, 0); // Top-right
  drawFinder(0, matrixSize - 7); // Bottom-left

  // Timing patterns
  for (let i = 8; i < matrixSize - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  // Alignment pattern around (matrixSize - 9, matrixSize - 9)
  const alignX = matrixSize - 9;
  const alignY = matrixSize - 9;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
        grid[alignY + r][alignX + c] = true;
      }
    }
  }

  // Populate data modules deterministically
  let seed = Math.abs(hash) + 12345;
  const nextPseudo = () => {
    seed = (seed * 1103515245 + 12343) & 0x7fffffff;
    return seed;
  };

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Skip finder zones & timing lines
      const isFinderTopLeft = r <= 7 && c <= 7;
      const isFinderTopRight = r <= 7 && c >= matrixSize - 8;
      const isFinderBottomLeft = r >= matrixSize - 8 && c <= 7;
      const isTiming = r === 6 || c === 6;
      const isAlign = (r >= alignY - 2 && r <= alignY + 2) && (c >= alignX - 2 && c <= alignX + 2);

      if (!isFinderTopLeft && !isFinderTopRight && !isFinderBottomLeft && !isTiming && !isAlign) {
        grid[r][c] = (nextPseudo() % 100) > 48;
      }
    }
  }

  const cellSize = size / matrixSize;
  const rects = [];

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (grid[r][c]) {
        rects.push(
          `<rect key="${r}-${c}" x="${(c * cellSize).toFixed(2)}" y="${(r * cellSize).toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}" fill="currentColor" />`
        );
      }
    }
  }

  return {
    matrix: grid,
    svgString: `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" class="text-slate-900 dark:text-white">${rects.join('')}</svg>`,
    rects,
    cellSize,
    size
  };
}
