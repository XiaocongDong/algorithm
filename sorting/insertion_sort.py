from util.list import *
from util.performance import test_sort


def insertion_sort(l):
	# starts from index 1, the first element is always sorted
	for i in range(1, len(l)):
		for j in range(i, 0, -1):
			if l[j] < l[j - 1]:
				swap(l, j - 1, j)
			else:
				break

def insertion_sort_advance(l):
	# swap operation is very expensive in the array, need to decrease
	# the number of this operations to improve the performance of insertion sort 
	for i in range(1, len(l)):
		copy = l[i]
		cur = i
		for j in range(i, 0, -1):
			if copy < l[j - 1]:
				l[j] = l[j - 1]
				cur = j - 1
		l[cur] = copy

test_list = generate_random_list(5000, 0, 10)
test_list2 = generate_nearly_ordered_list(5000, 2)
test_sort('test1', insertion_sort_advance, test_list)
test_sort('test2', insertion_sort_advance, test_list2)

#print_list(test_list)
#test_sort('insertion_sort', insertion_sort, test_list)