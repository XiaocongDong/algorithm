from util.list import *
import random

c = 0

def quick_sort(l):
	length = len(l)

	if not length:
		return

	start = 0
	end = length - 1

	_quick_sort(l, start, end)

def _quick_sort(l, start, end):
	if start >= end:
		return

	p = _partition(l, start, end)
	swap(l, start, p)
	_quick_sort(l, start, p - 1)
	_quick_sort(l, p + 1, end)
	

# return j, l[start...j] < l[start] and l[j + 1 ... end] > l[start]
def _partition(l, start, end):
	# p points to the pivot of this quick sort
	p = l[start]
	# j points to the last number that is less than pivot
	j = start

	for i in range(start + 1, end + 1, 1):
		if p > l[i]:
			swap(l, i, j + 1)
			j += 1

	return j

#### optimization ####

# when the list become nearly ordered, always picking the first
# element as the pivot will increase the time complexity of the algorithm
# to o(n^2), because n + (n - 1) + (n - 2) ...+ 1 
# optimization1 is randomly picked up the pivot

def _partition_opt1(l, start, end):
	# randomly pick up one position
	start_p = random.randint(start, end)
	# swap the start element and the selected element
	# so that the rest of the code can remain the same
	# as the normal one
	swap(l, start, start_p)
	p = l[start]
	j = start

	for i in range(start + 1, end + 1, 1):
		if p > l[i]:
			swap(l, i, j + 1)
			j += 1
	
	return j

def _quick_sort_opt1(l, start, end):
	if start >= end:
		return
	
	p = _partition_opt1(l, start, end)
	swap(l, start, end)
	_quick_sort_opt1(l, start, p - 1)
	_quick_sort_opt1(l, p + 1, end)

def quick_sort_opt1(l):
	if len(l) <= 1:
		return
	
	_quick_sort_opt1(l, 0, len(l) - 1)


test_list = generate_random_list(1000, 1, 10)
#print_list(test_list)
#print()
#quick_sort(test_list)
quick_sort_opt1(test_list)
print_list(test_list)

