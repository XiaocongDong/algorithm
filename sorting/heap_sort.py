
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

# if the heap is stored in the list, the index should start from 0
# the index between the child nodes and parent node should follow the
# following rules
#      1. index_of_child =  i => index_of_parent = (i - 1) // 2
#      2. index_of_parent = i, index_of_left_child = 2 * i + 1, index_of_right_child = 2 * i + 2
class IMaxHeap:

    def __init__(self, l):
        # initialize the heap with list
        self.heap = list(l)
        # for each element in the list, 
        # append it to the end of the 
        # list, and the shift up
        # for e in l:
        #     self.heap.append(e)
        #     self.shift_up()

        # heapify
        for i in range((len(self.heap) - 2)//2, -1, -1):
            self.shift_down(i)
    
    def shift_up(self):
        # shift up the heap from the last element to
        # make it into a max heap
        length = len(self.heap)

        # if the number of the elements <= 1
        # return
        if length <= 1:
            return
        
        # index start from the last element
        i = length - 1

        while i > 0:
            parent = (i - 1) // 2
            if self.heap[i] > self.heap[parent]:
                swap(self.heap, i, parent)
                i = parent
            else:
                break

    def get_max(self):
        # get the lastest element from the heap
        # it is supposed to be the first element
        if len(self.heap) == 0:
            return
        
        max = self.heap[0]
        # put the last element at the beginning of the list
        self.heap[0] = self.heap[-1]
        # pop out the last element
        self.heap.pop()
        self.shift_down(0)
        return max
    
    def shift_down(self, start, end=None):
        length = len(self.heap)

        i = start
        last_index = end if end is not None else length - 1
        # print(last_index)
        # the confition for the while loop is
        # current node still have left child
        while 2 * i + 1 <= last_index:
            left = 2 * i + 1
            right = 2 * i + 2
            k = left

            if right <= last_index and self.heap[right] > self.heap[left]:
                k = right
            
            if self.heap[k] > self.heap[i]:
                swap(self.heap, k, i)
                i = k
            else:
                break
    
    def is_empty(self):
        return len(self.heap) == 0
    
    def print(self):
        for e in self.heap:
            print(e)
    
    def sort(self):
        # sort the heap in place
        if len(self.heap) <= 1:
            return
        
        last_index = len(self.heap) - 1
        
        for i in range(last_index, 0, - 1):
            max = self.heap[0]
            self.heap[0] = self.heap[i]
            self.heap[i] = max
            self.shift_down(0, i - 1)
            
# heap sort in place
# this is faster beacuse it doesn't need exxtra space
# and save the time on manipulating the space
def heap_sort(l):
    max_heap = IMaxHeap(l)
    max_heap.sort()
    max_heap.print()

if __name__ == '__main__':
    test_list = generate_random_list(1000, 1, 10000)
    heap_sort(test_list)
    