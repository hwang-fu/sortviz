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

export async function insertionSort(
  array: number[],
  onUpdate: () => void,
  delay: number = 20
): Promise<void> {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    const key = array[i]!;
    let j = i - 1;
    while (j >= 0 && array[j]! > key) {
      array[j + 1] = array[j]!;
      j--;
      onUpdate();
      await new Promise(
        (resolve, _reject) => setTimeout(resolve, delay)
      );
    }
    array[j + 1] = key;
  }
}

export async function quickSort(
  array: number[],
  onUpdate: () => void,
  delay: number = 20
): Promise<void> {
  const partition = async (lowIndex: number, highInddex: number): Promise<number> => {
    const pivot = array[highInddex]!;
    let i = lowIndex - 1;
    for (let j = lowIndex; j < highInddex; j++) {
      if (array[j]! < pivot) {
        i++;
        [array[i]!, array[j]!] = [array[j]!, array[i]!];
        onUpdate();
        await new Promise((resolve, _reject) => setTimeout(resolve, delay));
      }
    }
    [array[i + 1]!, array[highInddex]!] = [array[highInddex]!, array[i + 1]!];
    onUpdate();
    await new Promise((resolve, _reject) => setTimeout(resolve, delay));
    return i + 1;
  };

  const qsort = async (lowIndex: number, highIndex: number) => {
    if (lowIndex < highIndex) {
      const pivotIndex = await partition(lowIndex, highIndex);
      await qsort(lowIndex, pivotIndex - 1);
      await qsort(pivotIndex + 1, highIndex);
    }
  };

  await qsort(0, array.length - 1);
}
