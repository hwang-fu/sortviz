export async function bubbleSort(
  array: number[],
  onUpdate: () => void,
  delay: number = 20
): Promise<void> {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j]! <= array[j+1]!) {
        continue;
      }
      [array[j]!, array[j+1]!] = [array[j+1]!, array[j]!];
      onUpdate();
      await new Promise(
        (resolve, _reject) => setTimeout(resolve, delay)
      );
    }
  }
}

export async function selectionSort(
  array: number[],
  onUpdate: () => void,
  delay: number = 20
): Promise<void> {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j]! < array[minIdex]!) {
        minIdex = j;
      }
    }
    if (minIdex !== i) {
      [array[i]!, array[minIdex]!] = [array[minIdex]!, array[i]!];
      onUpdate();
      await new Promise(
        (resolve, _reject) => setTimeout(resolve, delay)
      );
    }
  }
}
