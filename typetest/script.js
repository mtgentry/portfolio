document.addEventListener('DOMContentLoaded', function() {
  const textContainer = document.getElementById('textContainer');
  const originalText = textContainer.textContent;
  
  function animateText() {
    if (!originalText) return;
    
    // Split text into words first, then wrap each word and split into letters
    const words = originalText.split(' ');
    let htmlContent = '';
    let characterIndex = 0;
    
    words.forEach((word, wordIndex) => {
      // Wrap each word in a span with nowrap to prevent breaking
      htmlContent += '<span class="word-wrapper">';
      
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        htmlContent += `<span class="letter" data-char="${characterIndex}">${char}</span>`;
        characterIndex++;
      }
      
      htmlContent += '</span>';
      
      // Add space between words (not wrapped)
      if (wordIndex < words.length - 1) {
        htmlContent += ' ';
      }
    });
    
    textContainer.innerHTML = htmlContent;
    
    // Get all letter elements
    const letterElements = textContainer.querySelectorAll('.letter');
    
    // Group letters by their Y position (line)
    const lettersByLine = {};
    
    letterElements.forEach((letter, index) => {
      const rect = letter.getBoundingClientRect();
      const lineY = Math.round(rect.top); // Round to handle small variations
      
      if (!lettersByLine[lineY]) {
        lettersByLine[lineY] = [];
      }
      
      lettersByLine[lineY].push({
        element: letter,
        x: rect.left,
        index: index
      });
    });
    
    // Sort letters within each line by their X position (left to right)
    Object.keys(lettersByLine).forEach(lineY => {
      lettersByLine[lineY].sort((a, b) => a.x - b.x);
    });
    
    // Sort lines by their Y position (top to bottom)
    const sortedLines = Object.keys(lettersByLine).sort((a, b) => parseFloat(a) - parseFloat(b));
    
    // Set initial state for all letters
    letterElements.forEach((letter) => {
      gsap.set(letter, {
        opacity: 0.0,
        y: -20
      });
    });
    
    // Animate each line from left to right
    sortedLines.forEach((lineY, lineIndex) => {
      const lettersInLine = lettersByLine[lineY];
      
      lettersInLine.forEach((letterData, positionInLine) => {
        const baseDelay = 0.3 + (lineIndex * 0.25); // Each line starts after previous
        const letterDelay = baseDelay + (positionInLine * 0.015); // Letters animate left-to-right
        
        gsap.to(letterData.element, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power1.out",
          delay: letterDelay
        });
      });
    });
  }
  
  // Start animation
  animateText();
  
  // Optional: restart animation on click
  textContainer.addEventListener('click', animateText);
});