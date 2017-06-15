from util.list import *


class MaxHeap:

    def __init__(self, l):
        # time complexity
        # build a heap by inserting each element from list o(nlogn)
        # build the heap by a list o(n)
        self.list = list([None])
        # build the heap from a list 
        if l:
            for i in l:
                self.list.append(i)
            # the index of the last element that is not leaf
            # is len(l)//2 e.g. 11 -> 5
            # from the last not leaf element shift down to the first
            for i in range(len(l)//2, 0, -1):
                self.shift_down(i)

    def size(self):
        return len(self.list)

    def insert(self, item):
        self.list.append(item)
        self.shift_up()

    def pop(self):
        if len(self.list) == 1:
            return
        # get the fist element that will be removed
        ret = self.list[1]
        # remove the last element to the first position
        self.list[1] = self.list[-1]
        # remove the previous last element
        self.list.pop()
        if len(self.list) == 1:
            return ret

        self.shift_down()
        return ret

    def is_empty(self):
        return len(self.list) == 1

    def shift_up(self):
        i = len(self.list) - 1
        while i//2 >= 1 and self.list[i] > self.list[i//2]:
            swap(self.list, i, i//2)
            i = i//2
    
    def __str__(self):
        return ', '.join(str(e) for e in self.list[1:])

    def shift_down(self, index=1):
        # shift down from index
        i = index
        length = len(self.list)
        # check if i is the last elememt now
        while 2 * i <= length - 1:
            # # index of the left child
            # left_index = 2 * i
            # # index of the right child
            # right_index = left_index + 1
           
            # # left child is greater than current element
            # if self.list[left_index] > self.list[i]:

            #     if right_index < length and self.list[left_index] < self.list[right_index]:
            #         swap(self.list, right_index, i)
            #         i = right_index
            #         continue
                
            #     swap(self.list, left_index, i)
            #     i = left_index
            #     continue
            # elif right_index < length and self.list[right_index] > self.list[i]:
            #     swap(self.list, right_index, i)
            #     i = right_index
            # else:
            #     break
            k = 2 * i
            if k + 1 <= length - 1 and self.list[k + 1] > self.list[k]:
                k = k + 1
            
            if self.list[k] <= self.list[i]:
                break
            
            swap(self.list, k, i)
            i = k

if __name__ == '__main__':
    heap = MaxHeap()

    test_list = generate_random_list(100, 1, 1000)
    for e in test_list:
        heap.insert(e)

    while not heap.is_empty():
         print(heap.pop())
