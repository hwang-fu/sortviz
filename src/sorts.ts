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
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
