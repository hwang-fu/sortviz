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

export async function mergeSort(
  array: number[],
  onUpdate: () => void,
  delay: number = 20
): Promise<void> {
  const merge = async (leftIndex: number, middleindex: number, rightIndex: number) => {
    const left = array.slice(leftIndex, middleindex + 1);
    const right = array.slice(middleindex + 1, rightIndex + 1);
    let i = 0;
    let j = 0;
    let k = leftIndex;

    while (i < left.length && j < right.length) {
      if (left[i]! <= right[j]!) {
        array[k] = left[i]!;
        i++;
      } else {
        array[k] = right[j]!;
        j++;
      }
      k++;
      onUpdate();
      await new Promise((resolve, _reject) => setTimeout(resolve, delay));
    }

    while (i < left.length) {
      array[k] = left[i]!;
      i++;
      k++;
      onUpdate();
      await new Promise((resolve, _reject) => setTimeout(resolve, delay));
    }

    while (j < right.length) {
      array[k] = right[j]!;
      j++;
      k++;
      onUpdate();
      await new Promise((resolve, _reject) => setTimeout(resolve, delay));
    }
  };

  const sort = async (leftIndex: number, rightIndex: number) => {
    if (leftIndex < rightIndex) {
      const mid = Math.floor((leftIndex + rightIndex) / 2);
      await sort(leftIndex, mid);
      await sort(mid + 1, rightIndex);
      await merge(leftIndex, mid, rightIndex);
    }
  };

  await sort(0, array.length - 1);
}

export async function heapSort(
  array: number[],
  onUpdate: () => void,
  delay: number = 20
): Promise<void> {
  const n = array.length;

  const heapify = async (size: number, rootIndex: number) => {
    let maxIndex = rootIndex;
    const leftChildIndex = 2 * rootIndex + 1;
    const rightChildIndex = 2 * rootIndex + 2;

    if (leftChildIndex < size && array[leftChildIndex]! > array[maxIndex]!) {
      maxIndex = leftChildIndex;
    }
    if (rightChildIndex < size && array[rightChildIndex]! > array[maxIndex]!) {
      maxIndex = rightChildIndex;
    }
    if (maxIndex !== rootIndex) {
      [array[rootIndex]!, array[maxIndex]!] = [array[maxIndex]!, array[rootIndex]!];
      onUpdate();
      await new Promise((resolve, _reject) => setTimeout(resolve, delay));
      await heapify(size, maxIndex);
    }
  };

  // build max heap:
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // extract elements from the heap:
  for (let i = n - 1; i > 0; i--) {
    [array[0]!, array[i]!] = [array[i]!, array[0]!];
    onUpdate();
    await new Promise((resolve, _reject) => setTimeout(resolve, delay));
    await heapify(i, 0);
  }
}
