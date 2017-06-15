from sorting.heap import MaxHeap
from util.list import *


def heap_sort(l):
    max_heap = MaxHeap()

    for i in l:
        max_heap.insert(i)
    
    j = len(l)
    while not max_heap.is_empty():
        l[j - 1] = max_heap.pop()
        j -= 1

    print_list(l)

def heap_sort2(l):
    max_heap2 = MaxHeap(l)

    j = len(l)
    while not max_heap2.is_empty():
        l[j - 1] = max_heap2.pop()
        j -= 1

    print_list(l)

if __name__ == '__main__':
    test_list = generate_random_list(10, 10, 10000)
    heap_sort2(test_list)