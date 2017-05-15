# simple selection sort

from util.list import *
from util.performance import test_sort

def selection_sort(l):
	# outer loop 
	for i in range(len(l)):
		min_index = i
		# inner loop
		for j in range(i, len(l)):
			if l[j] < l[min_index]:
				min_index = j

		swap(l, i, min_index)

test_list = generate_random_list(1000, 1, 10000)

test_sort('selection sort', selection_sort, test_list)
