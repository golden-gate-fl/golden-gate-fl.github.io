// Men's Club printer help page: the Copy button beside the printer's address, for computers
// without an email app. Nothing is sent from this page, and nothing is stored or tracked.
document.querySelectorAll("button[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = document.getElementById(button.dataset.copy).textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
    } catch {
      // Older browsers, or pages opened from a file: select the text to copy by hand.
      const range = document.createRange();
      range.selectNodeContents(document.getElementById(button.dataset.copy));
      getSelection().removeAllRanges();
      getSelection().addRange(range);
      button.textContent = "Selected: copy it";
    }
    setTimeout(() => { button.textContent = "Copy"; }, 3000);
  });
});
