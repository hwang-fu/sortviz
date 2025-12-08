import { bubbleSort } from './sorts';

const visualizer = document.getElementById("visualizer")!;
const generateBtn = document.getElementById("generate")!;
const sortBtn = document.getElementById("sort")!;

let array: number[] = [];
let isSorting = false;

function generateArray(size: number = 50): void {
  array = Array.from(
    { length: size },
    () => Math.floor(Math.random() * 100) + 1
  );
  renderBars();
}

function renderBars(): void {
  visualizer.innerHTML = "";
  array.forEach((elem) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${elem}%`;
    visualizer.appendChild(bar);
  });
}

generateBtn.addEventListener("click", () => {
  if (!isSorting) {
    generateArray();
  }
});

sortBtn.addEventListener("click", async () => {
  if (isSorting) {
    return;
  }
  isSorting = true;
  await bubbleSort(array, renderBars);
  isSorting = false;
});

generateArray();
